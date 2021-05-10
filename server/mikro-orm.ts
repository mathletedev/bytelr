import { Options } from "@mikro-orm/core";
import { join } from "path";
import { Post } from "../server/entities/Post";
import { __pass__, __prod__ } from "../utils/constants";

// ! Replace "$" with "D" in .env since .env doesn't support $
const config: Options = {
	migrations: {
		path: join(__dirname, "migrations"),
		pattern: /^[\w-]+\d+\.[tj]s$/
	},
	entities: [Post],
	dbName: "bytelr",
	type: "postgresql",
	debug: !__prod__,
	user: "postgres",
	password: __pass__
};

export default config;
