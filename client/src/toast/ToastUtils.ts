import { toast } from "react-toastify";

export const showSuccess = (message: string) => {
  toast.success(message, {
    position: "bottom-center",
    autoClose: 1000,
  });
};

export const showError = (message: string) => {
  toast.error(message, {
    position: "bottom-center",
    autoClose: 1000,
  });
};
