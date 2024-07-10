import * as React from "react";
import { useState } from "react";

interface SearchProps {
  listData: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function Search({ listData, searchTerm, setSearchTerm }: SearchProps) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search by Name"
      value={searchTerm}
      onChange={handleSearch}
    />
  );
}
