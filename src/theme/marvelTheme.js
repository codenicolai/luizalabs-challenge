const colors = {
  // grey scale
  white: "#ffffff",
  gray: "#8C8C8C ",
  lightGray: "#B9B9B9",
  black: "#404040",

  // topic
  red: "#FF1510",
  pink: "#FDECEC",
  green: "#E7F6E7",
};

const breakpoints = ["414px", "515px", "768px", "1024px", "1366px", "1920px"];

breakpoints.base = breakpoints[0];
breakpoints.mobile = breakpoints[1];
breakpoints.tablet = breakpoints[2];
breakpoints.web = breakpoints[3];
breakpoints.hd = breakpoints[4];
breakpoints.fullhd = breakpoints[5];

const fontWeights = [300, 500, 700, 900];
fontWeights.regular = fontWeights[0];
fontWeights.medium = fontWeights[1];
fontWeights.bold = fontWeights[2];

const space = [
  0,
  2,
  4,
  6,
  8,
  10,
  12,
  14,
  16,
  18,
  20,
  22,
  24,
  26,
  28,
  30,
  32,
  40,
  54,
  64,
  128,
  144,
  256,
];

const mediaQueries = Object.entries(breakpoints).reduce(
  (prev, [key, val]) => ({
    up: {
      ...prev.up,
      [key]: `@media screen and (min-width: ${val})`,
    },
    down: {
      ...prev.down,
      [key]: `@media screen and (max-width: ${val})`,
    },
  }),
  {
    up: {},
    down: {},
  }
);

export const theme = {
  colors,
  fontWeights,
  space,
  breakpoints,
  mediaQueries,
};
