import { colors } from "./colors";
import { defineStyleConfig, extendTheme } from "@chakra-ui/react";

export const chakraTheme = extendTheme({
  colors: {
    ...colors,
  },
  components: {
    Input: defineStyleConfig({
      baseStyle: {
        field: {
          fontSize: "inherit",
        },
      },
      variants: {
        flushed: {
          field: {
            fontSize: "inherit",
            p: "0.8rem",
            h: "auto",
          },
        },
      },
    }),
    Button: {
      baseStyle: {
        fontSize: "inherit",
        borderRadius: "8px",
      },
      variants: {
        sky_primary: {
          fontSize: "1.6rem",
          bg: colors.primary,
          h: "auto",
          p: "1.6rem",
          color: "white",
          _disabled: {
            _hover: {
              bg: `${colors.primary} !important`,
            },
          },
        },
      },
    },
  },
  styles: {
    global: {
      html: {
        fontSize: "62.5%",
        width: "100%",
        height: "100%",
      },
      body: {
        backgroundColor: colors.light,
        fontSize: "1.6rem",
        width: "100%",
        height: "100%",
      },
      "#root": {
        display: "flex",
        width: "100%",
        minHeight: "100%",
      },
      button: {
        fontSize: "inherit",
      },
    },
  },
});
