import * as React from "react";
import { Filter } from "./Filter";
import { Search } from "./Search";
import { useState } from "react";
import { useEmployees } from "../Hooks/useEmployees";
import { useAbsenceReason } from "../Hooks/useAbscenceReason";

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
  const { absenceReasons } = useAbsenceReason();

  const employeesFullName = employees.map((employee) => employee.fullName);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [selectedAbsenceReason, setSelectedAbsenceReason] =
    useState<string>("");

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
    if (selectedAbsenceReason) {
      filteredLeaveRequests = filteredLeaveRequests.filter(
        (leaveRequest) => leaveRequest.absenceReason === selectedAbsenceReason
      );
    }

    setFilteredLeaveRequests(filteredLeaveRequests);
  };

  React.useEffect(() => {
    filterLeaveRequests();
  }, [searchTerm, selectedStatus, selectedEmployee, selectedAbsenceReason]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const handleEmployeeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedEmployee(event.target.value);
  };

  const handleAbsenceReasonChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedAbsenceReason(event.target.value);
  };

  return (
    <div className="input-group mb-3">
      <Search
        listData={leaveRequests}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder={"Search by name"}
      />
      <Filter
        availableOptions={employeesFullName}
        selectedValue={selectedEmployee}
        onChange={handleEmployeeChange}
        placeholder="All employees"
      />
      <Filter
        availableOptions={absenceReasons}
        selectedValue={selectedAbsenceReason}
        onChange={handleAbsenceReasonChange}
        placeholder="All absence reasons"
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
