import * as React from "react";
import axios from "axios";
import { useCsrfTokenDelete } from "../Hooks/useCsrfTokenDelete";
import { DeleteButton } from "../Buttons/DeleteButton";
import { UpdateButton } from "../Buttons/UpdateButton";

interface RenderEmployeesProps {
  filteredEmployees: any[];
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setEmployeeId: React.Dispatch<React.SetStateAction<number | null>>;
}

export function RenderEmployees({
  filteredEmployees,
  setShowForm,
  setEmployeeId,
}: RenderEmployeesProps) {
  const { csrfTokenDelete } = useCsrfTokenDelete();

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`//127.0.0.1:8000/employee/${id}/delete`, {
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
      {filteredEmployees.map((employee) => (
        <tr key={employee.id}>
          <td>{employee.id}</td>
          <td>{employee.fullName}</td>
          <td>{employee.status}</td>
          <td>{employee.comment}</td>
          <td>
            <UpdateButton
              name={"Update"}
              data={employee.id}
              setShowForm={setShowForm}
              setProjectId={setEmployeeId}
            />
            <DeleteButton
              name={"Delete Employee"}
              handleDelete={handleDelete}
              data={employee.id}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
