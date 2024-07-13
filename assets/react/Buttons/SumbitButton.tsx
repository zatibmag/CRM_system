import * as React from "react";

interface SubmitButtonProps {
  id: number;
}

export function SubmitButton({ id }: SubmitButtonProps) {
  return <button type="submit">{id ? "Update" : "Create"}</button>;
}
