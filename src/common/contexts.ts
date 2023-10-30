import { createContext, Dispatch, SetStateAction } from "react";
import {
  MultiFileScanDetail,
  FilesState,
  MultiFileScanSummary,
  Profile,
} from "./types";

export const DetailResultContext = createContext<{
  issues: MultiFileScanDetail[] | null;
  scanSummary: MultiFileScanSummary;
  setFiles: Dispatch<SetStateAction<FilesState | null>>;
  openIssueIndex?: number[];
  setOpenIssueIndex?: Dispatch<SetStateAction<number[] | undefined>>;
} | null>(null);

export const UserRoleContext = createContext<{
  role: string;
  profileData: Profile | undefined;
}>({
  role: "owner",
  profileData: undefined,
});
