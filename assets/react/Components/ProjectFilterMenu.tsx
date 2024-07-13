import * as React from "react";
import { Filter } from "./Filter";
import { Search } from "./Search";
import { useState } from "react";
import { useProjectType } from "../Hooks/useProjectTypes";
import { useStatusChoice } from "../Hooks/useStatusChoice";
import { useEmployees } from "../Hooks/useEmployees";

interface ProjectFilterMenuProps {
  projects: any[];
  setFilteredProjects: (projects: any[]) => void;
}

export function ProjectFilterMenu({
  projects,
  setFilteredProjects,
}: ProjectFilterMenuProps) {
  const { availableProjectTypes } = useProjectType();
  const { statusChoice } = useStatusChoice();
  const { employees } = useEmployees();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProjectType, setSelectedProjectType] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedProjectManager, setSelectedProjectManager] =
    useState<string>("");

  const projectManagers = employees
    .filter((employee) => employee.position === "PROJECT_MANAGER")
    .map((manager) => manager.fullName);

  const filterProjects = () => {
    let filteredProjects = projects;

    if (searchTerm) {
      filteredProjects = filteredProjects.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedProjectType) {
      filteredProjects = filteredProjects.filter(
        (project) => project.projectType === selectedProjectType
      );
    }
    if (selectedStatus) {
      filteredProjects = filteredProjects.filter(
        (project) => project.status === selectedStatus
      );
    }
    if (selectedProjectManager) {
      filteredProjects = filteredProjects.filter(
        (project) => project.projectManager === selectedProjectManager
      );
    }

    setFilteredProjects(filteredProjects);
  };

  React.useEffect(() => {
    filterProjects();
  }, [
    searchTerm,
    selectedProjectType,
    selectedStatus,
    selectedProjectManager,
    projects,
  ]);

  const handleProjectTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedProjectType(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const handleProjectManagerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedProjectManager(event.target.value);
  };

  return (
    <div className="input-group mb-3">
      <Search
        listData={projects}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Filter
        availableOptions={availableProjectTypes}
        selectedValue={selectedProjectType}
        onChange={handleProjectTypeChange}
        placeholder="All Project Types"
      />
      <Filter
        availableOptions={statusChoice}
        selectedValue={selectedStatus}
        onChange={handleStatusChange}
        placeholder="All statuses"
      />
      <Filter
        availableOptions={projectManagers}
        selectedValue={selectedProjectManager}
        onChange={handleProjectManagerChange}
        placeholder="All Project Managers"
      />
    </div>
  );
}
