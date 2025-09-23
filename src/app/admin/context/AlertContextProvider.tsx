"use client";

import { useEffect, useState } from "react";
import AlertContext from "./AlertContext";
import { Alert } from "@mui/material";

interface AlertContextProviderProps {
  children: React.ReactNode;
}

export type AlertType = "success" | "error" | "info" | "warning" | undefined;

export default function AlertContextProvider({
  children,
}: AlertContextProviderProps) {
  const [alert, setAlert] = useState<[AlertType, string]>([undefined, ""]);
  useEffect(() => {
    if (alert[0]) {
      const timer = setTimeout(() => {
        setAlert([undefined, ""]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      <Alert
        severity={alert[0] as AlertType}
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 90000,
          width: "fit-content",
          display: alert[0] ? "block" : "none",
        }}
      >
        {alert[1]}
      </Alert>
      {children}
    </AlertContext.Provider>
  );
}
