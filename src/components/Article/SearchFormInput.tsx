import { ClockCircleOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Badge } from "antd/lib";
import React from "react";
import { searchAPI } from "../../Api/search-api";
import { SearchFormInputType } from "../types/types";

export const SearchFormInput: React.FC<SearchFormInputType> = (props) => {
  const [tempSearch, setTempSearch] = React.useState("fuchko");
  const [isLoading, setIsLoading] = React.useState(false);
  const [totalCountUsersSearch, setTotalCountUsersSearch] = React.useState(0);
  const { Search } = Input;

  React.useEffect(() => {
    setIsLoading(true);
    searchAPI.search(props.searchTemp).then((data) => {
      props.setUsers(data.items);
      setTotalCountUsersSearch(data.total_count);
      setIsLoading(false);
    });
  }, [props.searchTemp]);
  return (
    <div className="search-form__form ">
      <Badge
        className="search-form__badge"
        count={
          totalCountUsersSearch || (
            <ClockCircleOutlined style={{ color: "#f5222d" }} />
          )
        }
      >
        <Search
          onChange={(e) => setTempSearch(e.currentTarget.value)}
          value={tempSearch}
          title="search-form__input-title"
          className="search-form__input"
          type="text"
          placeholder="Введіть текст пошуку "
          size="middle"
          loading={isLoading}
          allowClear
          enterButton="Пошук"
          onPressEnter={() => {
            props.setSearchTemp(tempSearch);
          }}
          onSearch={() => {
            props.setSearchTemp(tempSearch);
          }}
        />
      </Badge>
    </div>
  );
};
