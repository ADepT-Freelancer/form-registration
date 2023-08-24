import { Button, Checkbox, Form, FormInstance, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../Api/api";
import { login } from "../../store/slice/auth/store-auth";
import store from "../../store/store";
import { useAppDispatch } from "../../utils/hook/customHooks";

export const _Authorization = () => {
  console.log("Initial State", store.getState().auth);

  const navigate = useNavigate();

  const SubmitButton = ({ form }: { form: FormInstance }) => {
    const [submittable, setSubmittable] = React.useState(false);

    // Watch all values
    const values = Form.useWatch([], form);

    React.useEffect(() => {
      form.validateFields({ validateOnly: true }).then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
    }, [values]);

    return (
      <Button type="primary" htmlType="submit" disabled={!submittable}>
        Submit
      </Button>
    );
  };
  const dispatch = useAppDispatch();

  // const onFinish = (values: any) => {
  //   console.log("Success:", values);
  // };

  const handlerSubmit = async (values: authDataType) => {
    const userData = {
      email: values.username,
      password: values.password,
      rememberMe: values.remember,
      captcha: false,
    };

    const user = await instance.post("auth/login", userData);
    console.log("auth/login", user);

    if (user.data.resultCode === 0) {
      dispatch(login(user.data));
      navigate("/article");
    } else {
      alert("Користувача не знайдено");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  const [form] = Form.useForm();

  return (
    <div className="authorization__wrapper">
      <Form
        className="authorization__form"
        form={form}
        name="authForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handlerSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Будь-ласка введіть ім'я користувача!",
            },

            {
              warningOnly: true,
              message: "warningOnly",
            },
            {
              whitespace: true,
              message: "Ім'я має бути без пробілів",
            },

            {
              transform: (value) => {
                const isWhiteSpace = /(?=.*[\s])/;
                return isWhiteSpace.test(value) ? false : null;
              },

              message: ` Ім'я має бути без пробілів `,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Будь-ласка введіть пароль!" },
            {
              min: 5,
              message: "Будь-ласка введіть пароль довший ніж 5 символів",
            },
            {
              whitespace: true,
              message: "Пароль має бути без пробілів",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <SubmitButton form={form} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <div>
            <span>У Вас немає аккаунта? </span>
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => navigate("/registration")}
            >
              Реєстрація
            </span>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

type authDataType = {
  password: string;
  remember: boolean;
  username: string;
};

export const Authorization: React.FC = () => {
  // const onFinish = (values: any) => {
  //   console.log("Received values of form: ", values);
  // };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handlerSubmit = async (values: authDataType) => {
    const userData = {
      email: values.username,
      password: values.password,
      rememberMe: values.remember,
      captcha: false,
    };

    const user = await instance.post("auth/login", userData);
    console.log("auth/login", user);

    if (user.data.resultCode === 0) {
      dispatch(login(user.data));
      navigate("/article");
    } else {
      console.log("Користувача не знайдено");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="authorization__wrapper">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handlerSubmit}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Будь ласка, введіть своє ім’я користувача!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Введіть свій пароль!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Запам'ятати мене</Checkbox>
          </Form.Item>

          <a
            onClick={() => navigate("/forgetPassword")}
            className="login-form-forgot"
          >
            Забули пароль
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Увійти
          </Button>{" "}
          aбо{" "}
          <a onClick={() => navigate("/registration")}>зареєструйтесь зараз!</a>
        </Form.Item>
      </Form>
    </div>
  );
};
