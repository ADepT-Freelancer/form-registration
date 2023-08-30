import { useState, useEffect } from "react";
import { SearchUserType, UserType } from "../types/types";
import { SearchFormInput } from "./SearchFormInput";
import { ResultUSersPaginAnt } from "./ResultUSersPaginAnt";

export const Article = () => {
  useEffect(() => {
    document.title = "Search page";
  }, []);
  const initialTimeSeconds = 10;
  const [users, setUsers] = useState<SearchUserType[]>([]);
  const [userDetails, setUserDetails] = useState<null | UserType>(null);
  const [seconds, setSeconds] = useState(initialTimeSeconds);
  const [selectUsersChanged, setSelectUsersChanged] = useState("");
  const [searchTemp, setSearchTemp] = useState("fuchko");
  const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);

  return (
    <div className="setting-page__wrapper">
      Сторінка пошуку
      <div className="search-container">
        <SearchFormInput
          setUsers={setUsers}
          searchTemp={searchTemp}
          setSearchTemp={setSearchTemp}
        />

        <ResultUSersPaginAnt
          setSelectUsersChanged={setSelectUsersChanged}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          searchTemp={searchTemp}
          initialTimeSeconds={initialTimeSeconds}
          users={users}
          setUserDetails={setUserDetails}
          setSeconds={setSeconds}
          selectUsersChanged={selectUsersChanged}
          seconds={seconds}
          userDetails={userDetails}
        />
      </div>
    </div>
  );
};
