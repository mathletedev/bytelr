import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import { ObjectIdScalar } from "../typegoose/objectId.scalar";

@ObjectType()
export class Message {
	@Field(() => ObjectIdScalar)
	readonly _id: ObjectId;

	@Field(() => String)
	@Property({ required: true })
	text: string;
}

export const MessageModel = getModelForClass(Message);
