import React, { useEffect, useState } from "react";
import { Admin, DataProvider, Resource } from "react-admin";
import buildGraphQLProvider from "./data-provider/graphqlDataProvider";
import basicHttpAuthProvider from "./auth-provider/ra-auth-basic-http";
import { theme } from "./theme/theme";
import Login from "./Login";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import { UserList } from "./user/UserList";
import { UserCreate } from "./user/UserCreate";
import { UserEdit } from "./user/UserEdit";
import { UserShow } from "./user/UserShow";
import { HouseholdList } from "./household/HouseholdList";
import { HouseholdCreate } from "./household/HouseholdCreate";
import { HouseholdEdit } from "./household/HouseholdEdit";
import { HouseholdShow } from "./household/HouseholdShow";
import { ListList } from "./list/ListList";
import { ListCreate } from "./list/ListCreate";
import { ListEdit } from "./list/ListEdit";
import { ListShow } from "./list/ListShow";
import { ItemList } from "./item/ItemList";
import { ItemCreate } from "./item/ItemCreate";
import { ItemEdit } from "./item/ItemEdit";
import { ItemShow } from "./item/ItemShow";

const App = (): React.ReactElement => {
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
  useEffect(() => {
    buildGraphQLProvider
      .then((provider: any) => {
        setDataProvider(() => provider);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  if (!dataProvider) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <Admin
        title={"My app"}
        dataProvider={dataProvider}
        authProvider={basicHttpAuthProvider}
        theme={theme}
        dashboard={Dashboard}
        loginPage={Login}
      >
        <Resource
          name="User"
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
          show={UserShow}
        />
        <Resource
          name="Household"
          list={HouseholdList}
          edit={HouseholdEdit}
          create={HouseholdCreate}
          show={HouseholdShow}
        />
        <Resource
          name="List"
          list={ListList}
          edit={ListEdit}
          create={ListCreate}
          show={ListShow}
        />
        <Resource
          name="Item"
          list={ItemList}
          edit={ItemEdit}
          create={ItemCreate}
          show={ItemShow}
        />
      </Admin>
    </div>
  );
};

export default App;
