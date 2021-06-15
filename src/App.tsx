import React, { Fragment, useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Details from "./pages/Details";
import "./App.css";

import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  HomeOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function App(): JSX.Element {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        className="site-layout-background"
        style={{ position: 'fixed', zIndex: 1, width: '100%', textAlign: "center", color: "white" }}
      >
        <img src={process.env.PUBLIC_URL + '/rijksmuseumshop-logo.png'} alt="logo" style={{ width: "35%", minWidth: "300px" }} />
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
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to={`/`}>Home</Link>
            </Menu.Item>

            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '50px 192px 0', overflow: 'initial', width: '80vw' }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/details/:objectNumber" component={Details} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            PXL.Widgets - Rijks project by Aleix Badia
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
