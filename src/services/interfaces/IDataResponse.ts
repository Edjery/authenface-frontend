import IWebsite from "./IWebsite";

interface IDataResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IWebsite[];
}

export default IDataResponse;
