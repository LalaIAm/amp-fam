import { BooleanNullableFilter } from "../../util/BooleanNullableFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { ListWhereUniqueInput } from "../list/ListWhereUniqueInput";

export type ItemWhereInput = {
  completed?: BooleanNullableFilter;
  details?: StringNullableFilter;
  dueDate?: DateTimeNullableFilter;
  id?: StringFilter;
  list?: ListWhereUniqueInput;
  title?: StringFilter;
};
