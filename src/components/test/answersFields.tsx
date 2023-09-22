import { useEffect, useState } from "react";
import { Space, message, Button, Form, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

export const AnswersFields = () => {
  let i = 0;

  function fnDataButtons(text: string) {
    const arrayString = String(text)
      .trim()
      .split(" ")
      .map((el) => {
        return { id: ++i, text: el, isSelected: false };
      });
    return arrayString;
  }
  const initialText = "Помідори червоні, а банани високо.";
  const [dataButtons, setDataButtons] = useState(fnDataButtons(initialText));

  function addSentence(values: { input: string }) {
    !!values.input && setDataButtons(fnDataButtons(values.input));
  }
  type arrayElement = { id: number; text: string; isSelected: boolean };
  const dataDisplayField: arrayElement[] = [];
  function fnButtonsField(arr: arrayElement[]) {
    const newArr = arr.sort(() => Math.random() - 0.5);
    return newArr;
  }

  const [displayField, setDisplayField] = useState(dataDisplayField);
  const [buttonsField, setButtonsField] = useState(fnButtonsField(dataButtons));
  useEffect(() => {
    setButtonsField(fnButtonsField(dataButtons));
  }, [dataButtons]);

  const clickButtonsField = (id: number) => {
    const addItem = buttonsField.filter((item) =>
      item.id === id && !displayField.includes(item)
        ? { ...item, isSelected: true }
        : null
    );

    const updateButtonsField = buttonsField.map((item) =>
      item.id === id ? { ...item, isSelected: true } : { ...item }
    );

    return (
      setDisplayField([...displayField, ...addItem]),
      setButtonsField(updateButtonsField)
    );
  };

  const clickDisplayField = (id: number) => {
    const addItem = displayField.filter((item) =>
      item.id !== id ? item : null
    );

    const updateButtonsField = buttonsField.map((item) =>
      item.id === id ? { ...item, isSelected: false } : { ...item }
    );

    return setDisplayField(addItem), setButtonsField(updateButtonsField);
  };

  const elementButtonsField = buttonsField.map((item) => {
    return (
      <Button
        onClick={() => clickButtonsField(item.id)}
        key={item.id}
        disabled={item.isSelected}
      >
        {item.text}
      </Button>
    );
  });

  const elementDisplayField = displayField.map((item) => {
    return (
      <Button onClick={() => clickDisplayField(item.id)} key={item.id}>
        {item.text}
      </Button>
    );
  });
  //================================================
  //================================================

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Все вірно, ти молодець!",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Майже правильно, подивись уважніше",
    });
  };
  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "This is a warning message",
    });
  };
  useEffect(() => {
    if (displayField.length === buttonsField.length) {
      for (let i = 1; i < displayField.length; i++) {
        if (displayField[i - 1].id > displayField[i].id) return error();
      }
      success();
    }
  }, [displayField]);
  return (
    <div className="test__answersFields">
      {contextHolder}
      <Form
        name="test__answersFields"
        style={{ display: "flex" }}
        scrollToFirstError
        onFinish={addSentence}
      >
        <Form.Item name="input">
          <Space.Compact block>
            <Input allowClear placeholder="Введіть ваш запис" />
            <Button type="primary" htmlType="submit">
              <PlusCircleOutlined />
            </Button>
          </Space.Compact>
        </Form.Item>
      </Form>
      <Space direction="vertical">
        <Space
          wrap
          align="center"
          style={{
            width: "90%",
            minHeight: "3rem",
            backgroundColor: "#d1d1d1",
            padding: "5px 5px",
            borderRadius: "1rem",
            margin: "5px",
          }}
          direction="horizontal"
        >
          {!!elementDisplayField.length ? (
            elementDisplayField
          ) : (
            <div style={{ fontSize: "0.85rem" }}>
              Складіть правильне реченя зі слів нижче...
            </div>
          )}
        </Space>
        <Space wrap align="center" direction="horizontal">
          {elementButtonsField}
        </Space>
      </Space>
    </div>
  );
};
