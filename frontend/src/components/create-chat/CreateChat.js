import { useState } from "react";
import axios from "axios";
import Button from "../ui/Button/Button";
import './CreateChat.css'

const CreateChat = () => {
	const [modal, setModal] = useState(false);
	const [isFailed, setIsFailed] = useState(false);
	const [title, setTitle] = useState('');

	const toggleModal = () => {
		setModal(!modal);
		setIsFailed(false);
		setTitle('');
	}

	const createChat = async (e) => {
		e.preventDefault();
		if (title !== '') {
			try {
				await axios.post(`http://localhost:4000/api/chats`,
					{ title }, 
					{ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
				)
				setTitle('');
				setModal(!modal);
				setIsFailed(false);
			} catch(e) {
				setIsFailed(true);
				console.error(e);
			}
		} else {
			setIsFailed(true);
		}
  };

	return (
		<div>
			<Button onClick={toggleModal}>Create chat</Button>
			
			{modal && (
			<div className="modal">
				<div onClick={toggleModal} className="overlay"></div>
				<div className="modal-content">
					<button
            type="button"
            className="close"
            aria-label="Close"
            onClick={toggleModal}
          >
            <span aria-hidden="true">&times;</span>
          </button>
					<form onSubmit={createChat} className="form">
						<input
							type="text"
							placeholder="Chat title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
        		<Button type='submit'>Create chat</Button>
					</form>
					<h3>{isFailed ? 'Chat creating is failed. Try again!' : ''}</h3>
				</div>
			</div>
			)}
		</div>
	);
}
 
export default CreateChat;