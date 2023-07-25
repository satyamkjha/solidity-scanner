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
    width: "170px",
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
    width: "170px",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: "1px solid #f3f3f3",
    opacity: state.isDisabled ? 0.5 : 1,
    backgroundColor: state.isDisabled
      ? "#ECECEC"
      : state.isSelected
      ? "#ebeced"
      : state.isFocused
      ? "#ebeced"
      : "#FAFBFC",
    color: "#000000",
  }),
};

export const customStylesForInviteMember = {
  ...customStylesForReactSelect,
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: "150px",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FAFBFC00",
    padding: 4,
    borderRadius: 10,
    borderWidth: 0,
    color: "#000000",
    marginTop: 3,
  }),

  container: (provided: any, state: any) => ({
    ...provided,
    width: "150px",
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

export const customDropdown = {
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

export const customTranslucentDropdown = {
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: "1px solid #f3f3f340",
    opacity: state.isDisabled ? 0.5 : 1,
    backgroundColor: "#FFFFFF00",
    color: "#FFFFFF",
    fontSize: "18px",
    cursor: "pointer",
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    color: "#FFFFFF",
    borderRadius: 10,
    backdropFilter: "blur(6px)",
    border: "0px solid #ffffff",
    backgroundColor: "#ffffff60",
    maxHeight: "400px",
  }),
  control: (provided: any, state: any) => ({
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: "#FFFFFF00",
    color: "#FFFFFF",
    padding: 5,
    borderRadius: 15,
    border: state.isFocused ? "2px solid #52FF0020" : "2px solid #EDF2F720",
    textAlign: "left",
    fontSize: "18px",
    cursor: "pointer",
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.3 : 1;
    const transition = "opacity 300ms";
    const color = "#FFFFFF";

    return { ...provided, opacity, transition, color };
  },
};
