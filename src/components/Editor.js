import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/closetag.js';
import Actions from '../Actions';



const Editor = ({ socketRef, roomId }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    async function loadEditor() {
      editorRef.current = Codemirror.fromTextArea(document.getElementById('realtimeEditor'), {
        mode: { name: 'javascript', json: true },
        theme: 'dracula',
        autoCloseBrackets: true,
        autoCloseTags: true,
        lineNumbers: true,
      });
      editorRef.current.on('change', (instance, changeObj) => {
        // Handle changes in the editor
        // console.log('Editor content changed:', instance.getValue(),changeObj);
        const { origin } = changeObj;
        const code = instance.getValue();
        // console.log('Code:', code);

        if (origin !== 'setValue') {
          // Emit the change to the server or handle it as needed
          socketRef.current.emit(Actions.CODE_CHANGE, {
            code,
            roomId: roomId,
          });
        }
      });
      // editorRef.current.setValue('// Start coding here...\n');
    }
    loadEditor();
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;

    // Listen for code changes from the server
    socketRef.current.on(Actions.CODE_CHANGE, ({ code }) => {
      console.log('Code received from server:', code);
      if (editorRef.current.getValue() !== code && code !== null) {
        editorRef.current.setValue(code);
      }
    });

    // Cleanup on component unmount
    return () => {
      socketRef.current.off(Actions.CODE_CHANGE);
    };

  }, [socketRef.current]);

  return (
    <textarea id="realtimeEditor">
    </textarea>
  )
}

export default Editor