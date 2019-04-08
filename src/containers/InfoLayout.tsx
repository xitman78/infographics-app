import React from "react";
import { Layout, Menu, Icon } from "antd";
import BackgroundImage from "../components/BackgroundImage";
import persistentData from "../services/PersistentData";

const { Header, Footer, Content } = Layout;

interface InfoLayoutProps {
  logoutAction: () => void;
}

const InfoLayout = ({logoutAction}: InfoLayoutProps) => (
  <Layout style={{ minHeight: "100vh" }}>
    <Header style={{ minHeight: "60px" }}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="1">Infograpohics</Menu.Item>
        <Menu.Item key="2"><Icon type="upload" style={{ fontSize: '20px' }} /></Menu.Item>
        <Menu.Item key="3">
          <Icon type="arrow-right"
            style={{ fontSize: '20px' }} 
            onClick={logoutAction}/>
        </Menu.Item>
      </Menu>
    </Header>
    <Content>
      <BackgroundImage />
    </Content>
    <Footer />
  </Layout>
);

export default InfoLayout;
