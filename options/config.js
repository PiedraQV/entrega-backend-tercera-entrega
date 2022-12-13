require('dotenv').config();

const optionsSQLite3 = {
	client: 'sqlite3',
	connection: {
		filename: './db/products.sqlite'
	},
	useNullAsDefault: true
}

const mongodb = {
  client: 'mysql',
	connection: {
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USER,
		password: '',
		database: 'backend'
  },
};


module.exports = { optionsSQLite3, mongodb };