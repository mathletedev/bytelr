import { Options } from "@mikro-orm/core";
import { join } from "path";
import { __prod__ } from "../utils/constants";
import { Post } from "./entities/Post";
import { Migration20210510212046 } from "./migrations/Migration20210510212046";

// ! Replace "$" with "D" in .env since .env doesn't support $
const config: Options = {
	migrations: {
		migrationsList: [
			{
				name: "Migration20210510212046.ts",
				class: Migration20210510212046
			}
		],
		path: join(__dirname, "migrations"),
		pattern: /^[\w-]+\d+\.[tj]s$/
	},
	entities: [Post],
	dbName: "bytelr",
	type: "postgresql",
	debug: !__prod__,
	user: "postgres",
	password: process.env.DB_PASS,
	host: process.env.HOST,
	port: 5432
};

export default config;
