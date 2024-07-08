import * as React from "react";
import { ProjectListPage } from "./Pages/ProjectListPage";
import { useState } from "react";
import { ProjectForm } from "./Components/ProjectForm";

export function App(): React.JSX.Element {
  const [click, setClick] = useState(false);

  return (
    <div>
      <ProjectListPage />
      {click ? (
        <ProjectForm />
      ) : (
        <button onClick={() => setClick(!click)}>Form</button>
      )}
    </div>
  );
}
