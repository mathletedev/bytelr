import { ObjectId } from "mongodb";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
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
	async createMessage(@Arg("text") text: string) {
		const newMessage = new MessageModel({ text } as Message);
		return await newMessage.save();
	}

	@Mutation(() => Message, { nullable: true })
	async deleteMessage(@Arg("id", () => ObjectIdScalar) id: ObjectId) {
		return await MessageModel.findByIdAndDelete(id);
	}
}
