import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export function ProjectForm() {
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("Active");
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/project/csrf-token"
        );
        setCsrfToken(response.data.csrf_token);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };

    fetchCsrfToken();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/project/new", {
        projectName,
        projectType,
        startDate,
        endDate,
        projectManager,
        comment,
        status,
        _csrf_token: csrfToken,
      });

      console.log("Project created successfully:", response.data);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div>
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectName">Project Name:</label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="projectType">Project Type:</label>
          <input
            type="text"
            id="projectType"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
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
          <label htmlFor="projectManager">Project Manager:</label>
          <input
            type="number"
            id="projectManager"
            value={projectManager}
            onChange={(e) => setProjectManager(e.target.value)}
            required
          />
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
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}
