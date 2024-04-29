const pool = require("../db/connect");

exports.get = async (req, res) => {
	try {
    const { rows } = await pool.query('SELECT id, title FROM chats');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

exports.create =  async (req, res) => {
	const { title } = req.body;

	if (!title) {
		return res.status(400).json({ message: "Title is required" });
	}

	try {
		const result = await pool.query(`
			INSERT INTO chats (title)
			VALUES ($1) RETURNING id;
		`, [title]);

		res.status(201).json({ chatId: result.rows[0].id, message: "Chat created successfully." });
	} catch (error) {
		console.error('Failed to create chat:', error);
		res.status(500).json({ message: "Failed to create chat", error: error.message });
	}
};

exports.findByTitle = async (req, res) => {
	const { title } = req.query;

	if (!title) {
		return res.status(400).json({ message: "Title query parameter is required" });
	}

	try {
		const { rows } = await pool.query('SELECT id, title FROM chats WHERE title = $1', [title]);
		if (rows.length === 0) {
				return res.status(404).json({ message: "No chat found with the given title" });
		}
		res.json(rows);
	} catch (err) {
		console.error('Error searching for chat by title:', err);
		res.status(500).send('Server error');
	}
};
