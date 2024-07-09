import { useState, useEffect } from "react";
import axios from "axios";

export function useCsrfToken() {
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/project/csrf-token"
        );
        setCsrfToken(response.data.csrf_token);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCsrfToken();
  }, []);

  return {
    csrfToken,
  };
}
