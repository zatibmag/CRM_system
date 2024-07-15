import { useState, useEffect } from "react";
import axios from "axios";

export function useEmployees() {
  const [employees, setEmployees] = useState<any[]>([]);

  // Define fetchEmployees function
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Return employees state and fetchEmployees function
  return {
    employees,
    setEmployees,
    fetchEmployees,
  };
}
