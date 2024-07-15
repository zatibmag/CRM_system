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
      <div>
        <p>Leave Request ID: {leaveRequest.id}</p>
        <p>Name: {leaveRequest.name}</p>
        <p>Employee: {leaveRequest.employee}</p>
        <p>Absence reason: {leaveRequest.absenceReason}</p>
        <p>Start Date: {leaveRequest.startDate}</p>
        <p>End Date: {leaveRequest.endDate}</p>
        <p>Comment: {leaveRequest.comment}</p>
      </div>
    </>
  );
}
