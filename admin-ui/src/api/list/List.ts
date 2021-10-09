import { Household } from "../household/Household";
import { Item } from "../item/Item";
import { User } from "../user/User";

export type List = {
  createdAt: Date;
  household?: Household;
  id: string;
  items?: Array<Item>;
  owner?: User;
  title: string;
  updatedAt: Date;
};
