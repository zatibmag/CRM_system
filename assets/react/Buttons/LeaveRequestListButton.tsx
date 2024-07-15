import * as React from "react";
import { useContext } from "react";
import { PageManagerContext, Pages } from "../Context/PageManagerProvider";

export function LeaveRequestListButton() {
  const { setCurrentPage } = useContext(PageManagerContext);

  const handleLeaveRequestList = () => {
    setCurrentPage(Pages.LeaveRequestList);
  };

  return (
    <button
      type="button"
      onClick={() => {
        handleLeaveRequestList();
      }}
    >
      Leave request list
    </button>
  );
}
