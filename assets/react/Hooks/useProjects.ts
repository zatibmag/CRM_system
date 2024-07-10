import { useState, useEffect } from "react";
import axios from "axios";

export function useProjects() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("//127.0.0.1:8000/project");
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
