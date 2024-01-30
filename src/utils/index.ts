export const userNavigationConfig: any = {
  "1_0": {
    key: "otpScreen",
    screen: "TermsAndCondition",
  },
  "2_0": {
    key: "otpCompleted",
    screen: "Eligibility",
  },
  "2_1": {
    key: "panAndSelfieCompleted",
    screen: "EmploymentDetails",
  },
  "2_2": {
    key: "EmploymentDetailsCompleted",
    screen: "AddressProof",
  },
  "2_3": {
    key: "PersonalDetailsCompleted",
    screen: "BankDetails",
  },
  "4_0": {
    key: "BankDetailsCompleted",
    screen: "Dashboard",
  },
  "6_0": {
    key: "LoanApplied",
    screen: "Dashboard",
  },
};

export const loanPlansColor: any = {
  "62": { primaryColor: "#880CE9", secondaryColor: "#1B0BD6" },
  "90": { primaryColor: "#E9AB0C", secondaryColor: "#E5670B" },
  "120": { primaryColor: "#06C2B7", secondaryColor: "#00C365" },
  "180": { primaryColor: "#614DD0", secondaryColor: "#33B4C6" },
};

export function numberWithCommas(value: any) {
  if (value && value > 0) {
    value = value?.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(value)) value = value.replace(pattern, "$1,$2");
    return value;
  } else {
    return "---";
  }
}

export const numFormatter = (num: number) => {
  if (num >= 999 && num < 1000000) {
    return num / 1000 + "K";
  } else if (num > 1000000) {
    return num / 1000000 + "M";
  } else if (num <= 99) {
    return num;
  } else if (num <= 900) {
    return num / 1000 + "K";
  }
};
