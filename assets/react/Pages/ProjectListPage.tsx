import * as React from "react";
import { useState, useEffect } from "react";
import { ProjectForm } from "../Components/ProjectForm";
import { useProjects } from "../Hooks/useProjects";
import { ProjectFilterMenu } from "../Components/ProjectFilterMenu";
import { RenderProjects } from "../Components/RenderProjects";
import { ProjectTableHead } from "../Components/ProjectTableHead";

export function ProjectListPage(): React.JSX.Element {
  const [click, setClick] = useState(false);
  const [projectId, setProjectId] = useState<number | null>(null);
  const { projects } = useProjects();

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
    setFilteredProjects(projects);
  }, [projects]);

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
          <ProjectTableHead handleSort={handleSort} />
          <RenderProjects
            filteredProjects={filteredProjects}
            setClick={setClick}
            setProjectId={setProjectId}
          />
        </table>
      </div>
      <button className="btn btn-primary mt-3" onClick={() => setClick(true)}>
        Create new project
      </button>
    </div>
  );
}
