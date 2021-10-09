import { ListWhereUniqueInput } from "../list/ListWhereUniqueInput";

export type ItemCreateInput = {
  completed?: boolean | null;
  details?: string | null;
  dueDate?: Date | null;
  list: ListWhereUniqueInput;
  title: string;
};
