import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export function App(): React.JSX.Element {
  const [data, setData] = useState<any[]>([]); // Explicitly typing state as array of any objects

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("//127.0.0.1:8000/showEmployee");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <h1>Employee List</h1>
      <div className="position-absolute top-0 end-0">
        {data.map((employee) => (
          <div key={employee.id}>
            <p>ID: {employee.id}</p>
            <p className="">Full Name: {employee.fullName}</p>
            <p>Roles: {employee.roles?.join(", ")}</p>
            <p>Subdivision: {employee.subdivision}</p>
            <p>Position: {employee.position}</p>
            <p>Status: {employee.status}</p>
            <p>People Partner: {employee.peoplePartner}</p>
            <p>Out of Office Balance: {employee.outOfOfficeBalance}</p>
            <p>Photo: {employee.photo}</p>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}
