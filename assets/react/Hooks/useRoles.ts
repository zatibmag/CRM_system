import { useState, useEffect } from "react";
import axios from "axios";

export function useRoles() {
  const [roles, setRoles] = useState<string[]>([]);
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/employees/roles"
        );
        setRoles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoles();
  }, []);

  return {
    roles,
  };
}
