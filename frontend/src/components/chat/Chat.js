import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import MessageBlock from "../ui/MessageBlock/MessageBlock";
import Button from "../ui/Button/Button";
import './Chat.css'

const Chat = () => {
	const { chatId } = useParams();
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const messagesEndRef = useRef(null);
	const navigate = useNavigate();
	const username = localStorage.getItem("username");

  useEffect(() => {
		fetchMessages();

		const newSocket = io('http://localhost:4000', {
			query: { username: localStorage.getItem("username") }
		});
		setSocket(newSocket);

    newSocket.emit("online", username);

		newSocket.on("user_online", (users) => {
			setOnlineUsers(users);
		});

		newSocket.on("user_offline", (users) => {
			setOnlineUsers(users);
		})

		console.log(onlineUsers);

		newSocket.on('receiveMessage', (msg) => {
			console.log("Received message:", msg);
			setChat(prevChat => [...prevChat, msg]);
		});

    return () => {
      newSocket.disconnect();
    };
  }, []);

	useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

	const fetchMessages = async () => {
		try {
			const response = await axios.get(`http://localhost:4000/api/messages/${chatId}`, {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			});

			setChat(response.data); 
			console.log(response.data)
		} catch (error) {
			console.error('Failed to fetch messages:', error);
			navigate('/chats');
		}
	};

  const sendMessage = async (e) => {
		e.preventDefault();
		if (message !== '') {
			try {
				const response = await axios.post(`http://localhost:4000/api/messages/${chatId}`,
					{ message }, 
					{ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
				)

				if (socket) {
					socket.emit('sendMessage', response.data);
					console.log("Message sent via socket:", response.data);
				}

				setMessage('');
			} catch(e) {
				console.error(e);
			}
		}
  };

	const returnToChatsHandler = (e) => {
		e.preventDefault();
		navigate('/chats');
	}

  return (
		<div className="Chat-window">
			<Button className="chats-button" onClick={returnToChatsHandler}>Return to chats</Button>
			<div className="Chat-box">
				<div className="messages-container">
					{chat.map((msg) => (
						<div className="message-block">
							<div className={username === msg.sender_username ? "message-right" : "message-left"} key={msg.id}>
								<MessageBlock
									sender_username={msg.sender_username}
									message={msg.message}
									online={onlineUsers.includes(msg.sender_username)}
								/>
							</div>
						</div>
					))}
					<div ref={messagesEndRef} /> {/* Invisible div for auto-scrolling */}
				</div>
				<form className="input-form" onSubmit={sendMessage}>
					<input
						className="input-field"
						type="text"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Type a message..."
						required
					/>
					<button className="input-button" type="submit">Send</button>
				</form>
			</div>
		</div>
  );
}
 
export default Chat;