const pool = require("../db/connect");

exports.getAllByChatId = async (req, res) => {
	const { chatId } = req.params;

	try {
		const messagesResult = await pool.query(`
				SELECT m.id, m.message, m.sender_username, m.timestamp
				FROM messages m
				WHERE m.chat_id = $1
				ORDER BY m.timestamp ASC;
		`, [chatId]);

		res.json(messagesResult.rows);
	} catch (error) {
		console.error('Failed to retrieve messages:', error);
		res.status(500).json({ message: "Failed to retrieve messages", error: error.message });
	}
};

exports.create = async (req, res) => {
	const username = req.guest.username;
	const { chatId } = req.params;
	const { message } = req.body;

	if (!message) {
			return res.status(400).json({ message: "Message content is required." });
	}

	try {
		const insertMessage = await pool.query(`
			INSERT INTO messages (sender_username, chat_id, message)
			VALUES ($1, $2, $3)
			RETURNING id, timestamp;
		`, [username, chatId, message]);

		res.status(201).json({
			messageId: insertMessage.rows[0].id,
			sender_username: username,
			message: message,
			timestamp: insertMessage.rows[0].timestamp
		});
	} catch (error) {
		console.error('Failed to send message:', error);
		res.status(500).json({ message: "Failed to send message", error: error.message });
	}
};

exports.getLastMessageByChatId = async (req, res) => {
	const { chatId } = req.params;

	try {
			const lastMessageResult = await pool.query(`
					SELECT m.id, m.message, m.sender_username, m.timestamp
					FROM messages m
					WHERE m.chat_id = $1
					ORDER BY m.timestamp DESC
					LIMIT 1;
			`, [chatId]);

			if (lastMessageResult.rows.length > 0) {
					res.json(lastMessageResult.rows[0]);
			} else {
					res.status(404).json({ message: "No messages found in this chat." });
			}
	} catch (error) {
			console.error('Failed to retrieve the last message:', error);
			res.status(500).json({ message: "Failed to retrieve the last message", error: error.message });
	}
};