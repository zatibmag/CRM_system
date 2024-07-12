import * as React from "react";
import { SortButton } from "../Buttons/SortButton";

interface EmployeeTableHeadProps {
  handleSort: (key: string) => void;
}

export function EmployeeTableHead({ handleSort }: EmployeeTableHeadProps) {
  return (
    <thead className="thead-dark">
      <tr>
        <th>
          <SortButton name={"ID"} handleSort={handleSort} data={"id"} />
        </th>
        <th>
          <SortButton
            name={"fullName"}
            handleSort={handleSort}
            data={"fullName"}
          />
        </th>
        <th>
          <SortButton name={"Status"} handleSort={handleSort} data={"status"} />
        </th>
        <th>
          <SortButton
            name={"Comment"}
            handleSort={handleSort}
            data={"comment"}
          />
        </th>
        <th>Actions</th>
      </tr>
    </thead>
  );
}
