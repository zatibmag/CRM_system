import { useState, useEffect } from "react";
import axios from "axios";

export function useApprovalRequests() {
  const [approvalRequests, setApprovalRequests] = useState<any[]>([]);

  useEffect(() => {
    const fetchApprovalRequests = async () => {
      try {
        const response = await axios.get(
          "https://52.200.134.52/approval-request"
        );
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
