import { ArgsType, Field } from "@nestjs/graphql";
import { ListWhereUniqueInput } from "./ListWhereUniqueInput";

@ArgsType()
class DeleteListArgs {
  @Field(() => ListWhereUniqueInput, { nullable: false })
  where!: ListWhereUniqueInput;
}

export { DeleteListArgs };
