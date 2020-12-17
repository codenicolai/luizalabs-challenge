import React from "react";

import styled from "styled-components";

import { width, position, space } from "styled-system";

const ImageStyled = styled.img`
  width: 100%;
  ${width}
  ${position}
  ${space}
`;

export const Image = ({ img, ...props }) => {
  return <ImageStyled src={img} {...props} />;
};
