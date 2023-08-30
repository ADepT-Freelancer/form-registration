import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row, message } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../Api/api";
import { login } from "../../store/slice/auth/store-auth";
import { useAppDispatch } from "../../utils/hook/customHooks";
import { authDataType } from "../types/types";
import { authAPI } from "./../../Api/auth-api";

export const Authorization: React.FC = () => {
  useEffect(() => {
    document.title = "Authorization";
  }, []);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [captchaUrl, setCaptchaUrl] = useState("");
  const getCaptchaUrl = async () => {
    let res = await authAPI.getCaptchaUrl();
    const captchaUrl = res.url;

    setCaptchaUrl(captchaUrl);
  };

  // const onFinish = (values: any) => {
  //   console.log("Received values of form: ", values);
  // };

  const handlerSubmit = async (values: authDataType) => {
    const userData = {
      email: values.email,
      password: values.password,
      rememberMe: values.remember,
      captcha: values.captcha,
    };
    let navTimeOut = () => navigate("/article");
    console.log(userData);
    const user = await instance.post("auth/login", userData);
    console.log("auth/login", user);

    if (user.data.resultCode === 0) {
      dispatch(login(user.data));
      success();
      setTimeout(navTimeOut, 2000);
    } else if (user.data.resultCode === 10) {
      getCaptchaUrl();
    } else {
      warning(user.data.messages);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("onFinishFailed:", errorInfo);
    error();
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Авторизація успішна!",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Будь-ласка заповніть корректно дані для входу!",
    });
  };

  const warning = (text: string) => {
    messageApi.open({
      type: "warning",
      content: text,
    });
  };
  return (
    <div className="authorization__wrapper">
      {contextHolder}

      <Form
        name="normal_login"
        className="login-form authorization__form"
        scrollToFirstError
        initialValues={{ remember: true }}
        onFinish={handlerSubmit}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          hasFeedback
          name="email"
          rules={[
            {
              required: true,
              message: "Будь ласка, введіть свою електронну пошту!",
            },
            {
              type: "email",
              message: "Введіть дійсну електронну пошту!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="password"
          // rules={[
          //   {
          //     required: true,
          //     message: "Заповніть будь-ласка пароль",
          //   },
          //   {
          //     whitespace: true,
          //     message: "Пароль має бути без пробілів",
          //   },
          //   {
          //     transform: (value) => {
          //       const isNumber = /(?=.*[0-9])/;
          //       return isNumber.test(value) && null;
          //     },

          //     message: ` Пароль має містити мінімум одну цифри `,
          //   },
          //   {
          //     transform: (value) => {
          //       const isSymbol = /(?=.*[!@#$%^&*])/;
          //       return isSymbol.test(value) && null;
          //     },

          //     message: `Пароль має містити спец.символи !, @, #, $, %, ^, &, *. `,
          //   },
          //   {
          //     transform: (value) => {
          //       const isMaxL = /(?=.*[A-Z])/;
          //       return isMaxL.test(value) && null;
          //     },

          //     message: `Пароль має містити мінімум одну велику літеру `,
          //   },
          //   {
          //     transform: (value) => {
          //       const isMinL = /(?=.*[a-z])/;
          //       return isMinL.test(value) && null;
          //     },

          //     message: `Пароль має містити мінімум одну маленьку літеру літеру `,
          //   },
          //   {
          //     min: 8,
          //     message: `Пароль має містити мінімум 8 символів `,
          //   },
          //   {
          //     max: 16,
          //     message: `Пароль має містити максимум 16 символів `,
          //   },
          // ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Запам'ятати мене</Checkbox>
          </Form.Item>

          <div>
            <a
              onClick={() => navigate("/forgetPassword")}
              className="login-form-forgot"
            >
              Забули пароль?
            </a>
          </div>
        </Form.Item>
        {captchaUrl && (
          <Form.Item
            label="Капча"
            extra="Ми повинні переконатися, що ви людина."
          >
            <div>
              <img src={captchaUrl} alt="captcha" />
            </div>

            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name="captcha"
                  noStyle
                  rules={[
                    {
                      required: false,
                      message: "Будь ласка, введіть Captcha, яку ви отримали!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Відправити капчу
                  <br />і авторизуватися
                </Button>
              </Col>
            </Row>
          </Form.Item>
        )}

        <Form.Item>
          {/* {isFormError && (
            <div className="authorization-form__errors">
              Будь-ласка переконайтесь що всі поля заповненні правильно
            </div>
          )} */}
          {!captchaUrl && (
            <>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Увійти
              </Button>
              {" aбо "}
            </>
          )}
          <a
            className={captchaUrl ? "auth-form__button" : ""}
            onClick={() => navigate("/registration")}
          >
            Зареєструватись
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};
