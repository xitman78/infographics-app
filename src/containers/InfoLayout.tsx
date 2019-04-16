import React, { useState } from "react";
import { Layout, Menu, Icon } from "antd";
import { TimeseriesSearchAndSelect } from "@cognite/gearbox";
import BackgroundImage from "../components/BackgroundImage";

const { Header, Footer, Content, Sider } = Layout;

function getRandomColor(): string {
  return "#" + (((1 << 24) * Math.random()) | 0).toString(16);
}

interface InfoLayoutProps {
  logoutAction: () => void;
}

const InfoLayout: React.FC<InfoLayoutProps> = ({ logoutAction }) => {
  const [isSideBarOpened, setIsSideBarOpened] = useState<boolean>(false);
  const [timeserieIds, setTimeserieIds] = useState<number[]>([]);
  const [colorsMap, setColorsMap] = useState<{ [k: string]: string }>({});

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
          <BackgroundImage timeserieIds={timeserieIds} colorsMap={colorsMap} />
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
          <TimeseriesSearchAndSelect
            onTimeserieSelectionChange={(_, ts) => {
              if (timeserieIds.includes(ts.id)) {
                return; // duplicate
              }
              setTimeserieIds([...timeserieIds, ts.id]);
              setColorsMap({
                ...colorsMap,
                ...{ [ts.id.toString()]: getRandomColor() }
              });
            }}
            single
          />
        </Sider>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default InfoLayout;
