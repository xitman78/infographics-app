import React from "react";
import { Layout } from "antd";
import BackgroundImage from "../components/BackgroundImage";

const { Header, Footer, Content } = Layout;

const InfoLayout = () => (
  <Layout style={{ minWidth: "100vh" }}>
    <Header>Header</Header>
    <Content>
      <BackgroundImage />
    </Content>
    <Footer>Footer</Footer>
  </Layout>
);

export default InfoLayout;
