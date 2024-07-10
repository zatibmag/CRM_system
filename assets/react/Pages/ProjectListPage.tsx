import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ProjectForm } from "../Components/ProjectForm";

export function ProjectListPage(): React.JSX.Element {
  const [projects, setProjects] = useState<any[]>([]);
  const [click, setClick] = useState(false);
  const [projectId, setProjectId] = useState<number | null>(null);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("//127.0.0.1:8000/project");
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  console.log(projects);
  const renderProjects = () => {
    return (
      <tbody>
        {projects.map((project) => (
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
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setClick(true);
                  setProjectId(project.id);
                }}
              >
                Update
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  if (click) {
    return (
      <div>
        <ProjectForm projectId={projectId} />
        <button
          className="btn btn-secondary mt-3"
          onClick={() => setClick(false)}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="border border-secondary rounded bg-gradient col-md-8">
      <h2 className="mb-4">Projects</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Project Manager</th>
              <th>Status</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          {renderProjects()}
        </table>
      </div>
      <button className="btn btn-primary mt-3" onClick={() => setClick(true)}>
        Form
      </button>
    </div>
  );
}
