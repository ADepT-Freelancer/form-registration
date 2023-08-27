import { ClockCircleOutlined } from "@ant-design/icons";
import { Avatar, Input, List } from "antd";
import { Badge } from "antd/lib";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useOutsideClick } from "../../utils/hook/useOutsideClick";

export const Article = () => {
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

const UserDetails: React.FC<UserDetailsType> = (props) => {
  const isTimerFinished = () => props.setUserDetails(null);
  const elementRef = useRef(null);
  

  useOutsideClick(elementRef, isTimerFinished, !!props.userDetails);

  return (
    <div
      ref={elementRef}
      // className={"search-form__selected-user"}
      className={props.userDetails ? "search-form__selected-user" : " "}
    >
      {props.userDetails && (
        <div className="about-user__details">
          <Timer
            selectUsersChanged={props.selectUsersChanged}
            initialTimeSeconds={props.initialTimeSeconds}
            setSelectUsersChanged={props.setSelectUsersChanged}
            setSelectedUser={props.setSelectedUser}
            setSeconds={props.setSeconds}
            seconds={props.seconds}
            isTimerFinished={isTimerFinished}
          />

          <h2 className="about-user__name">
            {" "}
            {props.userDetails.login} {props.userDetails.id}
          </h2>

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
      props.setSelectUsersChanged("");
      props.setSelectedUser(null);
    };
  }, [props.selectUsersChanged]);

  return (
    <div className="timer__wrapper">
      <div className="timer__content">Time left: {seconds}</div>
    </div>
  );
};

const ResultUSersPaginAnt: React.FC<
  SearchFormUsersAntdType & UserDetailsType
> = (props) => {
  const positionOptions = ["top", "bottom", "both"];
  const alignOptions = ["start", "center", "end"];
  const [position, setPosition] = useState<PaginationPosition>("bottom");
  const [align, setAlign] = useState<PaginationAlign>("center");

  const data = props.users;
  // const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);

  useEffect(() => {
    if (props.selectedUser) {
      document.title = props.selectedUser.login;
      props.setSelectUsersChanged(props.selectedUser.login);
    }
  }, [props.selectedUser]);

  useEffect(() => {
    if (!!props.selectedUser) {
      axios
        .get<UserType>(
          `https://api.github.com/users/${props.selectedUser.login}`
        )
        .then((res) => {
          // props.setSeconds(props.initialTimeSeconds);
          props.setUserDetails(res.data);
        });
    }
  }, [props.selectedUser]);

  return (
    <div className="article__result-users-search-antd">
      <List
        pagination={{ position, align }}
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            onClick={() => {
              props.setSelectedUser(item);
            }}
            className="search-form__list-user"
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
                <span
                // href={item.url}
                >
                  {item.login}
                </span>
              }
              description={item.id}
            />
          </List.Item>
        )}
      />
      <UserDetails
        setSelectUsersChanged={props.setSelectUsersChanged}
        setSelectedUser={props.setSelectedUser}
        selectUsersChanged={props.selectUsersChanged}
        initialTimeSeconds={props.initialTimeSeconds}
        setSeconds={props.setSeconds}
        seconds={props.seconds}
        userDetails={props.userDetails}
        setUserDetails={props.setUserDetails}
      />
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
  setSelectedUser: (selectedUser: SearchUserType | null) => void;
  selectedUser: SearchUserType | null;
  searchTemp: string;
  setSelectUsersChanged: (selectUsersChanged: string) => void;
  initialTimeSeconds: number;
  setSeconds: (initialTimeSecond: number) => void;
  setUserDetails: (userDetails: UserType | null) => void;
  users: SearchUserType[];
};
type UserDetailsType = {
  setSelectedUser: (selectedUser: SearchUserType | null) => void;
  selectUsersChanged: string;
  initialTimeSeconds: number;
  setSeconds: (initialTimeSecond: number) => void;
  setSelectUsersChanged: (SelectUsersChanged: string) => void;
  seconds: number;
  userDetails: null | UserType;
  setUserDetails: (userDetails: null | UserType) => void;
};
type TimerType = {
  setSelectUsersChanged: (SelectUsersChanged: string) => void;
  setSelectedUser: (selectedUser: SearchUserType | null) => void;
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
type UserType = {
  id: number;
  login: string;
  avatar_url: string;
};
type PaginationPosition = "top" | "bottom" | "both";
type SearchResult = { items: SearchUserType[]; total_count: number };
type PaginationAlign = "start" | "center" | "end";

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
