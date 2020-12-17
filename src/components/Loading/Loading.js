import React from "react";

import styled, { keyframes } from "styled-components";

import Box from "components/Box";

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const Loader = styled(Box)`
  /* border: 4px solid rgba(0, 0, 0, 0.1); */
  border: 4px solid ${({ theme }) => theme.colors.red};
  border-top: 4px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 0.6s linear infinite;
`;

export const Loading = ({ full, ...props }) => {
  if (full) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width={1}
        height={600}
      >
        <Loader {...props} />
      </Box>
    );
  }
  return <Loader {...props} />;
};
