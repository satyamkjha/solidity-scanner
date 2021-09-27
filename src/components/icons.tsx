import React from "react";
import { HStack, Heading, Box } from "@chakra-ui/react";

export const LogoIcon: React.FC<{ size: number }> = ({ size, ...props }) => {
  const gradientId = "_" + Math.random().toString(36).substr(2, 9);
  return (
    <svg
      width={size}
      height={(29 / 32) * size}
      viewBox="0 0 32 29"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.556 2.056v7.777h3.11V3.611h6.223V.5H3.11a1.556 1.556 0 00-1.555 1.556zm28 7.777V2.056A1.555 1.555 0 0028 .5h-7.778v3.111h6.222v6.222h3.112zM26.444 25.39h-6.222V28.5H28a1.555 1.555 0 001.556-1.556v-7.777h-3.112v6.222zM10.89 28.5v-3.111H4.667v-6.222H1.556v7.777A1.556 1.556 0 003.11 28.5h7.778zM0 12.944h31.111v3.112H0v-3.112z"
        fill={`url(#${gradientId})`}
      />
      <defs>
        <linearGradient
          id={gradientId}
          x1="3"
          y1="2.5"
          x2="29.5"
          y2="26.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#52FF00" />
          <stop offset="1" stopColor="#00EEFD" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const Logo: React.FC = () => {
  return (
    <HStack>
      <LogoIcon size={35} />
      <Heading fontSize={["xl", "xl", "2xl"]} fontWeight={700} color="black">
        Solidity Scan
      </Heading>
    </HStack>
  );
};

export const MailSent: React.FC<{ size: number }> = ({ size, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 129 129"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={64.5} cy={64.5} r={64.5} fill="#F4F8FF" />
      <path
        opacity={0.3}
        d="M44.219 90.52c-.699 0-1.398-.279-1.957-.838l-5.59-5.59c-1.118-1.118-1.118-2.795 0-3.913 1.118-1.118 2.935-1.118 3.913 0l3.634 3.633 9.224-9.224c1.118-1.117 2.795-1.117 3.913 0 1.118 1.119 1.118 2.796 0 3.914l-11.18 11.18c-.56.56-1.258.839-1.957.839z"
        fill="#30F"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M67.869 82.5c-.75-11.401-10.236-20.417-21.827-20.417-1.498 0-2.962.151-4.375.438V50.417a5.833 5.833 0 015.833-5.834h40.834a5.833 5.833 0 015.833 5.834v26.25a5.833 5.833 0 01-5.834 5.833H67.87zm17.97-32.551l-17.922 9.65-17.921-9.65a2.188 2.188 0 10-2.075 3.852L66.88 64.01a2.188 2.188 0 002.074 0l18.958-10.208a2.188 2.188 0 00-2.074-3.852z"
        fill="#30F"
      />
    </svg>
  );
};

export const MailLock: React.FC<{ size: number }> = ({ size, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 129 129"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={64.5} cy={64.5} r={64.5} fill="#F4F8FF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M66.869 82.5c-.75-11.401-10.236-20.417-21.827-20.417-1.499 0-2.962.15-4.375.438V50.417a5.833 5.833 0 015.833-5.834h40.833a5.833 5.833 0 015.834 5.834v26.25a5.833 5.833 0 01-5.834 5.833H66.87zm17.969-32.551l-17.921 9.65-17.922-9.65a2.187 2.187 0 10-2.074 3.852L65.88 64.009a2.188 2.188 0 002.074 0l18.958-10.208a2.188 2.188 0 00-2.074-3.852z"
        fill="#30F"
      />
      <path
        opacity={0.3}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M52.333 79.583A2.917 2.917 0 0155.25 82.5v8.75a2.917 2.917 0 01-2.917 2.917H37.75a2.917 2.917 0 01-2.917-2.917V82.5a2.917 2.917 0 012.917-2.917v-1.458a7.292 7.292 0 0114.583 0v1.458zm-7.291-5.833a4.375 4.375 0 00-4.375 4.375v1.458h8.75v-1.458a4.375 4.375 0 00-4.375-4.375z"
        fill="#30F"
      />
    </svg>
  );
};
// Menu Icons

export const HomeMenuIcon: React.FC<{ size: number; active?: boolean }> = ({
  size,
  active,
  ...props
}) => {
  const iconColor = active ? "#04B79C" : "#3300FF";
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.5 4h-4A1.5 1.5 0 004 5.5v4A1.5 1.5 0 005.5 11h4A1.5 1.5 0 0011 9.5v-4A1.5 1.5 0 009.5 4z"
        style={{ transition: "0.3s fill" }}
        fill={iconColor}
      />
      <path
        opacity={0.3}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 13h4a1.5 1.5 0 011.5 1.5v4A1.5 1.5 0 019.5 20h-4A1.5 1.5 0 014 18.5v-4A1.5 1.5 0 015.5 13zm9-9h4A1.5 1.5 0 0120 5.5v4a1.5 1.5 0 01-1.5 1.5h-4A1.5 1.5 0 0113 9.5v-4A1.5 1.5 0 0114.5 4zm0 9h4a1.5 1.5 0 011.5 1.5v4a1.5 1.5 0 01-1.5 1.5h-4a1.5 1.5 0 01-1.5-1.5v-4a1.5 1.5 0 011.5-1.5z"
        style={{ transition: "0.3s fill" }}
        fill={iconColor}
      />
    </svg>
  );
};

export const ProjectsMenuIcon: React.FC<{ size: number; active?: boolean }> = ({
  size,
  active,
  ...props
}) => {
  const iconColor = active ? "#04B79C" : "#3300FF";
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity={0.3}
        d="M5.857 2h7.88a1.5 1.5 0 01.968.355l4.764 4.029A1.5 1.5 0 0120 7.529v12.554c0 1.79-.02 1.917-1.857 1.917H5.857C4.02 22 4 21.874 4 20.083V3.917C4 2.127 4.02 2 5.857 2z"
        fill={iconColor}
        style={{ transition: "0.3s fill" }}
      />
      <path
        d="M14 11H7a1 1 0 100 2h7a1 1 0 100-2zM10 15H7a1 1 0 100 2h3a1 1 0 100-2z"
        style={{ transition: "0.3s fill" }}
        fill={iconColor}
      />
    </svg>
  );
};

export const IntegrationMenuIcon: React.FC<{ size: number; active?: boolean }> =
  ({ size, active, ...props }) => {
    const iconColor = active ? "#04B79C" : "#3300FF";

    return (
      <svg
        width={size}
        height={(size * 22) / 28}
        viewBox="0 0 18 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M11.37 21.5h-5V19c-6.8-2-6.833-8.833-6-12h17c1.6 7.6-3.333 11.167-6 12v2.5z"
          fill={active ? "#98FDAC" : "#B0A1ED"}
        />
        <rect
          x={8.658}
          y={9.344}
          width={1.939}
          height={4.696}
          rx={0.97}
          transform="rotate(31.284 8.658 9.344)"
          fill={iconColor}
        />
        <rect
          x={9.4}
          y={11.73}
          width={1.939}
          height={4.696}
          rx={0.97}
          transform="rotate(34.426 9.4 11.73)"
          fill={iconColor}
        />
        <path
          d="M3.559 1.5a1.5 1.5 0 013 0V7h-3V1.5zM11.443 1.5a1.5 1.5 0 113 0V7h-3V1.5z"
          fill={iconColor}
        />
      </svg>
    );
  };

export const BillingMenuIcon: React.FC<{ size: number; active?: boolean }> = ({
  size,
  active,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="prefix__a"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={size}
        height={size}
      >
        <path fill="#C4C4C4" d="M0 0h24v24H0z" />
      </mask>
      <g mask="url(#prefix__a)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d={
            active
              ? "M21.441 1.502l1.632 1.632a2 2 0 01.585 1.414V9.99a2 2 0 01-.585 1.414L11.666 22.81a2 2 0 01-2.828 0l-7.424-7.424a2 2 0 010-2.828L12.777 1.195a2 2 0 011.519-.583l5.836.307a2 2 0 011.31.583zM16.955 7.27a1.673 1.673 0 102.366-2.366 1.673 1.673 0 00-2.366 2.366z"
              : "M21.441 1.503l1.632 1.631a2 2 0 01.586 1.415v5.44a2 2 0 01-.586 1.414L11.666 22.81a2 2 0 01-2.828 0l-7.423-7.424a2 2 0 010-2.828L12.777 1.195a2 2 0 011.52-.583l5.835.308a2 2 0 011.31.583zm-4.485 5.766a1.673 1.673 0 102.366-2.366 1.673 1.673 0 00-2.366 2.366z"
          }
          fill="#fff"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d={
            active
              ? "M21.441 1.502l1.632 1.632a2 2 0 01.585 1.414V9.99a2 2 0 01-.585 1.414L11.666 22.81a2 2 0 01-2.828 0l-7.424-7.424a2 2 0 010-2.828L12.777 1.195a2 2 0 011.519-.583l5.836.307a2 2 0 011.31.583zM16.955 7.27a1.673 1.673 0 102.366-2.366 1.673 1.673 0 00-2.366 2.366z"
              : "M21.441 1.503l1.632 1.631a2 2 0 01.586 1.415v5.44a2 2 0 01-.586 1.414L11.666 22.81a2 2 0 01-2.828 0l-7.423-7.424a2 2 0 010-2.828L12.777 1.195a2 2 0 011.52-.583l5.835.308a2 2 0 011.31.583zm-4.485 5.766a1.673 1.673 0 102.366-2.366 1.673 1.673 0 00-2.366 2.366z"
          }
          style={{ transition: "fill 0.2s ease" }}
          fill={active ? "#04B79C" : "#C2B3FF"}
        />
        <rect
          x={22.878}
          y={0.558}
          width={1.115}
          height={6.703}
          rx={0.558}
          transform="rotate(45 22.878 .558)"
          fill={active ? "#38CB89" : "#30F"}
        />
        <path
          d={
            active
              ? "M14.037 10.503c-1.176-1.176-2.764-1.494-3.548-.71-.785.784-.467 2.373.71 3.549 1.175 1.176 1.493 2.764.71 3.548-.785.785-2.374.467-3.55-.71m5.678-5.677L8.36 16.18m5.678-5.678c.788.787 1.191 1.761 1.135 2.554l-1.135-2.554zm0 0l.71-.71M8.36 16.18l-.71.71m.71-.71c-.787-.788-1.19-1.762-1.135-2.555l1.135 2.555z"
              : "M14.038 10.503c-1.176-1.176-2.765-1.494-3.55-.71-.783.784-.465 2.373.71 3.549 1.177 1.176 1.495 2.764.71 3.548-.784.785-2.372.467-3.548-.71m5.678-5.677L8.36 16.18m5.678-5.678c.787.787 1.19 1.761 1.135 2.554l-1.135-2.554zm0 0l.71-.71M8.36 16.18l-.71.71m.71-.71c-.788-.788-1.191-1.762-1.135-2.555l1.135 2.555z"
          }
          stroke={active ? "#CAFFEA" : "#30F"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <linearGradient
          id="prefix__paint0_linearbilling"
          x1={22.081}
          y1={2.143}
          x2={5.126}
          y2={19.098}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#98FDAC" />
          <stop offset={1} stopColor="#04B79C" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const SeverityIcon: React.FC<{ size?: number; variant: string }> = ({
  size = 8,
  variant,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Box as="circle" cx={4} cy={4} r={4} fill={variant} />
    </svg>
  );
};

export const SlackIcon: React.FC<{ size: number }> = ({ size }) => {
  return (
    <svg
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.843 12.651a2.521 2.521 0 00-2.521 2.521v6.306a2.521 2.521 0 005.042 0v-6.306a2.523 2.523 0 00-2.521-2.521zM.019 15.172a2.524 2.524 0 005.046 0v-2.523H2.542a2.524 2.524 0 00-2.523 2.523z"
        fill="#e91e63"
      />
      <path
        d="M8.846-.001h-.003a2.524 2.524 0 000 5.046h2.521V2.517A2.519 2.519 0 008.846-.001zM2.525 11.37h6.318a2.524 2.524 0 000-5.046H2.525a2.524 2.524 0 000 5.046z"
        fill="#00bcd4"
      />
      <path
        d="M21.457 6.323a2.518 2.518 0 00-2.518 2.518v2.528h2.521a2.524 2.524 0 000-5.046h-.003zm-8.816-3.801v6.325a2.521 2.521 0 005.042 0V2.522a2.521 2.521 0 00-5.042 0z"
        fill="#4caf50"
      />
      <path
        d="M17.682 21.476a2.521 2.521 0 00-2.521-2.521H12.64v2.523a2.521 2.521 0 005.042-.002zm3.797-8.827h-6.318a2.524 2.524 0 000 5.046h6.318a2.524 2.524 0 000-5.046z"
        fill="#ff9800"
      />
    </svg>
  );
};

export const ProjectIcon: React.FC<{ size: number }> = ({ size }) => {
  return (
    <svg width={37} height={27} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 5h34a3 3 0 013 3v16a3 3 0 01-3 3H3a3 3 0 01-3-3V5zM0 4a4 4 0 014-4h10.5L19 5H0V4z"
        fill="#E49F4E"
      />
      <path
        d="M1.75 5h32.248a3 3 0 013 3v15.536a2 2 0 01-2 2H4.75a3 3 0 01-3-3V5z"
        fill="#FFC661"
      />
      <path d="M1.75 2a2 2 0 012-2h10.748l4.5 5-17.248.111V2z" fill="#FFC661" />
      <rect x={6.301} y={19} width={7.232} height={2} rx={1} fill="#D3E2FA" />
      <g filter="url(#folderDefs)">
        <rect
          x={6.449}
          y={19.339}
          width={7.222}
          height={2}
          rx={1}
          fill="#EEF5FD"
        />
      </g>
      <defs>
        <filter
          id="folderDefs"
          x={6.349}
          y={19.339}
          width={7.422}
          height={2.3}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={0.2} />
          <feGaussianBlur stdDeviation={0.05} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export const RescanIcon: React.FC<{ size: number }> = ({ size }) => {
  return (
    <svg
      viewBox="0 0 38 40"
      width={size}
      height={(40 * size) / 38}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.1 11.07v5.347h2.2v-4.278h4.4V10h-5.5c-.292 0-.572.113-.778.313-.206.2-.322.473-.322.756zm19.8 5.347v-5.348c0-.283-.116-.555-.322-.756A1.116 1.116 0 0027.8 10h-5.5v2.139h4.4v4.278h2.2zM26.7 27.11h-4.4v2.139h5.5c.292 0 .572-.113.778-.313.206-.2.322-.473.322-.756v-5.348h-2.2v4.278zm-11 2.139v-2.139h-4.4v-4.278H9.1v5.348c0 .283.116.555.322.756.206.2.486.313.778.313h5.5zM8 18.556h22v2.138H8v-2.138z"
        fill="#fff"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 2h2c8.837 0 16 7.163 16 16v1.829c0 7.552-5.232 13.881-12.268 15.562v2.05C31.882 35.724 38 28.491 38 19.83V18c0-9.941-8.059-18-18-18h-2C8.059 0 0 8.059 0 18v1.829C0 27.54 4.85 34.12 11.668 36.684v-2.157C5.981 32.074 2 26.417 2 19.829V18c0-6.587 3.98-12.245 9.668-14.698V3.1h.488A15.96 15.96 0 0118 2z"
        fill="#fff"
      />
      <path
        d="M25.395 38.477l-2.986-1.865 1.767-3.04"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const JiraIcon: React.FC<{ size: number }> = ({ size }) => {
  return (
    <svg
      viewBox="2.59 0 214.091 224"
      // height={2500}
      // width={2361}
      height={size}
      width={(size * 2361) / 2500}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <linearGradient
        id="prefix__a"
        gradientTransform="matrix(1 0 0 -1 0 264)"
        gradientUnits="userSpaceOnUse"
        x1={102.4}
        x2={56.15}
        y1={218.63}
        y2={172.39}
      >
        <stop offset={0.18} stopColor="#0052cc" />
        <stop offset={1} stopColor="#2684ff" />
      </linearGradient>
      <linearGradient
        id="prefix__b"
        x1={114.65}
        x2={160.81}
        xlinkHref="#prefix__a"
        y1={85.77}
        y2={131.92}
      />
      <path
        d="M214.06 105.73L117.67 9.34 108.33 0 35.77 72.56 2.59 105.73a8.89 8.89 0 000 12.54l66.29 66.29L108.33 224l72.55-72.56 1.13-1.12 32.05-32a8.87 8.87 0 000-12.59zm-105.73 39.39L75.21 112l33.12-33.12L141.44 112z"
        fill="#2684ff"
      />
      <path
        d="M108.33 78.88a55.75 55.75 0 01-.24-78.61L35.62 72.71l39.44 39.44z"
        fill="url(#prefix__a)"
      />
      <path
        d="M141.53 111.91l-33.2 33.21a55.77 55.77 0 010 78.86L181 151.35z"
        fill="url(#prefix__b)"
      />
    </svg>
  );
};

// Landing Page Icons

export const ScheduleScan: React.FC<{ size: number }> = ({
  size,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={70} cy={70} r={70} fill="#EDFCFE" />
      <path
        d="M32.392 71.569h76.582V42a8 8 0 00-8-8H40.392a8 8 0 00-8 8V71.57z"
        fill="#20DAF1"
      />
      <g filter="url(#prefix__filter0_dss)">
        <path
          d="M32.392 71.569h76.582v31.013a8 8 0 01-8 8H40.392a8 8 0 01-8-8V71.569z"
          fill="#fff"
        />
        <path
          d="M32.892 72.069h75.582v30.513a7.5 7.5 0 01-7.5 7.5H40.392a7.5 7.5 0 01-7.5-7.5V72.069z"
          stroke="#EFEFEF"
        />
      </g>
      <path
        d="M32.392 71.569h76.582l5.77-16.865c1.776-5.191-2.082-10.59-7.569-10.59H34.192c-5.487 0-9.345 5.399-7.57 10.59l5.77 16.865z"
        fill="#E3F0F1"
      />
      <path
        d="M57.996 64.785a20.298 20.298 0 015.86-.879c5.029 0 7.543 1.905 7.543 5.713 0 2.305-.918 3.892-2.754 4.761 1.836.83 2.754 2.417 2.754 4.76 0 4.005-2.514 6.007-7.544 6.007-1.953 0-3.906-.293-5.859-.88v-2.343c1.953.683 3.906 1.025 5.86 1.025 3.222 0 4.833-1.27 4.833-3.808 0-2.442-1.23-3.662-3.691-3.662h-4.805V73.28h4.761c2.49 0 3.736-1.22 3.736-3.662 0-2.344-1.612-3.515-4.834-3.515-1.954 0-3.907.341-5.86 1.025v-2.344zM77.04 85V66.675h-2.197V65.37l4.907-1.465V85h-2.71z"
        fill="#304B4F"
      />
      <path
        d="M57.996 64.785l-.144-.479-.356.107v.372h.5zm10.65 9.595l-.214-.452-.977.462.984.446.207-.456zm-10.65 9.888h-.5v.372l.356.107.144-.48zm0-2.344l.165-.472-.665-.233v.705h.5zm2.197-6.445h-.5v.5h.5v-.5zm0-2.198v-.5h-.5v.5h.5zm-2.197-6.152h-.5v.705l.665-.233-.165-.472zm.144-1.865a19.799 19.799 0 015.715-.858v-1a20.8 20.8 0 00-6.003.9l.288.958zm5.715-.858c2.466 0 4.224.47 5.357 1.327 1.106.838 1.687 2.102 1.687 3.886h1c0-2.024-.675-3.616-2.084-4.683-1.382-1.047-3.396-1.53-5.96-1.53v1zM70.9 69.62c0 1.087-.216 1.969-.62 2.669-.404.696-1.01 1.244-1.847 1.64l.427.904c1-.473 1.77-1.153 2.285-2.044.513-.886.755-1.95.755-3.169h-1zm-2.46 5.217c.833.376 1.438.913 1.84 1.607.404.7.62 1.59.62 2.698h1c0-1.236-.242-2.31-.755-3.199-.517-.892-1.29-1.564-2.293-2.018l-.412.912zm2.46 4.305c0 1.89-.588 3.23-1.697 4.113-1.131.9-2.885 1.393-5.346 1.393v1c2.567 0 4.585-.51 5.969-1.61 1.405-1.12 2.074-2.783 2.074-4.896h-1zm-7.044 5.506c-1.902 0-3.807-.286-5.715-.858l-.288.958c1.998.599 4 .9 6.004.9v-1zm-5.359-.38v-2.343h-1v2.344h1zm-.665-1.871c2.003.7 4.012 1.053 6.024 1.053v-1c-1.893 0-3.79-.33-5.694-.997l-.33.944zm6.024 1.053c1.664 0 3.004-.325 3.935-1.06.955-.751 1.4-1.866 1.4-3.248h-1c0 1.156-.361 1.946-1.019 2.463-.68.536-1.756.845-3.316.845v1zm5.334-4.308c0-1.299-.327-2.365-1.07-3.102-.743-.736-1.814-1.06-3.121-1.06v1c1.154 0 1.928.286 2.416.77.488.484.775 1.25.775 2.392h1zm-4.191-4.162h-4.805v1h4.805v-1zm-4.305.5V73.28h-1v2.198h1zm-.5-1.698h4.761v-1h-4.76v1zm4.761 0c1.32 0 2.402-.323 3.152-1.058.751-.737 1.084-1.803 1.084-3.104h-1c0 1.141-.29 1.906-.784 2.39-.496.486-1.281.772-2.452.772v1zm4.236-4.162c0-1.3-.456-2.343-1.415-3.04-.93-.677-2.263-.975-3.92-.975v1c1.566 0 2.65.287 3.332.783.652.474 1.002 1.188 1.002 2.232h1zm-5.334-4.015c-2.013 0-4.022.352-6.025 1.053l.33.944c1.904-.666 3.8-.997 5.694-.997v-1zm-5.36 1.525v-2.344h-1v2.344h1zM77.04 85h-.5v.5h.5V85zm0-18.325h.5v-.5h-.5v.5zm-2.197 0h-.5v.5h.5v-.5zm0-1.304l-.143-.479-.357.107v.372h.5zm4.907-1.465h.5v-.67l-.643.191.143.48zm0 21.094v.5h.5V85h-.5zm-2.21 0V66.675h-1V85h1zm-.5-18.825h-2.197v1h2.197v-1zm-1.697.5V65.37h-1v1.304h1zm-.357-.825l4.907-1.465-.286-.958-4.907 1.465.286.958zm4.264-1.944V85h1V63.906h-1zm.5 20.594h-2.71v1h2.71v-1z"
        fill="#fff"
      />
      <circle cx={53.344} cy={39.502} r={2.167} fill="#fff" />
      <circle cx={90.912} cy={39.502} r={2.167} fill="#fff" />
      <circle cx={96.155} cy={101.155} r={18.155} fill="#fff" />
      <circle
        cx={96.155}
        cy={101.155}
        r={18.155}
        fill="url(#prefix__paint0_linear)"
      />
      <path
        d="M102 97l-8.25 9-3.75-4.091"
        stroke="#fff"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear"
          x1={85.781}
          y1={83}
          x2={104.8}
          y2={116.717}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#20DAF1" />
          <stop offset={1} stopColor="#83F1FF" />
        </linearGradient>
        <filter
          id="prefix__filter0_dss"
          x={28.392}
          y={71.569}
          width={84.582}
          height={47.014}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export const VulnCheck: React.FC<{ size: number }> = ({ size, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={70} cy={70} r={70} fill="#FFF7EB" />
      <g filter="url(#prefix__filter0_dvc)">
        <path fill="#E3E3E3" d="M64.686 103.726h14.647v14.647H64.686z" />
      </g>
      <g filter="url(#prefix__filter1_d)">
        <path
          d="M27.255 39a2 2 0 012-2h85.51a2 2 0 012 2v53.334h-89.51V39z"
          fill="#172D45"
        />
      </g>
      <g filter="url(#prefix__filter2_d)">
        <path
          d="M27.255 101.726a2 2 0 002 2h85.51a2 2 0 002-2v-9.392h-89.51v9.392z"
          fill="#E3E3E3"
        />
      </g>
      <path fill="#fff" d="M30.51 40.255h83v48.824h-83z" />
      <g filter="url(#prefix__filter3_d)">
        <rect x={42} y={118} width={59} height={2} rx={1} fill="#E3E3E3" />
      </g>
      <circle cx={72.01} cy={98.03} r={2.441} fill="#fff" />
      <g filter="url(#prefix__filter4_d)">
        <path fill="#fff" d="M30.51 40.255h83v8.137h-83z" />
      </g>
      <circle cx={36.613} cy={44.324} r={1.221} fill="#FC724E" />
      <circle cx={40.681} cy={44.324} r={1.221} fill="#FECB00" />
      <circle cx={44.75} cy={44.324} r={1.221} fill="#7ED072" />
      <g filter="url(#prefix__filter5_d)">
        <path fill="#EFEFEF" d="M30.51 48.392h22.784v40.686H30.51z" />
      </g>
      <circle cx={41.902} cy={57.343} r={2.441} fill="#fff" />
      <rect
        x={35.392}
        y={61.412}
        width={13.02}
        height={1.139}
        rx={0.57}
        fill="#fff"
      />
      <rect
        x={35.392}
        y={64.667}
        width={13.02}
        height={1.139}
        rx={0.57}
        fill="#fff"
      />
      <rect
        x={35.392}
        y={67.922}
        width={13.02}
        height={1.139}
        rx={0.57}
        fill="#fff"
      />
      <rect
        x={35.392}
        y={71.177}
        width={13.02}
        height={1.139}
        rx={0.57}
        fill="#fff"
      />
      <rect
        x={35.392}
        y={74.431}
        width={13.02}
        height={1.139}
        rx={0.57}
        fill="#fff"
      />
      <rect
        x={39}
        y={77.686}
        width={6.51}
        height={1.139}
        rx={0.57}
        fill="#fff"
      />
      <rect
        x={59.804}
        y={71.177}
        width={4.882}
        height={11.392}
        rx={1}
        fill="#EFEFEF"
      />
      <path fill="#DADADA" d="M59.804 79.314h4.882v3.255h-4.882z" />
      <rect
        x={69.568}
        y={66.294}
        width={4.882}
        height={16.274}
        rx={1}
        fill="#EFEFEF"
      />
      <path fill="#DADADA" d="M69.568 77.686h4.882v4.882h-4.882z" />
      <rect
        x={80.961}
        y={71.177}
        width={4.882}
        height={11.392}
        rx={1}
        fill="#EFEFEF"
      />
      <path fill="#DADADA" d="M80.961 79.314h4.882v3.255h-4.882z" />
      <rect
        x={92.353}
        y={58.157}
        width={4.882}
        height={24.412}
        rx={1}
        fill="#EFEFEF"
      />
      <path fill="#DADADA" d="M92.353 72.804h4.882v9.765h-4.882z" />
      <rect
        x={103.746}
        y={66.294}
        width={4.882}
        height={16.274}
        rx={1}
        fill="#EFEFEF"
      />
      <path fill="#DADADA" d="M103.746 79.314h4.882v3.255h-4.882z" />
      <path
        d="M61.432 77.781c1.168 1.315 4.486 2.998 8.412-.789 4.908-4.733 4.908-6.311 7.712-5.522 2.804 1.578 3.505 3.155 6.31 3.155 3.993 0 5.608-.788 7.711-5.522l1.402-4.734c.234-1.051 1.543-2.84 4.908-1.578 3.365 1.263 7.477-4.733 9.113-7.889"
        stroke="#F90"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <circle cx={110.155} cy={98.155} r={18.155} fill="#fff" />
      <circle
        cx={110.155}
        cy={98.155}
        r={18.155}
        fill="url(#prefix__paint0_linear)"
      />
      <path
        d="M117.555 92l-5.871 8.453-4.423-3.127-4.634 6.674"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M112.596 92.873l4.959-.873.873 4.958"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <filter
          id="prefix__filter0_dvc"
          x={60.687}
          y={100.726}
          width={22.647}
          height={22.647}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={1} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter
          id="prefix__filter1_d"
          x={23.255}
          y={34}
          width={97.51}
          height={63.333}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={1} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter
          id="prefix__filter2_d"
          x={23.255}
          y={89.334}
          width={97.51}
          height={19.392}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={1} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter
          id="prefix__filter3_d"
          x={38}
          y={115}
          width={67}
          height={10}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={1} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter
          id="prefix__filter4_d"
          x={30.21}
          y={40.155}
          width={83.6}
          height={8.737}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={0.2} />
          <feGaussianBlur stdDeviation={0.15} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter
          id="prefix__filter5_d"
          x={30.21}
          y={48.292}
          width={23.384}
          height={41.286}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={0.2} />
          <feGaussianBlur stdDeviation={0.15} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <linearGradient
          id="prefix__paint0_linear"
          x1={99.781}
          y1={80}
          x2={118.8}
          y2={113.717}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F90" />
          <stop offset={1} stopColor="#FFBB54" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const Integration: React.FC<{ size: number }> = ({ size, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={70} cy={70} r={70} fill="#FFEEF6" />
      <path
        d="M26 48.332h88.32V43a3 3 0 00-3-3H29a3 3 0 00-3 3v5.332z"
        fill="#ED6CA5"
      />
      <circle cx={33.915} cy={44.583} r={1.25} fill="#fff" />
      <circle cx={38.914} cy={44.583} r={1.25} fill="#fff" />
      <circle cx={43.914} cy={44.583} r={1.25} fill="#fff" />
      <g filter="url(#prefix__filter0_di)">
        <path
          d="M26 48.332h88.32v53.658a3 3 0 01-3 3H29a3 3 0 01-3-3V48.332z"
          fill="#fff"
        />
      </g>
      <rect
        x={35.998}
        y={59.997}
        width={46.66}
        height={1.666}
        rx={0.833}
        fill="#1C3754"
      />
      <rect
        x={35.998}
        y={71.662}
        width={8.332}
        height={1.666}
        rx={0.833}
        fill="#6C8BFF"
      />
      <rect
        x={35.998}
        y={78.328}
        width={16.664}
        height={1.666}
        rx={0.833}
        fill="#FFDBEB"
      />
      <rect
        x={35.998}
        y={86.66}
        width={16.664}
        height={1.666}
        rx={0.833}
        fill="#FFDBEB"
      />
      <rect
        x={35.998}
        y={93.326}
        width={11.665}
        height={1.666}
        rx={0.833}
        fill="#FA4E9A"
      />
      <rect
        x={54.329}
        y={93.326}
        width={11.665}
        height={1.666}
        rx={0.833}
        fill="#FFDBEB"
      />
      <rect
        x={70.994}
        y={93.326}
        width={21.663}
        height={1.666}
        rx={0.833}
        fill="#FA4E9A"
      />
      <rect
        x={57.662}
        y={86.66}
        width={23.33}
        height={1.666}
        rx={0.833}
        fill="#6C8BFF"
      />
      <rect
        x={57.662}
        y={78.328}
        width={11.665}
        height={1.666}
        rx={0.833}
        fill="#FA4E9A"
      />
      <rect
        x={72.66}
        y={78.328}
        width={24.996}
        height={1.666}
        rx={0.833}
        fill="#FFDBEB"
      />
      <rect
        x={47.664}
        y={71.662}
        width={18.331}
        height={1.666}
        rx={0.833}
        fill="#FFDBEB"
      />
      <rect
        x={69.327}
        y={71.662}
        width={11.665}
        height={1.666}
        rx={0.833}
        fill="#6C8BFF"
      />
      <rect
        x={84.324}
        y={71.662}
        width={18.331}
        height={1.666}
        rx={0.833}
        fill="#FFDBEB"
      />
      <circle cx={105.155} cy={98.155} r={18.155} fill="#fff" />
      <circle
        cx={105.155}
        cy={98.155}
        r={18.155}
        fill="url(#prefix__paint0_linear)"
      />
      <path
        d="M112.721 100.265L104.985 106l-7.736-5.735a.626.626 0 01-.218-.697l.886-2.801 1.772-5.565a.311.311 0 01.502-.119.315.315 0 01.08.134l1.772 5.55h5.884l1.773-5.565a.311.311 0 01.29-.202.31.31 0 01.211.083.315.315 0 01.08.134l1.772 5.565.923 2.786a.645.645 0 01-.014.391.62.62 0 01-.241.306v0z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="prefix__paint0_linear"
          x1={94.781}
          y1={80}
          x2={113.8}
          y2={113.717}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ED6CA5" />
          <stop offset={1} stopColor="#FF9EC9" />
        </linearGradient>
        <filter
          id="prefix__filter0_di"
          x={22}
          y={48.332}
          width={96.32}
          height={64.658}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export const User: React.FC<{ size: number }> = ({ size, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={32} cy={32} r={32} fill="#7737FF" fillOpacity={0.08} />
      <path
        d="M44 46v-3a6 6 0 00-6-6H26a6 6 0 00-6 6v3M32 30a6 6 0 100-12 6 6 0 000 12z"
        stroke="#7737FF"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const File: React.FC<{ size: number }> = ({ size, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={32} cy={32} r={32} fill="#FB5392" fillOpacity={0.08} />
      <path
        d="M34.75 18h-11c-.73 0-1.429.295-1.945.82A2.826 2.826 0 0021 20.8v22.4c0 .743.29 1.455.805 1.98.516.525 1.216.82 1.945.82h16.5c.73 0 1.429-.295 1.944-.82A2.826 2.826 0 0043 43.2V26.4L34.75 18z"
        stroke="#FB5392"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.75 18v8.4H43M37 34H26M37 40H26M29 28h-3"
        stroke="#FB5392"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Work: React.FC<{ size: number }> = ({ size, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={32} cy={32} r={32} fill="#F90" fillOpacity={0.08} />
      <path
        d="M43.2 25H20.8c-1.546 0-2.8 1.28-2.8 2.857v14.286C18 43.72 19.254 45 20.8 45h22.4c1.546 0 2.8-1.28 2.8-2.857V27.857C46 26.28 44.746 25 43.2 25z"
        stroke="#F90"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37 44V21.778c0-.737-.263-1.444-.732-1.964-.47-.521-1.105-.814-1.768-.814h-5c-.663 0-1.299.293-1.768.814A2.942 2.942 0 0027 21.778V44"
        stroke="#F90"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Smile: React.FC<{ size: number }> = ({ size, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={32} cy={32} r={32} fill="#69C85A" fillOpacity={0.08} />
      <path
        d="M32 46c7.732 0 14-6.268 14-14s-6.268-14-14-14-14 6.268-14 14 6.268 14 14 14z"
        stroke="#69C85A"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.4 34.8s2.1 3 5.6 3c3.5 0 5.6-3 5.6-3M27.8 27.8h.014M36.2 27.8h.014"
        stroke="#69C85A"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
