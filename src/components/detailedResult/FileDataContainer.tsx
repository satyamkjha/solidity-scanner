import { Flex } from "@chakra-ui/react";
import { Finding } from "common/types";
import React, { useEffect, useState } from "react";
import CodeExplorer from "./CodeExplorer";
import { useFileContent } from "hooks/useFileContent";
import { useParams } from "react-router-dom";
import Loader from "components/styled-components/Loader";

type FileDataContProps = {
  file: Finding;
  type: "project" | "block";
  wait_to_scroll: number;
};
const FileDataContainer: React.FC<FileDataContProps> = ({
  file,
  type,
  wait_to_scroll = 0,
}) => {
  const { scanId: scan_id } = useParams<{ scanId: string }>();
  const { file_path, line_nos_end, line_nos_start } = file;
  const { data, isLoading } = useFileContent(scan_id, file_path, type);
  const [fileContent, setFileContent] = useState<string[] | undefined>();

  useEffect(() => {
    if (data) {
      let dataArray = data.file_contents.split("\n");
      setFileContent([...dataArray]);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Flex
          sx={{
            w: "100%",
            justifyContent: "center",
            alignItems: "center",
            h: "300px",
          }}
        >
          <Loader />
        </Flex>
      ) : (
        fileContent && (
          <CodeExplorer
            file_content={fileContent}
            line_nos_start={line_nos_start}
            line_nos_end={line_nos_end}
            wait_to_scroll={wait_to_scroll}
          />
        )
      )}
    </>
  );
};

export default FileDataContainer;
