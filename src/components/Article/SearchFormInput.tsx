import React from "react";
import { SearchFormInputType, SearchResult } from "../types/types";
import { Badge } from 'antd/lib';
import { ClockCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Input } from 'antd';

export const SearchFormInput: React.FC<SearchFormInputType> = (props) => {
  const [tempSearch, setTempSearch] = React.useState("fuchko");
  const [isLoading, setIsLoading] = React.useState(false);
  const [totalCountUsersSearch, setTotalCountUsersSearch] = React.useState(0);
  const { Search } = Input;

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get<SearchResult>(
        `https://api.github.com/search/users?q=${props.searchTemp}`
      )
      .then((res) => {
        props.setUsers(res.data.items);
        setTotalCountUsersSearch(res.data.total_count);
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
          placeholder="текст пошуку введення"
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
