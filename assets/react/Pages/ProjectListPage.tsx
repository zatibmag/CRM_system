import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export function ProjectListPage(): React.JSX.Element {
  const [projects, setProjects] = useState<any[]>([]);

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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
