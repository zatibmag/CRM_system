import { useState, useEffect } from "react";
import axios from "axios";

export function useProjects() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("https://52.200.134.52/project");
        setProjects(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return {
    projects,
    setProjects,
  };
}
