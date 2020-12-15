import styled, { css } from "styled-components";
import {
  space,
  color,
  fontFamily,
  fontSize,
  fontWeight,
  textAlign,
  display,
  fontStyle,
  maxHeight,
} from "styled-system";

export const Text = styled.span`
  a {
    ${color};
    text-decoration: none;
  }
  ${fontStyle}
  ${maxHeight}
  ${display}
  ${fontSize}
  ${space};
  ${color};
  ${fontFamily};
  ${fontWeight};
  ${textAlign};
  ${(props) =>
    props.textTransform &&
    css`
      text-transform: ${props.textTransform};
    `};

  ${(props) =>
    props.truncate &&
    css`
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `};

  ${(props) =>
    props.onClick &&
    css`
      cursor: pointer;
    `};

  font-family: Verdana, Geneva, Tahoma, sans-serif;
  ${fontFamily};

  ${(props) =>
    props.onClick &&
    css`
      cursor: pointer;
    `}
`;
