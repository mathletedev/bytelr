require("dotenv-safe").config();

module.exports = {
	env: {
		API_PATH: "/api",
		DB_PASS: process.env.DB_PASS
	}
};
