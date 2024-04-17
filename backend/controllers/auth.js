const jwt = require('jsonwebtoken');
const { JWT } = require('../config');

exports.login = async (req, res) => {
	const { username } = req.body;
	try {
		const token = jwt.sign({ username }, JWT.SECRET, { expiresIn: '1h' });
		res.json({ token, username });
	} catch (error) {
		res.status(500).json({ message: 'Login failed', error: error.message });
	}
};