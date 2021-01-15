import dotenv from "dotenv";
import { DB } from "../src/apiBase/db";
import { Pool } from "../src/apiBase/pool";
import { DBCreator } from "../src/apiBase/tools/DBCreator"

const init = async () => {
  dotenv.config();
  console.log("Connecting");
  Pool.initPool();

  const peopleTables: { title: string, file: string }[] = [
    { title: "Households", file: "households.mysql" },
    { title: "People", file: "people.mysql" },
  ]

  const groupTables: { title: string, file: string }[] = [
    { title: "Campuses", file: "campuses.mysql" },
    { title: "Services", file: "services.mysql" },
    { title: "Service Times", file: "serviceTimes.mysql" },
    { title: "Groups", file: "groups.mysql" },
    { title: "Group Service Times", file: "groupServiceTimes.mysql" },
    { title: "Group Members", file: "groupMembers.mysql" },
  ];

  const attendanceTables: { title: string, file: string }[] = [
    { title: "Sessions", file: "sessions.mysql" },
    { title: "Visits", file: "visits.mysql" },
    { title: "Visit Sessions", file: "visitSessions.mysql" }
  ]

  const givingTables: { title: string, file: string }[] = [
    { title: "Funds", file: "funds.mysql" },
    { title: "Donations", file: "donations.mysql" },
    { title: "Fund Donations", file: "funddonations.mysql" },
    { title: "Donation Batches", file: "donationBatches.mysql" },
  ];

  const miscTables: { title: string, file: string }[] = [
    { title: "Church Settings", file: "churchsettings.mysql" },
    { title: "Reports", file: "reports.mysql" },
  ]

  await DBCreator.init(["Answers", "Forms", "FormSubmissions", "Notes", "Questions"]);
  await initTables("People", peopleTables);
  await initTables("Groups", groupTables);
  await initTables("Attendance", attendanceTables);
  await initTables("Giving", givingTables);
  await initTables("Misc", miscTables);
  await DBCreator.runScript("Populate Reports", "./tools/dbScripts/populateReports.mysql", true);
}

const initTables = async (displayName: string, tables: { title: string, file: string }[]) => {
  console.log("");
  console.log("SECTION: " + displayName);
  for (const table of tables) await DBCreator.runScript(table.title, "./tools/dbScripts/" + table.file, false);
}

init()
  .then(() => { console.log("Database Created"); process.exit(0); })
  .catch((ex) => {
    console.log(ex);
    console.log("Database not created due to errors");
    process.exit(0);
  });

