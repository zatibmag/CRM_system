import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ProjectForm } from "../Components/ProjectForm";

export function ProjectListPage(): React.JSX.Element {
  const [projects, setProjects] = useState<any[]>([]);
  const [click, setClick] = useState(false);
  const [projectId, setProjectId] = useState(null);

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

  return (
    <div className="border border-secondary rounded bg-gradient p-2 col-md-8">
      <h2>Projects</h2>
      <div className="row justify-content-center">
        <div className="container">
          {projects.map((project) => (
            <div key={project.id}>
              <p>ID: {project.id}</p>
              <p>Project Name: {project.name}</p>
              <button
                onClick={() => {
                  setClick(!click);
                  setProjectId(project.id);
                }}
              >
                Update
              </button>
            </div>
          ))}
        </div>
      </div>
      {click ? (
        <ProjectForm projectId={projectId} />
      ) : (
        <button onClick={() => setClick(!click)}>Form</button>
      )}
    </div>
  );
}
