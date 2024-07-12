import { useState, useEffect } from "react";
import axios from "axios";

export function useSubdivisions() {
  const [subdivisions, setSubdivisions] = useState<string[]>([]);
  useEffect(() => {
    const fetchSubdivisions = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/employees/subdivisions"
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
