import { ClockCircleOutlined } from "@ant-design/icons";
import { Avatar, Input, List, Radio, Space } from "antd";
import {} from "antd";
import { Badge } from "antd/lib";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const Article = () => {
  const initialTimeSeconds = 3;
  const [users, setUsers] = useState<SearchUserType[]>([]);
  const [userDetails, setUserDetails] = useState<null | UserType>(null);
  const [seconds, setSeconds] = useState(initialTimeSeconds);
  const [selectUsersChanged, setSelectUsersChanged] = useState(" ");
  const [searchTemp, setSearchTemp] = useState("fuchko");

  return (
    <div className="setting-page__wrapper">
      Сторінка пошуку
      <div className="search-container">
        <SearchFormInput
          setUsers={setUsers}
          searchTemp={searchTemp}
          setSearchTemp={setSearchTemp}
        />
        {/* <SearchFormUsers
          setSelectUsersChanged={setSelectUsersChanged}
          initialTimeSeconds={initialTimeSeconds}
          users={users}
          setUserDetails={setUserDetails}
          setSeconds={setSeconds}
        /> */}

        <ResultUSersPaginAnt
          searchTemp={searchTemp}
          setSelectUsersChanged={setSelectUsersChanged}
          initialTimeSeconds={initialTimeSeconds}
          users={users}
          setUserDetails={setUserDetails}
          setSeconds={setSeconds}
        />
        {/* <ResultUSersAnt
          searchTemp={searchTemp}
          setSelectUsersChanged={setSelectUsersChanged}
          initialTimeSeconds={initialTimeSeconds}
          users={users}
          setUserDetails={setUserDetails}
          setSeconds={setSeconds}
        /> */}
        <UserDetails
          selectUsersChanged={selectUsersChanged}
          initialTimeSeconds={initialTimeSeconds}
          setSeconds={setSeconds}
          seconds={seconds}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
        />
      </div>
    </div>
  );
};

const SearchFormInput: React.FC<SearchFormInputType> = (props) => {
  const [tempSearch, setTempSearch] = useState("fuchko");
  const [isLoading, setIsLoading] = useState(false);
  const [totalCountUsersSearch, setTotalCountUsersSearch] = useState(0);
  const { Search } = Input;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<SearchResult>(
        `https://api.github.com/search/users?q=${props.searchTemp}`
      )
      .then((res) => {
        props.setUsers(res.data.items);
        console.log(res.data.items);
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
const SearchFormUsers: React.FC<SearchFormUsersType> = (props) => {
  const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
  useEffect(() => {
    if (selectedUser) {
      document.title = selectedUser.login;
      props.setSelectUsersChanged(selectedUser.login);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (!!selectedUser) {
      axios
        .get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
        .then((res) => {
          // props.setSeconds(props.initialTimeSeconds);
          props.setUserDetails(res.data);
        });
    }
  }, [selectedUser]);
  return (
    <div className="search-form__users">
      <ul className="users__list">
        {props.users.map((u: SearchUserType) => (
          <li
            key={u.id}
            className={selectedUser === u ? "search-form__selected-user" : ""}
            onClick={() => {
              setSelectedUser(u);
            }}
          >
            {u.login}
          </li>
        ))}
      </ul>
    </div>
  );
};
const UserDetails: React.FC<UserDetailsType> = (props) => {
  const isTimerFinished = () => props.setUserDetails(null);

  return (
    <div className="search-form__about-user">
      {props.userDetails && (
        <div className="about-user__details">
          <Timer
            selectUsersChanged={props.selectUsersChanged}
            initialTimeSeconds={props.initialTimeSeconds}
            setSeconds={props.setSeconds}
            seconds={props.seconds}
            isTimerFinished={isTimerFinished}
          />

          <h2 className="about-user__name"> {props.userDetails.login}</h2>

          <div className="details__avatar-box-ibg">
            <img
              className="details__avatar"
              src={props.userDetails.avatar_url}
              alt="avatar"
            />
          </div>
        </div>
      )}
    </div>
  );
};
const Timer: React.FC<TimerType> = (props) => {
  let [seconds, setSeconds] = useState(props.seconds);

  useEffect(() => {
    setSeconds(props.seconds);
  }, [props.seconds]);

  useEffect(() => {
    props.seconds === 0 && props.isTimerFinished();
    props.setSeconds(seconds);
    props.seconds === 0 && props.setSeconds(props.initialTimeSeconds);
  }, [seconds]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev - 1); // or we can use: (--seconds)
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [props.selectUsersChanged]);

  return (
    <div className="timer__wrapper">
      <div className="timer__content">Time left: {seconds}</div>
    </div>
  );
};

type SearchFormInputType = {
  setUsers: (users: SearchUserType[]) => void;
  setSearchTemp: (searchTemp: string) => void;
  searchTemp: string;
};
type SearchFormUsersType = {
  setSelectUsersChanged: (selectUsersChanged: string) => void;
  initialTimeSeconds: number;
  setSeconds: (initialTimeSecond: number) => void;
  setUserDetails: (userDetails: UserType | null) => void;
  users: SearchUserType[];
};
type SearchFormUsersAntdType = {
  searchTemp: string;

  setSelectUsersChanged: (selectUsersChanged: string) => void;
  initialTimeSeconds: number;
  setSeconds: (initialTimeSecond: number) => void;
  setUserDetails: (userDetails: UserType | null) => void;
  users: SearchUserType[];
};
type UserDetailsType = {
  selectUsersChanged: string;
  initialTimeSeconds: number;
  setSeconds: (initialTimeSecond: number) => void;
  seconds: number;
  userDetails: null | UserType;
  setUserDetails: (userDetails: null | UserType) => void;
};
type TimerType = {
  selectUsersChanged: string;
  initialTimeSeconds: number;
  isTimerFinished: () => void;
  seconds: number;
  setSeconds: (actualTime: number) => void;
};
type SearchUserType = {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
};
type SearchResult = { items: SearchUserType[]; total_count: number };
type UserType = {
  id: number;
  login: string;
  avatar_url: string;
};

type PaginationPosition = "top" | "bottom" | "both";

type PaginationAlign = "start" | "center" | "end";

const ResultUSersPaginAnt: React.FC<SearchFormUsersAntdType> = (props) => {
  const positionOptions = ["top", "bottom", "both"];

  const alignOptions = ["start", "center", "end"];

  const data = props.users;

  const [position, setPosition] = useState<PaginationPosition>("bottom");
  const [align, setAlign] = useState<PaginationAlign>("center");

  const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
  useEffect(() => {
    if (selectedUser) {
      document.title = selectedUser.login;
      props.setSelectUsersChanged(selectedUser.login);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (!!selectedUser) {
      axios
        .get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
        .then((res) => {
          // props.setSeconds(props.initialTimeSeconds);
          props.setUserDetails(res.data);
        });
    }
  }, [selectedUser]);

  return (
    <div className="article__result-users-search-antd">
      <List
        pagination={{ position, align }}
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            className={
              selectedUser?.id === item.id ? "search-form__selected-user" : ""
            }
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  size="large"
                  src={
                    item.avatar_url ||
                    `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`
                  }
                />
              }
              title={
                <a
                  // href={item.url}
                  onClick={() => {
                    setSelectedUser(selectedUser);
                    console.log(selectedUser)
                  }}
                >
                  {item.login}
                </a>
              }
              description={item.id}
            />
          </List.Item>
        )}
      />
    </div>
  );
};
