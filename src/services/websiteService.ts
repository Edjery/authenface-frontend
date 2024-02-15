import axiosInstance from "./apiClient";
import IDataResponse from "./interfaces/IDataResponse";
import IWebsite from "./interfaces/IWebsite";

const API_ENDPOINT = "/websites/";

class WebsiteService {
  private websites: IWebsite[] = [];

  constructor() {
    this.loadData();
  }

  private async loadData(): Promise<void> {
    try {
      const response = await this.getAll();
      this.websites = response.results;
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

  get(id: number): IWebsite | undefined {
    return this.websites.find((item) => item.id === id);
  }

  async create(newWebsite: IWebsite): Promise<IWebsite> {
    try {
      const response = await axiosInstance.post<IWebsite>(
        API_ENDPOINT,
        newWebsite
      );
      const newData = response.data;
      this.websites.push(newData);
      return newData;
    } catch (error) {
      console.error("Error in creating data:", error);
      throw error;
    }
  }

  async update(id: number, newWebsite: IWebsite): Promise<IWebsite | null> {
    try {
      const response = await axiosInstance.put<IWebsite>(
        `${API_ENDPOINT}/${id}`,
        newWebsite
      );
      if ((response.status = 200)) {
        const updatedData = response.data;
        const index = this.websites.findIndex((item) => item.id === id);
        if (index !== -1) {
          this.websites[index] = { ...updatedData };
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

  async remove(id: number): Promise<IWebsite | null> {
    try {
      const response = await axiosInstance.delete<IWebsite>(
        `${API_ENDPOINT}/${id}`
      );
      if ((response.status = 200)) {
        const deletedData = response.data;
        this.websites = this.websites.filter((item) => item.id !== id);
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

const websiteService = new WebsiteService();
export default websiteService;
