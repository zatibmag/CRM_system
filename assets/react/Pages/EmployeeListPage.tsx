import * as React from "react";
import { useState, useEffect } from "react";
import { EmployeeForm } from "../Components/EmployeeForm";
import { useEmployees } from "../Hooks/useEmployees";
import { EmployeeFilterMenu } from "../Components/EmployeeFilterMenu";
import { RenderEmployees } from "../Components/RenderEmployees";
import { EmployeeTableHead } from "../Components/EmployeeTableHead";
import { CreateNewButton } from "../Buttons/CreateNewButton";
import { BackButton } from "../Buttons/BackButton";

export function EmployeeListPage(): React.JSX.Element {
  const [showForm, setShowForm] = useState(false);
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const { employees } = useEmployees();

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  }>({ key: "", direction: "ascending" });

  const [filteredEmployees, setFilteredEmployees] = useState<any[]>(employees);

  const handleSort = (key: string) => {
    const newDirection =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";
    setSortConfig({ key, direction: newDirection });
  };

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  useEffect(() => {
    if (sortConfig.key !== "") {
      const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        const valueA = getValueForSorting(a, sortConfig.key);
        const valueB = getValueForSorting(b, sortConfig.key);

        if (sortConfig.direction === "ascending") {
          return compareValues(valueA, valueB);
        } else {
          return compareValues(valueB, valueA);
        }
      });
      setFilteredEmployees(sortedEmployees);
    }
  }, [sortConfig, filteredEmployees]);

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
        <EmployeeForm employeeId={employeeId} setShowForm={setShowForm} />
        <div className="d-flex justify-content-center mt-2 mb-4">
          <BackButton setShowForm={setShowForm} />
        </div>
      </div>
    );
  }

  return (
    <>
      {showForm ? (
        ShowForm()
      ) : (
        <>
          <h2 className="mt-3 mb-4 d-flex justify-content-center">Employees</h2>
          <div className="input-group mb-3">
            <EmployeeFilterMenu
              renderEmployees={employees}
              setFilteredEmployees={setFilteredEmployees}
            />
          </div>
          <table className="table table-bordered table-hover">
            <EmployeeTableHead handleSort={handleSort} />
            <RenderEmployees
              filteredEmployees={filteredEmployees}
              setShowForm={setShowForm}
              setEmployeeId={setEmployeeId}
            />
          </table>
          <div className="d-flex justify-content-center mt-2 mb-4">
            <CreateNewButton setShowForm={setShowForm} />
          </div>
        </>
      )}
    </>
  );
}
