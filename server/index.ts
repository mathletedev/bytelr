import { ApolloServer } from "apollo-server-micro";
import { connect } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { AddResolver } from "./resolvers/add";
import { HelloResolver } from "./resolvers/hello";
import { MessageResolver } from "./resolvers/message";
import { TypegooseMiddleware } from "./typegoose/typegooseMiddleware";

// * Connect to MongoDB
connect(process.env.MONGO_URI!, {
	dbName: "bytelr",
	useNewUrlParser: true,
	useUnifiedTopology: true
});

let server: ApolloServer | null = null;

type CustomSocket = Exclude<NextApiResponse<any>["socket"], null> & {
	server: Parameters<ApolloServer["installSubscriptionHandlers"]>[0] & {
		apolloServer?: ApolloServer;
		apolloServerHandler?: any;
	};
};

type CustomNextApiResponse<T = any> = NextApiResponse<T> & {
	socket: CustomSocket;
};

const graphql = async (req: NextApiRequest, res: CustomNextApiResponse) => {
	// * Create new Apollo server once
	if (!server)
		server = new ApolloServer({
			schema: await buildSchema({
				resolvers: [AddResolver, HelloResolver, MessageResolver],
				globalMiddlewares: [TypegooseMiddleware]
			}),
			context: async ({ req, connection }) => {
				if (connection) return connection.context;
				return {
					user: req.user,
					useragent: req.useragent
				};
			},
			// ! Displays GraphQL Playground; remove in prod
			playground: {
				subscriptionEndpoint: "/subscriptions",
				settings: {
					"request.credentials": "same-origin"
				}
			},
			introspection: true,
			subscriptions: {
				path: "/subscriptions",
				keepAlive: 9000
			}
		});

	// ! Keeps the subscriptions running
	const old = res.socket.server.apolloServer;

	if (old && old !== server) delete res.socket.server.apolloServer;

	if (!res.socket.server.apolloServer) {
		server.installSubscriptionHandlers(res.socket.server);
		res.socket.server.apolloServer = server;

		const handler = server.createHandler({ path: process.env.API_PATH });
		res.socket.server.apolloServerHandler = handler;

		old?.stop();
	}

	return res.socket.server.apolloServerHandler(req, res);
};

export default graphql;
