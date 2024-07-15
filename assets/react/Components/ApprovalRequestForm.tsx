import * as React from "react";
import { useState, useEffect } from "react";
import { useEmployees } from "../Hooks/useEmployees";
import { useLeaveRequests } from "../Hooks/useLeaveRequest";
import { ApproveButton } from "../Buttons/ApproveButton";
import { RejectButton } from "../Buttons/RejectButton";
import { ShowLeaveRequestData } from "../Components/ShowLeaveRequestData";

interface ApprovalRequestFormProps {
  approvalRequestId: number;
}

export function ApprovalRequestForm({
  approvalRequestId,
}: ApprovalRequestFormProps) {
  const [approver, setApprover] = useState("");
  const [leaveRequest, setLeaveRequest] = useState<any>(null);
  const [comment, setComment] = useState("");
  const [leaveRequestId, setLeaveRequestId] = useState<number | null>(null);
  const { employees } = useEmployees();
  const { leaveRequests } = useLeaveRequests();

  // Define handleSubmit function to handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    // For demonstration, console.log the form data
    console.log({
      approver,
      leaveRequest,
      comment,
    });
  };

  // Effect to set leaveRequestId when leaveRequest changes
  useEffect(() => {
    if (leaveRequest) {
      setLeaveRequestId(leaveRequest.id);
    }
  }, [leaveRequest, setLeaveRequestId]);

  return (
    <div>
      <h2>
        {approvalRequestId
          ? "Update Approval Request"
          : "Create New Approval Request"}
      </h2>
      <form onSubmit={handleSubmit}>
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
            value={leaveRequest ? leaveRequest.name : ""}
            onChange={(e) => {
              const selectedLeaveRequest = leaveRequests.find(
                (request) => request.name === e.target.value
              );
              setLeaveRequest(selectedLeaveRequest);
            }}
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
        {/* Pass approver, leaveRequest, and comment to ApproveButton */}
        <ApproveButton
          leaveRequestId={leaveRequest ? leaveRequest.id : 0} // Pass leaveRequestId or a default value
          approver={approver}
          comment={comment}
        />
        <RejectButton
          leaveRequestId={leaveRequest ? leaveRequest.id : 0} // Pass leaveRequestId or a default value
          approver={approver}
          comment={comment}
        />
      </form>
      {leaveRequestId && (
        <div className="flex-grow-1 ml-2">
          <ShowLeaveRequestData leaveRequestId={leaveRequestId} />
        </div>
      )}
    </div>
  );
}
