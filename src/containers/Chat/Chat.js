import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOnlineUser, deleteOnlineUser, getOnlineUsers } from '../../store/actions/usersActions';
import './Chat.css';

const Chat = props => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const onlineUsers = useSelector(state => state.users.onlineUsers);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");

    const ws = useRef(null);

    useEffect(() => {
        if (user === null) {
            props.history.replace("/register");
        } else {
            const startWS = () => {
                dispatch(deleteOnlineUser());
                setInterval(() => {
                    dispatch(getOnlineUsers());
                    console.log(onlineUsers)
                }, 2000);

                dispatch(addOnlineUser(user));
                console.log(onlineUsers)
                ws.current = new WebSocket("ws://localhost:8000/chatroom?token=" + user.token);

                ws.current.onopen = () => {
                    ws.current.send(JSON.stringify({ type: "GET_ALL_MESSAGES" }));
                };

                ws.current.onclose = () => {
                    console.log('ws connection closed');
                    dispatch(deleteOnlineUser());
                    clearInterval();
                    setTimeout(startWS, 5000);
                }
                ws.current.onmessage = e => {
                    const decodedMessage = JSON.parse(e.data);
                    if (decodedMessage.type === "NEW_MESSAGE") {
                        setMessages(messages => [...messages, decodedMessage.message]);
                    } else if (decodedMessage.type === "ALL_MESSAGES") {
                        setMessages(messages => [...messages, ...decodedMessage.messages]);
                    }
                };
                return () => ws.current.close();
            }
            startWS();
        }
    }, [user, props.history, dispatch]);

    const changeMessage = e => {
        setMessageText(e.target.value);
    };

    const sendMessage = e => {
        e.preventDefault();
        ws.current.send(JSON.stringify({
            type: "CREATE_MESSAGE",
            text: messageText
        }));
    };

    return (
        <div>
            <div>
                <div className='online-users-box'>
                    <h3>Online Users: </h3>
                    {onlineUsers && onlineUsers.map(user => {
                        return <div key={user._id}>
                            <p>{user.username}</p>
                        </div>
                    })}
                </div>
                <div className='messages-box'>
                    {messages.map(m => {
                        return <div key={m._id}>
                            <h4>{m.username}: {m.text}</h4>
                        </div>
                    })}
                </div>
                <div>
                    <form onSubmit={sendMessage}>
                        <input
                            type="text"
                            value={messageText}
                            onChange={changeMessage}
                            required
                        />
                        <button type='submit'>Send</button>
                    </form>
                </div>
            </div>


        </div>
    );
};

export default Chat;