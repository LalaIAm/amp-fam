import { ArgsType, Field } from "@nestjs/graphql";
import { ListCreateInput } from "./ListCreateInput";

@ArgsType()
class CreateListArgs {
  @Field(() => ListCreateInput, { nullable: false })
  data!: ListCreateInput;
}

export { CreateListArgs };
