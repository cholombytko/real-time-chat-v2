require('dotenv').config();

module.exports = {
	DB: {
		USERNAME: process.env.USERNAME,
		PASSWORD: process.env.PASSWORD,
		NAME: process.env.DB_NAME,
		PORT: process.env.DB_PORT,
		HOST: process.env.HOST
	},

	JWT: {
		SECRET: process.env.JWT_SECRET
	}
}