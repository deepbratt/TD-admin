import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme();

// * HEADER HEADING
theme.typography.h1 = {
  fontWeight: 700,
  fontSize: "56px",
  lineHeight: "62px",
};
theme.typography.h2 = {
  fontWeight: 700,
  fontSize: "24px",
  lineHeight: "28px",
};
theme.typography.h3 = {
  fontWeight: 700,
  fontSize: "18px",
  lineHeight: "25px",
};
theme.typography.h4 = {
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "16px",
};
theme.typography.h5 = {
  fontWeight: 700,
  fontSize: "14px",
  lineHeight: "19.6px",
};
theme.typography.h6 = {};

theme.typography.subtitle1 = {};
theme.typography.subtitle2 = {
  fontWeight: 300,
  fontSize: "16px",
  lineHeight: "22.5px",
};

theme.typography.body1 = {};
theme.typography.body2 = {
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "16px",
};

theme.typography.caption = {};

theme.typography.button = {};
