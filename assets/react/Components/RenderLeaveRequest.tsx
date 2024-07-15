import * as React from "react";
import axios from "axios";
import { useCsrfTokenDeleteLeaveRequest } from "../Hooks/useCsrfTokenDeleteLeaveRequest";
import { DeleteButton } from "../Buttons/DeleteButton";
import { UpdateButton } from "../Buttons/UpdateButton";

interface RenderLeaveRequestsProps {
  filteredLeaveRequests: any[];
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setLeaveRequestId: React.Dispatch<React.SetStateAction<number | null>>;
}

export function RenderLeaveRequests({
  filteredLeaveRequests,
  setShowForm,
  setLeaveRequestId,
}: RenderLeaveRequestsProps) {
  const { csrfTokenDelete } = useCsrfTokenDeleteLeaveRequest();

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/leave-request/${id}/delete`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          _csrf_token: csrfTokenDelete,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tbody>
      {filteredLeaveRequests.map((leaveRequest) => (
        <tr key={leaveRequest.id} className="text-center">
          <td>{leaveRequest.id}</td>
          <td>{leaveRequest.name}</td>
          <td>
            {leaveRequest.startDate
              ? new Date(leaveRequest.startDate).toLocaleDateString()
              : "-"}
          </td>
          <td>
            {leaveRequest.endDate
              ? new Date(leaveRequest.endDate).toLocaleDateString()
              : "-"}
          </td>
          <td>{leaveRequest.employee}</td>
          <td>{leaveRequest.absenceReason}</td>
          <td>{leaveRequest.status}</td>
          <td>{leaveRequest.comment}</td>
          <td>{leaveRequest.reviewerComment}</td>
          <td>
            <div className="d-flex justify-content-center">
              <UpdateButton
                name={"Update"}
                data={leaveRequest.id}
                setShowForm={setShowForm}
                setId={setLeaveRequestId}
              />
              <DeleteButton
                name={"Delete"}
                handleDelete={handleDelete}
                data={leaveRequest.id}
              />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
