import { PDFDownloadLink, Document, Page } from "@react-pdf/renderer";
import React from "react";

const MyDoc = () => (
  <Document>
    <Page>// My document data</Page>
  </Document>
);

export const PDFDownloadButton: React.FC = () => (
  <div>
    <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download now!"
      }
    </PDFDownloadLink>
  </div>
);
