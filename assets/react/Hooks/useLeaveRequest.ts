import { useState, useEffect } from "react";
import axios from "axios";

export function useLeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get("//127.0.0.1:8000/leave-request");
        setLeaveRequests(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLeaveRequests();
  }, []);

  return {
    leaveRequests,
    setLeaveRequests,
  };
}
