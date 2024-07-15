import * as React from "react";
import { useState, useEffect } from "react";
import { ApprovalRequestForm } from "../Components/ApprovalRequestForm";
import { useApprovalRequests } from "../Hooks/useApprovalRequest";
import { ApprovalRequestFilterMenu } from "../Components/ApprovalRequestFilterMenu";
import { RenderApprovalRequests } from "../Components/RenderApprovalRequest";
import { ApprovalRequestTableHead } from "../Components/ApprovalRequestTableHead";
import { CreateNewButton } from "../Buttons/CreateNewButton";
import { BackButton } from "../Buttons/BackButton";
import { ShowLeaveRequestData } from "../Components/ShowLeaveRequestData";

export function ApprovalRequestListPage(): React.JSX.Element {
  const [showForm, setShowForm] = useState(false);
  const [leaveRequestId, setLeaveRequestId] = useState<number | null>(null);
  const [approvalRequestId, setApprovalRequestId] = useState<number | null>(
    null
  );
  const { approvalRequests, setApprovalRequests } = useApprovalRequests();

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  }>({ key: "", direction: "ascending" });

  const [filteredApprovalRequests, setFilteredApprovalRequests] =
    useState<any[]>(approvalRequests);

  const handleSort = (key: string) => {
    const newDirection =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";
    setSortConfig({ key, direction: newDirection });
  };

  useEffect(() => {
    setFilteredApprovalRequests(approvalRequests);
  }, [approvalRequests]);

  useEffect(() => {
    if (sortConfig.key !== "") {
      const sortedApprovalRequests = [...filteredApprovalRequests].sort(
        (a, b) => {
          const valueA = getValueForSorting(a, sortConfig.key);
          const valueB = getValueForSorting(b, sortConfig.key);

          if (sortConfig.direction === "ascending") {
            return compareValues(valueA, valueB);
          } else {
            return compareValues(valueB, valueA);
          }
        }
      );
      setFilteredApprovalRequests(sortedApprovalRequests);
    }
  }, [sortConfig, filteredApprovalRequests]);

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

  function ShowForm() {
    return (
      <>
        <div className="d-flex justify-content-between align-items-start p-2">
          <div className="flex-grow-1">
            <ApprovalRequestForm
              approvalRequestId={approvalRequestId}
              setLeaveRequestId={setLeaveRequestId}
            />
          </div>
          {leaveRequestId && (
            <div className="flex-grow-1 ml-2">
              <ShowLeaveRequestData leaveRequestId={leaveRequestId} />
            </div>
          )}
        </div>
        <BackButton setShowForm={setShowForm} />
      </>
    );
  }

  return (
    <>
      {showForm ? (
        <>
          <ShowForm />
        </>
      ) : (
        <div className="border border-secondary rounded bg-gradient col-md-8">
          <h2 className="mb-4">Approval Requests</h2>
          <div className="input-group mb-3">
            <ApprovalRequestFilterMenu
              approvalRequests={approvalRequests}
              setFilteredApprovalRequests={setFilteredApprovalRequests}
            />
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <ApprovalRequestTableHead handleSort={handleSort} />
              <RenderApprovalRequests
                filteredApprovalRequests={filteredApprovalRequests}
                setShowForm={setShowForm}
                setApprovalRequestId={setApprovalRequestId}
              />
            </table>
          </div>
          <CreateNewButton setShowForm={setShowForm} />
        </div>
      )}
    </>
  );
}
