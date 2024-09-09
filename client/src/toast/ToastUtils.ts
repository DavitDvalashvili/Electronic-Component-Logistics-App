import { toast } from "react-toastify";

// Display a success toast notification
export const showSuccess = (message: string) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 1000,
  });
};

// Display an error toast notification
export const showError = (message: string) => {
  toast.error(message, {
    position: "bottom-left",
    autoClose: 1000,
  });
};
