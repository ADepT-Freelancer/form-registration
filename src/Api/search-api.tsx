import { SearchResult } from "../components/types/types";
import { instanceSearch } from "./api";

export const searchAPI = {
  search(searchTemp: string) {
    return instanceSearch
      .get<SearchResult>(`/users?q=${searchTemp}`)
      .then((res) => {
				console.log(res)
        return res.data;
      });
  },
};
