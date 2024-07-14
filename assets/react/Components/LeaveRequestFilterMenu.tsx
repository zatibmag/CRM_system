import * as React from "react";
import { Filter } from "./Filter";
import { Search } from "./Search";
import { useState } from "react";
import { useStatusChoice } from "../Hooks/useStatusChoice";
import { useEmployees } from "../Hooks/useEmployees";

interface LeaveRequestFilterMenuProps {
  leaveRequests: any[];
  setFilteredLeaveRequests: (leaveRequests: any[]) => void;
}

export function LeaveRequestFilterMenu({
  leaveRequests,
  setFilteredLeaveRequests,
}: LeaveRequestFilterMenuProps) {
  const statusChoice = ["New", "Approved", "Rejected"];
  const { employees } = useEmployees();

  const employeesFullName = employees.map((employee) => employee.fullName);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");

  const filterLeaveRequests = () => {
    let filteredLeaveRequests = leaveRequests;

    if (searchTerm) {
      filteredLeaveRequests = filteredLeaveRequests.filter((leaveRequest) =>
        leaveRequest.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedStatus) {
      filteredLeaveRequests = filteredLeaveRequests.filter(
        (leaveRequest) => leaveRequest.status === selectedStatus
      );
    }
    if (selectedEmployee) {
      filteredLeaveRequests = filteredLeaveRequests.filter(
        (leaveRequest) => leaveRequest.employee === selectedEmployee
      );
    }

    setFilteredLeaveRequests(filteredLeaveRequests);
  };

  React.useEffect(() => {
    filterLeaveRequests();
  }, [searchTerm, selectedStatus, selectedEmployee]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const handleEmployeeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedEmployee(event.target.value);
  };

  return (
    <div className="input-group mb-3">
      <Search
        listData={leaveRequests}
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
        availableOptions={employeesFullName}
        selectedValue={selectedEmployee}
        onChange={handleEmployeeChange}
        placeholder="All Employees"
      />
    </div>
  );
}
