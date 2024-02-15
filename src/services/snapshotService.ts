import axiosInstance from "./apiClient";
import IDataResponse from "./interfaces/IDataResponse";
import ISnapshot from "./interfaces/ISnapshot";

const API_ENDPOINT = "/snapshots/";

class SnapshotService {
  private snapshots: ISnapshot[] = [];

  constructor() {
    this.loadData();
  }

  private async loadData(): Promise<void> {
    try {
      const response = await this.getAll();
      this.snapshots = response.results;
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

  get(id: number): ISnapshot | undefined {
    return this.snapshots.find((item) => item.id === id);
  }

  async create(newSnapshot: ISnapshot): Promise<ISnapshot> {
    try {
      const response = await axiosInstance.post<ISnapshot>(
        API_ENDPOINT,
        newSnapshot
      );
      const newData = response.data;
      this.snapshots.push(newData);
      return newData;
    } catch (error) {
      console.error("Error in creating data:", error);
      throw error;
    }
  }

  async update(id: number, newSnapshot: ISnapshot): Promise<ISnapshot | null> {
    try {
      const response = await axiosInstance.put<ISnapshot>(
        `${API_ENDPOINT}/${id}`,
        newSnapshot
      );
      if ((response.status = 200)) {
        const updatedData = response.data;
        const index = this.snapshots.findIndex((item) => item.id === id);
        if (index !== -1) {
          this.snapshots[index] = { ...updatedData };
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

  async remove(id: number): Promise<ISnapshot | null> {
    try {
      const response = await axiosInstance.delete<ISnapshot>(
        `${API_ENDPOINT}/${id}`
      );
      if ((response.status = 200)) {
        const deletedData = response.data;
        this.snapshots = this.snapshots.filter((item) => item.id !== id);
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

const websiteService = new SnapshotService();
export default websiteService;
