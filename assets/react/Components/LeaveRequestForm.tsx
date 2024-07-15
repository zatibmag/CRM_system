import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCsrfTokenFormLeaveRequest } from "../Hooks/useCsrfTokenFormLeaveRequest";
import { SubmitButton } from "../Buttons/SumbitButton";
import { useEmployees } from "../Hooks/useEmployees";
import { useAbsenceReason } from "../Hooks/useAbscenceReason";

interface LeaveRequestFormProps {
  leaveRequestId: number;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export function LeaveRequestForm({
  leaveRequestId,
  setShowForm,
}: LeaveRequestFormProps) {
  const [name, setName] = useState("");
  const [leaveRequestEmployee, setLeaveRequestEmployee] = useState("");
  const [absenceReason, setAbsenceReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comment, setComment] = useState("");
  const { csrfTokenForm } = useCsrfTokenFormLeaveRequest();
  const { employees } = useEmployees();
  const { absenceReasons } = useAbsenceReason();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/leave-request/new",
        {
          name,
          startDate,
          endDate,
          employee: leaveRequestEmployee,
          absenceReason,
          comment,
          reviewerComment: "Not yet reviewed",
          status: "New",
          _csrf_token: csrfTokenForm,
        }
      );
      setShowForm(false);
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
          name,
          startDate,
          endDate,
          employee: leaveRequestEmployee,
          absenceReason,
          comment,
          reviewerComment: "Not yet reviewed",
          status: "New",
          _csrf_token: csrfTokenForm,
        }
      );
      setShowForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4 w-50">
      <div className="row justify-content-center">
        <div className="col-10">
          <div className="border p-4">
            <h2 className="text-center">
              {leaveRequestId
                ? "Update Leave Request"
                : "Create New Leave Request"}
            </h2>
            <form onSubmit={leaveRequestId ? handleUpdate : handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Leave Request Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="startDate" className="form-label">
                  Start Date:
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="endDate" className="form-label">
                  End Date:
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="leaveRequestEmployee" className="form-label">
                  Employee:
                </label>
                <select
                  id="leaveRequestEmployee"
                  className="form-select"
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
              <div className="mb-3">
                <label htmlFor="absenceReason" className="form-label">
                  Absence Reason:
                </label>
                <select
                  id="absenceReason"
                  className="form-select"
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
              <div className="mb-3">
                <label htmlFor="comment" className="form-label">
                  Comment:
                </label>
                <textarea
                  id="comment"
                  className="form-control"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                />
              </div>
              <SubmitButton id={leaveRequestId} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
