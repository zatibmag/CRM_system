import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCsrfTokenFormApprovalRequest } from "../Hooks/useCsrfTokenFormApprovalRequest";
import { SubmitButton } from "../Buttons/SumbitButton";
import { useEmployees } from "../Hooks/useEmployees";
import { useLeaveRequests } from "../Hooks/useLeaveRequest";

interface ApprovalRequestFormProps {
  approvalRequestId: number;
}

export function ApprovalRequestForm({
  approvalRequestId,
}: ApprovalRequestFormProps) {
  const [approver, setApprover] = useState("");
  const [leaveRequest, setLeaveRequest] = useState("");
  const [comment, setComment] = useState("");
  const { csrfTokenForm } = useCsrfTokenFormApprovalRequest();
  const { employees } = useEmployees();
  const { leaveRequests } = useLeaveRequests();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/approval-request/new",
        {
          approver,
          leaveRequest,
          comment,
          status: "New",
          _csrf_token: csrfTokenForm,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/approval-request/${approvalRequestId}/edit`,
        {
          approver,
          leaveRequest,
          comment,
          status: "New",
          _csrf_token: csrfTokenForm,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>
        {approvalRequestId
          ? "Update Approval Request"
          : "Create New Approval Request"}
      </h2>
      <form onSubmit={approvalRequestId ? handleUpdate : handleSubmit}>
        <div>
          <label htmlFor="Approver">Approver:</label>
          <select
            id="approver"
            value={approver}
            onChange={(e) => setApprover(e.target.value)}
            required
          >
            <option value="">Select approver</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.fullName}>
                {employee.fullName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="leaveRequest">Leave request:</label>
          <select
            id="leaveRequest"
            value={leaveRequest}
            onChange={(e) => setLeaveRequest(e.target.value)}
            required
          >
            <option value="">Select leave request</option>
            {leaveRequests.map((leaveRequest) => (
              <option key={leaveRequest.id} value={leaveRequest.name}>
                {leaveRequest.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />
        </div>
        <SubmitButton id={approvalRequestId} />
      </form>
    </div>
  );
}
