import { HouseholdWhereUniqueInput } from "../household/HouseholdWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ListUpdateInput = {
  household?: HouseholdWhereUniqueInput;
  owner?: UserWhereUniqueInput;
  title?: string;
};
