import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

import { Button, PageLoaded } from "../theme";
import Logo from "./Logo";
import Footer from "./Footer";
import CardAndFooterLayout from "../theme/layouts/CardAndFooter";

const PageLogo = styled(Logo)`
  margin-bottom: 40px;
  display: block;
`;

const MenuButton = styled(Button)`
  width: calc(100vw - 100px);
  max-width: 300px;
  margin: 20px 0;
  text-decoration: none;
`;

const SimpleLink = ({ to, className, children }) => <Link to={to} className={className} children={children}/>;

export default () => (
  <CardAndFooterLayout footer={<Footer/>}>
    <PageLoaded/>
    <PageLogo withName size={30}/>
    <MenuButton block to={"/admin"} as={SimpleLink} primary>Log in to admin panel</MenuButton>
    <MenuButton block to={"/device"} as={SimpleLink}>Register device</MenuButton>
  </CardAndFooterLayout>
);
