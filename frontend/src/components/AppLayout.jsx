import AppHeader from "./AppHeader";
import AppSider from "./AppSider";
import AppContent from "./AppContent";
import { Flex, Layout, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useContext } from "react";
import CryptoContext from "../context/CryptoContext";

export default function AppLayout() {
  const { loading } = useContext(CryptoContext);

  if (loading) {
    return <Spin indicator={<LoadingOutlined spin />} fullscreen />;
  }

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}
