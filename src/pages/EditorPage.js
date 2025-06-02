import React, { useState, useEffect, useRef } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import Actions from '../Actions';
import toast from 'react-hot-toast';

const EditorPage = () => {
  const socketRef = useRef(null);//useRef beacuse it wil not rerender component on changing value,Component re-rendering will not change the socket connection
  const codeRef = useRef(null); // to store the current code in the editor

  const { roomId } = useParams();
  const location = useLocation();
  const reactNavigate = useNavigate();

  const [clients, setClient] = useState([]);

  // redirect conditions
  const shouldRedirectHome = !roomId || !location.state;

  useEffect(() => {
    if (shouldRedirectHome) return;
    // Initialize socket connection
    const initSocketConnection = async () => {
      socketRef.current = await initSocket();
      const handleError = (err) => {
        toast.error(`Socket connection error: ${err.message}`);
        reactNavigate("/");
      };
      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));

      socketRef.current.emit(Actions.JOIN, {
        roomId,
        userName: location.state?.userName || 'Anonymous',
      });

      // Listen for 'joined' event
      socketRef.current.on(Actions.JOINED, ({ clients, userName, socketId }) => {
        if (userName !== location.state?.userName) {
          toast.success(`${userName} Joined the room successfully!`);
          // console.log(`${userName} Joined the room successfully!`)
        }
        setClient(clients);

        // code syncing
        socketRef.current.emit(Actions.CODE_SYNC, {
          code: codeRef.current,
          socketId: socketId,
        });
      });

      // Listen for 'disconnected' event
      socketRef.current.on(Actions.DISCONNECTED, ({ socketId, userName }) => {
        toast.error(`${userName} has left the room!`);
        setClient((prev) => prev.filter(client => client.socketId !== socketId));
      });

    };
    initSocketConnection();

    // Cleanup on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(Actions.JOINED);
        socketRef.current.off(Actions.DISCONNECTED);
      }
    };
  }, []);

  const handleCopyRoomId = () => {
    try {
      navigator.clipboard.writeText(roomId);
      toast.success("Room ID copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy Room ID!");
      // console.error("Error copying Room ID:", error);      
    }
  };

  const leaveRoom = () => {
    const confirmLeave = window.confirm("Are you sure you want to leave the room?");
    if (confirmLeave) reactNavigate("/");
  };

  if (shouldRedirectHome) {
    return <Navigate to="/" replace={true} />
  }

  return (
    <div className='mainWrap'>
      <div className='aside'>
        <div className='asideInner'>
          <div className='logo'>
            <img src="/image/code-wave-logo.png" alt='code-wave-logo' className='logoImage' />
          </div>
          <h3>Connected</h3>
          <div className='clientsList'>
            {clients.map((client) => (
              <Client username={client.userName} key={client.socketId} />
            ))}
          </div>
        </div>
        <button className='btn copyBtn' onClick={handleCopyRoomId}>Copy Room ID</button>
        <button className='btn leaveBtn' onClick={leaveRoom}>Leave Room</button>
      </div>

      <div className='editorWrapper'>
        <Editor socketRef={socketRef} roomId={roomId}
          onCodeChange={(code) => {
            console.log("inside onCodeChange", code);
            codeRef.current = code;
            console.log("updated codeRef.current:", codeRef.current);
          }}
        />
      </div>

    </div>
  )
}

export default EditorPage