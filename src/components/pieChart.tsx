import React from "react";
import { ResponsivePie } from "@nivo/pie";

type PieData = {
  id: string;
  label: string;
  value: number;
  color: string;
};

const MyResponsivePie: React.FC<{ data: PieData[] }> = ({ data }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 40, bottom: 40, left: 0 }}
    colors={{ datum: "data.color" }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
    enableArcLinkLabels={false}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#333333"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: "color" }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
  />
);

export default MyResponsivePie;
