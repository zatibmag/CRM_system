import * as React from "react";
import { Filter } from "./Filter";
import { Search } from "./Search";
import { useState } from "react";
import { useStatusChoice } from "../Hooks/useStatusChoice";

interface EmployeesFilterMenuProps {
  employees: any[];
  setFilteredEmployees: (employees: any[]) => void;
}

export function EmployeeFilterMenu({
  employees,
  setFilteredEmployees,
}: EmployeesFilterMenuProps) {
  const { statusChoice } = useStatusChoice();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const filterEmployees = () => {
    let filteredEmployees = employees;

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

    setFilteredEmployees(filteredEmployees);
  };

  React.useEffect(() => {
    filterEmployees();
  }, [searchTerm, selectedStatus, employees]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
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
    </div>
  );
}
