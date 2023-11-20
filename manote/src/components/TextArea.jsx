import React, { useState } from 'react';
import '../styles/TextArea.css';
import Editor, { loader } from '@monaco-editor/react';
import { langs } from '../utils/editorLanguages';
import { useSettings } from '../hooks/useSettings';

const TextArea = ({ code, id, body, language, notes, setNotes }) => {
  const { settings } = useSettings();

  const [row, setRow] = useState(6);
  const [select, setSelect] = useState(false);
  const [lang, setLang] = useState(
    language
      ? {
          name: langs.filter((item) => item.value === language)[0].name,
          value: langs.filter((item) => item.value === language)[0].value,
        }
      : {
          name: '',
          value: '',
        }
  );

  loader.init().then((monaco) => {
    monaco.editor.defineTheme('myTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1d2d44',
      },
    });
  });

  const onCodeClosed = () => {
    const mappedNotes = [...notes];
    const extendedBody = {
      value: '',
      target: 0,
    };

    mappedNotes.forEach((note, i) => {
      if (note.id === id) {
        extendedBody.target = i - 1;
      }

      if (note.id === id + 1) {
        extendedBody.value = note.body;
      }
    });

    mappedNotes.map((note, i) => (i === extendedBody.target ? (note.body = note.body + extendedBody.value) : note));

    const newNotes = [...mappedNotes].filter((note) => note.id !== id && note.id !== id + 1);
    setNotes(newNotes);
  };

  return (
    <div className="text-area-card">
      {code ? (
        <div className="control-bar">
          <div id="languageSelector" onClick={() => setSelect(true)}>
            <p>{lang.name.length ? lang.name : 'Select language...'}</p>
            <i className="bi bi-caret-down-fill" />
            <div className={select ? 'select' : ''} id="languages">
              {langs.map((lang) => (
                <div
                  className="langs"
                  key={lang.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    const newNotes = [...notes];
                    newNotes.map((note) => {
                      note.id === id ? (note.lang = lang.value) : note;
                    });

                    setNotes(newNotes);
                    setLang(lang);
                    setSelect(false);
                  }}
                >
                  {lang.name}
                </div>
              ))}
            </div>
          </div>
          <i className="bi bi-x close-btn" onClick={onCodeClosed}></i>
        </div>
      ) : null}

      {code ? (
        <Editor
          height={'300px'}
          width={'100%'}
          language={lang.value}
          options={{ minimap: { enabled: false } }}
          theme={settings.theme ? 'myTheme' : 'vs-light'}
          defaultValue={body.length ? body : '// write your code here...'}
          onChange={(value, e) => {
            const newNotes = [...notes];
            newNotes.map((note) => {
              note.id === id ? (note.body = value) : note;
            });

            setNotes(newNotes);
          }}
        />
      ) : (
        <textarea
          className="note-input"
          rows={row}
          placeholder="Your notes..."
          value={body}
          onChange={(e) => {
            const newNotes = [...notes];
            newNotes.map((note) => {
              note.id === id ? (note.body = e.target.value) : note;
            });

            setNotes(newNotes);
            setRow((prev) => {
              if (e.target.scrollHeight / 15 <= prev) {
                return prev;
              }

              return e.target.scrollHeight / 15;
            });
          }}
        />
      )}
    </div>
  );
};

export default TextArea;
