import React from "react";

const FormatOptionLabel: React.FC<{
  value: string;
  label: string;
}> = ({ value, label }) => {
  return (
    <div id={value} style={{ display: "flex", flexDirection: "row" }}>
      <div>{label}</div>
    </div>
  );
};

export default FormatOptionLabel;
