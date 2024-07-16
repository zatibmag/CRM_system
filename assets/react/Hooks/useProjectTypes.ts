import { useState, useEffect } from "react";
import axios from "axios";

export function useProjectType() {
  const [availableProjectTypes, setAvailableProjectTypes] = useState<string[]>(
    []
  );
  useEffect(() => {
    const fetchProjectTypes = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/project/project-types"
        );
        setAvailableProjectTypes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjectTypes();
  }, []);

  return {
    availableProjectTypes,
  };
}
