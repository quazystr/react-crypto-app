import { Layout, Card, Statistic, Typography, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { capitalize } from "../utils";
import CryptoContext from "../context/CryptoContext";
const { Sider } = Layout;

export const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#757575",
};

function AppSider() {
  const { assets } = useContext(CryptoContext);

  return (
    <Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <>
          <Card key={asset.id} style={{ marginBottom: "1rem" }}>
            <Statistic
              title={capitalize(asset.id)}
              value={asset.totalAmount}
              precision={2}
              styles={{
                content: { color: asset.grow ? "#3f8600" : "#cf1322" },
              }}
              prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="$"
            />
            <ul
              style={{
                marginBottom: "1rem",
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {[
                {
                  title: "Total Profit",
                  value: asset.totalProfit,
                  withTag: true,
                },
                { title: "Asset Amount", value: asset.amount, isPlain: true },
                // { title: "Difference", value: asset.growPercent },
              ].map((item, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <span>{item.title}</span>
                  <span>
                    {item.withTag && (
                      <Tag
                        style={{ marginRight: "0.5rem" }}
                        color={asset.grow ? "green" : "red"}
                      >
                        {asset.growPercent}%
                      </Tag>
                    )}
                    {item.isPlain && item.value}
                    {!item.isPlain && (
                      <Typography.Text type={asset.grow ? "success" : "danger"}>
                        {item.value.toFixed(2)}$
                      </Typography.Text>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </>
      ))}
    </Sider>
  );
}

export default AppSider;
