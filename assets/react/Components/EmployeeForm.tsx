import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useStatusChoice } from "../Hooks/useStatusChoice";
import { SubmitButton } from "../Buttons/SumbitButton";
import { useRoles } from "../Hooks/useRoles";
import { usePositions } from "../Hooks/usePositions";
import { useSubdivisions } from "../Hooks/useSubdivisions";
import { useEmployees } from "../Hooks/useEmployees";
import { useProjects } from "../Hooks/useProjects";
import { useCsrfTokenFormEmployee } from "../Hooks/useCsrfTokenFormEmployee";

interface EmployeeFormProps {
  employeeId: number;
}

export function EmployeeForm({ employeeId }: EmployeeFormProps) {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState([]);
  const [subdivision, setSubdivision] = useState("");
  const [position, setPosition] = useState("");
  const [outOfOfficeBalance, setOutOfOfficeBalance] = useState("");
  const [project, setProject] = useState([]);
  const [peoplePartner, setPeoplePartner] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const { csrfTokenForm } = useCsrfTokenFormEmployee();
  const { statusChoice } = useStatusChoice();
  const { roles } = useRoles();
  const { positions } = usePositions();
  const { subdivisions } = useSubdivisions();
  const { employees } = useEmployees();
  const { projects } = useProjects();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/employees/new", {
        fullName,
        password,
        status,
        peoplePartner,
        position,
        roles: role,
        subdivision,
        project,
        outOfOfficeBalance,
        photo,
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
        `http://127.0.0.1:8000/employees/${employeeId}/edit`,
        {
          fullName,
          password,
          status,
          peoplePartner,
          position,
          roles: role,
          subdivision,
          project,
          outOfOfficeBalance,
          photo,
          _csrf_token: csrfTokenForm,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{employeeId ? "Update employee" : "Create New employee"}</h2>
      <form onSubmit={employeeId ? handleUpdate : handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
        <div>
          <label htmlFor="peoplePartner">People partner:</label>
          <select
            id="peoplePartner"
            value={peoplePartner}
            onChange={(e) => setPeoplePartner(e.target.value)}
            required
          >
            <option value="">Select people partner</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.fullName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="position">Position:</label>
          <select
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          >
            <option value="">Select position</option>
            {positions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) =>
              setRole(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            required
          >
            <option value="">Select role</option>
            {roles.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="subdivision">Subdivision:</label>
          <select
            id="subdivision"
            value={subdivision}
            onChange={(e) => setSubdivision(e.target.value)}
            required
          >
            <option value="">Select subdivision</option>
            {subdivisions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="project">Current projects:</label>
          <select
            id="project"
            value={project}
            onChange={(e) =>
              setProject(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            required
            multiple
          >
            <option value="">Select project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.name}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="outOfOfficeBalance">Out of office Balance:</label>
          <input
            type="text"
            id="outOfOfficeBalance"
            value={outOfOfficeBalance}
            onChange={(e) => setOutOfOfficeBalance(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="photo">Photo:</label>
          <input
            type="file"
            id="photo"
            onChange={(e) => setPhoto(e.target.files?.[0] || null)}
          />
        </div>
        <SubmitButton id={employeeId} />
      </form>
    </div>
  );
}
