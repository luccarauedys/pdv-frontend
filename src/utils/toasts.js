import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifyError = (message) =>
  toast.error(message, { position: "top-center", theme: "dark" });

export const notifySuccess = (message) =>
  toast.success(message, { position: "top-center", theme: "dark" });

export const notifyInfo = (message) =>
  toast.info(message, { position: "top-center", theme: "dark" });
