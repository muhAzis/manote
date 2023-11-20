import { Note } from '../models/models.js';
import dayjs from 'dayjs';

export const welcomeNote = async (user) => {
  new Note({
    note_id: +new Date(),
    creator: user,
    title: 'Welcome to Manote!',
    note: [
      {
        id: 1,
        code: false,
        body: 'Welcome to Manote! Manote is a simple note app to store your important data that slipped on your mind before you forget to write it down.\n\nNot only plain text, Manote offer you to write a code too in a form of code editor to make you comfortable to write code in any language on any device. It helps programmers to write down their solution code in any situation, because they usually forget the code in time they want to debug their project.\n\nThe benefit using this feature is you can straightly copy the code from the note and paste it in your project file and the code format will automatically implemented in the file, no need to adjust the code anymore.\n\nFor example:',
        lang: null,
      },
      {
        id: 2,
        code: true,
        body: "// when you want to create a function in javascript\nconst language = 'Javascript';\n\nconst printFunction = () => {\n  console.log(`${language} arrow function`);\n}\n\nprintFunction();",
        lang: 'javascript',
      },
      {
        id: 3,
        code: false,
        body: 'You can try to copy the code above and paste it in your code editor and use Javascript file type, or you can try to edit this note by clicking the "Edit" button bellow.',
        lang: null,
      },
    ],
    isArchived: false,
    issued_at: dayjs().format('DD-MMM-YYYY HH:mm:ss'),
    last_updated: dayjs().format('DD-MMM-YYYY HH:mm:ss'),
  }).save();
};

// when you want to create a function in javascript
// const language = 'Javascript';

// const printFunction = () => {
//   console.log(`${language} arrow function`);
// };

// printFunction();
