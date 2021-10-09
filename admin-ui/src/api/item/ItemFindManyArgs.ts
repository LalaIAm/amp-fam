import { ItemWhereInput } from "./ItemWhereInput";
import { ItemOrderByInput } from "./ItemOrderByInput";

export type ItemFindManyArgs = {
  where?: ItemWhereInput;
  orderBy?: ItemOrderByInput;
  skip?: number;
  take?: number;
};
