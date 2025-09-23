import { createContext } from "react";
import { AlertType } from "./AlertContextProvider";

const AlertContext = createContext<{
  alert: [AlertType, string];
  setAlert: (alert: [AlertType, string]) => void;
}>({ alert: [undefined, ""], setAlert: () => {} });

export default AlertContext;
