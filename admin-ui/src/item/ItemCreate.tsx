import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  BooleanInput,
  TextInput,
  DateTimeInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

import { ListTitle } from "../list/ListTitle";

export const ItemCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <BooleanInput label="Completed" source="completed" />
        <TextInput label="Details" multiline source="details" />
        <DateTimeInput label="Due Date" source="dueDate" />
        <ReferenceInput source="list.id" reference="List" label="List">
          <SelectInput optionText={ListTitle} />
        </ReferenceInput>
        <TextInput label="Title" source="title" />
      </SimpleForm>
    </Create>
  );
};
