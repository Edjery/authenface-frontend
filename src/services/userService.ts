import axios from "axios";
import { Bounce, toast } from "react-toastify";
import ILoginValues from "../pages/auth/interface/ILoginValues";
import IRegisterValues from "../pages/auth/interface/IRegisterValues";
import axiosInstance from "./apiClient";
import IUser from "./interfaces/IUser";

const API_ENDPOINT = "/users/";

class UserService {
  constructor() {}

  async register(newUser: IRegisterValues) {
    try {
      const response = await axiosInstance.post("register", newUser, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          for (const key in error.response.data) {
            if (error.response.data.hasOwnProperty(key)) {
              const errorMessage = `${key
                .toString()
                .toUpperCase()}: ${error.response.data[key].toString()}`;
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
            }
          }
        } else {
          console.error("Error:", error.message);
        }
      } else {
        console.error("Error in updating data:", error);
        throw error;
      }
    }
  }

  async login(user: ILoginValues) {
    try {
      const response = await axiosInstance.post("login", user);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          for (const key in error.response.data) {
            if (error.response.data.hasOwnProperty(key)) {
              const errorMessage = `${key
                .toString()
                .toUpperCase()}: ${error.response.data[key].toString()}`;
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
            }
          }
        } else {
          console.error("Error:", error.message);
        }
      } else {
        console.error("Error in updating data:", error);
        throw error;
      }
    }
  }

  async update(id: number, newUser: IUser): Promise<IUser | null> {
    try {
      const response = await axiosInstance.put<IUser>(
        `${API_ENDPOINT}${id}`,
        newUser
      );
      if ((response.status = 200)) {
        const updatedData = response.data;
        return updatedData;
      } else {
        console.error("Error: No data with that ID");
        return null;
      }
    } catch (error) {
      console.error("Error in updating data:", error);
      throw error;
    }
  } // TODO need update
}

const userService = new UserService();
export default userService;
