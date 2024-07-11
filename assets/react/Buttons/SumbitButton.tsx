import * as React from "react";

interface SubmitButtonProps {
  projectId: number;
}

export function SubmitButton({ projectId }: SubmitButtonProps) {
  return (
    <button type="submit">
      {projectId ? "Update Project" : "Create Project"}
    </button>
  );
}
