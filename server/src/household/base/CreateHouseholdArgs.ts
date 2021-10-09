import { ArgsType, Field } from "@nestjs/graphql";
import { HouseholdCreateInput } from "./HouseholdCreateInput";

@ArgsType()
class CreateHouseholdArgs {
  @Field(() => HouseholdCreateInput, { nullable: false })
  data!: HouseholdCreateInput;
}

export { CreateHouseholdArgs };
