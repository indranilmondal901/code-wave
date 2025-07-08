import { io } from "socket.io-client";

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnection: true,
        reconnectionAttempts: 'Infinity',
        timeOut: 10000,
        // reconnectionDelay: 1000,
        transports: ['websocket'],
    };
    return io(process.env.REACT_APP_SERVER_URL, options);
};