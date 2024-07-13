import { useState, useEffect } from "react";
import axios from "axios";

export function useAbsenceReason() {
  const [absenceReasons, setAbsenceReasons] = useState<string[]>([]);
  useEffect(() => {
    const fetchStatusChoice = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/leave-request/absence-reason"
        );
        setAbsenceReasons(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStatusChoice();
  }, []);

  return {
    absenceReasons,
  };
}
