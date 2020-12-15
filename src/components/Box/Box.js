import styled, { css } from "styled-components";
import {
  space,
  color,
  border,
  borderColor,
  borderRadius,
  width,
  height,
  display,
  flexDirection,
  justifyContent,
  alignItems,
  backgroundImage,
  maxWidth,
  flex,
  borderBottom,
  minWidth,
  flexWrap,
  minHeight,
  backgroundSize,
  maxHeight,
  position,
  overflow,
  opacity,
} from "styled-system";

export const Box = styled.div`
  ${opacity}
  ${overflow}
  ${backgroundSize}
  ${position}
  ${space}
  ${flex}
  ${color}
  ${border}
  ${borderColor}
  ${borderRadius}
  ${borderBottom}
  ${width}
  ${height}
  ${display}
  ${flexDirection}
  ${flexWrap}
  ${justifyContent}
  ${alignItems}
  ${backgroundImage}
  ${maxWidth}
  ${maxHeight}
  ${minWidth}
  ${minHeight}

  ${(props) =>
    props.onClick &&
    css`
      cursor: pointer;
    `}
`;
