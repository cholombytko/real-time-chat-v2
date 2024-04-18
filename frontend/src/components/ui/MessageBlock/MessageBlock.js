import React from 'react';
import './MessageBlock.css'; // Ensure CSS is imported

const MessageBlock = ({ sender_username, message, online }) => {
	const username = localStorage.getItem('username');
	const className = (username === sender_username ? `own` : `not-own`);

	const getInitials = (name) => {
		return name.split(' ')
			.map(word => word[0])
			.join('')
			.substring(0, 2)
			.toUpperCase();
	};

	return (
		<div className={`message-container container-${className}`}>
			<div className="initials-circle">
				{getInitials(sender_username)}
				<span className={`status-indicator ${online ? 'online' : 'offline'}`}></span>
			</div>
			<div className={`message-text ${className}`}>
				<p>{message}</p>
			</div>
		</div>
	);
};

export default MessageBlock;
