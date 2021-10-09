import { HouseholdWhereUniqueInput } from "../household/HouseholdWhereUniqueInput";

export type UserUpdateInput = {
  bio?: string | null;
  firstName?: string | null;
  household?: HouseholdWhereUniqueInput | null;
  lastName?: string | null;
  password?: string;
  roles?: Array<string>;
  username?: string;
};
