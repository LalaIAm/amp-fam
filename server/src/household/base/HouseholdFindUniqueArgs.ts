import { ArgsType, Field } from "@nestjs/graphql";
import { HouseholdWhereUniqueInput } from "./HouseholdWhereUniqueInput";

@ArgsType()
class HouseholdFindUniqueArgs {
  @Field(() => HouseholdWhereUniqueInput, { nullable: false })
  where!: HouseholdWhereUniqueInput;
}

export { HouseholdFindUniqueArgs };
