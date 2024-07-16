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
          "https://52.200.134.52/project/project-types"
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
