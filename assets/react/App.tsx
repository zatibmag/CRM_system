import * as React from "react";
import { ProjectListPage } from "./Pages/ProjectListPage";
import { EmployeeListPage } from "./Pages/EmployeeListPage";
import { LeaveRequestListPage } from "./Pages/LeaveRequestListPage";
export function App(): React.JSX.Element {
  return (
    <div>
      {/* <ProjectListPage /> */}
      {/* <EmployeeListPage /> */}
      <LeaveRequestListPage />
    </div>
  );
}
