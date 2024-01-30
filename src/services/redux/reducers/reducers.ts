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
  SET_USER_DETAILS,
  SET_WORK_REFERENCE,
  SET_PROFILE_DETAILS,
  SET_USER_LOAN_DETAILS,
  SET_USER_GEMAIL_ACOUNT_ACCESS,
  SET_SELECT_BUTTON_STATUS,
  SET_LOAN_ID,
  SET_WEBVIEW_CLOSE,
} from "../constants/constants";

const initialState = {
  personalReference: {},
  addressProof: {},
  workReference: {},
  companyDetails: {},
  eligiblityData: {},
  cordinates: {},
  currentAddress: {},
  userDetails: {},
  authToken: "",
  permanentAddress: {},
  isKycCompleted: false,
  planDetails: [],
  profileDetails: {},
  userLoanDetails: {},
  gmailAccount: false,
  selectButtonStatus: true,
  loanId: 0,
  webView:false,
};
const MainReducer = (
  state = initialState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case SET_PERSONAL_REFERENCE:
      return {
        ...state,
        personalReference: action.payload,
      };
    case SET_ADDRESS_PROOF:
      return {
        ...state,
        addressProof: action.payload,
      };
    case SET_WORK_REFERENCE:
      return {
        ...state,
        workReference: action.payload,
      };
    case SET_COMPANY_ADDRESS:
      return {
        ...state,
        companyDetails: action.payload,
      };
    case SET_ELIGIBILITY_DATA:
      return {
        ...state,
        eligiblityData: action.payload,
      };
    case SET_GEOLOCATION_CORDINATES:
      return {
        ...state,
        cordinates: action.payload,
      };
    case SET_KYC_COMPLETED:
      return {
        ...state,
        isKycCompleted: action.payload,
      };

    case SET_PLANS_DETAILS:
      return {
        ...state,
        planDetails: action.payload,
      };
    case SET_CURRENT_USER_ADDRESS:
      return {
        ...state,
        currentAddress: action.payload,
      };
    case SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload,
      };
    case SET_PERMANENT_USER_ADDRESS:
      return {
        ...state,
        permanentAddress: action.payload,
      };
    case SET_PROFILE_DETAILS:
      return {
        ...state,
        profileDetails: action.payload,
      };
    case SET_USER_GEMAIL_ACOUNT_ACCESS:
      return {
        ...state,
        gmailAccount: action.payload,
      };
    case SET_USER_LOAN_DETAILS:
      return {
        ...state,
        userLoanDetails: action.payload,
      };
    case SET_SELECT_BUTTON_STATUS:
      return {
        ...state,
        selectButtonStatus: action.payload,
      };
    case SET_LOAN_ID:
      return {
        ...state,
        loanId: action.payload,
      };
      case SET_WEBVIEW_CLOSE:
      return {
        ...state,
        webView: action.payload,
      };
    default:
      return state;
  }
};
export default MainReducer;
