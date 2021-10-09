import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  BooleanField,
  DateField,
  TextField,
  ReferenceField,
} from "react-admin";

import { LIST_TITLE_FIELD } from "../list/ListTitle";

export const ItemShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
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
      </SimpleShowLayout>
    </Show>
  );
};
