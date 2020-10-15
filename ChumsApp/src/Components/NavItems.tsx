import React from "react";
import { UserHelper } from "./";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface Props {
  prefix?: String;
}

export const NavItems: React.FC<Props> = (props) => {
  const location = useLocation();
  const getSelected = (): string => {
    var url = location.pathname;
    var result = "People";
    if (url.indexOf("/groups") > -1) result = "Groups";
    if (url.indexOf("/attendance") > -1) result = "Attendance";
    if (url.indexOf("/donations") > -1) result = "Donations";
    if (url.indexOf("/forms") > -1) result = "Forms";
    if (url.indexOf("/settings") > -1) result = "Settings";

    return result;
  };

  const getClass = (sectionName: string): string => {
    if (sectionName === getSelected()) return "nav-link active";
    else return "nav-link";
  };

  const getTab = (key: string, url: string, icon: string, label: string) => {
    return (
      <li key={key} className="nav-item" data-toggle={props.prefix === "main" ? null : "collapse"} data-target={props.prefix === "main" ? null : "#userMenu"} id={(props.prefix || "") + key + "Tab"}>
        <Link className={getClass(key)} to={url}>
          <i className={icon}></i> {label}
        </Link>
      </li>
    );
  };

  const getTabs = () => {
    var tabs = [];
    tabs.push(getTab("People", "/people", "fas fa-user", "People"));
    if (UserHelper.checkAccess("Groups", "View")) tabs.push(getTab("Groups", "/groups", "fas fa-list-ul", "Groups"));
    if (UserHelper.checkAccess("Attendance", "View Summary")) tabs.push(getTab("Attendance", "/attendance", "far fa-calendar-alt", "Attendance"));
    if (UserHelper.checkAccess("Donations", "View Summary")) tabs.push(getTab("Donations", "/donations", "fas fa-hand-holding-usd", "Donations"));
    if (UserHelper.checkAccess("Forms", "View")) tabs.push(getTab("Forms", "/forms", "fas fa-align-left", "Forms"));
    if (UserHelper.checkAccess("Roles", "View")) tabs.push(getTab("Settings", "/settings", "fas fa-cog", "Settings"));

    if (UserHelper.checkAccess("Site", "Admin")) {
      tabs.push(getTab("Reports", "/reports", null, "Reports"));
      tabs.push(getTab("AdminReports", "/admin/reports", null, "Admin reports"));
    }
    return tabs;
  };

  return <>{getTabs()}</>;
};
