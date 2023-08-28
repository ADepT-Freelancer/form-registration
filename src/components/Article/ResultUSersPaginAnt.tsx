import { Avatar, List } from "antd";
import { useEffect, useState } from "react";
import {
	PaginationAlign,
  PaginationPosition,
  SearchFormUsersAntdType,
  UserDetailsType,
  UserType,
} from "../types/types";
import { UserDetails } from "./UserDetails";
import axios from "axios";

export const ResultUSersPaginAnt: React.FC<
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
