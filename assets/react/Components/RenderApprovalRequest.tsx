import * as React from "react";
import axios from "axios";
import { useCsrfTokenDeleteApprovalRequest } from "../Hooks/useCsrfTokenDeleteApprovalRequest";
import { DeleteButton } from "../Buttons/DeleteButton";
import { UpdateButton } from "../Buttons/UpdateButton";

interface RenderApprovalRequestsProps {
  filteredApprovalRequests: any[];
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setApprovalRequestId: React.Dispatch<React.SetStateAction<number | null>>;
}

export function RenderApprovalRequests({
  filteredApprovalRequests,
  setShowForm,
  setApprovalRequestId,
}: RenderApprovalRequestsProps) {
  const { csrfTokenDelete } = useCsrfTokenDeleteApprovalRequest();

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/approval-request/${id}/delete`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            _csrf_token: csrfTokenDelete,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tbody>
      {filteredApprovalRequests.map((approvalRequest) => (
        <tr key={approvalRequest.id}>
          <td>{approvalRequest.id}</td>
          <td>{approvalRequest.approver}</td>
          <td>{approvalRequest.leaveRequest}</td>
          <td>{approvalRequest.status}</td>
          <td>{approvalRequest.comment}</td>
          <td>
            <UpdateButton
              name={"Update"}
              data={approvalRequest.id}
              setShowForm={setShowForm}
              setProjectId={setApprovalRequestId}
            />
            <DeleteButton
              name={"Delete"}
              handleDelete={handleDelete}
              data={approvalRequest.id}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
