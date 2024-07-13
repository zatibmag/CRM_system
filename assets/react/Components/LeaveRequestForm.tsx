import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCsrfTokenFormLeaveRequest } from "../Hooks/useCsrfTokenFormLeaveRequest";
import { useStatusChoice } from "../Hooks/useStatusChoice";
import { SubmitButton } from "../Buttons/SumbitButton";
import { useEmployees } from "../Hooks/useEmployees";
import { useAbsenceReason } from "../Hooks/useAbscenceReason";

interface LeaveRequestFormProps {
  leaveRequestId: number;
}

export function LeaveRequestForm({ leaveRequestId }: LeaveRequestFormProps) {
  const [leaveRequestName, setLeaveRequestName] = useState("");
  const [leaveRequestEmployee, setLeaveRequestEmployee] = useState("");
  const [absenceReason, setAbsenceReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const { csrfTokenForm } = useCsrfTokenFormLeaveRequest();
  const { statusChoice } = useStatusChoice();
  const { employees } = useEmployees();
  const { absenceReasons } = useAbsenceReason();

  //   const projectManagers = employees.filter(
  //     (employee) => employee.position === "PROJECT_MANAGER"
  //   );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/leave-request/new",
        {
          leaveRequestName,
          startDate,
          endDate,
          leaveRequestEmployee,
          absenceReason,
          comment,
          status,
          _csrf_token: csrfTokenForm,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/leave-request/${leaveRequestId}/edit`,
        {
          leaveRequestName,
          startDate,
          endDate,
          leaveRequestEmployee,
          absenceReason,
          comment,
          status,
          _csrf_token: csrfTokenForm,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>
        {leaveRequestId ? "Update Leave Request" : "Create New Leave Request"}
      </h2>
      <form onSubmit={leaveRequestId ? handleUpdate : handleSubmit}>
        <div>
          <label htmlFor="leaveRequestName">Leave Request Name:</label>
          <input
            type="text"
            id="leaveRequestName"
            value={leaveRequestName}
            onChange={(e) => setLeaveRequestName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="leaveRequestEmployee">Employee:</label>
          <select
            id="leaveRequestEmployee"
            value={leaveRequestEmployee}
            onChange={(e) => setLeaveRequestEmployee(e.target.value)}
            required
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.fullName}>
                {employee.fullName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="absenceReason">Absence Reason:</label>
          <select
            id="absenceReason"
            value={absenceReason}
            onChange={(e) => setAbsenceReason(e.target.value)}
            required
          >
            <option value="">Select absence reason</option>
            {absenceReasons.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select status</option>
            {statusChoice.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <SubmitButton id={leaveRequestId} />
      </form>
    </div>
  );
}
