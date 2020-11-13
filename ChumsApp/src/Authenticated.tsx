import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Header, UserHelper } from "./Components";
import { Admin } from "./Admin/Admin";
import { PeoplePage } from "./People/PeoplePage";
import { PersonPage } from "./People/PersonPage";
import { GroupsPage } from "./Groups/GroupsPage";
import { GroupPage } from "./Groups/GroupPage";
import { AttendancePage } from "./Attendance/AttendancePage";
import { DonationsPage } from "./Donations/DonationsPage";
import { DonationBatchPage } from "./Donations/DonationBatchPage";
import { FundPage } from "./Donations/FundPage";
import { FormsPage } from "./Forms/FormsPage";
import { Settings } from "./Settings/Settings";
import { Reports } from "./Reports/Reports";
import { ProfilePage } from './Profile/ProfilePage';
import { FormPage } from "./Forms/FormPage";
// import UserContext from "./UserContext";


interface Props {
  location: any;
}

export const Authenticated: React.FC<Props> = (props) => {
  //to force rerender on login
  // var user = React.useContext(UserContext)?.userName;
  // var church = React.useContext(UserContext)?.churchName;


  if (UserHelper.churchChanged) {
    UserHelper.churchChanged = false;
    return <Redirect to="/people" />
  }
  else return (
    <>
      <link rel="stylesheet" href="/css/cp.css" />
      <Header></Header>
      <div className="container">
        <Switch>
          <Route path="/login"><Redirect to={props.location} /></Route>
          <Route path="/admin"><Admin /></Route>
          <Route path="/people/:id" component={PersonPage}></Route>
          <Route path="/people"><PeoplePage /></Route>
          <Route path="/groups/:id" component={GroupPage}></Route>
          <Route path="/groups"><GroupsPage /></Route>
          <Route path="/attendance"><AttendancePage /></Route>
          <Route path="/donations/funds/:id" component={FundPage}></Route>
          <Route path="/donations/:id" component={DonationBatchPage}></Route>
          <Route path="/donations"><DonationsPage /></Route>
          <Route path="/forms/:id" component={FormPage}></Route>
          <Route path="/forms"><FormsPage /></Route>
          <Route path="/settings"><Settings /></Route>
          <Route path="/reports"><Reports /></Route>
          <Route path="/profile"><ProfilePage /></Route>
        </Switch>
      </div>
      <iframe title="print" style={{ display: "none" }} src="about:blank" id="printFrame"></iframe>
      <script src="/js/cp.js"></script>
    </>
  );
};
