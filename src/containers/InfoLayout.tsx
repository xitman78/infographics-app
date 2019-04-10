import React, { useState } from "react";
import { Layout, Menu, Icon } from "antd";
import BackgroundImage from "../components/BackgroundImage";
import TimeSeriesSearch from "../components/TimeSeriesSearch";

const { Header, Footer, Content, Sider } = Layout;

interface InfoLayoutProps {
  logoutAction: () => void;
}

const InfoLayout: React.FC<InfoLayoutProps> = ({ logoutAction }) => {
  const [isSideBarOpened, setIsSideBarOpened] = useState<boolean>(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">Infographics</Menu.Item>
          <Menu.Item
            key="2"
            onClick={() => setIsSideBarOpened(!isSideBarOpened)}
          >
            <Icon type="search" style={{ fontSize: "20px" }} />
          </Menu.Item>
          <Menu.Item key="3" onClick={logoutAction}>
            <Icon type="arrow-right" style={{ fontSize: "20px" }} />
          </Menu.Item>
        </Menu>
      </Header>
      <Layout hasSider={true}>
        <Content style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <BackgroundImage />
        </Content>
        <Sider
          theme="light"
          collapsible
          collapsed={isSideBarOpened}
          defaultCollapsed={true}
          collapsedWidth={0}
          width={300}
          onCollapse={(collapsed: boolean) => setIsSideBarOpened(collapsed)}
        >
          <TimeSeriesSearch onTimeSerieSelected={() => null} />
        </Sider>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default InfoLayout;
