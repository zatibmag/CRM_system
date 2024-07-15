import * as React from "react";
import { PageManagerProvider } from "./Context/PageManagerProvider";
import { App } from "./App";

export function Main(): React.JSX.Element {
  return (
    <PageManagerProvider>
      <App />
    </PageManagerProvider>
  );
}
