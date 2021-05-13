import { ObjectId } from "mongodb";
import {
	Arg,
	Mutation,
	Publisher,
	PubSub,
	Query,
	Resolver,
	Subscription
} from "type-graphql";
import { Message, MessageModel } from "../entities/message";
import { ObjectIdScalar } from "../typegoose/objectId.scalar";

@Resolver()
export class MessageResolver {
	@Query(() => [Message])
	async messages() {
		return await MessageModel.find({});
	}

	@Query(() => Message, { nullable: true })
	async getMessageById(@Arg("id", () => ObjectIdScalar) id: ObjectId) {
		return await MessageModel.findById(id);
	}

	@Mutation(() => Message)
	async createMessage(
		@Arg("text") text: string,
		@PubSub("MESSAGES") publish: Publisher<Message>
	) {
		const newMessage = new MessageModel({ text } as Message);
		await newMessage.save();
		// TODO > Fix publish; message sent is undefined <
		await publish(newMessage);

		return newMessage;
	}

	@Mutation(() => Message, { nullable: true })
	async deleteMessage(@Arg("id", () => ObjectIdScalar) id: ObjectId) {
		return await MessageModel.findByIdAndDelete(id);
	}

	// * Subscription to refresh chat
	@Subscription(() => Boolean, { topics: "MESSAGES" })
	newMessage() {
		return true;
	}
}
