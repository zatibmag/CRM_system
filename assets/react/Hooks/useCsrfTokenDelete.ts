import { useState, useEffect } from "react";
import axios from "axios";

export function useCsrfTokenDelete() {
  const [csrfTokenDelete, setCsrfTokenDelete] = useState("");

  useEffect(() => {
    const fetchCsrfTokenDelete = async () => {
      try {
        const response = await axios.get(
          "https://52.200.134.52/project/csrf-token-delete"
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
