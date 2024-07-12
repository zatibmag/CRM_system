import { useState, useEffect } from "react";
import axios from "axios";

export function useEmployees() {
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("//127.0.0.1:8000/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
  }, []);

  return {
    employees,
    setEmployees,
  };
}
