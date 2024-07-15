import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";

export enum Pages {
  ProjectList = "ProjectList",
  EmployeeList = "EmployeeList",
  LeaveRequestList = "LeaveRequestList",
  ApprovalRequestList = "ApprovalRequestList",
}

interface PageManagerContextType {
  currentPage: Pages | null;
  setCurrentPage: React.Dispatch<React.SetStateAction<Pages | null>>;
}

export const PageManagerContext = createContext<PageManagerContextType>({
  currentPage: null,
  setCurrentPage: () => {},
});

interface PageManagerProviderProps {
  children: React.ReactNode;
}

export const PageManagerProvider: React.FC<PageManagerProviderProps> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState<Pages | null>(
    Pages.ProjectList
  );

  useEffect(() => {
    if (!currentPage) {
      setCurrentPage(Pages.ProjectList);
    }
  }, []);

  return (
    <PageManagerContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageManagerContext.Provider>
  );
};
