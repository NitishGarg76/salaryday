import axios from "axios";
import {
  EMPLOYEMENT_DETAILS_ADD,
  GOOGLE_SIGNIN_API,
  PAN_ADD,
  PAN_UPDATE,
  PRIVACY_AND_POLICY,
  PROFILE_PIC_UPDATE,
  SEND_OTP_ON_MOBILE,
  TEAM_BLOCK_STATUS,
  TERMS_AND_CONDITIONS,
  UPLOAD_ADHAAR_DRIVING_VOTER_PROOF,
  UPLOAD_PAYSLIPS,
  VERIFY_OTP,
  UPLOAD_BANK_STATEMENTS,
  UPDATE_BANK_DETAILS,
  SEND_OTP_ON_ADHAAR,
  VERIFY_ADHAR_OTP,
  CITY_LIST,
  PROFILE_UPDATE,
  SAVE_CUSTOMER_LOCATION,
  SAVE_DEVICE_INFO,
  SAVE_CUSTOMER_CONTACTS,
  STATE_LIST,
  STAYING_YEARS,
  BANK_NAME,
  PLANS,
  APPLY_LOAN,
  CALCULATE_LOAN_AMOUNT,
  LOAN_PURPOSES,
  PROFILE_DETAILS,
  ACTIVE_LOANS,
  USER_LOAN,
  UPDATE_EMPLOYMENT_DETAILS,
  USER_ACTIVE_LOANS,
  SAVE_CUSTOMER_SMS,
} from "../../config/config";
import { BASE_URL } from "../../config/constants";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const sendOTPOnMobile = (
  payload: Record<string, string | number | unknown>,
  token: any
) => {
  return axios(BASE_URL + SEND_OTP_ON_MOBILE, {
    method: "post",
    data: payload,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const verifyOTP = (
  payload: Record<string, string | number | unknown>,
  token: any
) => {
  return axios(BASE_URL + VERIFY_OTP, {
    method: "post",
    data: payload,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const socialLogin = (
  payload: Record<string, string | number | unknown>
) => {
  return axios(BASE_URL + GOOGLE_SIGNIN_API, { method: "post", data: payload })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const termsAndConditions = (
  payload: Record<string, string | number | unknown>,
  token: any
) => {
  return axios(BASE_URL + TERMS_AND_CONDITIONS, {
    method: "post",
    data: payload,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const privacyAndPolicy = (
  payload: Record<string, string | number | unknown>,
  token: any
) => {
  return axios(BASE_URL + PRIVACY_AND_POLICY, {
    method: "post",
    data: payload,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const tempBlockStatus = (
  payload: Record<string, string | number | unknown>,
  token: any
) => {
  return axios(BASE_URL + TEAM_BLOCK_STATUS, {
    method: "post",
    data: payload,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const panAdd = (
  payload: Record<string, string | number | unknown>,
  token: any
) => {
  return axios(BASE_URL + PAN_ADD, {
    method: "post",
    data: payload,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const panUpdate = (
  payload: Record<string, string | number | unknown>,
  token: any
) => {
  return axios(BASE_URL + PAN_UPDATE, {
    method: "post",
    data: payload,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateProfilePic = (
  payload: Record<string, string | number | unknown>,
  token: any
) => {
  return axios(BASE_URL + PROFILE_PIC_UPDATE, {
    method: "post",
    data: payload,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const uploadPaySlips = (
  payload: Record<string, string | number | unknown>,
  token: any
) => {
  return axios(BASE_URL + UPLOAD_PAYSLIPS, {
    method: "post",
    data: payload,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const addEmployementDetails = (
  payload: Record<string, string | number | unknown>,
  token: any
) => {
  return axios(BASE_URL + EMPLOYEMENT_DETAILS_ADD, {
    method: "post",
    data: payload,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const uploadAdhaarDrivingVoterProof = (
  payload: Record<string, string | number | unknown>,
  token: any
) => {
  return axios(BASE_URL + UPLOAD_ADHAAR_DRIVING_VOTER_PROOF, {
    method: "post",
    data: payload,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const uploadBankStatements = (payload: any, token: any) => {
  return axios(BASE_URL + UPLOAD_BANK_STATEMENTS, {
    method: "post",
    data: payload,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const updateBankDetails = (
  payload: Record<string, string | number | unknown>,
  token: any
) => {
  return axios(BASE_URL + UPDATE_BANK_DETAILS, {
    method: "post",
    data: payload,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const sendOtpOnAdhar = (
  payload: Record<string, string | number | unknown>,
  token: any
) => {
  return axios(BASE_URL + SEND_OTP_ON_ADHAAR, {
    method: "post",
    data: payload,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const verifyOtpONAadhar = (
  payload: Record<string, string | number | unknown>,
  token: any
) => {
  return axios(BASE_URL + VERIFY_ADHAR_OTP, {
    method: "post",
    data: payload,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const profileUpdate = (
  payload: Record<string, string | number | unknown>,
  token: any
) => {
  return axios(BASE_URL + PROFILE_UPDATE, {
    method: "post",
    data: payload,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const saveCustomerLocation = (
  payload: Record<string, string | number | unknown>,
  token: any
) => {
  return axios(BASE_URL + SAVE_CUSTOMER_LOCATION, {
    method: "post",
    data: payload,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const saveDeviceInfo = (
  payload: Record<string, string | number | unknown>,
  token: any
) => {
  return axios(BASE_URL + SAVE_DEVICE_INFO, {
    method: "post",
    data: payload,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const saveContacts = (
  payload: Record<string, string | number | unknown>,
  token: any
) => {
  return axios(BASE_URL + SAVE_CUSTOMER_CONTACTS, {
    method: "post",
    data: payload,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getStateList = (token: any) => {
  return axios(BASE_URL + STATE_LIST, {
    method: "get",

    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getCityList = (token: any, id: any) => {
  return axios(BASE_URL + CITY_LIST + id, {
    method: "get",

    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getStayingYears = (token: any) => {
  return axios(BASE_URL + STAYING_YEARS, {
    method: "get",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getPlans = (token: any) => {
  return axios({
    method: "get",
    url: BASE_URL + PLANS,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const calculateLoanAmount = (
  payload: Record<string, string | number | unknown>,
  planId: number,
  token: any
) => {
  return axios({
    method: "post",
    data: payload,
    url: BASE_URL + CALCULATE_LOAN_AMOUNT + planId,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getBankNames = (token: any) => {
  return axios({
    method: "get",
    url: BASE_URL + BANK_NAME,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getProfileDetails = (token: any) => {
  return axios({
    method: "get",
    url: BASE_URL + PROFILE_DETAILS,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getLoanPurposes = (token: any) => {
  return axios({
    method: "get",
    url: BASE_URL + LOAN_PURPOSES,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const applyLoan = (payload: any, planId: number, token: string) => {
  return axios({
    method: "post",
    data: payload,
    url: BASE_URL + APPLY_LOAN + planId,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const closedUserLoans = (token: any) => {
  return axios({
    method: "get",
    url: BASE_URL + USER_LOAN,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const activeUserLoans = (token: any) => {
  return axios({
    method: "get",
    url: BASE_URL + ACTIVE_LOANS,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const updateEmploymentDetails = (
  payload: Record<string, string | number | unknown>,
  token: any,
  id: any
) => {
  return axios(BASE_URL + UPDATE_EMPLOYMENT_DETAILS + id + "/update", {
    method: "post",
    data: payload,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const userLoanDetails = (token: any, plan_id: number) => {
  return axios(BASE_URL + USER_ACTIVE_LOANS + plan_id, {
    method: "get",
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const saveCustomerSMS = (payload: any, token: string) => {
  return axios({
    method: "post",
    data: payload,
    url: BASE_URL + SAVE_CUSTOMER_SMS,
    headers: {
      ...headers,
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
