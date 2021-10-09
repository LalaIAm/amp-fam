import { HouseholdWhereUniqueInput } from "../household/HouseholdWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ListCreateInput = {
  household: HouseholdWhereUniqueInput;
  owner: UserWhereUniqueInput;
  title: string;
};
