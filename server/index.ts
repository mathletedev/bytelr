import { ApolloServer } from "apollo-server-micro";
import { connect } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { AddResolver } from "./resolvers/add";
import { HelloResolver } from "./resolvers/hello";
import { MessageResolver } from "./resolvers/message";
import { TypegooseMiddleware } from "./typegoose/typegooseMiddleware";

const graphql = async (req: NextApiRequest, res: NextApiResponse) => {
	await connect(process.env.MONGO_URI!, {
		dbName: "bytelr",
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	const handler = new ApolloServer({
		schema: await buildSchema({
			resolvers: [AddResolver, HelloResolver, MessageResolver],
			globalMiddlewares: [TypegooseMiddleware]
		}),
		// ! Displays GraphQL Playground; remove in prod
		playground: true,
		introspection: true
	}).createHandler({ path: process.env.API_PATH });

	return handler(req, res);
};

export default graphql;
