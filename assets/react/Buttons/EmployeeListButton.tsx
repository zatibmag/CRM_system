import * as React from "react";
import { useContext } from "react";
import { PageManagerContext, Pages } from "../Context/PageManagerProvider";

export function EmployeeListButton() {
  const { setCurrentPage } = useContext(PageManagerContext);

  const handleEmployeeList = () => {
    setCurrentPage(Pages.EmployeeList);
  };

  return (
    <button
      type="button"
      onClick={() => {
        handleEmployeeList();
      }}
      className="btn btn-secondary"
    >
      Employee list
    </button>
  );
}
