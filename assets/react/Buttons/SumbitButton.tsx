import * as React from "react";

interface SubmitButtonProps {
  id: number;
}

export function SubmitButton({ id }: SubmitButtonProps) {
  return (
    <button type="submit" className="btn btn-primary col-12">
      {id ? "Update" : "Create"}
    </button>
  );
}
