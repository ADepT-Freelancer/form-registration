import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    label: "Реєстрація",
    key: "registration",
    icon: <MailOutlined />,
    children: [
      {
        type: "group",
        label: "Реєстрація",
        children: [
          {
            label: "Реєстрація",
            key: "registration",
          },
          {
            label: "Авторизація",
            key: "auth",
          },

          {
            label: "Забув пароль",
            key: "forgetPassword",
          },
        ],
      },
    ],
  },

  {
    label: "Search page",
    key: "article",
    icon: <SettingOutlined />,
  },
  {
    label: "Домашня сторінка",
    key: "home",
    icon: <AppstoreOutlined />,
    // disabled: true,
  },
];

export const Header: React.FC = () => {
  const navigation = useNavigate();
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    navigation(`/${e.key}`);
    setCurrent(e.key);
  };

  return (
    <div className="header__wrapper">
      <Menu
        className="header__menu"
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};
