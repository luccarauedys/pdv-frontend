import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifyError = (message) =>
  toast.error(message, { position: "top-center", theme: "dark" });
