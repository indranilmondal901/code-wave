import React, { useEffect, useRef } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/closetag.js';



const Editor = () => {
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
        console.log('Editor content changed:', instance.getValue());
      });

    }
    loadEditor();
  }, []);

  return (
    <textarea id="realtimeEditor">
    </textarea>
  )
}

export default Editor