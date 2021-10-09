import { ArgsType, Field } from "@nestjs/graphql";
import { ItemWhereUniqueInput } from "./ItemWhereUniqueInput";

@ArgsType()
class ItemFindUniqueArgs {
  @Field(() => ItemWhereUniqueInput, { nullable: false })
  where!: ItemWhereUniqueInput;
}

export { ItemFindUniqueArgs };
