import * as React from "react";
import { ProjectListPage } from "./Pages/ProjectListPage";
import { EmployeeListPage } from "./Pages/EmployeeListPage";
export function App(): React.JSX.Element {
  return (
    <div>
      {/* <ProjectListPage /> */}
      <EmployeeListPage />
    </div>
  );
}
