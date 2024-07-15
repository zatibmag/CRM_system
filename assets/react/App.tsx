import * as React from "react";
import { useContext } from "react";
import { ProjectListPage } from "./Pages/ProjectListPage";
import { EmployeeListPage } from "./Pages/EmployeeListPage";
import { LeaveRequestListPage } from "./Pages/LeaveRequestListPage";
import { ApprovalRequestListPage } from "./Pages/ApprovalRequestListPage";
import { PageManagerContext, Pages } from "./Context/PageManagerProvider";
import { NavigationBar } from "./Components/NavigationBar";

export function App(): React.JSX.Element {
  const { currentPage } = useContext(PageManagerContext);

  return (
    <div>
      <NavigationBar />
      {currentPage === Pages.ProjectList && <ProjectListPage />}
      {currentPage === Pages.EmployeeList && <EmployeeListPage />}
      {currentPage === Pages.LeaveRequestList && <LeaveRequestListPage />}
      {currentPage === Pages.ApprovalRequestList && <ApprovalRequestListPage />}
    </div>
  );
}
