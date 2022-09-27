import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const Container = styled.button`
  padding: 8px 16px;

  font-size: 1.375rem;

  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 999px;
  color: white;
  background-color: transparent;

  cursor: pointer;

  transition: 0.5s;

  &:hover {
    color: black;
    background-color: white;
  }
`;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export default function Button({ label, ...rest }: ButtonProps) {
  return <Container {...rest}>{label}</Container>;
}
