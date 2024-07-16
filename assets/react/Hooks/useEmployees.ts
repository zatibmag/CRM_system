import { useState, useEffect } from "react";
import axios from "axios";

export function useEmployees() {
  const [employees, setEmployees] = useState<any[]>([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("https://52.200.134.52/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    setEmployees,
    fetchEmployees,
  };
}
