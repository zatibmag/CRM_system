import { useState, useEffect } from "react";
import axios from "axios";

export function useSubdivisions() {
  const [subdivisions, setSubdivisions] = useState<string[]>([]);
  useEffect(() => {
    const fetchSubdivisions = async () => {
      try {
        const response = await axios.get(
          "https://52.200.134.52/employees/subdivisions"
        );
        setSubdivisions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubdivisions();
  }, []);

  return {
    subdivisions,
  };
}
