import * as React from "react";
import { Filter } from "./Filter";
import { Search } from "./Search";
import { useState } from "react";
import { useProjectType } from "../Hooks/useProjectTypes";
import { useStatusChoice } from "../Hooks/useStatusChoice";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProjectType, setSelectedProjectType] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

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

    setFilteredProjects(filteredProjects);
  };

  React.useEffect(() => {
    filterProjects();
  }, [searchTerm, selectedProjectType, selectedStatus, projects]);

  const handleProjectTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedProjectType(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
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
    </div>
  );
}
