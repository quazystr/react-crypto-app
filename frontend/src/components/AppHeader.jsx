import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../context/CryptoContext";
import { useEffect, useState } from "react";
import CoinInfoModal from "./CoinInfoModal";
import AddAssetForm from "./AddAssetForm";
const { Header } = Layout;

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#757575",
};

function AppHeader() {
  const { crypto } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [select, setSelect] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 150);
  };

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  function handleSelect(value) {
    console.log(value);
    showLoading();
    setCoin(crypto.find((c) => c.id === value));
  }

  return (
    <Header style={headerStyle}>
      <Select
        mode="multiple"
        style={{ width: "250px" }}
        placeholder="Press / to open"
        onSelect={handleSelect}
        open={select}
        onClick={() => setSelect((prev) => !prev)}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: "20px" }}
              src={option.data.icon}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Asset
      </Button>
      <Modal
        footer={null}
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <CoinInfoModal coin={coin} />
      </Modal>
      <Drawer
        title="Add Asset"
        closable={{ "aria-label": "Close Button" }}
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnHidden
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Header>
  );
}

export default AppHeader;
