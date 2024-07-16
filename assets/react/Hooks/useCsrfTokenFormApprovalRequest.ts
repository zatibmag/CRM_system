import { useState, useEffect } from "react";
import axios from "axios";

export function useCsrfTokenFormApprovalRequest() {
  const [csrfTokenForm, setCsrfTokenForm] = useState("");

  useEffect(() => {
    const fetchCsrfTokenForm = async () => {
      try {
        const response = await axios.get(
          "https://52.200.134.52/approval-request/csrf-token-form-approval-request"
        );
        setCsrfTokenForm(response.data.csrf_token);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCsrfTokenForm();
  }, []);

  return {
    csrfTokenForm,
  };
}
