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

export function dateToDDMMMMYYYY(date: Date): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

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

export const onLogout = (history: any, queryClient: QueryClient) => {
  Auth.deauthenticateUser();
  history.push("/signin");
  queryClient.clear();
};
