import { toast } from "react-toastify";

export const showSuccess = (message: string) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 1000,
  });
};

export const showError = (message: string) => {
  toast.error(message, {
    position: "bottom-left",
    autoClose: 1000,
  });
};
