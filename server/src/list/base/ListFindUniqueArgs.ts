import { ArgsType, Field } from "@nestjs/graphql";
import { ListWhereUniqueInput } from "./ListWhereUniqueInput";

@ArgsType()
class ListFindUniqueArgs {
  @Field(() => ListWhereUniqueInput, { nullable: false })
  where!: ListWhereUniqueInput;
}

export { ListFindUniqueArgs };
