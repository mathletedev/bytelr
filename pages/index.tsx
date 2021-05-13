import { gql, useQuery } from "@apollo/client";
import React, { FC, Fragment } from "react";

const GET_MESSAGES = gql`
	query GetMessages {
		messages {
			_id
			text
		}
	}
`;

const Index: FC = () => {
	const { loading, data } = useQuery(GET_MESSAGES);
	if (loading) return <p>Loading ...</p>;

	return (
		<Fragment>
			{data.messages.map((msg: any) => (
				<p>
					{msg._id} | {msg.text}
				</p>
			))}
		</Fragment>
	);
};

export default Index;
