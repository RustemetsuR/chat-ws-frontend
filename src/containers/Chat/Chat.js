import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './Chat.css';

const Chat = props => {

    const user = useSelector(state => state.users.user);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");

    const ws = useRef(null);

    useEffect(() => {
        if (user === null) {
            props.history.replace("/register")
        } else {
            const startWS = () => {
                ws.current = new WebSocket("ws://localhost:8000/chatroom?token=" + user.token);

                ws.current.onopen = () => {
                    ws.current.send(JSON.stringify({ type: "GET_ALL_MESSAGES" }));
                };

                ws.current.onclose = () => {
                    console.log('ws connection closed')
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
    }, [user, props.history]);

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