import { PropsWithChildren } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 16px;
  background-color: #e0e0e0;
`;

export default function Layout({ children }: PropsWithChildren) {
  return <Container>{children}</Container>;
}
