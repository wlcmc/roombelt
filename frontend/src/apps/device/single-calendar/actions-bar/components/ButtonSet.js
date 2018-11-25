import styled from "styled-components/macro";
import { Button } from "theme/index";

export default styled.div`
  display: inline-block;

  & ${Button} {
    border-radius: 0;
  }

  & ${Button} + ${Button} {
    margin-left: 0;
  }
`;
