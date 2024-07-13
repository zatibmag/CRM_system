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
            name={"PeoplePartner"}
            handleSort={handleSort}
            data={"peoplePartner"}
          />
        </th>
        <th>
          <SortButton
            name={"Position"}
            handleSort={handleSort}
            data={"position"}
          />
        </th>
        <th>
          <SortButton name={"Role"} handleSort={handleSort} data={"role"} />
        </th>
        <th>
          <SortButton
            name={"Subdivision"}
            handleSort={handleSort}
            data={"subdivision"}
          />
        </th>
        <th>
          <SortButton
            name={"Project"}
            handleSort={handleSort}
            data={"project"}
          />
        </th>
        <th>
          <SortButton
            name={"OutOfOfficeBalance"}
            handleSort={handleSort}
            data={"outOfOfficeBalance"}
          />
        </th>
        <th>Photo</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
}
