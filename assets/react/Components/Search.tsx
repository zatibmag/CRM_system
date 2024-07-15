import * as React from "react";

interface SearchProps {
  listData: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder: string;
}

export function Search({
  listData,
  searchTerm,
  setSearchTerm,
  placeholder,
}: SearchProps) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      type="text"
      className="form-control"
      placeholder={placeholder}
      value={searchTerm}
      onChange={handleSearch}
    />
  );
}
