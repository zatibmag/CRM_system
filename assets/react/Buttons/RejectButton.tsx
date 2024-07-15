import * as React from "react";
import axios from "axios";
import { useLeaveRequests } from "../Hooks/useLeaveRequest";
import { useCsrfTokenFormApprovalRequest } from "../Hooks/useCsrfTokenFormApprovalRequest";
import { useCsrfTokenFormLeaveRequest } from "../Hooks/useCsrfTokenFormLeaveRequest";

interface RejectButtonProps {
  leaveRequestId: number;
  approver: string;
  comment: string;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RejectButton: React.FC<RejectButtonProps> = ({
  leaveRequestId,
  approver,
  comment,
  setShowForm,
}: RejectButtonProps) => {
  const { leaveRequests, fetchLeaveRequests } = useLeaveRequests();
  const { csrfTokenForm: csrfTokenFormApprovalRequest } =
    useCsrfTokenFormApprovalRequest();
  const { csrfTokenForm: csrfTokenFormLeaveRequest } =
    useCsrfTokenFormLeaveRequest();

  const handleSubmit = async () => {
    try {
      const leaveRequest = leaveRequests.find(
        (leaveRequest) => leaveRequest.id === leaveRequestId
      );

      if (!leaveRequest) {
        console.error(`Leave Request with ID ${leaveRequestId} not found.`);
        return;
      }

      await axios.post("http://127.0.0.1:8000/approval-request/new", {
        approver,
        leaveRequest: leaveRequest.name,
        comment,
        status: "Reject",
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
          status: "Reject",
          _csrf_token: csrfTokenFormLeaveRequest,
        }
      );

      await fetchLeaveRequests();
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
      Reject
    </button>
  );
};
