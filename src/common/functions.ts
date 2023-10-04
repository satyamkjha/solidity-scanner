import Auth from "helpers/auth";
import { QueryClient } from "react-query";
import { Organization, OrgUserRole } from "./types";
import { auth } from "helpers/firebase";
import { signOut } from "firebase/auth";
import API from "helpers/api";
import { API_PATH } from "helpers/routeManager";

export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.toLowerCase().slice(1);
};

export function timeSince(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
}

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return (parts.pop() || "").split(";").shift();
}

export function daysRemaining(date: Date, days: number): number {
  const seconds = Math.floor(
    (date.getTime() + daysToMiliseconds(days) - new Date().getTime()) / 1000
  );
  return Math.floor(seconds / 86400);
}

export function daysToMiliseconds(days: number): number {
  return days * 86400000;
}

export const formattedDate = (
  date: Date,
  month?: "short" | "long" | "2-digit",
  locale: string = "en-GB"
) => {
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: month || "short",
    year: "numeric",
  });
};

export const getBugStatusNumber = (bug_status: string) => {
  switch (bug_status) {
    case "pending_fix":
      return 0;
    case "wont_fix":
      return 1;
    case "false_positive":
      return 2;
    case "fixed":
      return 3;
    default:
      return 0;
  }
};

export const onLogout = async (history: any, queryClient: QueryClient) => {
  signOut(auth);
  Auth.deauthenticateUser();
  history.push("/signin");
  queryClient.clear();
};

export const logout = async (history: any, queryClient: QueryClient) => {
  const { data } = await API.get<{ message: string; status: string }>(
    API_PATH.API_LOGOUT
  );
  if (data.status === "success") {
    onLogout(history, queryClient);
  }
};

export const shortenNumber = (
  number: number,
  toFixed: number = 2,
  fullAbbreviation: boolean = false
) => {
  const abbreviations = ["", "K", "M", "B", "T", "Q"];
  const full_abbreviations = [
    "",
    "Thousand",
    "Million",
    "Billion",
    "Trillion",
    "Quadrillion",
  ];
  const suffixIndex = Math.floor(Math.log10(Math.abs(number)) / 3);
  let abbreviatedNumber = (number / Math.pow(1000, suffixIndex)).toFixed(
    toFixed
  );

  if (
    abbreviatedNumber.includes(".") &&
    Number(abbreviatedNumber) === Number(abbreviatedNumber.split(".")[0])
  ) {
    abbreviatedNumber = Number(abbreviatedNumber).toFixed(0);
  }

  return fullAbbreviation
    ? abbreviatedNumber + " " + full_abbreviations[suffixIndex]
    : abbreviatedNumber + abbreviations[suffixIndex];
};

export const hasUserRole = (
  organizations: Organization[],
  roleToCheck: OrgUserRole
) => {
  return organizations.some((org) => org.role === roleToCheck);
};
