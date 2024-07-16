import * as React from "react";
import { useState, useEffect } from "react";
import { useEmployees } from "../Hooks/useEmployees";
import { useLeaveRequests } from "../Hooks/useLeaveRequest";
import { ApproveButton } from "../Buttons/ApproveButton";
import { RejectButton } from "../Buttons/RejectButton";
import { ShowLeaveRequestData } from "../Components/ShowLeaveRequestData";
import { BackButton } from "../Buttons/BackButton";

interface ApprovalRequestFormProps {
  approvalRequestId: number;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ApprovalRequestForm({
  approvalRequestId,
  setShowForm,
}: ApprovalRequestFormProps) {
  const [approver, setApprover] = useState("");
  const [leaveRequest, setLeaveRequest] = useState<any>(null);
  const [comment, setComment] = useState("");
  const [leaveRequestId, setLeaveRequestId] = useState<number | null>(null);
  const { employees } = useEmployees();
  const { leaveRequests } = useLeaveRequests();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (leaveRequest) {
      setLeaveRequestId(leaveRequest.id);
    }
  }, [leaveRequest, setLeaveRequestId]);

  return (
    <div className="container mt-4 w-50">
      <div className="row justify-content-center">
        <div className="col-10">
          <div className="border p-4">
            <h2 className="text-center">
              {approvalRequestId
                ? "Update Approval Request"
                : "Create New Approval Request"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="Approver" className="form-label">
                  Approver:
                </label>
                <select
                  id="approver"
                  className="form-select"
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
              <div className="mb-3">
                <label htmlFor="leaveRequest" className="form-label">
                  Leave request:
                </label>
                <select
                  id="leaveRequest"
                  className="form-select"
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
              <div className="mb-3">
                <label htmlFor="comment" className="form-label">
                  Comment:
                </label>
                <textarea
                  id="comment"
                  className="form-control"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                />
              </div>
              <ApproveButton
                leaveRequestId={leaveRequest ? leaveRequest.id : 0}
                approver={approver}
                comment={comment}
                setShowForm={setShowForm}
              />
              <RejectButton
                leaveRequestId={leaveRequest ? leaveRequest.id : 0}
                approver={approver}
                comment={comment}
                setShowForm={setShowForm}
              />
              <div className="d-flex justify-content-center mt-3">
                <BackButton setShowForm={setShowForm} />
              </div>
            </form>
            {leaveRequestId && (
              <div className="flex-grow-1 ml-2">
                <ShowLeaveRequestData leaveRequestId={leaveRequestId} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
