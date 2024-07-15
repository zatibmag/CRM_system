import * as React from "react";
import axios from "axios";
import { useLeaveRequests } from "../Hooks/useLeaveRequest";
import { useCsrfTokenFormApprovalRequest } from "../Hooks/useCsrfTokenFormApprovalRequest";
import { useCsrfTokenFormLeaveRequest } from "../Hooks/useCsrfTokenFormLeaveRequest";
import { useEmployees } from "../Hooks/useEmployees";
import { useCsrfTokenFormEmployee } from "../Hooks/useCsrfTokenFormEmployee";

interface ApproveButtonProps {
  leaveRequestId: number;
  approver: string;
  comment: string;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ApproveButton: React.FC<ApproveButtonProps> = ({
  leaveRequestId,
  approver,
  comment,
  setShowForm,
}: ApproveButtonProps) => {
  const { leaveRequests, fetchLeaveRequests } = useLeaveRequests();
  const { employees, fetchEmployees } = useEmployees();
  const { csrfTokenForm: csrfTokenFormApprovalRequest } =
    useCsrfTokenFormApprovalRequest();
  const { csrfTokenForm: csrfTokenFormLeaveRequest } =
    useCsrfTokenFormLeaveRequest();
  const { csrfTokenForm: csrfTokenFormEmployee } = useCsrfTokenFormEmployee();

  const handleSubmit = async () => {
    try {
      const leaveRequest = leaveRequests.find(
        (leaveRequest) => leaveRequest.id === leaveRequestId
      );

      const totalDays = Math.ceil(
        (new Date(leaveRequest.endDate).getTime() -
          new Date(leaveRequest.startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      if (!leaveRequest) {
        console.error(`Leave Request with ID ${leaveRequestId} not found.`);
        return;
      }

      const employee = employees.find(
        (employee) => employee.fullName === leaveRequest.employee
      );

      if (!employee) {
        console.error(`Employee ${leaveRequest.employee} not found.`);
        return;
      }

      await axios.post("http://127.0.0.1:8000/approval-request/new", {
        approver,
        leaveRequest: leaveRequest.name,
        comment,
        status: "Approved",
        _csrf_token: csrfTokenFormApprovalRequest,
      });

      await axios.put(
        `http://127.0.0.1:8000/leave-request/${leaveRequestId}/edit`,
        {
          name: leaveRequest.name,
          startDate: leaveRequest.startDate,
          endDate: leaveRequest.endDate,
          employee: leaveRequest.employee,
          absenceReason: leaveRequest.absenceReason,
          comment: leaveRequest.comment,
          reviewerComment: comment,
          status: "Approved",
          _csrf_token: csrfTokenFormLeaveRequest,
        }
      );

      await axios.put(`http://127.0.0.1:8000/employees/${employee.id}/edit`, {
        fullName: employee.fullName,
        password: employee.password,
        status: employee.status,
        peoplePartner: employee.peoplePartner,
        position: employee.position,
        roles: employee.roles,
        subdivision: employee.subdivision,
        projects: employee.projects,
        outOfOfficeBalance: employee.outOfOfficeBalance - totalDays,
        _csrf_token: csrfTokenFormEmployee,
      });

      await fetchLeaveRequests();
      await fetchEmployees();
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={() => {
        setShowForm(false);
        handleSubmit();
      }}
    >
      Approve
    </button>
  );
};
