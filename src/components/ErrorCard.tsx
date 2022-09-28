import { PropsWithChildren } from "react";
import styled from "styled-components";

const Container = styled.p`
  background-color: #f44336;
  color: white;
  border-radius: 4px;
  padding: 32px;
`;

export default function ErrorCard({ children }: PropsWithChildren) {
  return <Container>{children}</Container>;
}
