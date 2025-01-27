import axios from "axios";
import { USER_ENDPOINTS } from "../apis";

export const applyForJob = async (id, token) => {
    try {
        const response = await axios.post(
            USER_ENDPOINTS.APPLY_FOR_JOBS(id),
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to apply for job");
    }
};

export const cancelApplication = async (id, token) => {
    try {
        const response = await axios.delete(
            USER_ENDPOINTS.CANCEL_APPLICATION(id),
            {
                data: {},
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to cancel job application");
    }
};

export const getJobsByAuthor = async (token) => {
    try {
        const response = await axios.get(USER_ENDPOINTS.GET_JOB_BY_AUTHOR, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error("Error fetching jobs: " + error.message);
    }
};

export const sendEmailUpdate = async ({ applications, subject, message }) => {
    const response = await axios.post(
        USER_ENDPOINTS.SEND_UPDATE_EMAIL,
        { applications, subject, message },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};

export const deleteApplications = async (applicantIds, jobId) => {
    console.log(applicantIds, jobId)
    const response = await axios.delete(USER_ENDPOINTS.DELETE_APPLICATIONS, {
        data: { applicantIds, jobId },
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};