import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useProjectType } from "../Hooks/useProjectTypes";
import { useCsrfTokenForm } from "../Hooks/useCsrfTokenForm";
import { useStatusChoice } from "../Hooks/useStatusChoice";

interface ProjectFormProps {
  projectId: number;
}

export function ProjectForm({ projectId }: ProjectFormProps) {
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const { csrfTokenForm } = useCsrfTokenForm();
  const { availableProjectTypes } = useProjectType();
  const { statusChoice } = useStatusChoice();

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
        _csrf_token: csrfTokenForm,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/project/${projectId}/edit`,
        {
          projectName,
          projectType,
          startDate,
          endDate,
          projectManager,
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
      <h2>{projectId ? "Update Project" : "Create New Project"}</h2>
      <form onSubmit={projectId ? handleUpdate : handleSubmit}>
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
          <select
            id="projectType"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            required
          >
            <option value="">Select Project Type</option>
            {availableProjectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
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
            <option value="">Select status</option>
            {statusChoice.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">
          {projectId ? "Update Project" : "Create Project"}
        </button>
      </form>
    </div>
  );
}
