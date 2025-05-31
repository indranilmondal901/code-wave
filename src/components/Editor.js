import React, { useEffect, useRef } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/closetag.js';
import { initSocket } from '../socket';
import Action from '../Action';
import toast from 'react-hot-toast';


const Editor = () => {
  const socketRef = useRef(null);//useRef beacuse it wil not rerender component on changing value,Component re-rendering will not change the socket connection

  const location = useLocation();
  const reactNavigate = useNavigate();
  const { roomId } = useParams();

  console.log(roomId);
  if (!roomId) {
    return <Navigate to="/" replace={true} />;
  }

  useEffect(() => {
    // Initialize socket connection
    const initSocketConnection = async () => {
      socketRef.current = await initSocket();
      const handleError = (err) => {
        toast.error(`Socket connection error: ${err.message}`);
        reactNavigate("/");
      };
      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));

      socketRef.current.emit(Action.JOIN, {
        roomId,
        userName: location.state?.userName || 'Anonymous',
      });
    };
    initSocketConnection();

    // Cleanup on component unmount
    // return () => {
    //   if (socketRef.current) {
    //     socketRef.current.disconnect();
    //   }
    // };
  }, []);

  useEffect(() => {
    async function loadEditor() {
      Codemirror.fromTextArea(document.getElementById('realtimeEditor'), {
        mode: { name: 'javascript', json: true },
        theme: 'dracula',
        autoCloseBrackets: true,
        autoCloseTags: true,
        lineNumbers: true,
      });

    }
    loadEditor();
  }, []);

  if (!location.state) {
    <Navigate to="/" replace={true} />
  }

  return (
    <textarea id="realtimeEditor">

    </textarea>
  )
}

export default Editor