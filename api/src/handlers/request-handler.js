import 'dotenv/config';
import jwt from 'jsonwebtoken';
import cloudinary from '../connections/cloudinary.js';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import AdvancedFormat from 'dayjs/plugin/advancedFormat.js';
import { User, RefreshToken, Note } from '../models/models.js';
import { response } from '../utils/response-handler.js';
import { accessToken, refreshToken } from '../utils/jwt-generator.js';
import { welcomeNote } from './new-notes.js';

// Day.js extended format
dayjs.extend(AdvancedFormat);

export const resgisterHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      return response(401, {}, 'Email already used, try other email address!', res);
    }

    const salt = bcrypt.genSaltSync(13);
    const hashedPassword = await bcrypt.hash(password, salt);

    const addUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      picture: {
        public_id: 'created',
        secure_url: 'created',
      },
      issued_at: dayjs().format('DD-MMM-YYYY HH:mm:ss'),
      accessed: 'new account',
    });

    await addUser
      .save()
      .then((data) => {
        welcomeNote(data.email);
        const { _id, __v, password, ...user } = data;
        return response(201, user, 'Account created!', res);
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  } catch (error) {
    console.log(error);
  }
};

export const loginHandler = async (req, res) => {
  try {
    const { email, password, googleAccount } = req.body;

    if (googleAccount) {
      return googleLoginHandler(res, googleAccount);
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return response(400, {}, 'Incorrect email or password!', res);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return response(400, {}, 'Incorrect email or password!', res);
    }

    const updatedAccount = await User.findOneAndUpdate({ email: email }, { accessed: dayjs().format('DD-MMM-YYYY HH:mm:ss') }, { new: true });
    if (!updatedAccount) {
      return response(400, {}, 'Incorrect email or password!', res);
    }

    const ACCESS_TOKEN = accessToken({ name: user.name, email: user.email });
    const REFRESH_TOKEN = refreshToken({ name: user.name, email: user.email });

    const addToken = new RefreshToken({
      user: user.email,
      token: REFRESH_TOKEN,
      expires: dayjs().add(1, 'day').format('DD-MMM-YYYY HH:mm:ss'),
    });

    await addToken
      .save()
      .then(() => {
        res.cookie('ref_token', REFRESH_TOKEN, {
          sameSite: 'strict',
          secure: 'true',
          maxAge: new Date('9999-12-31').getTime() - new Date().getTime(),
        });
        res.cookie(
          'user',
          { name: user.name, email: user.email, picture: user.picture, issued_at: user.issued_at },
          {
            sameSite: 'strict',
            secure: 'true',
            maxAge: new Date('9999-12-31').getTime() - new Date().getTime(),
          }
        );
        return response(201, ACCESS_TOKEN, 'Login successful!', res);
      })
      .catch((error) => res.send(error));
  } catch (error) {
    console.log(error);
  }
};

const googleLoginHandler = async (res, data) => {
  try {
    const decodedData = jwt.decode(data, { complete: true });
    if (!decodedData) {
      return response(400, {}, 'Something went wrong!', res);
      // return response(400, {}, 'Failed to decode!', res);
    }

    const { name, email, picture } = decodedData.payload;

    const user = await User.findOne({ email });
    if (!user) {
      new User({
        name: name,
        email: email,
        password: 'unset',
        picture: {
          public_id: picture,
          secure_url: picture,
        },
        issued_at: dayjs().format('DD-MMM-YYYY HH:mm:ss'),
        accessed: dayjs().format('DD-MMM-YYYY HH:mm:ss'),
      })
        .save()
        .then((data) => {
          welcomeNote(data.email);
        })
        .catch((error) => response(400, error, 'Something went wrong', res));
      // .catch((error) => response(400, error, 'Failed to register new account', res));
    }

    const updatedAccount = await User.findOneAndUpdate({ email }, { accessed: dayjs().format('DD-MMM-YYYY HH:mm:ss') }, { new: true });
    if (!updatedAccount) {
      return response(400, {}, 'Something went wrong!', res);
      // return response(400, {}, 'Failed to update account!', res);
    }

    const ACCESS_TOKEN = accessToken({ name: updatedAccount.name, email: updatedAccount.email });
    const REFRESH_TOKEN = refreshToken({ name: updatedAccount.name, email: updatedAccount.email });

    const addToken = new RefreshToken({
      user: updatedAccount.email,
      token: REFRESH_TOKEN,
      expires: dayjs().add(1, 'day').format('DD-MMM-YYYY HH:mm:ss'),
    });

    await addToken
      .save()
      .then(() => {
        res.cookie('ref_token', REFRESH_TOKEN, {
          sameSite: 'strict',
          secure: 'true',
          maxAge: new Date('9999-12-31').getTime() - new Date().getTime(),
        });
        res.cookie(
          'user',
          { name: updatedAccount.name, email: updatedAccount.email, picture: updatedAccount.picture, issued_at: updatedAccount.issued_at },
          {
            sameSite: 'strict',
            secure: 'true',
            maxAge: new Date('9999-12-31').getTime() - new Date().getTime(),
          }
        );
        return response(201, ACCESS_TOKEN, !user ? 'Account created and loged in successfully!' : 'Login successful!', res);
      })
      .catch((error) => res.send(error));
  } catch (error) {
    console.log(error);
  }
};

export const tokenHandler = async (req, res) => {
  try {
    const refToken = req.cookies.ref_token;
    if (!refToken) {
      return response(401, {}, 'Login session expired!', res);
    }

    jwt.verify(refToken, process.env.SECRET_REFRESH_TOKEN, async (error, data) => {
      if (error) {
        return response(401, {}, 'Login session expired!', res);
      }

      const refreshToken = await RefreshToken.findOne({ token: refToken });
      if (!refreshToken) {
        return response(401, {}, 'Login session expired!', res);
      }

      const newAccessToken = accessToken({ name: data.user.name, email: data.user.email });
      return response(201, newAccessToken, 'New access token created!', res);
    });
  } catch (error) {
    console.log(error);
  }
};

export const logoutHandler = async (req, res) => {
  try {
    const refToken = req.cookies.ref_token;
    if (!refToken) {
      return response(401, {}, 'Please login first!', res);
    }

    const refreshToken = await RefreshToken.findOne({ token: refToken });
    if (!refreshToken) {
      return response(401, {}, 'Please login first!', res);
    }

    await RefreshToken.deleteOne(refreshToken)
      .then(() => {
        res.clearCookie('ref_token', { secure: true });
        res.clearCookie('user', { secure: true });
        return response(200, {}, 'Logout success!', res);
      })
      .catch((error) => res.send(error));
  } catch (error) {
    console.log(error);
  }
};

export const updateProfilePict = async (req, res) => {
  try {
    const image = req.body.file;
    const result = await cloudinary.uploader.upload(image, {
      folder: 'profile_pict',
    });
    if (!result) {
      return response(400, {}, 'upload failed', res);
    }

    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return response(400, {}, 'upload failed', res);
    }

    const result2 = await cloudinary.uploader.destroy(user.picture.public_id);

    const updatedAccount = await User.findOneAndUpdate(
      { email: req.user.email },
      {
        picture: {
          public_id: result.public_id,
          secure_url: result.secure_url,
        },
      },
      { new: true }
    );
    if (!updatedAccount) {
      return response(400, {}, 'upload failed', res);
    }

    res.cookie(
      'user',
      {
        name: updatedAccount.name,
        email: updatedAccount.email,
        picture: updatedAccount.picture,
        issued_at: updatedAccount.issued_at,
      },
      {
        sameSite: 'strict',
        secure: 'true',
        maxAge: new Date('9999-12-31').getTime() - new Date().getTime(),
      }
    );
    return response(201, {}, 'Profile picture updated!', res);
  } catch (error) {
    console.log(error);
  }
};

export const updateProfileAccount = async (req, res) => {
  try {
    const { type } = req.params;

    const { newName = '', newEmail = '', newPassword = '', password } = req.body;

    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return response(401, {}, 'Unauthenticated', res);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return response(400, {}, 'Incorrect email or password!', res);
    }

    let data = {};
    let msg = '';
    switch (type) {
      case 'name':
        data = {
          name: newName,
        };
        msg = 'Username updated!';
        break;
      case 'email':
        data = {
          email: newEmail,
        };
        msg = 'User email updated!';
        break;
      case 'password':
        const salt = bcrypt.genSaltSync(13);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        data = {
          password: hashedPassword,
        };
        msg = 'User password updated!';
        break;
      default:
        break;
    }

    await User.findOneAndUpdate({ email: req.user.email }, data, { new: true })
      .then(async (data) => {
        if (type === 'email') {
          await Note.updateMany({ creator: req.user.email }, { creator: data.email });
        }

        const ACCESS_TOKEN = accessToken({ name: data.name, email: data.email });
        const REFRESH_TOKEN = refreshToken({ name: data.name, email: data.email });

        await RefreshToken.findOneAndUpdate(
          { user: req.user.email },
          {
            user: data.email,
            token: REFRESH_TOKEN,
            expires: dayjs().add(1, 'day').format('DD-MMM-YYYY HH:mm:ss'),
          },
          { new: true }
        )
          .then(() => {
            res.cookie('ref_token', REFRESH_TOKEN, {
              sameSite: 'strict',
              secure: 'true',
              maxAge: new Date('9999-12-31').getTime() - new Date().getTime(),
            });
            res.cookie(
              'user',
              { name: data.name, email: data.email, picture: data.picture, issued_at: data.issued_at },
              {
                sameSite: 'strict',
                secure: 'true',
                maxAge: new Date('9999-12-31').getTime() - new Date().getTime(),
              }
            );
            return response(201, ACCESS_TOKEN, msg, res);
          })
          .catch((error) => res.send(error));
      })
      .catch((error) => res.send(error));
  } catch (error) {
    console.log(error);
  }
};

export const userDataHandler = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return response(401, {}, 'Data not found', res);
    }

    const { password, _id, __v, ...data } = user._doc;
    return response(200, data, 'User data found', res);
  } catch (error) {
    console.log(error);
  }
};

export const notesDataHandler = async (req, res) => {
  try {
    const { isArchived } = req.query;

    let data;
    if (isArchived === 'all') {
      data = { creator: req.user.email };
    } else {
      data = { creator: req.user.email, isArchived };
    }

    const notes = await Note.find(data);
    if (!notes.length) {
      return response(200, {}, 'There is no note yet', res);
    }

    return response(200, notes, 'Notes found', res);
  } catch (error) {
    console.log(error);
  }
};

export const noteDataHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOne({ note_id: id, creator: req.user.email });
    if (!note) {
      return response(200, {}, 'Note not found!', res);
    }

    return response(200, note, 'Note found!', res);
  } catch (error) {
    console.log(error);
  }
};

export const addNoteHandler = async (req, res) => {
  try {
    const { title, note } = req.body;

    const addNote = new Note({
      note_id: +new Date(),
      creator: req.user.email,
      title,
      note,
      isArchived: false,
      issued_at: dayjs().format('DD-MMM-YYYY HH:mm:ss'),
      last_updated: dayjs().format('DD-MMM-YYYY HH:mm:ss'),
    });

    await addNote
      .save()
      .then((data) => {
        const { _id, __v, ...newData } = data;
        return response(200, newData, 'New note created successfully!', res);
      })
      .catch((error) => {
        res.send(error);
      });
  } catch (error) {
    console.log(error);
  }
};

export const updateNoteHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const noteData = await Note.findOneAndUpdate({ note_id: id, creator: req.user.email }, req.body, { new: true });
    if (!noteData) {
      return response(404, {}, 'Note not found!', res);
    }

    return response(201, noteData, 'Note updated', res);
  } catch (error) {
    console.log(error);
  }
};

export const deleteNoteHandler = async (req, res) => {
  try {
    const { id } = req.params;

    await Note.deleteOne({ note_id: id, creator: req.user.email });

    return response(200, {}, 'Note deleted', res);
  } catch (error) {
    console.log(error);
  }
};
