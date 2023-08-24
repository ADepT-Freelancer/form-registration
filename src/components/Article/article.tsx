import React, { useEffect, useState } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Skeleton, Input } from "antd";
import axios from "axios";
import { Badge } from "antd/lib";

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
        <SearchFormUsers
          setSelectUsersChanged={setSelectUsersChanged}
          initialTimeSeconds={initialTimeSeconds}
          users={users}
          setUserDetails={setUserDetails}
          setSeconds={setSeconds}
        />
        <ResultUSersAnt
          searchTemp={searchTemp}
          setSelectUsersChanged={setSelectUsersChanged}
          initialTimeSeconds={initialTimeSeconds}
          users={users}
          setUserDetails={setUserDetails}
          setSeconds={setSeconds}
        />
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
        setTotalCountUsersSearch(res.data.total_count);
        setIsLoading(false);
      });
  }, [props.searchTemp]);
  return (
    <div className="search-form__form">
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
};
type SearchResult = { items: SearchUserType[]; total_count: number };
type UserType = {
  id: number;
  login: string;
  avatar_url: string;
};

// interface DataType {
//   gender?: string;
//   name: {
//     title?: string;
//     first?: string;
//     last?: string;
//   };
//   email?: string;
//   picture: {
//     large?: string;
//     medium?: string;
//     thumbnail?: string;
//   };
//   nat?: string;
//   loading: boolean;
// }

export const ResultUSersAnt: React.FC<SearchFormUsersAntdType> = (props) => {
  const count = 3;

  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SearchUserType[]>([
    { id: 1, login: "Artem" },
    { id: 2, login: "Andriy" },
  ]);
  const [list, setList] = useState<SearchUserType[]>(props.users);

  useEffect(() => {
    setInitLoading(false);
    setData(props.users);
    setList(props.users);
  
  }, [props.users]);
  console.log("data", data);
    console.log("list", list);
  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          login: "111",
          id: 222,
        }))
      )
    );

    // const newData = data.concat(props.users);
    // setData(newData);
    // setList(newData);
    setLoading(false);
    // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
    // In real scene, you can using public method of react-virtualized:
    // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
    window.dispatchEvent(new Event("resize"));
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>Відкрити ще</Button>
      </div>
    ) : null;

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          actions={[
            // <a key={item.id}>edit</a>,
            <a href="https://google.com" key={item.id}>
              more
            </a>,
          ]}
        >
          <Skeleton avatar title={false} active>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={
                    "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F18%2F18601.png&tbnid=-w5je8h-FB5FFM&vet=12ahUKEwiBsO6rm_CAAxVCi_0HHbWIBqEQMygCegQIARBb..i&imgrefurl=https%3A%2F%2Fwww.flaticon.com%2Fru%2Ffree-icon%2Fblank-avatar_18601&docid=8fEtotGrDA8A9M&w=512&h=512&q=%D0%BF%D1%83%D1%81%D1%82%D0%BE%D0%B9%20%D1%8E%D0%B7%D0%B5%D1%80&ved=2ahUKEwiBsO6rm_CAAxVCi_0HHbWIBqEQMygCegQIARBb"
                  }
                />
              }
              title={<a href="https://ant.design">{item.login}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
            <div>content</div>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};
