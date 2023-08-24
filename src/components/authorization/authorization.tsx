import { Button, Checkbox, Form, FormInstance, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Authorization = () => {
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

  const onFinish = (values: any) => {
    console.log("Success:", values);
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
        onFinish={onFinish}
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
              max: 16,
              message: "Ім'я має бути коротше за 16 символів",
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
              Articles
            </span>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
