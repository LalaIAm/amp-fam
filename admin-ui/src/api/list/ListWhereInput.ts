import { HouseholdWhereUniqueInput } from "../household/HouseholdWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ListWhereInput = {
  household?: HouseholdWhereUniqueInput;
  id?: StringFilter;
  owner?: UserWhereUniqueInput;
  title?: StringFilter;
};
