import axios from "axios";
import { JOB_ENDPOINTS } from "../apis";

export const sendJobAlerts = async (emails, message,token,jobDetails) => {
    try {
        console.log(emails)
        console.log(message)
        const response = await axios.post(JOB_ENDPOINTS.SEND_JOB_ALERTS, {
            emails,
            message,
            jobDetails
        },{
            headers:{
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Error while sending emails.";
    }
};



