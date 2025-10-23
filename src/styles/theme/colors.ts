// color range can be from 50 to 900
// using these tools to get the range:
// https://smart-swatch.netlify.app/#FFCC00

export const baseThemeColors = {
  primary: {
    primary100: "#D4D4D4",
    primary700: "#4A4A4A",
    primary400: "#262321",
    primary800: "#231F20",
  },
  success: {
    success50: "#f0fdf4",
    success100: "#dcfce7",
    success200: "#bbf7d0",
    success300: "#86efac",
    success400: "#00AD4B",
    success500: "#22c55e",
    success600: "#16a34a",
    success700: "#15803d",
    success800: "#166534",
    success900: "#14532d",
  },
  information: {
    information100: "#8FFFE1",
    information200: "#67B0FF",
  },
  warning: {
    warning50: "#FFFBEB",
    warning100: "#FEF3C7",
    warning200: "#FDE68A",
    warning300: "#FCD34D",
    warning400: "#D4B200",
    warning500: "#F59E0B",
    warning600: "#D97706",
    warning700: "#B45309",
    warning800: "#92400E",
    warning900: "#78350F",
  },
  error: {
    error400: "#B32B2B",
    error500: "#B32E2C",
    error600: "#C91E2E",
  },

  gothic: {
    gothic400: "#6C91A1",
  },
  opal: {
    opal300: "#A0BAC3",
  },
};

export const darkColorsBase = {
  // taken from system
};

const colorTokens = {
  light: baseThemeColors,
  dark: darkColorsBase,
};

export const lightThemeTokenColors = {
  ...colorTokens.light.primary,
  ...colorTokens.light.success,
  ...colorTokens.light.information,
  ...colorTokens.light.warning,
  ...colorTokens.light.error,
  ...colorTokens.light.gothic,
  ...colorTokens.light.opal,
};

const background = "#141A19";
export const themeBrandColors = {
  // <category>.<property>.<surface>.<variant>.<state>
  button_bg_primary_default: "#b59022",
  button_bg_primary_disabled: "#F0F0F0",
  button_text_primary_default: "white",
  button_text_primary_disabled: "black",
  button_border_primary_default: "#b59022",
  button_border_primary_disabled: "#F0F0F0",

  button_bg_secondary_default: "transparent",
  button_bg_secondary_disabled: "transparent",
  button_text_secondary_default: "white",
  button_text_secondary_disabled: "white",
  button_border_secondary_default: "#b59022",
  button_border_secondary_disabled: "#b59022",

  button_text_clear_disabled: "#8A8A7E",
  button_text_clear_default: "#b59022",

  background: "#141A19",

  card_bg: "#1C2222",

  screen_bg_primary: "#141A19",
  screen_bg_secondary: "#172122",

  refresh_control: "#b59022",

  text_default: "black",
  text_primary: "#b59022",
  text_disabled: "#8F8F8F",
  text_body: "#E9E7E0",
  text_secondary: "#E8E8E8",
  text_tertiary: "white",
  text_highlight: baseThemeColors.error.error400,
  text_error: baseThemeColors.error.error600,
  text_subtext: "rgba(255,255,255,0.8)",
  highlight: "#E87575",

  chip_bg_active: "#b59022",
  chip_bg_inactive: "#1C2222",
  chip_text_active: "white",
  chip_text_inactive: "#8A8A7E",

  tag_bg_active: "#b59022",
  tag_bg_inactive: "white",
  tag_text_active: "white",
  tag_text_inactive: "black",

  header_title: "#b59022",
  header_bg: "#141A19",

  bottomsheet_handle: "#9D9D9D",
  bottomsheet_header_bg: background,
  bottomsheet_bg: background,
  bottomsheet_backdrop: "rgba(0, 0, 0, 0.9)",
  bottomsheet_inner_bg: background,

  highlight_danger: baseThemeColors.error.error400,

  select_bg: background,
  select_text: "white",
  select_icon: "white",

  badge_bg: "#b59022",
  badge_text: "white",

  pincode_bg_inactive: "#808080",
  pincode_bg_active: "#F0F0F0",
  pincode_border_inactive: "#808080",
  pincode_border_active: "#b59022",
  pincode_text_active: "black",
  pincode_text_inactive: "#8F8F8F",

  otp_bg_inactive: "#808080",
  otp_bg_active: "#F0F0F0",
  otp_border_inactive: "#808080",
  otp_border_active: "#b59022",
  otp_text_active: "black",
  otp_text_inactive: "#8F8F8F",

  input_bg_default: "#1F2421",
  input_bg_disabled: "#1b211e",
  input_text_default: "white",
  // input_text_default: "#B8B5B0",
  input_text_disabled: "#666764",
  input_border_default: "#3A403D",
  input_border_active: "#B59022",
  input_border_disabled: "#222622",
  input_cursor: "#BDB9B3",
  input_placeholder_default: "#B9B5B1",
  input_label_required: "#E87575",
  input_message_error: "#E87575",
  description_text: "#BAB6B2",
  success_text: "#7EB743",

  tabview_title: "",
  tabview_tab_bg_active: "",
  tabview_tab_bg_inactive: "",

  checkbox_bg_default: "",
  checkbox_bg_disabled: "",
  checkbox_border_default: "",
  checkbox_border_disabled: "",
  checkbox_icon_default: "",
  checkbox_icon_disabled: "",

  toast_bg_success: "#4CAF50",
  toast_bg_warning: baseThemeColors.warning.warning400,
  toast_bg_error: baseThemeColors.error.error400,

  indicator_active: "#b59022",
  indicator_inactive: "#6e7473",

  tabbar_indicator_active: "#b59022",
  tabbar_indicator_inactive: "#6e7473",
  tabbar_border: "#172122",
  tabbar_bg: "#141A19",
  tabbar_active: "#b59022",
  tabbar_inactive: "#717167",

  progressbar_active: "#B32E2C",
  progressbar_bg: "#fff",

  switch_bg_active: baseThemeColors.primary.primary400,
  switch_bg_inactive: "gray",
  switch_thumb_active: "white",
  switch_thumb_inactive: "white",

  checkbox_bg_active: baseThemeColors.primary.primary400,
  checkbox_bg_inactive: "white",
  checkbox_border: baseThemeColors.primary.primary400,

  paginationdot_active: baseThemeColors.error.error400,
  paginationdot_inactive: "white",

  list_rule_item_text_valid: "#4CAF50",
  list_rule_item_text_invalid: "white",

  divider: "#8A8A7E",
  border: "rgba(128, 128, 128, 1)",

  popup_bg: background,
  popup_backdrop: "rgba(0,0,0,0.6)",

  primary: "#b59022",

  icon_active: "#b59022",
  icon_inactive: "white",
  icon_disabled: "#717167",

  heading: "rgba(0, 0, 0, 0.5)",
  otp: "rgba(128, 128, 128, 1)",

  loading: "white",

  // cardBg: "#1E2423",

  radio_border_active: "#b59022",
  radio_border_inactive: "#3A403D",
  radio_indicator: "#b59022",
  radio_label_active: "#b59022",
  radio_label_inactive: "white",

  passwordValidText: "#00721D",

  pagination_dot_active: "#b59022",
  pagination_dot_inactive: "#262626",

  overlay: "rgba(0, 0, 0, 0.98)",

  image_placeholder: "#e0e0e0",

  segmented_control_bg: "#252728",
  segmented_control_text_active: "#b59022",
  segmented_control_text_inactive: "#b59022",
};

export const darkThemeTokenColors = {
  ...lightThemeTokenColors,
};
const themeBrandColorsDark = {
  ...themeBrandColors,
};
export const colors = {
  light: {
    ...lightThemeTokenColors,
    ...themeBrandColors,
  },
  dark: {
    ...darkThemeTokenColors,
    ...themeBrandColorsDark,
  },
};
