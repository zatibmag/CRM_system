import * as React from "react";
import axios from "axios";
import { useCsrfTokenDelete } from "../Hooks/useCsrfTokenDelete";
import { DeleteButton } from "../Buttons/DeleteButton";
import { UpdateButton } from "../Buttons/UpdateButton";

interface RenderProjectsProps {
  filteredProjects: any[];
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setProjectId: React.Dispatch<React.SetStateAction<number | null>>;
}

export function RenderProjects({
  filteredProjects,
  setShowForm,
  setProjectId,
}: RenderProjectsProps) {
  const { csrfTokenDelete } = useCsrfTokenDelete();

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`//127.0.0.1:8000/project/${id}/delete`, {
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
      {filteredProjects.map((project) => (
        <tr key={project.id}>
          <td>{project.id}</td>
          <td>{project.name}</td>
          <td>{project.projectType}</td>
          <td>
            {project.startDate
              ? new Date(project.startDate.date).toLocaleDateString()
              : "-"}
          </td>
          <td>
            {project.endDate
              ? new Date(project.endDate.date).toLocaleDateString()
              : "-"}
          </td>
          <td>{project.projectManager}</td>
          <td>{project.status}</td>
          <td>{project.comment}</td>
          <td>
            <UpdateButton
              name={"Update"}
              data={project.id}
              setShowForm={setShowForm}
              setProjectId={setProjectId}
            />
            <DeleteButton
              name={"Delete Project"}
              handleDelete={handleDelete}
              data={project.id}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
