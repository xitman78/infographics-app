import React from "react";
import { Layout, Menu } from "antd";
import BackgroundImage from "../components/BackgroundImage";

const { Header, Footer, Content } = Layout;

const InfoLayout = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="1">Infograpohics</Menu.Item>
        <Menu.Item key="2">Logout</Menu.Item>
      </Menu>
    </Header>
    <Content>
      <BackgroundImage />
    </Content>
    <Footer />
  </Layout>
);

export default InfoLayout;
