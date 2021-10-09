import { Item as TItem } from "../api/item/Item";

export const ITEM_TITLE_FIELD = "title";

export const ItemTitle = (record: TItem): string => {
  return record.title || record.id;
};
