import React from "react";
import { ResponsivePie } from "@nivo/pie";

type PieData = {
  id: string;
  label: string;
  value: number;
  color: string;
};

const MyResponsivePie: React.FC<{ data: PieData[]; page?: string }> = ({
  data,
  page,
}) => (
  <>
    <ResponsivePie
      data={data}
      margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
      colors={{ datum: "data.color" }}
      innerRadius={page === "quickscan" ? 0.75 : 0.5}
      padAngle={page === "quickscan" ? 0 : 0.7}
      cornerRadius={page === "quickscan" ? 0 : 3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      enableArcLabels={page === "quickscan" ? false : true}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      transitionMode="startAngle"
    />
  </>
);

export const ErrorResponsivePie: React.FC = () => {
  return (
    <ResponsivePie
      data={[
        {
          id: "one",
          label: "Critical",
          value: 85,
          color: "#C4C4C4",
        },
        {
          id: "two",
          label: "High",
          value: 15,
          color: "#E5E5E5",
        },
      ]}
      margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
      colors={{ datum: "data.color" }}
      // innerRadius={0.5}
      padAngle={0}
      cornerRadius={0}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      enableArcLabels={false}
      isInteractive={false}
      enableArcLinkLabels={false}
    />
  );
};

export default MyResponsivePie;
