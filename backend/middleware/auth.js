const jwt = require('jsonwebtoken');
const { JWT } = require('../config');

exports.authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) return res.sendStatus(401);

	jwt.verify(token, JWT.SECRET, (err, guest) => {
		if (err) return res.sendStatus(403);
		req.guest = guest;
		next();
	});
}