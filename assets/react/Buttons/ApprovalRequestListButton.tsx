import * as React from "react";
import { useContext } from "react";
import { PageManagerContext, Pages } from "../Context/PageManagerProvider";

export function ApprovalListButton() {
  const { setCurrentPage } = useContext(PageManagerContext);

  const handleApprovalList = () => {
    setCurrentPage(Pages.ApprovalRequestList);
  };

  return (
    <button
      type="button"
      onClick={() => {
        handleApprovalList();
      }}
    >
      Approval request list
    </button>
  );
}
