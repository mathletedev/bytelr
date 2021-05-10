import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";

const graphql = async (req: NextApiRequest, res: NextApiResponse) => {
	const handler = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver]
		})
	}).createHandler({ path: process.env.API_PATH });

	return handler(req, res);
};

export default graphql;

export const config = {
	api: {
		bodyParser: false
	}
};