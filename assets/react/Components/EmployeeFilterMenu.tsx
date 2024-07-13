import * as React from "react";
import { Filter } from "./Filter";
import { Search } from "./Search";
import { useState } from "react";
import { useStatusChoice } from "../Hooks/useStatusChoice";
import { usePositions } from "../Hooks/usePositions";
import { useSubdivisions } from "../Hooks/useSubdivisions";
import { useEmployees } from "../Hooks/useEmployees";

interface EmployeesFilterMenuProps {
  renderEmployees: any[];
  setFilteredEmployees: (employees: any[]) => void;
}

export function EmployeeFilterMenu({
  renderEmployees,
  setFilteredEmployees,
}: EmployeesFilterMenuProps) {
  const { statusChoice } = useStatusChoice();
  const { positions } = usePositions();
  const { subdivisions } = useSubdivisions();
  const { employees } = useEmployees();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [selectedSubdivision, setSelectedSubdivision] = useState<string>("");
  const [selectedHrManager, setSelectedHrManager] = useState<string>("");

  const HrManagers = employees
    .filter((employee) => employee.position === "HR_MANAGER")
    .map((manager) => manager.fullName);

  const filterEmployees = () => {
    let filteredEmployees = renderEmployees;

    if (searchTerm) {
      filteredEmployees = filteredEmployees.filter((employee) =>
        employee.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedStatus) {
      filteredEmployees = filteredEmployees.filter(
        (employee) => employee.status === selectedStatus
      );
    }
    if (selectedPosition) {
      filteredEmployees = filteredEmployees.filter(
        (employee) => employee.position === selectedPosition
      );
    }
    if (selectedSubdivision) {
      filteredEmployees = filteredEmployees.filter(
        (employee) => employee.subdivision === selectedSubdivision
      );
    }
    if (selectedSubdivision) {
      filteredEmployees = filteredEmployees.filter(
        (employee) => employee.peoplePartner === selectedHrManager
      );
    }

    setFilteredEmployees(filteredEmployees);
  };

  React.useEffect(() => {
    filterEmployees();
  }, [
    searchTerm,
    selectedStatus,
    selectedPosition,
    selectedSubdivision,
    selectedHrManager,
    renderEmployees,
  ]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const handlePositionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPosition(event.target.value);
  };

  const handleSubdivisionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSubdivision(event.target.value);
  };

  const handleHrManagerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedHrManager(event.target.value);
  };

  return (
    <div className="input-group mb-3">
      <Search
        listData={employees}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Filter
        availableOptions={statusChoice}
        selectedValue={selectedStatus}
        onChange={handleStatusChange}
        placeholder="All statuses"
      />
      <Filter
        availableOptions={positions}
        selectedValue={selectedPosition}
        onChange={handlePositionChange}
        placeholder="All positions"
      />
      <Filter
        availableOptions={subdivisions}
        selectedValue={selectedSubdivision}
        onChange={handleSubdivisionChange}
        placeholder="All subdivisions"
      />
      <Filter
        availableOptions={HrManagers}
        selectedValue={selectedHrManager}
        onChange={handleHrManagerChange}
        placeholder="All people partner"
      />
    </div>
  );
}
