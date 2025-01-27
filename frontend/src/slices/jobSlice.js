import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { JOB_ENDPOINTS } from '../services/apis';

const {
  GET_ALL_JOBS,
  GET_JOB_BY_ID,
  CREATE_JOB,
  UPDATE_JOB,
  DELETE_JOB
} = JOB_ENDPOINTS;

// Thunks

// Get all jobs
export const getAllJobs = createAsyncThunk('jobs/getAllJobs', async (_, thunkAPI) => {
  const toastId = toast.loading('Loading jobs...');
  try {
    const response = await axios.get(GET_ALL_JOBS);
    toast.dismiss(toastId);
    return response.data.allJobs; // assuming the data returned is the array of jobs
  } catch (error) {
    toast.dismiss(toastId);
    toast.error('Failed to load jobs');
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Get job by id
export const getJobById = createAsyncThunk('jobs/getJobById', async (id, thunkAPI) => {
  const toastId = toast.loading('Loading job details...');
  try {
    const response = await axios.get(GET_JOB_BY_ID(id));
    toast.dismiss(toastId);
    return response.data.job; // assuming the data returned is the job object
  } catch (error) {
    toast.dismiss(toastId);
    toast.error('Failed to load job details');
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Create new job
export const createJob = createAsyncThunk('jobs/createJob', async (jobData, thunkAPI) => {
  const { auth } = thunkAPI.getState(); // Get the auth state
  const token = auth.token; // Assuming the token is stored in auth state

  const toastId = toast.loading('Creating job listing...');
  try {
    const response = await axios.post(CREATE_JOB, jobData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
      },
    });
    toast.dismiss(toastId);
    return response.data; // assuming the data returned is the newly created job
  } catch (error) {
    toast.dismiss(toastId);
    toast.error('Failed to create job listing');
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Update job
export const updateJob = createAsyncThunk('jobs/updateJob', async ({ id, jobData }, thunkAPI) => {
  const { auth } = thunkAPI.getState(); // Get the auth state
  const token = auth.token; // Assuming the token is stored in auth state

  const toastId = toast.loading('Updating job listing...');
  try {
    const response = await axios.put(UPDATE_JOB(id), jobData, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
      },
    });
    toast.dismiss(toastId);
    console.log(response.data)
    return response.data; // assuming the data returned is the updated job
  } catch (error) {
    toast.dismiss(toastId);
    toast.error(error.response?.data?.message)
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

// Delete job
export const deleteJob = createAsyncThunk('jobs/deleteJob', async (id, thunkAPI) => {
  const { auth } = thunkAPI.getState(); // Get the auth state
  const token = auth.token; // Assuming the token is stored in auth state

  const toastId = toast.loading('Deleting job listing...');
  try {
    await axios.delete(DELETE_JOB(id), {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
      },
    });
    toast.dismiss(toastId);
    toast.success('Job listing deleted successfully');
    return id; // return the id of the deleted job
  } catch (error) {
    toast.dismiss(toastId);
    toast.error('Failed to delete job listing');
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const getUserCreatedJobs = createAsyncThunk('jobs/getUserCreatedJobs', async (_, thunkAPI) => {
  const { auth } = thunkAPI.getState(); // Get the auth state
  const token = auth.token; // Assuming the token is stored in auth state

  const toastId = toast.loading('Loading your jobs...');
  try {
    const response = await axios.get(JOB_ENDPOINTS.USER_JOBS, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
      },
    });
    toast.dismiss(toastId);
    console.log(response.data)
    return response.data.userJobs; // Assuming the response includes an array of jobs
  } catch (error) {
    toast.dismiss(toastId);
    toast.error('Failed to load your jobs');
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

// Initial state
const initialState = {
  allJobs: [],
  userJobs: [],
  currentJob: null,
  isLoading: false,
  status: null,
  error: null,
};

// Slice
const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    resetState: (state) => {
      state.status = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get all jobs
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = 'succeeded';
        state.allJobs = action.payload;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.error = action.payload;
      })

      // Get job by id
      .addCase(getJobById.pending, (state) => {
        state.isLoading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getJobById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = 'succeeded';
        state.currentJob = action.payload;
      })
      .addCase(getJobById.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.error = action.payload;
      })

      // Create new job
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = 'succeeded';
        state.allJobs.push(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.error = action.payload;
      })

      // Update job
      .addCase(updateJob.pending, (state) => {
        state.isLoading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = 'succeeded';
        const index = state.allJobs.findIndex(job => job.id === action.payload.id);
        if (index !== -1) {
          state.allJobs[index] = action.payload;
        }
        state.currentJob = action.payload;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.error = action.payload;
      })

      // Delete job
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = 'succeeded';
        // Remove the deleted job from userJobs
        state.userJobs = state.userJobs.filter((job) => job._id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.error = action.payload;
      });

    builder
      .addCase(getUserCreatedJobs.pending, (state) => {
        state.isLoading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUserCreatedJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = 'succeeded';
        state.userJobs = action.payload;
      })
      .addCase(getUserCreatedJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export the reducer and actions
export const { resetState } = jobSlice.actions;
export default jobSlice.reducer; 
