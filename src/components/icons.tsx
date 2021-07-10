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
  const iconColor = active ? "#52FF00" : "#3300FF";
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
  const iconColor = active ? "#52FF00" : "#3300FF";
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
    const iconColor = active ? "#52FF00" : "#3300FF";
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 15.632V12a3 3 0 00-3-3H6.162V5.526A2.526 2.526 0 018.688 3h11.79a2.526 2.526 0 012.526 2.526v7.58l.017 4.68a.5.5 0 01-.854.356l-2.51-2.51H16z"
          fill={iconColor}
          style={{ transition: "0.3s fill" }}
        />
        <path
          opacity={0.3}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.985 18v-5a2 2 0 012-2h8a2 2 0 012 2v5a2 2 0 01-2 2H4.101l-1.244 1.19a.5.5 0 01-.846-.36v-2.506A2.015 2.015 0 011.985 18zM6.5 14a.5.5 0 000 1h5a.5.5 0 000-1h-5zm3 2a.5.5 0 000 1h2a.5.5 0 000-1h-2z"
          fill={iconColor}
          style={{ transition: "0.3s fill" }}
        />
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

export const CreditCard: React.FC<{ size: number }> = ({ size, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx={32} cy={32} r={32} fill="#20DAF1" fillOpacity={0.08} />
      <path
        d="M43.455 22h-22.91C19.14 22 18 23.12 18 24.5v15c0 1.38 1.14 2.5 2.546 2.5h22.909C44.86 42 46 40.88 46 39.5v-15c0-1.38-1.14-2.5-2.545-2.5zM18 29h28"
        stroke="#20DAF1"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Integration: React.FC<{ size: number }> = ({ size, ...props }) => {
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
        d="M41.333 46a4.667 4.667 0 100-9.333 4.667 4.667 0 000 9.333zM22.667 27.333a4.667 4.667 0 100-9.333 4.667 4.667 0 000 9.333zM33.556 22.667h4.666a3.11 3.11 0 013.111 3.11v10.89M22.667 27.333V46"
        stroke="#F90"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Growth: React.FC<{ size: number }> = ({ size, ...props }) => {
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
        d="M46 25L33.91 36.875l-6.364-6.25L18 40"
        stroke="#FB5392"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38 25h8v8"
        stroke="#FB5392"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
