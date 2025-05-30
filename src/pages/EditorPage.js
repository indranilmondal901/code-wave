import React, { useState } from 'react'
import Client from '../components/Client';
import Editor from '../components/Editor';

const EditorPage = () => {
  const [clients, setClient] = useState([
    { socketId: '12345', userName: 'Indranil Mondal' },
    { socketId: '67890', userName: 'Satyam Tripathi' },]);
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
        <button className='btn copyBtn'>Copy Room ID</button>
        <button className='btn leaveBtn'>Leave Room</button>
      </div>

      <div className='editorWrapper'>
            <Editor />
      </div>

    </div>
  )
}

export default EditorPage