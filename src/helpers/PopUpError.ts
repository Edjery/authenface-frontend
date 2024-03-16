import { Bounce, toast } from "react-toastify";

const PopUpError = (errorMessage: string) => {
  toast.error(errorMessage, {
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

export default PopUpError;
