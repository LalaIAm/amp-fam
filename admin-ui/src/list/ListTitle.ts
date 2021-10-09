import { List as TList } from "../api/list/List";

export const LIST_TITLE_FIELD = "title";

export const ListTitle = (record: TList): string => {
  return record.title || record.id;
};
