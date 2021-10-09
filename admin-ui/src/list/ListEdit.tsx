import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
  TextInput,
} from "react-admin";
import { HouseholdTitle } from "../household/HouseholdTitle";
import { UserTitle } from "../user/UserTitle";

export const ListEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <ReferenceInput
          source="household.id"
          reference="Household"
          label="Household"
        >
          <SelectInput optionText={HouseholdTitle} />
        </ReferenceInput>
        <ReferenceInput source="user.id" reference="User" label="Owner">
          <SelectInput optionText={UserTitle} />
        </ReferenceInput>
        <TextInput label="Title" source="title" />
      </SimpleForm>
    </Edit>
  );
};
