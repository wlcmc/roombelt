import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

import { PageLoaded } from "../../../../theme/index";

import Logo from "../../../Logo";
import CardAndFooterLayout from "../../../../theme/layouts/CardAndFooter";
import Footer from "../../../Footer";
import Button from "../../../../theme/components/Button";

const PageLogo = styled(Logo)`
  margin-bottom: 40px;
  display: block;
`;

const Message = styled.div`
  width: calc(100vw - 100px);
  max-width: 300px;
  margin: 30px 0;
  font-weight: 300;
`;

const Code = styled.div`
  display: block;
  margin: 20px 0;
  font-size: 28px;
`;

export default props => (
  <CardAndFooterLayout footer={<Footer/>}>
    <PageLoaded/>
    <PageLogo withName size={30}/>
    <Message>Type the following connection code in the administration panel.</Message>
    <Code>{props.connectionCode}</Code>
    <Button to={"/"} as={Link}>Back</Button>
  </CardAndFooterLayout>
);
