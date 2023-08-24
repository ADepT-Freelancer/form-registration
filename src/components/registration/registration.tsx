import React, { useState } from "react";
import type { CascaderProps } from "antd";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const residences: CascaderProps<DataNodeType>["options"] = [
  {
    value: "Україна",
    label: "Україна",
    children: [
      {
        value: "Київська область",
        label: "Київська область",
        children: [
          {
            value: "Київ",
            label: "Київ",
          },
        ],
      },
    ],
  },
  {
    value: "Мексика",
    label: "Мексика",
    children: [
      {
        value: "Округ Дістрито-Федераль",
        label: "Округ Дістрито-Федераль",
        children: [
          {
            value: "Мехико",
            label: "Мехико",
          },
        ],
      },
    ],
  },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const Registration: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="38">+38</Option>
        <Option value="39">+39</Option>
        <Option value="52">+52</Option>
      </Select>
    </Form.Item>
  );

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="USD">$</Option>
        <Option value="Грн">₴, грн</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <div className="registration__wrapper">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["Україна", "Київська область", "Київ"],
          prefix: "+38",
          suffix: "$",
        }}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="Електронна пошта"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: false,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            {
              required: false,
              message: "Заповніть будь-ласка пароль",
            },
            {
              whitespace: true,
              message: "Пароль має бути без пробілів",
            },
            {
              transform: (value) => {
                const isNumber = /(?=.*[0-9])/;
                return isNumber.test(value) && null;
              },

              message: ` Пароль має містити мінімум одну цифри `,
            },
            {
              transform: (value) => {
                const isSymbol = /(?=.*[!@#$%^&*])/;
                return isSymbol.test(value) && null;
              },

              message: `Пароль має містити спец.символи !, @, #, $, %, ^, &, *. `,
            },
            {
              transform: (value) => {
                const isMaxL = /(?=.*[A-Z])/;
                return isMaxL.test(value) && null;
              },

              message: `Пароль має містити мінімум одну велику літеру `,
            },
            {
              transform: (value) => {
                const isMinL = /(?=.*[a-z])/;
                return isMinL.test(value) && null;
              },

              message: `Пароль має містити мінімум одну маленьку літеру літеру `,
            },
            {
              min: 8,
              message: `Пароль має містити мінімум 8 символів `,
            },
            {
              max: 16,
              message: `Пароль має містити максимум 16 символів `,
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Підтвердити пароль"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: false,
              message: "Будь-ласка підтвердіть Ваш пароль",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Введені паролі не співпадають!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="nickname"
          label="Прізвисько"
          tooltip="Як ви хочете, щоб інші вас називали?"
          rules={[
            {
              required: false,
              message: "Будь ласка, введіть своє прізвисько!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="residence"
          label="Звичне місце проживання"
          rules={[
            {
              type: "array",
              required: false,
              message: "Виберіть своє місце проживання!",
            },
          ]}
        >
          <Cascader options={residences} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Номер телефону"
          rules={[{ required: false, message: "Введіть свій номер телефону!" }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="donation"
          label="Пожертва"
          rules={[
            { required: false, message: "Будь ласка, введіть суму пожертви!" },
          ]}
        >
          <InputNumber addonAfter={suffixSelector} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="website"
          label="Веб -сайт"
          rules={[
            { required: false, message: "Будь ласка, введіть веб -сайт!" },
          ]}
        >
          <AutoComplete
            options={websiteOptions}
            onChange={onWebsiteChange}
            placeholder="Введіть сайт"
          >
            <Input />
          </AutoComplete>
        </Form.Item>
        <Form.Item
          name="intro"
          label="Про себе"
          rules={[
            { required: false, message: "Будь ласка, введіть щось про себе" },
          ]}
        >
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Стать"
          rules={[{ required: false, message: "Виберіть стать!" }]}
        >
          <Select placeholder="Виберіть свою стать">
            <Option value="male">Чоловічий</Option>
            <Option value="female">Жіночий</Option>
            <Option value="other">Інший</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="select-multiple"
          label="Мови якими ви володієте"
          rules={[
            {
              required: false,
              message: 'Будь ласка, виберіть мови якими ви володієте"!',
              type: "array",
            },
          ]}
        >
          <Select mode="multiple" placeholder="Будь ласка, виберіть мови якими ви володієте">
            <Option value="english">English</Option>
            <Option value="franch">Franch</Option>
            <Option value="ukraine">Ukraine</Option>
            <Option value="germany">Germany</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Капча" extra="Ми повинні переконатися, що ви людина.">
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
              <Button>Отримати капчу</Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Повинен прийняти угоду")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            Я прочитав <a href="">угоду</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Зареєструватися
          </Button>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <div>
            <span>Забули пароль? </span>
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => navigate("/forgetPassword")}
            >
              Відновити пароль
            </span>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
