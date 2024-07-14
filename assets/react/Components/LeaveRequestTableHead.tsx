import * as React from "react";
import { SortButton } from "../Buttons/SortButton";

interface LeaveRequestTableHeadProps {
  handleSort: (key: string) => void;
}

export function LeaveRequestTableHead({
  handleSort,
}: LeaveRequestTableHeadProps) {
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
            name={"Start Date"}
            handleSort={handleSort}
            data={"startDate"}
          />
        </th>
        <th>
          <SortButton
            name={"End Date"}
            handleSort={handleSort}
            data={"endDate"}
          />
        </th>
        <th>
          <SortButton
            name={"Employee"}
            handleSort={handleSort}
            data={"employee"}
          />
        </th>
        <th>
          <SortButton
            name={"Absence reason"}
            handleSort={handleSort}
            data={"absenceReason"}
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
        <th>Reviewer comment</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
}
