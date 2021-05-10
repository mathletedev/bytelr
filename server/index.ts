import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import config from "./mikro-orm";
import { AddResolver } from "./resolvers/add";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const graphql = async (req: NextApiRequest, res: NextApiResponse) => {
	const orm = await MikroORM.init(config);
	await orm.isConnected();
	await orm.getMigrator().up();

	const handler = new ApolloServer({
		schema: await buildSchema({
			resolvers: [AddResolver, HelloResolver, PostResolver]
		}),
		// ! Displays GraphQL Playground; remove in prod
		playground: true,
		context: () => ({ em: orm.em })
	}).createHandler({ path: process.env.API_PATH });

	return handler(req, res);
};

export default graphql;
