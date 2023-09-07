import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Input, Space, Tooltip, Form } from "antd";
import { useState } from "react";

export const ListInput = () => {
  const initialButtons = [
    { id: 1, name: "Помідори черрі з хвостиками" },
    { id: 2, name: "Картопля" },
    { id: 3, name: "Масло" },
    { id: 4, name: "Сметана" },
  ];
  const [idElement, setIdElement] = useState(initialButtons.length);
  const [buttons, setButtons] = useState(initialButtons);

  const addItem = (values: { input: string }) => {
    setIdElement(idElement + 1);
    setButtons((prev) => {
      const newArray = [...prev, { id: idElement + 1, name: values.input }];
      return newArray;
    });
  };

  const deleteButton = (id: number) => {
    setButtons((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };
  let counter = 0;
  let buttonsElement = buttons.map((p) => (
    <div
      key={p.id}
      style={{
        minWidth: "90%",
        backgroundColor: "#d1d1d1",
        padding: "5px 20px ",
        borderRadius: "1rem",
        margin: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span style={{ marginRight: "5px" }}> №{++counter} </span>
      <span style={{ flex: "1 1 100%" }}> {p.name}</span>
      <Tooltip title="Видалити запис">
        <Button
          onClick={() => deleteButton(p.id)}
          type="primary"
          shape="circle"
          icon={<DeleteOutlined />}
        />
      </Tooltip>
    </div>
  ));

  return (
    <>
      <Form
        name="test__list-input"
        style={{ display: "flex" }}
        scrollToFirstError
        onFinish={addItem}
      >
        <Form.Item name="input">
          <Input
            style={{ borderTopRightRadius: "0", borderBottomRightRadius: "0" }}
            allowClear
            placeholder="Введіть ваш запис"
          />
        </Form.Item>
        <Button
          style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}
          type="primary"
          htmlType="submit"
        >
          <PlusCircleOutlined />
        </Button>
      </Form>
      <Space direction="vertical">{buttonsElement}</Space>

      <div>Всього записів: {counter}</div>
    </>
  );
};
