import { useState, useEffect } from "react";
import axios from "axios";

export function usePositions() {
  const [positions, setPositions] = useState<string[]>([]);
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.post(
          "https://52.200.134.52/employees/positions"
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
