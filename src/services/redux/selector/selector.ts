export const getUserDetails = (state: any) => {
  return state.mainReducer.userDetails;
};

export const getAuthToken = (state: any) => {
  return state.mainReducer.authToken;
};

export const getCompanyAddressDetails = (state: any) => {
  return state.mainReducer.companyDetails;
};

export const getUserCurrentAddressDetails = (state: any) => {
  return state.mainReducer.currentAddress;
};
export const getUserPermanentAddressDetails = (state: any) => {
  return state.mainReducer.permanentAddress;
};
export const getPersonalReferenceDetails = (state: any) => {
  return state.mainReducer.personalReference;
};
export const getWorkReferenceDetails = (state: any) => {
  return state.mainReducer.workReference;
};

export const getAddressProofDetails = (state: any) => {
  return state.mainReducer.addressProof;
};

export const getPlanDetails = (state: any) => {
  return state.mainReducer.planDetails;
};

export const getGeolocationCordinatesDetails = (state: any) => {
  return state.mainReducer.cordinates;
};

export const getEligibilityDetails = (state: any) => {
  return state.mainReducer.eligiblityData;
};

export const getKycCompletedStatus = (state: any) => {
  return state.mainReducer.isKycCompleted;
};

export const getProfileDetailsSelector = (state: any) => {
  return state.mainReducer.profileDetails;
};

export const getUserLoanDetails = (state: any) => {
  return state.mainReducer.userLoanDetails;
};
export const getGmailAccountAccessDetails = (state: any) => {
  return state.mainReducer.gmailAccount;
};
export const getSelectButtonStatus = (state: any) => {
  return state.mainReducer.selectButtonStatus;
};
export const getLoanID = (state: any) => {
  return state.mainReducer.loanId;
};
export const getWebViewClose = (state: any) => {
  return state.mainReducer.webView;
};