import styled from "styled-components";

/**
 * Credit: https://cssloaders.github.io/
 */
export const Spinner = styled.span`
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;
  background: rgb(0, 119, 130);
  box-sizing: border-box;
  animation: zeroRotation 1s ease infinite alternate-reverse;

  @keyframes zeroRotation {
    0% {
      transform: scale(1) rotate(0deg);
    }
    100% {
      transform: scale(0) rotate(360deg);
    }
  }
`;
