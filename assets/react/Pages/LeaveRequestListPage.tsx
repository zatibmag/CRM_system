import * as React from "react";
import { useState, useEffect } from "react";
import { LeaveRequestForm } from "../Components/LeaveRequestForm";
import { useLeaveRequests } from "../Hooks/useLeaveRequest";
import { LeaveRequestFilterMenu } from "../Components/LeaveRequestFilterMenu";
import { RenderLeaveRequests } from "../Components/RenderLeaveRequest";
import { LeaveRequestTableHead } from "../Components/LeaveRequestTableHead";
import { CreateNewButton } from "../Buttons/CreateNewButton";
import { BackButton } from "../Buttons/BackButton";

export function LeaveRequestListPage(): React.JSX.Element {
  const [showForm, setShowForm] = useState(false);
  const [leaveRequestId, setLeaveRequestId] = useState<number | null>(null);
  const { leaveRequests, setLeaveRequests } = useLeaveRequests();

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  }>({ key: "", direction: "ascending" });

  const [filteredLeaveRequests, setFilteredLeaveRequests] =
    useState<any[]>(leaveRequests);

  const handleSort = (key: string) => {
    const newDirection =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";
    setSortConfig({ key, direction: newDirection });
  };

  useEffect(() => {
    setFilteredLeaveRequests(leaveRequests);
  }, [leaveRequests]);

  useEffect(() => {
    if (sortConfig.key !== "") {
      const sortedProjects = [...filteredLeaveRequests].sort((a, b) => {
        const valueA = getValueForSorting(a, sortConfig.key);
        const valueB = getValueForSorting(b, sortConfig.key);

        if (sortConfig.direction === "ascending") {
          return compareValues(valueA, valueB);
        } else {
          return compareValues(valueB, valueA);
        }
      });
      setFilteredLeaveRequests(sortedProjects);
    }
  }, [sortConfig, filteredLeaveRequests]);

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
      <div>
        <LeaveRequestForm
          leaveRequestId={leaveRequestId}
          setShowForm={setShowForm}
        />
        <BackButton setShowForm={setShowForm} />
      </div>
    );
  }

  return (
    <>
      {showForm ? (
        ShowForm()
      ) : (
        <div className="border border-secondary rounded bg-gradient col-md-8">
          <h2 className="mb-4">Leave Requests</h2>
          <div className="input-group mb-3">
            <LeaveRequestFilterMenu
              leaveRequests={leaveRequests}
              setFilteredLeaveRequests={setFilteredLeaveRequests}
            />
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <LeaveRequestTableHead handleSort={handleSort} />
              <RenderLeaveRequests
                filteredLeaveRequests={filteredLeaveRequests}
                setShowForm={setShowForm}
                setLeaveRequestId={setLeaveRequestId}
              />
            </table>
          </div>
          <CreateNewButton setShowForm={setShowForm} />
        </div>
      )}
    </>
  );
}
