/* eslint-disable no-shadow */
import React, { memo } from "react";
import { Button, Text } from "@chakra-ui/react";

type OauthHelperProps = {
  url: string;
  onSuccess: (code: string) => void;
  onFailure: (message: string | null) => void;
  providerUrlChecker: string;
  loading: boolean;
  variant: "new" | "reconnect";
};

const OauthHelper: React.FC<OauthHelperProps> = ({
  url,
  onSuccess,
  onFailure,
  providerUrlChecker,
  loading,
  variant,
}) => {
  const openPopup = () => {
    const width = 600;
    const height = 800;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    return window.open(
      url,
      "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );
  };

  function polling(popup: Window | null): void {
    const polling = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(polling);
        return onFailure("Popup has been closed by user");
      }

      const closeDialog = () => {
        clearInterval(polling);
        popup.close();
      };

      try {
        if (!popup.location.hostname.includes(providerUrlChecker)) {
          if (popup.location.search) {
            const query = new URLSearchParams(popup.location.search);
            const code = query.get("code");
            closeDialog();

            if (code) {
              return onSuccess(code);
            }

            if (onFailure) {
              onFailure(query.get("error"));
            }
          }
        }
      } catch (error) {
        console.error(error);
        // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
        // A hack to get around same-origin security policy errors in IE.
      }
    }, 500);
  }
  const handleClick = () => {
    polling(openPopup());
  };
  return variant === "new" ? (
    <Button
      variant="brand"
      onClick={handleClick}
      isLoading={loading}
      width="250px"
    >
      Connect
    </Button>
  ) : (
    <Button
      variant="accent-ghost"
      py={2}
      borderRadius="44px"
      fontSize="14px"
      onClick={handleClick}
    >
      <RefreshIcon size={14} />
      <Text ml={2}>Reconnect</Text>
    </Button>
  );
};

const RefreshIcon: React.FC<{ size: number }> = memo(({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        clipPath="url(#prefix__clip0)"
        stroke="#3E15F4"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19.168 3.333v5h-5M.832 16.667v-5h5" />
        <path d="M2.924 7.5a7.5 7.5 0 0112.375-2.8l3.866 3.633M.832 11.667L4.699 15.3a7.5 7.5 0 0012.375-2.8" />
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
});
export default OauthHelper;
