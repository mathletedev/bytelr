import { ObjectId } from "mongodb";
import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Message, MessageModel } from "../entities/message";
import { ObjectIdScalar } from "../types/objectId.scalar";

@Resolver()
export class MessageResolver {
	@Query(() => String, { nullable: true })
	async getTextById(@Arg("id", () => ObjectIdScalar) id: ObjectId) {
		return (await MessageModel.findById(id))?.text;
	}

	@Mutation(() => ID)
	async createMessage(@Arg("text") text: string) {
		const newMessage = new MessageModel({ text } as Message);

		await newMessage.save();
		return newMessage._id;
	}
}
