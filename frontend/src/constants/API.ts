import { API_URL } from "~/config";

export const apiEndpoints = {
  CHAT: {
    CHAT_ROOMS: API_URL + "/v1/chat/chat-rooms/",
    ONLINE_USERS: API_URL + "/v1/chat/online-users/"
  },
  USER: {
    GET_USER: API_URL + "/v1/user/",
    SEARCH_USER: API_URL + "/v1/user/search/",
    auth: {
      CSRF: API_URL + "/v1/user/auth/csrf/",
      SESSION: API_URL + "/v1/user/auth/session/",
      EMAIL_VERIFICATION: API_URL + "/v1/user/auth/email-verification/",
      OTP_VERIFICATION: API_URL + "/v1/user/auth/otp-verification/",
      WHO_AM_I: API_URL + "/v1/user/auth/who_am_i/",
      LOGOUT: API_URL + "/v1/user/auth/logout/"
    }
  }
};
