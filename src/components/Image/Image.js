import React from "react";

import styled from "styled-components";

import { width } from "styled-system";

const ImageStyled = styled.img`
  width: 100%;
  ${width}
`;

export const Image = ({ img, ...props }) => {
  return <ImageStyled src={img} {...props} />;
};
