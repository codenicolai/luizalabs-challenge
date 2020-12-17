import React from "react";
import propTypes from "prop-types";

import styled, { css } from "styled-components";

import Flex from "components/Flex";
import Image from "components/Image";

const InputVariants = {
  primary: css`
    background-color: ${(props) => props.theme.colors.pink};
  `,
  secondary: css`
    background-color: ${(props) => props.theme.colors.white};
  `,
};

const StyledInput = styled.input`
  height: 30px;
  border-radius: 100px;
  border: none;
  color: ${(props) => props.theme.colors.red};
  padding-left: ${(props) => (props.icon ? 60 : 40)}px;
  padding-right: 40px;
  outline: 0;

  ::placeholder {
    color: ${(props) => props.theme.colors.red};
  }

  ${({ full }) =>
    full &&
    css`
      width: 100%;
    `}

  ${(props) => InputVariants[props.variant]}
`;

export const Input = ({
  onClick,
  onChange,
  full,
  variant,
  icon,
  placeholder,
  ...props
}) => {
  return (
    <Flex onClick={onClick} width="100%" alignItems="center">
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
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      ></StyledInput>
    </Flex>
  );
};

Input.propTypes = {
  variant: propTypes.string,
  icon: propTypes.node,
  onClick: propTypes.func,
  onChange: propTypes.func,
  placeholder: propTypes.string,
  full: propTypes.bool,
};

Input.defaultProps = {
  variant: "primary",
  full: true,
};
