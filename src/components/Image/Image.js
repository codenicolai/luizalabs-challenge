import React from "react";

import styled, { css } from "styled-components";

import { width, position, space } from "styled-system";

const ImageStyled = styled.img`
  width: 100%;
  ${width}
  ${position}
  ${space} 

  ${(props) =>
    props.onClick &&
    css`
      cursor: pointer;
    `}
`;

export const Image = ({ img, ...props }) => {
  return <ImageStyled src={img} {...props} />;
};
