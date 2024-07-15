import * as React from "react";
import { useLeaveRequests } from "../Hooks/useLeaveRequest";

interface ShowLeaveRequestDataProps {
  leaveRequestId: number;
}

export function ShowLeaveRequestData({
  leaveRequestId,
}: ShowLeaveRequestDataProps) {
  const { leaveRequests } = useLeaveRequests();

  const leaveRequest = leaveRequests.find(
    (leaveRequest) => leaveRequest.id === leaveRequestId
  );

  if (!leaveRequest) {
    return <p>Leave Request with ID {leaveRequestId} not found.</p>;
  }

  return (
    <>
      <div className="container mt-4 w-50">
        <div className="row justify-content-center">
          <div className="col-10">
            <div className="border p-4">
              <p>Leave Request ID: {leaveRequest.id}</p>
              <p>Name: {leaveRequest.name}</p>
              <p>Employee: {leaveRequest.employee}</p>
              <p>Absence reason: {leaveRequest.absenceReason}</p>
              <p>Start Date: {leaveRequest.startDate}</p>
              <p>End Date: {leaveRequest.endDate}</p>
              <p>Comment: {leaveRequest.comment}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
