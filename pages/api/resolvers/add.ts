import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class AddResolver {
	@Query(() => Number)
	add(@Arg("num1") num1: number, @Arg("num2") num2: number) {
		return num1 + num2;
	}
}
