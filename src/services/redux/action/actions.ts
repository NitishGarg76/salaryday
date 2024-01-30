import {
  SET_LOAN_ID,
  SET_SELECT_BUTTON_STATUS,
  SET_USER_GEMAIL_ACOUNT_ACCESS,
  SET_USER_LOAN_DETAILS,
  SET_WEBVIEW_CLOSE,
} from "./../constants/constants";
import {
  SET_ADDRESS_PROOF,
  SET_AUTH_TOKEN,
  SET_COMPANY_ADDRESS,
  SET_CURRENT_USER_ADDRESS,
  SET_ELIGIBILITY_DATA,
  SET_GEOLOCATION_CORDINATES,
  SET_KYC_COMPLETED,
  SET_PERMANENT_USER_ADDRESS,
  SET_PERSONAL_REFERENCE,
  SET_PLANS_DETAILS,
  SET_PROFILE_DETAILS,
  SET_USER_DETAILS,
  SET_WORK_REFERENCE,
} from "../constants/constants";

export function setPersonalReferenceAction(data: any) {
  return {
    type: SET_PERSONAL_REFERENCE,
    payload: data,
  };
}
export function setAddressProofAction(data: any) {
  return {
    type: SET_ADDRESS_PROOF,
    payload: data,
  };
}
export function setWorkReferenceAction(data: any) {
  return {
    type: SET_WORK_REFERENCE,
    payload: data,
  };
}
export function setCompanyAddressAction(data: any) {
  return {
    type: SET_COMPANY_ADDRESS,
    payload: data,
  };
}
export function setEligibilityAction(data: any) {
  return {
    type: SET_ELIGIBILITY_DATA,
    payload: data,
  };
}

export function setGeolocationAction(data: any) {
  return {
    type: SET_GEOLOCATION_CORDINATES,
    payload: data,
  };
}

export function setKyCompletedAction(data: any) {
  return {
    type: SET_KYC_COMPLETED,
    payload: data,
  };
}

export function setPlansAction(data: any) {
  return {
    type: SET_PLANS_DETAILS,
    payload: data,
  };
}

export function setUserCurrentAddressAction(data: any) {
  return {
    type: SET_CURRENT_USER_ADDRESS,
    payload: data,
  };
}

export function setAuthToken(data: any) {
  return {
    type: SET_AUTH_TOKEN,
    payload: data,
  };
}

export function setUserDetails(data: any) {
  return {
    type: SET_USER_DETAILS,
    payload: data,
  };
}

export function setUserPermanentAddressAction(data: any) {
  return {
    type: SET_PERMANENT_USER_ADDRESS,
    payload: data,
  };
}

export const setProfileDetails = (data: any) => {
  return {
    type: SET_PROFILE_DETAILS,
    payload: data,
  };
};

export const setUserLoanDetailsAction = (data: any) => {
  return {
    type: SET_USER_LOAN_DETAILS,
    payload: data,
  };
};

export const setUserGmailAccountAccessAction = (data: any) => {
  return {
    type: SET_USER_GEMAIL_ACOUNT_ACCESS,
    payload: data,
  };
};
export const setSelectButtonStatus = (data: any) => {
  return {
    type: SET_SELECT_BUTTON_STATUS,
    payload: data,
  };
};
export const setLoanID = (data: any) => {
  return {
    type: SET_LOAN_ID,
    payload: data,
  };
};
export const setWebViewClose = (data: any) => {
  return {
    type: SET_WEBVIEW_CLOSE,
    payload: data,
  };
};
