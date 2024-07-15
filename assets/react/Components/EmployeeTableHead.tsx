import * as React from "react";
import { SortButton } from "../Buttons/SortButton";

interface EmployeeTableHeadProps {
  handleSort: (key: string) => void;
}

export function EmployeeTableHead({ handleSort }: EmployeeTableHeadProps) {
  return (
    <thead className="thead-dark">
      <tr className="text-center">
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
        <th className="align-middle mt-2">Role</th>
        <th>
          <SortButton
            name={"Subdivision"}
            handleSort={handleSort}
            data={"subdivision"}
          />
        </th>
        <th className="align-middle mt-2">Projects</th>
        <th>
          <SortButton
            name={"OutOfOfficeBalance"}
            handleSort={handleSort}
            data={"outOfOfficeBalance"}
          />
        </th>
        <th className="align-middle mt-2">Actions</th>
      </tr>
    </thead>
  );
}
