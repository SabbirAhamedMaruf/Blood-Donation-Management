import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/Routes";
import SecurityProvider from "./Provider/SecurityProvider";
import Notification from "./hooks/Notification";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Notification>
        <SecurityProvider>
          <RouterProvider router={routes} />
        </SecurityProvider>
      </Notification>
    </QueryClientProvider>
  </React.StrictMode>
);
