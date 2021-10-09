import { ArgsType, Field } from "@nestjs/graphql";
import { ListWhereUniqueInput } from "./ListWhereUniqueInput";
import { ListUpdateInput } from "./ListUpdateInput";

@ArgsType()
class UpdateListArgs {
  @Field(() => ListWhereUniqueInput, { nullable: false })
  where!: ListWhereUniqueInput;
  @Field(() => ListUpdateInput, { nullable: false })
  data!: ListUpdateInput;
}

export { UpdateListArgs };
