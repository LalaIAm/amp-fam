import { ArgsType, Field } from "@nestjs/graphql";
import { HouseholdWhereUniqueInput } from "./HouseholdWhereUniqueInput";

@ArgsType()
class DeleteHouseholdArgs {
  @Field(() => HouseholdWhereUniqueInput, { nullable: false })
  where!: HouseholdWhereUniqueInput;
}

export { DeleteHouseholdArgs };
