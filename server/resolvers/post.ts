import { Ctx, Query, Resolver } from "type-graphql";
import { Post } from "../entities/Post";
import { Context } from "../types";

@Resolver()
export class PostResolver {
	@Query(() => [Post])
	posts(@Ctx() { em }: Context) {
		return em.find(Post, {});
	}
}
