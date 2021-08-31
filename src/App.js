import "./styles.css";
import "antd/dist/antd.css";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import styled from "styled-components";

import { Raffle } from "./components/Raffle/Raffle";

const WhiteHeader = styled.h1`
  color: white;
`;

export default function App() {
  return (
    <Layout>
      <Header>
        {" "}
        <WhiteHeader>FE Huddle Flash talk raffle</WhiteHeader>
      </Header>
      <Content>
        <Raffle />
      </Content>
      <Footer>&copy; FE DB Regtech Huddle 2021</Footer>
    </Layout>
  );
}
