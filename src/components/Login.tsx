import React, { useState } from "react";
import authService from "../services/auth.service";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Typography } from "antd";

const { Title } = Typography;

function Login(): JSX.Element {
  const history = useHistory();
  const [wrongAccount, setWrongAccount] = useState<boolean>(false);

  const onFinish = (values: { username: string; password: string }) => {
    const { username, password } = values;
    authService
      .login(username, password)
      .then((response) => {
        if (response === "success") {
          setWrongAccount(false)
          history.push("/");
        } else {
          setWrongAccount(true)
        }
      })
      .catch((err) => console.log("auth-service - login error => ", err));
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
      <Title level={2}> Login with your account</Title>
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
      <Title level={5}>
        {" "}
        Create an account <Link to={`/signup`}>here</Link>
      </Title>
      {wrongAccount?(
        <Title level={4} style={{
          color: "red",
        }}>
        {"Incorrect username or password"}
      </Title>
      ):(<></>)}
    </div>
  );
}

export default Login;
