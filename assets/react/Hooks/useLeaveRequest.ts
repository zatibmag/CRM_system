import { useState, useEffect } from "react";
import axios from "axios";

export function useLeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);

  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get("https://52.200.134.52/leave-request");
      setLeaveRequests(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  return {
    leaveRequests,
    setLeaveRequests,
    fetchLeaveRequests,
  };
}
