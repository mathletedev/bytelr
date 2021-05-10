import { ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { AddResolver } from "./resolvers/add";
import { HelloResolver } from "./resolvers/hello";

const graphql = async (req: NextApiRequest, res: NextApiResponse) => {
	const handler = new ApolloServer({
		schema: await buildSchema({
			resolvers: [AddResolver, HelloResolver]
		}),
		// ! Displays GraphQL Playground; remove in prod
		playground: true
	}).createHandler({ path: process.env.API_PATH });

	return handler(req, res);
};

export default graphql;

// ! Required for GraphQL Playground to load
export const config = {
	api: {
		bodyParser: false
	}
};
