import {
  extendTheme,
  theme as defaultTheme,
  ColorMode,
} from "@chakra-ui/react";

const config: { initialColorMode: ColorMode; useSystemColorMode: boolean } = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  fonts: {
    heading: "Poppins",
    body: "Inter",
  },
  colors: {
    brand: "#52FF00",
    "brand-dark": "#38CB89",
    accent: "#3300FF",
    text: "#323B4B",
    subtle: "#8A94A6",
    border: "#F3F3F3",
    informational: "#A0AEC0",
    critical: "#FF5C00",
    high: "#FF5C00",
    medium: "#FFE600",
    low: "#38CB89",
    "high-subtle": "#FFECE8",
    bg: {
      subtle: "#FAFBFC",
    },
  },
  styles: {
    global: {
      "html, body": {
        color: "text",
        bg: "white",
        fontWeight: 500,
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "15px",
      },
      variants: {
        brand: (props) => ({
          ...defaultTheme.components.Button.variants.outline(props),
          background:
            "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)",
          color: "black",
          fontSize: "15px",
          py: 6,
          _hover: {
            background:
              "linear-gradient(129.18deg, #52FF00 10.52%, #00EEFD 93.94%)",
            _disabled: {
              background:
                "linear-gradient(129.18deg, #52FF00 10.52%, #00EEFD 93.94%)",
            },
          },
          _active: {
            background:
              "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)",
          },
        }),
        "accent-ghost": (props) => ({
          ...defaultTheme.components.Button.variants.ghost(props),
          background: "white",
          color: "#3300FF",
          fontSize: "15px",
          py: 6,
          _hover: {
            background: "#f7f5ff",
          },
          _active: {
            background: "#efebff",
          },
        }),
        "accent-outline": (props) => ({
          ...defaultTheme.components.Button.variants.outline(props),
          background: "#F5F2FF",
          color: "#000000",
          fontSize: "15px",
          borderColor: "#C1B1FF",
          py: 6,
          _hover: {
            background: "#f7f5ff",
          },
          _active: {
            background: "#efebff",
          },
        }),
      },
    },
    Input: {
      parts: ["field", "addon"],
      sizes: {
        lg: {
          field: {
            borderRadius: "15px",
          },
        },
      },
      variants: {
        brand: (props) => {
          return {
            field: {
              ...defaultTheme.components.Input.variants.outline(props).field,
              borderRadius: "15px",
              borderWidth: "2px",
              fontSize: "15px",
              borderColor: "gray.100",
              fontWeight: 500,
              bg: "white",
              _hover: {
                borderColor: "gray.200",
              },
              _focus: {
                borderColor: "#52FF00",
                boxShadow: "0px 12px 23px rgba(107, 255, 55, 0.1)",
              },
            },
          };
        },
      },
    },

    Select: {
      parts: ["field", "addon"],
      sizes: {
        lg: {
          field: {
            borderRadius: "15px",
          },
        },
      },
      variants: {
        brand: (props) => {
          return {
            field: {
              ...defaultTheme.components.Input.variants.outline(props).field,
              borderRadius: "15px",
              borderWidth: "2px",
              fontSize: "15px",
              borderColor: "gray.100",
              fontWeight: 500,
              bg: "white",
              _hover: {
                borderColor: "gray.200",
              },
              _focus: {
                borderColor: "#52FF00",
                boxShadow: "0px 12px 23px rgba(107, 255, 55, 0.1)",
              },
            },
          };
        },
      },
    },
    Link: {
      variants: {
        subtle: {
          fontWeight: 500,
          color: "gray.400",
          _hover: {
            color: "gray.500",
          },
        },
        "subtle-without-underline": {
          fontWeight: 600,
          color: "gray.500",
          _hover: {
            textDecoration: "none",
            color: "gray.600",
          },
        },
        brand: {
          fontWeight: 500,
          color: "rgba(51, 0, 255, 0.8)",
          _hover: {
            color: "rgba(51, 0, 255,1)",
          },
        },
      },
    },
    Progress: {
      parts: ["track", "filledTrack", "label"],
      baseStyle: (props) => ({
        track: {
          borderRadius: "10px",
        },
        filledTrack: !props.isIndeterminate
          ? {
              bgColor: "#52FF00",
            }
          : {
              bgImage:
                "linear-gradient(to right,transparent 0%, #52FF00  30%, #00EEFD  40%,transparent 100%)",
            },
      }),
      variants: {
        high: {
          filledTrack: {
            bgColor: "high",
          },
        },
        medium: {
          filledTrack: {
            bgColor: "medium",
          },
        },
        low: {
          filledTrack: {
            bgColor: "low",
          },
        },
        critical: {
          filledTrack: {
            bgColor: "critical",
          },
        },
        informational: {
          filledTrack: {
            bgColor: "gray.300",
          },
        },
      },
    },
    Switch: {
      parts: ["container", "track", "thumb"],
      variants: {
        brand: {
          track: {
            bg: "gray.100",
            _checked: {
              bg: "gray.100",
            },
          },
          thumb: {
            bg: "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)",
          },
        },
      },
    },
  },
});
