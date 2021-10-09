import { ListWhereInput } from "./ListWhereInput";
import { ListOrderByInput } from "./ListOrderByInput";

export type ListFindManyArgs = {
  where?: ListWhereInput;
  orderBy?: ListOrderByInput;
  skip?: number;
  take?: number;
};
