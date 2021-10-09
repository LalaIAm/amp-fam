import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  ReferenceField,
  TextField,
  ReferenceManyField,
  Datagrid,
  BooleanField,
} from "react-admin";

import { LIST_TITLE_FIELD } from "./ListTitle";
import { HOUSEHOLD_TITLE_FIELD } from "../household/HouseholdTitle";
import { USER_TITLE_FIELD } from "../user/UserTitle";

export const ListShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <ReferenceField
          label="Household"
          source="household.id"
          reference="Household"
        >
          <TextField source={HOUSEHOLD_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="ID" source="id" />
        <ReferenceField label="Owner" source="user.id" reference="User">
          <TextField source={USER_TITLE_FIELD} />
        </ReferenceField>
        <TextField label="Title" source="title" />
        <DateField source="updatedAt" label="Updated At" />
        <ReferenceManyField reference="Item" target="ListId" label="Items">
          <Datagrid rowClick="show">
            <BooleanField label="Completed" source="completed" />
            <DateField source="createdAt" label="Created At" />
            <TextField label="Details" source="details" />
            <TextField label="Due Date" source="dueDate" />
            <TextField label="ID" source="id" />
            <ReferenceField label="List" source="list.id" reference="List">
              <TextField source={LIST_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="Title" source="title" />
            <DateField source="updatedAt" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
