import { Button, Form, FormInstance, Input } from "antd";
import React, {useEffect} from "react";

export const ForgetPassword = () => {
  useEffect(() => {
    document.title = "Forget Password"
    
  }, []);
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
      <Button
      type="primary" htmlType="submit" disabled={!submittable}>
        Відправити пароль
      </Button>
    );
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const [form] = Form.useForm();

  return (
    <div className="forgetPassword__wrapper">
      <Form
        className="forgetPassword__form"
        form={form}
        name="authForm"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          // label="Ваша електронна пошта для відновлення паролю"
          rules={[
            {
              type: "email",
              message: "Вхід не є дійсним електронною поштою!",
            },
            {
              required: true,
              message: "Будь-ласка, введіть свою електронну пошту!",
            },
          ]}
        >
          <div>
          Ваша електронна пошта для відновлення паролю:
          <br />
            <Input
            
            />
          </div>
        </Form.Item>
        <Form.Item>
          <SubmitButton form={form} />
        </Form.Item>
      </Form>
    </div>
  );
};
