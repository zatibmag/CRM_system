import * as React from "react";
import { useContext } from "react";
import { PageManagerContext, Pages } from "../Context/PageManagerProvider";

export function ProjectListButton() {
  const { setCurrentPage } = useContext(PageManagerContext);

  const handleProjectList = () => {
    setCurrentPage(Pages.ProjectList);
  };

  return (
    <button
      type="button"
      onClick={() => {
        handleProjectList();
      }}
      className="btn btn-secondary"
    >
      Project list
    </button>
  );
}
