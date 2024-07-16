import { useState, useEffect } from "react";
import axios from "axios";

export function useStatusChoice() {
  const [statusChoice, setStatusChoice] = useState<string[]>([]);
  useEffect(() => {
    const fetchStatusChoice = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/project/status-choice"
        );
        setStatusChoice(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStatusChoice();
  }, []);

  return {
    statusChoice,
  };
}
