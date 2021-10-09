import { List } from "../list/List";
import { User } from "../user/User";

export type Household = {
  createdAt: Date;
  id: string;
  lists?: Array<List>;
  members?: Array<User>;
  name: string;
  updatedAt: Date;
};
