import { MikroORM } from "@mikro-orm/core";
import "dotenv-safe/config";
import { join } from "path";
import { Post } from "./entities/Post";
import { __prod__ } from "./utils/constants";

export default {
	migrations: {
		path: join(__dirname, "migrations"),
		pattern: /^[\w-]+\d\.[tj]s$/
	},
	entities: [Post],
	dbName: "bytelr",
	type: "postgresql",
	debug: !__prod__,
	user: "postgres",
	password: process.env.DB_PASSWORD
} as Parameters<typeof MikroORM.init>[0];
