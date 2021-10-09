import { List } from "../list/List";

export type Item = {
  completed: boolean | null;
  createdAt: Date;
  details: string | null;
  dueDate: Date | null;
  id: string;
  list?: List;
  title: string;
  updatedAt: Date;
};
