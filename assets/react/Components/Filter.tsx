import * as React from "react";

interface FilterProps {
  availableOptions: string[];
  selectedValue: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
}

export function Filter({
  availableOptions,
  selectedValue,
  onChange,
  placeholder = "Select an option",
}: FilterProps) {
  return (
    <select className="form-control" value={selectedValue} onChange={onChange}>
      <option value="">{placeholder}</option>
      {availableOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
