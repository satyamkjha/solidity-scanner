import { createContext, Dispatch, SetStateAction } from "react";
import { MultiFileScanDetail, FilesState, MultiFileScanSummary } from "./types";

export const DetailResultContext = createContext<{
  issues: MultiFileScanDetail[] | null;
  scanSummary: MultiFileScanSummary;
  setFiles: Dispatch<SetStateAction<FilesState | null>>;
  openIssueIndex?: number[];
  setOpenIssueIndex?: Dispatch<SetStateAction<number[] | undefined>>;
} | null>(null);
