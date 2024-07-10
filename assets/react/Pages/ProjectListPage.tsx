import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ProjectForm } from "../Components/ProjectForm";
import { useCsrfTokenDelete } from "../Hooks/useCsrfTokenDelete";
import { useProjects } from "../Hooks/useProjects";
import { useProjectType } from "../Hooks/useProjectTypes";
import { useStatusChoice } from "../Hooks/useStatusChoice";
import { ProjectFilterMenu } from "../Components/ProjectFilterMenu";

export function ProjectListPage(): React.JSX.Element {
  const [click, setClick] = useState(false);
  const [projectId, setProjectId] = useState<number | null>(null);
  const { csrfTokenDelete } = useCsrfTokenDelete();
  const { projects, setProjects } = useProjects();

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  }>({ key: "", direction: "ascending" });

  const [filteredProjects, setFilteredProjects] = useState<any[]>(projects);

  const handleSort = (key: string) => {
    const newDirection =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";
    setSortConfig({ key, direction: newDirection });
  };

  useEffect(() => {
    if (sortConfig.key !== "") {
      const sortedProjects = [...filteredProjects].sort((a, b) => {
        const valueA = getValueForSorting(a, sortConfig.key);
        const valueB = getValueForSorting(b, sortConfig.key);

        if (sortConfig.direction === "ascending") {
          return compareValues(valueA, valueB);
        } else {
          return compareValues(valueB, valueA);
        }
      });
      setFilteredProjects(sortedProjects);
    }
  }, [sortConfig, filteredProjects]);

  const getValueForSorting = (item: any, key: string) => {
    const keys = key.split(".");
    let value = item;
    for (let k of keys) {
      if (value && typeof value === "object") {
        value = value[k];
      } else {
        return null;
      }
    }
    return value;
  };

  const compareValues = (valueA: any, valueB: any) => {
    if (valueA === null || valueB === null) {
      return 0;
    }
    if (typeof valueA === "string" && typeof valueB === "string") {
      return valueA.localeCompare(valueB);
    }
    return valueA - valueB;
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(
        `//127.0.0.1:8000/project/${id}/delete`,
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

  const renderProjects = () => {
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
              <button
                className="btn btn-primary"
                onClick={() => {
                  setClick(true);
                  setProjectId(project.id);
                }}
              >
                Update
              </button>
              <button
                onClick={() => {
                  handleDelete(project.id);
                }}
                className={"btn btn-danger"}
              >
                Delete Project
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
      <div className="input-group mb-3">
        <ProjectFilterMenu
          projects={projects}
          setFilteredProjects={setFilteredProjects}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>
                <button
                  className="btn btn-link"
                  onClick={() => handleSort("id")}
                >
                  ID
                </button>
              </th>
              <th>
                <button
                  className="btn btn-link"
                  onClick={() => handleSort("name")}
                >
                  Name
                </button>
              </th>
              <th>
                <button
                  className="btn btn-link"
                  onClick={() => handleSort("projectType")}
                >
                  Type
                </button>
              </th>
              <th>
                <button
                  className="btn btn-link"
                  onClick={() => handleSort("startDate.date")}
                >
                  Start Date
                </button>
              </th>
              <th>
                <button
                  className="btn btn-link"
                  onClick={() => handleSort("endDate.date")}
                >
                  End Date
                </button>
              </th>
              <th>
                <button
                  className="btn btn-link"
                  onClick={() => handleSort("projectManager")}
                >
                  Project Manager
                </button>
              </th>
              <th>
                <button
                  className="btn btn-link"
                  onClick={() => handleSort("status")}
                >
                  Status
                </button>
              </th>
              <th>
                <button
                  className="btn btn-link"
                  onClick={() => handleSort("comment")}
                >
                  Comment
                </button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          {renderProjects()}
        </table>
      </div>
      <button className="btn btn-primary mt-3" onClick={() => setClick(true)}>
        Create new project
      </button>
    </div>
  );
}
