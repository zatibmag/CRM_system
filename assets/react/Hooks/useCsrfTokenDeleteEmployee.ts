import { useState, useEffect } from "react";
import axios from "axios";

export function useCsrfTokenDeleteEmployee() {
  const [csrfTokenDelete, setCsrfTokenDelete] = useState("");

  useEffect(() => {
    const fetchCsrfTokenDelete = async () => {
      try {
        const response = await axios.get(
          "https://52.200.134.52/employees/csrf-token-delete"
        );
        setCsrfTokenDelete(response.data.csrf_token);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCsrfTokenDelete();
  }, []);

  return {
    csrfTokenDelete,
  };
}
