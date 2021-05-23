import React from 'react';
import { HStack, Heading } from '@chakra-ui/react';
import { Severity } from 'common/types';

export const LogoIcon: React.FC<{ size: number }> = ({ size, ...props }) => {
  const gradientId = '_' + Math.random().toString(36).substr(2, 9);
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
          <stop stop-color="#52FF00" />
          <stop offset="1" stop-color="#00EEFD" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const Logo: React.FC = () => {
  return (
    <HStack>
      <LogoIcon size={35} />
      <Heading fontSize="2xl" fontWeight={700} color="black">
        Solidity Scan
      </Heading>
    </HStack>
  );
};

// Menu Icons

export const HomeMenuIcon: React.FC<{ size: number; active?: boolean }> = ({
  size,
  active,
  ...props
}) => {
  const iconColor = active ? '#52FF00' : '#3300FF';
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
        style={{ transition: '0.3s fill' }}
        fill={iconColor}
      />
      <path
        opacity={0.3}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5 13h4a1.5 1.5 0 011.5 1.5v4A1.5 1.5 0 019.5 20h-4A1.5 1.5 0 014 18.5v-4A1.5 1.5 0 015.5 13zm9-9h4A1.5 1.5 0 0120 5.5v4a1.5 1.5 0 01-1.5 1.5h-4A1.5 1.5 0 0113 9.5v-4A1.5 1.5 0 0114.5 4zm0 9h4a1.5 1.5 0 011.5 1.5v4a1.5 1.5 0 01-1.5 1.5h-4a1.5 1.5 0 01-1.5-1.5v-4a1.5 1.5 0 011.5-1.5z"
        style={{ transition: '0.3s fill' }}
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
  const iconColor = active ? '#52FF00' : '#3300FF';
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
        style={{ transition: '0.3s fill' }}
      />
      <path
        d="M14 11H7a1 1 0 100 2h7a1 1 0 100-2zM10 15H7a1 1 0 100 2h3a1 1 0 100-2z"
        style={{ transition: '0.3s fill' }}
        fill={iconColor}
      />
    </svg>
  );
};

export const SeverityIcon: React.FC<{ size?: number; variant: Severity }> = ({
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
      <circle
        cx={4}
        cy={4}
        r={4}
        fill={
          variant === 'critical'
            ? '#FF5C00'
            : variant === 'medium'
            ? '#FFE600'
            : '#38CB89'
        }
      />
    </svg>
  );
};
