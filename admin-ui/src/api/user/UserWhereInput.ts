import { StringNullableFilter } from "../../util/StringNullableFilter";
import { HouseholdWhereUniqueInput } from "../household/HouseholdWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";

export type UserWhereInput = {
  firstName?: StringNullableFilter;
  household?: HouseholdWhereUniqueInput;
  id?: StringFilter;
  lastName?: StringNullableFilter;
  username?: StringFilter;
};
