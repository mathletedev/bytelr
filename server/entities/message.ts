import { getModelForClass, prop } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Message {
	@Field(() => ID)
	readonly _id!: ObjectId;

	@Field()
	@prop({ required: true })
	text!: string;
}

export const MessageModel = getModelForClass(Message);
