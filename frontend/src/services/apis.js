const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const AUTH_ENDPOINTS = {
    REGISTER: `${BASE_URL}/auth/register`,
    LOGIN: `${BASE_URL}/auth/login`,
    SEND_OTP: `${BASE_URL}/auth/send-otp`
}

export const JOB_ENDPOINTS = {
    GET_ALL_JOBS: `${BASE_URL}/jobs`,
    GET_JOB_BY_ID: (id) => `${BASE_URL}/jobs/${id}`,
    CREATE_JOB: `${BASE_URL}/jobs/create`,
    UPDATE_JOB: (id) => `${BASE_URL}/jobs/${id}`,
    DELETE_JOB: (id) => `${BASE_URL}/jobs/${id}`,
    USER_JOBS: `${BASE_URL}/jobs/user-jobs`,
    SEND_JOB_ALERTS:`${BASE_URL}/jobs/send-alert`,
}

export const USER_ENDPOINTS = {
    APPLY_FOR_JOBS:(id)=>`${BASE_URL}/users/apply/${id}`,
    CANCEL_APPLICATION:(id)=>`${BASE_URL}/users/cancel/${id}`,
    GET_JOB_BY_AUTHOR:`${BASE_URL}/users/applications`,
    SEND_UPDATE_EMAIL:`${BASE_URL}/users/send-email-update`,
    DELETE_APPLICATIONS:`${BASE_URL}/users/delete-applications`
}