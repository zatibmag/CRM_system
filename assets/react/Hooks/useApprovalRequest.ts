import { useState, useEffect } from "react";
import axios from "axios";

export function useApprovalRequests() {
  const [approvalRequests, setApprovalRequests] = useState<any[]>([]);

  useEffect(() => {
    const fetchApprovalRequests = async () => {
      try {
        const response = await axios.get("//127.0.0.1:8000/approval-request");
        setApprovalRequests(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchApprovalRequests();
  }, []);

  return {
    approvalRequests,
    setApprovalRequests,
  };
}
