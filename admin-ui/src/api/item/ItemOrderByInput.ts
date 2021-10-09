import { SortOrder } from "../../util/SortOrder";

export type ItemOrderByInput = {
  completed?: SortOrder;
  createdAt?: SortOrder;
  details?: SortOrder;
  dueDate?: SortOrder;
  id?: SortOrder;
  listId?: SortOrder;
  title?: SortOrder;
  updatedAt?: SortOrder;
};
