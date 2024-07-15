import * as React from "react";
import { Filter } from "./Filter";
import { Search } from "./Search";
import { useState } from "react";
import { useEmployees } from "../Hooks/useEmployees";
import { useAbsenceReason } from "../Hooks/useAbscenceReason";

interface ApprovalRequestFilterMenuProps {
  approvalRequests: any[];
  setFilteredApprovalRequests: (approvalRequests: any[]) => void;
}

export function ApprovalRequestFilterMenu({
  approvalRequests,
  setFilteredApprovalRequests,
}: ApprovalRequestFilterMenuProps) {
  const statusChoice = ["New", "Approved", "Rejected"];
  const { employees } = useEmployees();
  const { absenceReasons } = useAbsenceReason();

  const employeesFullName = employees.map((employee) => employee.fullName);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [selectedAbsenceReason, setSelectedAbsenceReason] =
    useState<string>("");

  const filterApprovalRequests = () => {
    let filteredApprovalRequests = approvalRequests;

    if (searchTerm) {
      filteredApprovalRequests = filteredApprovalRequests.filter(
        (approvalRequest) =>
          approvalRequest.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedStatus) {
      filteredApprovalRequests = filteredApprovalRequests.filter(
        (approvalRequest) => approvalRequest.status === selectedStatus
      );
    }
    if (selectedEmployee) {
      filteredApprovalRequests = filteredApprovalRequests.filter(
        (approvalRequest) => approvalRequest.employee === selectedEmployee
      );
    }
    if (selectedAbsenceReason) {
      filteredApprovalRequests = filteredApprovalRequests.filter(
        (approvalRequest) =>
          approvalRequest.absenceReason === selectedAbsenceReason
      );
    }

    setFilteredApprovalRequests(filteredApprovalRequests);
  };

  React.useEffect(() => {
    filterApprovalRequests();
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
        listData={approvalRequests}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
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
