import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { AUTH_ENDPOINTS } from "../services/apis";
import axios from "axios";

const { REGISTER, LOGIN, SEND_OTP } = AUTH_ENDPOINTS;

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (credentials, { rejectWithValue }) => {
        const toastId = toast.loading('User is being registered');
        console.log(credentials)
        try {
            const { email, password, contactNumber, name, confirmPassword ,otp,role} = credentials;
            if (!email || !password || !contactNumber || !name || !confirmPassword || !otp || !role) {
                toast.dismiss(toastId);
                toast.error('Please fill all the required fields');
                return rejectWithValue('Please fill all the required fields');
            }

            if(password !== confirmPassword){
                toast.dismiss(toastId);
                toast.error('Passwords should match');
                return rejectWithValue('Passwords should match');
            }

            const response = await axios.post(REGISTER, { ...credentials });

            if (!response?.data?.success) {
                toast.dismiss(toastId);
                toast.error('User cannot be registered');
                return rejectWithValue('User cannot be registered');
            }
            toast.dismiss(toastId);
            toast.success("User registered successfully");
            return response.data;
        } catch (error) {
            console.log(error);
            toast.dismiss(toastId);
            toast.error('Error during registration');
            return rejectWithValue('Error during registration');
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        const toastId = toast.loading("Logging In");
        try {
            const response = await axios.post(LOGIN, { ...credentials });

            if (!response?.data?.success) {
                toast.dismiss(toastId);
                toast.error('User cannot be logged in');
                return rejectWithValue('User cannot be logged in');
            }
            toast.dismiss(toastId);
            toast.success('Login Success');
            return response.data;
        } catch (error) {
            console.log(error);
            toast.dismiss(toastId);
            toast.error('Error during login');
            return rejectWithValue('Error during login');
        }
    }
);

export const sendOtp = createAsyncThunk(
    'auth/sendOtp',
    async ({ email }, { rejectWithValue }) => {
        const toastId = toast.loading('Sending OTP...');
        console.log(email)
        try {
            const response = await axios.post(SEND_OTP, { email });

            if (!response?.data?.success) {
                toast.dismiss(toastId);
                toast.error('Failed to send OTP');
                return rejectWithValue('Failed to send OTP');
            }
            toast.dismiss(toastId);
            toast.success('OTP sent successfully');
            return response.data;
        } catch (error) {
            console.log(error);
            toast.dismiss(toastId);
            toast.error('Error while sending OTP');
            return rejectWithValue('Error while sending OTP');
        }
    }
);

const getUserFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token") || null;
};
const getRoleFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    if (user) {
        try {
            const parsedUser = JSON.parse(user);
            return parsedUser.role || null;
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            return null;
        }
    }
    return null;
};


// Define initialState
const initialState = {
    user: getUserFromLocalStorage(),
    token: getTokenFromLocalStorage(),
    role: getRoleFromLocalStorage(),
    error: null,
    signupData: null,
    isLoading: false,
    status: 'idle',
};

// authSlice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.signupData = null;
            state.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        },
        setSignupData: (state, action) => {
            state.signupData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.signupData = null;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.role = action.payload.user?.role;
                state.error = null;
                state.status = 'succeed';

                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("role", action.payload.user?.role);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload || action.error;
                state.status = 'failed';
                state.isLoading = false;
            });

        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.role = action.payload.user?.role;
                state.error = null;
                state.status = 'succeed';

                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("role", action.payload.user?.role);
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload || action.error;
                state.status = 'failed';
                state.isLoading = false;
            });

        builder
            .addCase(sendOtp.pending, (state) => {
                state.status = 'loading';
                state.isLoading = true;
                state.error = null;
            })
            .addCase(sendOtp.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
                state.status = 'succeed';
            })
            .addCase(sendOtp.rejected, (state, action) => {
                state.error = action.payload || action.error;
                state.status = 'failed';
                state.isLoading = false;
            });
    },
});

export const { setIsLoading, logout, setSignupData } = authSlice.actions;
export default authSlice.reducer;
