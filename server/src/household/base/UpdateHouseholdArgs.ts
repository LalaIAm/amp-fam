import { ArgsType, Field } from "@nestjs/graphql";
import { HouseholdWhereUniqueInput } from "./HouseholdWhereUniqueInput";
import { HouseholdUpdateInput } from "./HouseholdUpdateInput";

@ArgsType()
class UpdateHouseholdArgs {
  @Field(() => HouseholdWhereUniqueInput, { nullable: false })
  where!: HouseholdWhereUniqueInput;
  @Field(() => HouseholdUpdateInput, { nullable: false })
  data!: HouseholdUpdateInput;
}

export { UpdateHouseholdArgs };
