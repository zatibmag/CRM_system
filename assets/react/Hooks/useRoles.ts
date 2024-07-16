import { useState, useEffect } from "react";
import axios from "axios";

export function useRoles() {
  const [roles, setRoles] = useState<string[]>([]);
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          "https://52.200.134.52/employees/roles"
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
