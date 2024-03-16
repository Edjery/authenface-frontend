import axiosInstance from "./apiClient";
import IDataResponse from "./interfaces/IDataResponse";
import ISnapshot from "./interfaces/ISnapshot";

const API_ENDPOINT = "/snapshots/";

class SnapshotService {
  async getAllWithPage(
    currentUserId: number | undefined,
    currentPage: number,
    pageSize: number
  ): Promise<IDataResponse | undefined> {
    const response = await axiosInstance.get(
      `${API_ENDPOINT}user/${currentUserId}?page=${currentPage}&pagesize=${pageSize}`
    );
    if ((response.status = 200)) {
      const data: IDataResponse = response.data;
      return data;
    } else {
      console.error("Error: No data with that ID");
    }
  }

  async remove(id: number): Promise<ISnapshot | undefined> {
    try {
      const response = await axiosInstance.delete<ISnapshot>(
        `${API_ENDPOINT}${id}`
      );
      if ((response.status = 200)) {
        const deletedData = response.data;
        return deletedData;
      } else {
        console.error("Error: No data with that ID");
      }
    } catch (error) {
      console.error("Error in deleting data:", error);
      throw error;
    }
  }
}

const snapshotService = new SnapshotService();
export default snapshotService;
