import { Bounce, toast } from "react-toastify";

const popUpSuccess = (successMessage: string) => {
  toast.success(successMessage, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
};

export default popUpSuccess;
