import './MessageBlock.css';

const MessageBlock = ({ sender_username, message, online }) => {
	const username = localStorage.getItem('username');
	const base = 'message-block';
	const className = (username === sender_username ? `${base}-own` : `${base}-not-own`)

	return (
		<div className={className}>
			<div className='username'>
				<h4 className={online ? 'online' : 'offline'}>{online ? 'online' : 'offline'}</h4>
				<h4>{sender_username}</h4>
			</div>
			<div className='message-text'>
				<h4>{message}</h4>
			</div>
		</div>
	);
}
 
export default MessageBlock;