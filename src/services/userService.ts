import axios from "axios";
import { Bounce, toast } from "react-toastify";
import {
  IAccountImg,
  IAccountInfo,
  IAccountPass,
} from "../components/EditProfile";
import ILoginValues from "../pages/auth/interface/ILoginValues";
import IAccountValues from "../pages/auth/interface/IRegisterValues";
import axiosInstance from "./apiClient";
import IUser from "./interfaces/IUser";

const API_ENDPOINT = "/users/";

// TODO Add update pop ups
// Refactor pop ups
class UserService {
  constructor() {}

  async register(newUser: IAccountValues) {
    try {
      const response = await axiosInstance.post(API_ENDPOINT, newUser, {
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

  async get(id: number | undefined): Promise<IUser> {
    const response = await axiosInstance.get(`${API_ENDPOINT}${id}/`);
    const data: IUser = response.data;
    return data;
  }

  async update(
    id: number | undefined,
    values: IAccountInfo | IAccountPass | IAccountImg
  ) {
    try {
      const response = await axiosInstance.patch(
        `${API_ENDPOINT}${id}/`,
        values,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if ((response.status = 200)) {
        const updatedData = response.data;
        return updatedData;
      } else {
        console.error("Error: No data with that ID");
        return null;
      }
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
}

const userService = new UserService();
export default userService;
