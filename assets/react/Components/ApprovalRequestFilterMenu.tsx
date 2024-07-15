import * as React from "react";
import { Filter } from "./Filter";
import { Search } from "./Search";
import { useState } from "react";
import { useEmployees } from "../Hooks/useEmployees";

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

  const employeesFullName = employees.map((employee) => employee.fullName);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");

  const filterApprovalRequests = () => {
    let filteredApprovalRequests = approvalRequests;

    if (searchTerm) {
      filteredApprovalRequests = filteredApprovalRequests.filter(
        (approvalRequest) =>
          approvalRequest.id
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }
    if (selectedStatus) {
      filteredApprovalRequests = filteredApprovalRequests.filter(
        (approvalRequest) => approvalRequest.status === selectedStatus
      );
    }
    if (selectedEmployee) {
      filteredApprovalRequests = filteredApprovalRequests.filter(
        (approvalRequest) => approvalRequest.approver === selectedEmployee
      );
    }

    setFilteredApprovalRequests(filteredApprovalRequests);
  };

  React.useEffect(() => {
    filterApprovalRequests();
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
        listData={approvalRequests}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder={"Search by ID"}
      />
      <Filter
        availableOptions={employeesFullName}
        selectedValue={selectedEmployee}
        onChange={handleEmployeeChange}
        placeholder="All approvers"
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
