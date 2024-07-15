import * as React from "react";
import { ProjectListButton } from "../Buttons/ProjectListButton";
import { EmployeeListButton } from "../Buttons/EmployeeListButton";
import { LeaveRequestListButton } from "../Buttons/LeaveRequestListButton";
import { ApprovalListButton } from "../Buttons/ApprovalRequestListButton";

export function NavigationBar() {
  return (
    <>
      <div className="d-flex flex-row card">
        <div className="p-2">
          <ProjectListButton />
        </div>
        <div className="p-2">
          <EmployeeListButton />
        </div>
        <div className="p-2">
          <LeaveRequestListButton />
        </div>
        <div className="p-2">
          <ApprovalListButton />
        </div>
      </div>
    </>
  );
}
