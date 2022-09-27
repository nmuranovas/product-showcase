import { PropsWithChildren } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #e0e0e0;
  border-radius: 24px;
  text-align: center;
  padding: 32px;
`;

export default function ErrorCard({ children }: PropsWithChildren) {
  return <Container>{children}</Container>;
}
