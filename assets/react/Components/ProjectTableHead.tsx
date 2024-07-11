import * as React from "react";
import { SortButton } from "../Buttons/SortButton";

interface ProjectTableHeadProps {
  handleSort: (key: string) => void;
}

export function ProjectTableHead({ handleSort }: ProjectTableHeadProps) {
  return (
    <thead className="thead-dark">
      <tr>
        <th>
          <SortButton name={"ID"} handleSort={handleSort} data={"id"} />
        </th>
        <th>
          <SortButton name={"Name"} handleSort={handleSort} data={"name"} />
        </th>
        <th>
          <SortButton
            name={"Type"}
            handleSort={handleSort}
            data={"projectType"}
          />
        </th>
        <th>
          <SortButton
            name={"Start Date"}
            handleSort={handleSort}
            data={"startDate.date"}
          />
        </th>
        <th>
          <SortButton
            name={"End Date"}
            handleSort={handleSort}
            data={"endDate.date"}
          />
        </th>
        <th>
          <SortButton
            name={"Project Manager"}
            handleSort={handleSort}
            data={"projectManager"}
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
