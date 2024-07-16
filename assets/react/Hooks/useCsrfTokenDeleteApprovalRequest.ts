import { useState, useEffect } from "react";
import axios from "axios";

export function useCsrfTokenDeleteApprovalRequest() {
  const [csrfTokenDelete, setCsrfTokenDelete] = useState("");

  useEffect(() => {
    const fetchCsrfTokenDelete = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/approval-request/csrf-token-delete-approval-request"
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
