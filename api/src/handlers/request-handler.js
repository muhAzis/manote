import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import AdvancedFormat from 'dayjs/plugin/advancedFormat.js';
import { User, RefreshToken, Note } from '../models/models.js';
import { response } from '../utils/response-handler.js';
import { accessToken, refreshToken } from '../utils/jwt-generator.js';
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
    });

    await addUser
      .save()
      .then((data) => response(201, data, 'Account created!', res))
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
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return response(400, {}, 'Incorrect email or password!', res);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return response(400, {}, 'Incorrect email or password!', res);
    }

    const ACCESS_TOKEN = accessToken({ name: user.name, email: user.email });
    const REFRESH_TOKEN = refreshToken({ name: user.name, email: user.email });

    const addToken = new RefreshToken({
      token: REFRESH_TOKEN,
    });

    await addToken
      .save()
      .then(() => {
        res.cookie('ref_token', REFRESH_TOKEN, {
          sameSite: 'none',
          secure: 'true',
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.cookie(
          'user',
          { name: user.name, email: user.email },
          {
            sameSite: 'none',
            secure: 'true',
            maxAge: 24 * 60 * 60 * 1000,
          }
        );
        return response(201, ACCESS_TOKEN, 'Login successful!', res);
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

    const notes = await Note.find({ creator: req.user.email, isArchived });
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
