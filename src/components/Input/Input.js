import React from "react";

import styled, { css } from "styled-components";

import Flex from "components/Flex";
import Image from "components/Image";

const StyledInput = styled.input`
  height: 30px;
  background-color: ${(props) =>
    props.variant === "primary"
      ? props.theme.colors.pink
      : props.theme.colors.white};
  border-radius: 100px;
  border: none;

  color: ${(props) => props.theme.colors.red};

  ::placeholder {
    color: ${(props) => props.theme.colors.red};
  }

  padding-left: ${(props) => (props.icon ? 60 : 40)}px;
  padding-right: 40px;

  ${({ full }) =>
    full &&
    css`
      width: 100%;
    `}

  outline: 0;
`;

export const Input = ({ onChange, full, variant, icon, ...props }) => {
  return (
    <Flex width="100%" alignItems="center">
      {icon && (
        <Image
          ml="15px"
          width="15px"
          height="15px"
          position="absolute"
          src={icon}
        />
      )}
      <StyledInput
        full={full}
        variant={variant}
        placeholder="Procure por heróis"
        onChange={onChange}
        {...props}
      ></StyledInput>
    </Flex>
  );
};

Input.defaultProps = {
  variant: "primary",
  full: true,
};
