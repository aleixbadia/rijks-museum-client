import React, { useState } from "react";
import authService from "../services/auth.service";
import { Form, Input, Button, Typography } from "antd";
import { useHistory } from "react-router-dom";

const { Title } = Typography;

function Login(): JSX.Element {
  const [wrongAccount, setWrongAccount] = useState<string>("");
  const history = useHistory();
  const onFinish = (values: { username: string; password: string }) => {
    const { username, password } = values;
    authService.signup(username, password).then((response) => {
      if (response === "exists") {
        setWrongAccount("User alredy exists");
      } else if (response === "improper") {
        setWrongAccount("Improper values");
      } else if (response === "success") {
        setWrongAccount("");
        history.push("/");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Title level={2}> Create a new account</Title>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "20px",
          width: "100%",
        }}
      >
        <Form.Item
          label="Username"
          name="username"
          style={{
            width: "80%",
          }}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          style={{
            width: "80%",
          }}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {wrongAccount?(
        <Title level={4} style={{
          color: "red",
        }}>
        {wrongAccount}
      </Title>
      ):(<></>)}
    </div>
  );
}

export default Login;
