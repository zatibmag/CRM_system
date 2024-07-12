import { useState, useEffect } from "react";
import axios from "axios";

export function usePositions() {
  const [positions, setPositions] = useState<string[]>([]);
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/employees/positions"
        );
        setPositions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPositions();
  }, []);

  return {
    positions,
  };
}
