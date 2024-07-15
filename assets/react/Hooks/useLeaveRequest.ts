import { useState, useEffect } from "react";
import axios from "axios";

export function useLeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);

  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/leave-request");
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
