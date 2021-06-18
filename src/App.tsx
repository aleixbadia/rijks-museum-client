import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import backgroundRoyal from "./images/royal_pattern.jpg";

import Gallery from "./components/Gallery";
import Details from "./components/Details";
import Donate from "./components/Donate";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

import { Layout, Menu } from "antd";
import { PictureOutlined, FileOutlined, TeamOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function App(): JSX.Element {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        className="site-layout-background"
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          textAlign: "center",
          color: "white",
        }}
      >
        <Link to={`/`}>
          <img
            src={process.env.PUBLIC_URL + "/rijksmuseumshop-logo.png"}
            alt="logo"
            style={{ width: "35%", minWidth: "300px" }}
          />
        </Link>
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 64,
          }}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<PictureOutlined />}>
              <Link to={`/`}>Gallery</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="2"><Link to={`/login`}>Login</Link></Menu.Item>
              <Menu.Item key="3"><Link to={`/signup`}>Sign up</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="4" icon={<FileOutlined />}>
              <Link to={`/donate`}>Donate</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <div style={{ backgroundImage: `url(${backgroundRoyal})` }}>
            <Content
              style={{
                margin: "90px 190px 60px",
                paddingTop: "20px",
                overflow: "initial",
                width: "80vw",
              }}
            >
              <div
                className="site-layout-content"
                style={{
                  padding: 24,
                  minHeight: 360,
                  backgroundColor: "white",
                  // backgroundImage: `url(${backgroundRoyal})`,
                }}
              >
                <Switch>
                  <Route exact path="/" component={Gallery} />
                  <Route
                    exact
                    path="/details/:objectNumber"
                    component={Details}
                  />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/donate" component={Donate} />
                </Switch>
              </div>
            </Content>
          </div>
          <Footer style={{ textAlign: "center" }}>
            PXL.Widgets - Rijks project by Aleix Badia
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
