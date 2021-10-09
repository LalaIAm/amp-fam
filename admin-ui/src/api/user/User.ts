import { Household } from "../household/Household";
import { List } from "../list/List";

export type User = {
  bio: string | null;
  createdAt: Date;
  firstName: string | null;
  household?: Household | null;
  id: string;
  lastName: string | null;
  lists?: Array<List>;
  roles: Array<string>;
  updatedAt: Date;
  username: string;
};
