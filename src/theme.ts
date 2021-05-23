import {
  extendTheme,
  theme as defaultTheme,
  ColorMode,
} from '@chakra-ui/react';

const config: { initialColorMode: ColorMode; useSystemColorMode: boolean } = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  fonts: {
    heading: 'Poppins',
    body: 'Inter',
  },
  colors: {
    brand: '#52FF00',
    accent: '#3300FF',
    text: '#323B4B',
    subtle: '#8A94A6',
    border: '#F3F3F3',
    critical: '#FF5C00',
    medium: '#FFE600',
    low: '#38CB89',
    bg: {
      subtle: '#FAFBFC',
    },
  },
  styles: {
    global: {
      'html, body': {
        color: 'text',
        bg: 'white',
        fontWeight: 500,
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: '15px',
      },
      variants: {
        brand: (props) => ({
          ...defaultTheme.components.Button.variants.outline(props),
          background:
            'linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)',
          color: 'black',
          fontSize: '15px',
          py: 6,
          _hover: {
            background:
              'linear-gradient(129.18deg, #52FF00 10.52%, #00EEFD 93.94%)',
          },
          _active: {
            background:
              'linear-gradient(129.18deg, #52FF00 8.52%, #00EEFD 93.94%)',
          },
        }),
      },
    },
    Input: {
      parts: ['field', 'addon'],
      sizes: {
        lg: {
          field: {
            borderRadius: '15px',
          },
        },
      },
      variants: {
        brand: (props) => {
          return {
            field: {
              ...defaultTheme.components.Input.variants.outline(props).field,
              borderRadius: '15px',
              borderWidth: '2px',
              fontSize: '15px',
              borderColor: 'gray.100',
              fontWeight: 500,
              bg: 'white',
              _hover: {
                borderColor: 'gray.200',
              },
              _focus: {
                borderColor: '#52FF00',
                boxShadow: '0px 12px 23px rgba(107, 255, 55, 0.1)',
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
          color: 'gray.400',
          _hover: {
            color: 'gray.500',
          },
        },
        'subtle-without-underline': {
          fontWeight: 600,
          color: 'gray.500',
          _hover: {
            textDecoration: 'none',
            color: 'gray.600',
          },
        },
        brand: {
          fontWeight: 500,
          color: 'rgba(51, 0, 255, 0.8)',
          _hover: {
            color: 'rgba(51, 0, 255,1)',
          },
        },
      },
    },
    Progress: {
      parts: ['track', 'filledTrack', 'label'],
      baseStyle: (props) => ({
        track: {
          borderRadius: '10px',
        },
        filledTrack: !props.isIndeterminate
          ? {
              bgColor: '#52FF00',
            }
          : {
              bgImage:
                'linear-gradient(to right,transparent 0%, #52FF00  30%, #00EEFD  40%,transparent 100%)',
            },
      }),
      variants: {
        critical: {
          filledTrack: {
            bgColor: 'critical',
          },
        },
        medium: {
          filledTrack: {
            bgColor: 'medium',
          },
        },
        low: {
          filledTrack: {
            bgColor: 'low',
          },
        },
      },
    },
  },
});
