import { API_URL } from "~/config";

const ApiEndpoints = {
    chat: {
        CHAT_ROOMS: API_URL + "/v1/chat/chat-rooms",
        ONLINE_USERS: API_URL + "v1/chat/online-users",
    },
    user: {
        GET_USER: API_URL + "/v1/user",
        SEARCH: "/v1/user/search",
        // auth views
        auth: {
            CSRF: "/v1/user/auth/csrf",
            SESSION: "/v1/user/auth/session",
            EMAIL_VERIFICATION: "/v1/user/auth/email-verification",
            REGISTER_EMAIL_VERIFICATION: "/v1/user/auth/register-email-verification",
            OTP_VERIFICATION: "/v1/user/auth/otp-verification",
            WHO_AM_I: "/v1/user/auth/who_am_i",
        }
    }
};

export default ApiEndpoints;