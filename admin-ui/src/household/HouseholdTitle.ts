import { Household as THousehold } from "../api/household/Household";

export const HOUSEHOLD_TITLE_FIELD = "name";

export const HouseholdTitle = (record: THousehold): string => {
  return record.name || record.id;
};
