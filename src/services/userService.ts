import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { registerValues } from "../pages/auth/Register";
import axiosInstance from "./apiClient";
import IDataResponse from "./interfaces/IDataResponse";
import IUser from "./interfaces/IUser";

const API_ENDPOINT = "/users/";

class SnapshotService {
  private users: IUser[] = [];

  constructor() {
    this.loadData();
  }

  private async loadData(): Promise<void> {
    try {
      const response = await this.getAll();
      this.users = response.results;
    } catch (error) {
      console.error("Error in loading data:", error);
      throw error;
    }
  }

  async getAll(): Promise<IDataResponse> {
    const response = await axiosInstance.get(API_ENDPOINT);
    const data: IDataResponse = response.data;
    return data;
  }

  async getAllWithPage(
    currentPage: number,
    pageSize: number
  ): Promise<IDataResponse> {
    const response = await axiosInstance.get(
      `${API_ENDPOINT}?page=${currentPage}&pagesize=${pageSize}`
    );
    const data: IDataResponse = response.data;
    return data;
  }

  get(id: number): IUser | undefined {
    return this.users.find((item) => item.id === id);
  }

  async create(newUser: IUser): Promise<IUser> {
    try {
      const response = await axiosInstance.post<IUser>(API_ENDPOINT, newUser);
      const newData = response.data;
      this.users.push(newData);
      return newData;
    } catch (error) {
      console.error("Error in creating data:", error);
      throw error;
    }
  }

  async register(newUser: registerValues) {
    try {
      const response = await axiosInstance.post("register", newUser, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      this.loadData();
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
                autoClose: 5000,
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
        const index = this.users.findIndex((item) => item.id === id);
        if (index !== -1) {
          this.users[index] = { ...updatedData };
        }
        return updatedData;
      } else {
        console.error("Error: No data with that ID");
        return null;
      }
    } catch (error) {
      console.error("Error in updating data:", error);
      throw error;
    }
  }

  async remove(id: number): Promise<IUser | null> {
    try {
      const response = await axiosInstance.delete<IUser>(
        `${API_ENDPOINT}${id}`
      );
      if ((response.status = 200)) {
        const deletedData = response.data;
        this.users = this.users.filter((item) => item.id !== id);
        return deletedData;
      } else {
        console.error("Error: No data with that ID");
        return null;
      }
    } catch (error) {
      console.error("Error in deleting data:", error);
      throw error;
    }
  }
}

const userService = new SnapshotService();
export default userService;
