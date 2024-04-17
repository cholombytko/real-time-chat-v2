import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './ChatBlock.css'

const LAST_MESSAGE_ENDPOINT = 'http://localhost:4000/api/messages/last/'

const ChatBlock = ({ id, title }) => {
	const [lastMessage, setLastMessage] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		fetchLastMessage();
	})

	const fetchLastMessage = async () => {
		try {
			const response = await axios.get(LAST_MESSAGE_ENDPOINT + id, {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			})
			const data = response.data;
			setLastMessage(`${data.sender_username}: ${data.message}`)
		} catch(e) {
			console.error(e);
		}
	}

	const handleClick = () => {
		navigate(`/chat/${id}`);
	};
	
	return (
		<div className="chat-block" onClick={handleClick} style={{ cursor: 'pointer' }}>
			<h4>{title}</h4>
			<p>{lastMessage || "Loading..."}</p>
		</div>
	);
}
 
export default ChatBlock;