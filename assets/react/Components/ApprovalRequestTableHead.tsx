import * as React from "react";
import { SortButton } from "../Buttons/SortButton";

interface ApprovalRequestTableHeadProps {
  handleSort: (key: string) => void;
}

export function ApprovalRequestTableHead({
  handleSort,
}: ApprovalRequestTableHeadProps) {
  return (
    <thead className="thead-dark">
      <tr className="text-center">
        <th>
          <SortButton name={"ID"} handleSort={handleSort} data={"id"} />
        </th>
        <th>
          <SortButton
            name={"Approver"}
            handleSort={handleSort}
            data={"approver"}
          />
        </th>
        <th>
          <SortButton
            name={"Leave Request"}
            handleSort={handleSort}
            data={"leaveRequest"}
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
        <th className="align-middle mt-2">Actions</th>
      </tr>
    </thead>
  );
}
