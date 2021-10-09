import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  TextField,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
} from "react-admin";

import { HOUSEHOLD_TITLE_FIELD } from "./HouseholdTitle";
import { USER_TITLE_FIELD } from "../user/UserTitle";

export const HouseholdShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <TextField label="Name" source="name" />
        <DateField source="updatedAt" label="Updated At" />
        <ReferenceManyField reference="List" target="HouseholdId" label="Lists">
          <Datagrid rowClick="show">
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
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField reference="User" target="HouseholdId" label="Users">
          <Datagrid rowClick="show">
            <TextField label="Bio" source="bio" />
            <DateField source="createdAt" label="Created At" />
            <TextField label="First Name" source="firstName" />
            <ReferenceField
              label="Household"
              source="household.id"
              reference="Household"
            >
              <TextField source={HOUSEHOLD_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="ID" source="id" />
            <TextField label="Last Name" source="lastName" />
            <TextField label="Roles" source="roles" />
            <DateField source="updatedAt" label="Updated At" />
            <TextField label="Username" source="username" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
