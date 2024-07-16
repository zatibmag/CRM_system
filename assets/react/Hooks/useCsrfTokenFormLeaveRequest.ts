import { useState, useEffect } from "react";
import axios from "axios";

export function useCsrfTokenFormLeaveRequest() {
  const [csrfTokenForm, setCsrfTokenForm] = useState("");

  useEffect(() => {
    const fetchCsrfTokenForm = async () => {
      try {
        const response = await axios.get(
          "https://52.200.134.52/leave-request/csrf-token-form-leave-request"
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
