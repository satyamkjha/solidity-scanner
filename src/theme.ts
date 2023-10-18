import {
  extendTheme,
  theme as defaultTheme,
  ColorMode,
} from "@chakra-ui/react";
import { StyleFunctionProps } from "@chakra-ui/theme-tools";

const config: { initialColorMode: ColorMode; useSystemColorMode: boolean } = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  breakpoints: {
    sm: "330px",
    md: "768px",
    lg: "1350px",
    xl: "1600px",
    "2xl": "1920px",
  },
  config,
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
  colors: {
    brand: "#52FF00",
    "brand-dark": "#38CB89",
    accent: "#3300FF",
    text: "#323B4B",
    subtle: "#8A94A6",
    detail: "#4E5D78",
    border: "#F3F3F3",
    blue: "#3E15F4",
    informational: "#A0AEC0",
    critical: "#960D00",
    high: "#FF5C00",
    medium: "#FFE600",
    low: "#38CB89",
    gas: "#F795B4",
    "high-subtle": "#FFECE8",
    success: "#289F4C",
    pro: "#FAF9FF",
    beginner: "#EFFAFF",
    intermediate: "#FFEDE9",
    "pro-dark": "#806CCF",
    "beginner-dark": "#54C0EB",
    "intermediate-dark": "#FF5630",
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
      _focus: {
        outline: 0,
        boxShadow: "none",
      },
      variants: {
        brand: (props: StyleFunctionProps) => ({
          ...defaultTheme.components.Button.variants.outline(props),
          background:
            "linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)",
          boxShadow: "0px 4px 23px rgba(47, 248, 107, 0.45)",
          color: "black",
          fontSize: "15px",
          border: "none",
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
        dark: (props: StyleFunctionProps) => ({
          ...defaultTheme.components.Button.variants.outline(props),
          background: "black",
          color: "white",
          fontSize: "12px",
          borderRadius: "6px",
          py: 2,
          _hover: {
            background: "#1c1c1c",
            _disabled: {
              background: "#3d3d3d",
            },
          },
          _active: {
            background: "black",
          },
        }),
        white: (props: StyleFunctionProps) => ({
          ...defaultTheme.components.Button.variants.outline(props),
          background: "white",
          color: "black",
          fontSize: "16px",
          borderRadius: "6px",
          py: 6,
          _hover: {
            background: "#FFFFFF80",
            _disabled: {
              background: "#FFFFFF80",
            },
          },
        }),
        "accent-ghost": (props: StyleFunctionProps) => ({
          ...defaultTheme.components.Button.variants.ghost(props),
          background: "#FFFFFF00",
          color: "#3300FF",
          fontSize: "14px",
          py: 4,
          _hover: {
            background: "#f7f5ff",
          },
          _active: {
            background: "#efebff",
          },
        }),
        "accent-outline": (props: StyleFunctionProps) => ({
          ...defaultTheme.components.Button.variants.outline(props),
          background: "#F5F2FF",
          color: "blue",
          fontSize: "14px",
          borderColor: "#C1B1FF",
          py: 4,
          _hover: {
            background: "#f7f5ff",
          },
          _active: {
            background: "#efebff",
          },
        }),
        "white-ghost": (props: StyleFunctionProps) => ({
          ...defaultTheme.components.Button.variants.outline(props),
          // background: "#FFFFFF00",
          color: "#FFFFFF",
          fontSize: "16px",
          py: 5,
          border: "none",
          _hover: {
            background: "#2e2e2e80",
          },
          _active: {
            background: "#2e2e2e",
          },
        }),
        "cta-outline": (props: StyleFunctionProps) => ({
          ...defaultTheme.components.Button.variants.outline(props),
          background: "#FFFFFF00",
          color: "#3300FF",
          fontSize: "16px",
          borderColor: "#3300FF",
          border: "2px solid #3300FF",
          pt: 7,
          pb: 6,
          px: 10,
          _hover: {
            background: "#3300FF",
            color: "#FFFFFF",
          },
        }),
        label: (props: StyleFunctionProps) => ({
          ...defaultTheme.components.Button.variants.solid(props),
          fontSize: "16px",
          borderWidth: 0,
          borderRadius: 20,
          pt: 4,
          pb: 4,
          px: 8,
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
        brand: (props: StyleFunctionProps) => {
          return {
            field: {
              ...defaultTheme.components.Input.variants.outline(props).field,
              borderRadius: "15px",
              borderWidth: "1px",
              fontSize: "16px",
              borderColor: "gray.200",
              fontWeight: 400,
              bg: "white",
              _hover: {
                borderColor: "gray.300",
              },
              _focus: {
                borderColor: "#52FF00",
                boxShadow: "0px 12px 23px rgba(107, 255, 55, 0.1)",
              },
            },
          };
        },
        error: (props: StyleFunctionProps) => {
          return {
            field: {
              ...defaultTheme.components.Input.variants.outline(props).field,
              borderRadius: "15px",
              borderWidth: "2px",
              fontSize: "15px",
              borderColor: "#FF2400",
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
        brand: (props: StyleFunctionProps) => {
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
            color: "gray.600",
            textDecoration: "none",
          },
        },
        white: {
          fontWeight: 500,
          color: "white",
          _hover: {
            color: "white",
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
        accent: {
          fontWeight: 400,
          color: "accent",
          _hover: {
            textDecoration: "none",
          },
        },
        brand: {
          fontWeight: 500,
          color: "rgba(51, 0, 255, 0.8)",
          _hover: {
            color: "rgba(51, 0, 255,1)",
          },
        },
        navigation: {
          fontWeight: 500,
          color: "#000000",
          _hover: {
            color: "rgba(51, 0, 255,1)",
            textDecoration: "none",
          },
        },
      },
    },
    Progress: {
      parts: ["track", "filledTrack", "label"],
      baseStyle: (props: { isIndeterminate: any }) => ({
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
        gas: {
          filledTrack: {
            bgColor: "gas",
          },
        },
        informational: {
          filledTrack: {
            bgColor: "gray.300",
          },
        },
        blue: {
          filledTrack: {
            bgColor: "#3E15F4",
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
        disabled: {
          track: {
            bg: "gray.100",
            _checked: {
              bg: "gray.100",
            },
          },
          thumb: {
            bg: "#8A94A6",
          },
        },
        accent: {
          track: {
            bg: "gray.100",
            _checked: {
              bg: "gray.100",
            },
          },
          thumb: {
            bg: "#3300FF",
          },
        },
      },
    },
    Radio: {
      parts: ["container", "control", "label"],
      variants: {
        brand: {
          control: {
            borderRadius: "15px", // change the border radius
            borderWidth: "4px",
            borderColor: "#EFEFEF", // change the border color
            background: "#B0B7C3",
            _checked: {
              color: "#FFFFFF00",
              background: "linear-gradient(135deg, #52FF00 0%, #00EEFD 100%)",
            },
          },
          label: {
            textAlign: "left",
          },
        },
      },
    },
  },
});
