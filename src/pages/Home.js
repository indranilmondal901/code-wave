import { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        console.log(id);
        setRoomId(id);
        toast.success('New room created successfully!');
    };
    const handleJoinRoom = (e) => {
        e.preventDefault();
        if (!roomId || !userName) {
            toast.error('Please enter both Room ID and User Name');
            return;
        }
        //check valid uuid or not
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(roomId)) {
            toast.error('Invalid Room ID format');
            return;
        }

        navigate(`/editor/${roomId}`, {
            state: {
                userName: userName
            }
        });
    };
    const handleInputEnter = (e) => {
        if (e.key === 'Enter') {
            handleJoinRoom(e);
        }
    }
    return (
        <div className='homePageWrapper'>
            <div className='formWrapper'>
                <img src="/image/code-wave-logo.png" alt='code-wave-logo' className='homePageLogo' />
                <h2>Welcome to CodeWave</h2>
                <p>Collaborative code editor for real-time coding sessions.</p>

                <h4>Paste your invitation ROOM ID</h4>
                <div className='inputGroup'>
                    <input type='text' className='inputBox' placeholder='Enter Room ID' value={roomId} onChange={(e) => setRoomId(e.target.value)} onKeyUp={handleInputEnter} />
                    <input type='text' className='inputBox' placeholder='Enter Your User Name' value={userName} onChange={(e) => setUserName(e.target.value)} onKeyUp={handleInputEnter} />
                    <button className='btn joinBtn' onClick={handleJoinRoom}>Join</button>
                    <span className='createInfo'>
                        If you do not have a room ID, you can create a new room by clicking the button below. &nbsp;
                        <a onClick={createNewRoom} href='' className='createRoomLink'>Create New Room</a>
                    </span>
                </div>
            </div>
            <footer className='footer'>
                <p>© 2023 CodeWave. All rights reserved.</p>
                <p>Developed by <a href='' target='_blank' rel='noopener noreferrer'>Indranil Mondal</a></p>
            </footer>
        </div>
    )
}

export default Home