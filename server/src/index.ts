import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from "apollo-server-express";
import "dotenv-safe/config";
import express from "express";
import { buildSchema } from "type-graphql";
import mikroConfig from "./mikro-orm.config";
import { HelloResolver } from "./resolvers/hello";

(async () => {
	const orm = await MikroORM.init(mikroConfig);
	await orm.getMigrator().up();

	const app = express();

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver],
			validate: false
		})
	});

	apolloServer.applyMiddleware({ app });

	app.listen(process.env.PORT, () => {
		console.log(
			`Server started at http://localhost:${process.env.PORT}${apolloServer.graphqlPath} !`
		);
	});
})();
