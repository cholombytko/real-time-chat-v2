import axios from "axios";
import { useState, useEffect } from "react";
import ChatBlock from "../chat-block/ChatBlock";
import './ChatList.css'
import { useNavigate } from "react-router-dom";

const CHATS_ENDPOINT = 'http://localhost:4000/api/chats'

const ChatList = () => {
	const [chats, setChats] = useState([]);
	const navigate = useNavigate();

	console.log(chats);

	useEffect(() => {
		fetchChats();
	}, []);

	const fetchChats = async () => {
		try {
			const response = await axios.get(CHATS_ENDPOINT, {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			})
			setChats(response.data);
		} catch(e) {
			console.error(e);
			navigate('/');
		}
	}

	return (
		<div>
			<h1>Chats</h1>
			<div className="chat-list">
				{chats.map((chat) => (
					<ChatBlock key={chat.id} id={chat.id} title={chat.title}/>
				))}
			</div>
		</div>
	);
}
 
export default ChatList;