export const customStylesForReactSelect = {
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: "1px solid #f3f3f3",
    opacity: state.isDisabled ? 0.5 : 1,
    backgroundColor: state.isDisabled
      ? "#ECECEC"
      : state.isSelected
      ? "#FFFFFF"
      : state.isFocused
      ? "#E6E6E6"
      : "#FFFFFF",
    color: "#000000",
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    color: state.selectProps.menuColor,
    borderRadius: 10,
    border: "0px solid #ffffff",
    overflowY: "hidden",
  }),
  control: (state: any) => ({
    // none of react-select's styles are passed to <Control />
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 5,
    borderRadius: 15,
    border: state.isFocused ? "2px solid #52FF00" : "2px solid #EDF2F7",
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.3 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

export const customStylesForTakeAction = {
  ...customStylesForReactSelect,
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: "100%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FAFBFC",
    padding: 4,
    borderRadius: 20,
  }),

  container: (provided: any, state: any) => ({
    ...provided,
    width: "300px",
  }),
};

export const customStylesForOrgRole = {
  ...customStylesForReactSelect,
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: "250px",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FAFBFC",
    padding: 4,
    borderRadius: 10,
    borderWidth: 1,
    color: "#000000",
  }),

  container: (provided: any, state: any) => ({
    ...provided,
    width: "300px",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: "1px solid #f3f3f3",
    opacity: state.isDisabled ? 0.5 : 1,
    backgroundColor: state.isDisabled
      ? "#ECECEC"
      : state.isSelected
      ? "#FFFFFF"
      : state.isFocused
      ? "#FAFBFC"
      : "#FAFBFC",
    color: "#000000",
  }),
};
