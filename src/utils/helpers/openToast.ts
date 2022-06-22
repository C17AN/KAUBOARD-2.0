import { toast } from "react-toastify";

const openToast = (toastText: string, type: "success" | "error" = "success") => {
  toast[type](toastText, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export default openToast;
