import * as React from "react";

interface ProjectTableHeadProps {
  handleSort: (key: string) => void;
}

export function ProjectTableHead({ handleSort }: ProjectTableHeadProps) {
  return (
    <thead className="thead-dark">
      <tr>
        <th>
          <button className="btn btn-link" onClick={() => handleSort("id")}>
            ID
          </button>
        </th>
        <th>
          <button className="btn btn-link" onClick={() => handleSort("name")}>
            Name
          </button>
        </th>
        <th>
          <button
            className="btn btn-link"
            onClick={() => handleSort("projectType")}
          >
            Type
          </button>
        </th>
        <th>
          <button
            className="btn btn-link"
            onClick={() => handleSort("startDate.date")}
          >
            Start Date
          </button>
        </th>
        <th>
          <button
            className="btn btn-link"
            onClick={() => handleSort("endDate.date")}
          >
            End Date
          </button>
        </th>
        <th>
          <button
            className="btn btn-link"
            onClick={() => handleSort("projectManager")}
          >
            Project Manager
          </button>
        </th>
        <th>
          <button className="btn btn-link" onClick={() => handleSort("status")}>
            Status
          </button>
        </th>
        <th>
          <button
            className="btn btn-link"
            onClick={() => handleSort("comment")}
          >
            Comment
          </button>
        </th>
        <th>Actions</th>
      </tr>
    </thead>
  );
}
