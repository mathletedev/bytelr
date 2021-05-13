import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AppProps } from "next/app";
import React, { FC } from "react";
import { __prod__ } from "../utils/constants";

const App: FC<AppProps> = ({ Component, pageProps }) => {
	const client = new ApolloClient({
		cache: new InMemoryCache(),
		uri: __prod__
			? "https://bytelr.vercel.app/api"
			: "http://localhost:3000/api"
	});

	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	);
};

export default App;
