import { SortOrder } from "../../util/SortOrder";

export type ListOrderByInput = {
  createdAt?: SortOrder;
  householdId?: SortOrder;
  id?: SortOrder;
  ownerId?: SortOrder;
  title?: SortOrder;
  updatedAt?: SortOrder;
};
