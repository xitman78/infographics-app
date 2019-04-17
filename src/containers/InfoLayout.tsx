import React, { useState } from "react";
import { Layout, Menu, Icon } from "antd";
import { TimeseriesSearchAndSelect } from "@cognite/gearbox";
import BackgroundImage from "../components/BackgroundImage";

const { Header, Footer, Content, Sider } = Layout;

function getRandomColor(): string {
  return "#" + (((1 << 24) * Math.random()) | 0).toString(16);
}

function getNewColorMap(
  map: { [k: string]: string },
  ids: number[]
): { [k: string]: string } {
  const newMap: { [k: string]: string } = {};
  for (const id of ids) {
    newMap[id] = map[id] || getRandomColor();
  }
  return newMap;
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
          style={{ height: "calc(100vh - 104px)", overflowY: "scroll" }}
          onCollapse={(collapsed: boolean) => setIsSideBarOpened(collapsed)}
        >
          <TimeseriesSearchAndSelect
            onTimeserieSelectionChange={tsIds => {
              setTimeserieIds(tsIds);
              setColorsMap(getNewColorMap(colorsMap, tsIds));
            }}
          />
        </Sider>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default InfoLayout;
