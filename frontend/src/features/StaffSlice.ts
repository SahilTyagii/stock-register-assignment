import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export interface Staff {
    _id: string;
    name: string;
    mobile: string;
    role: string;
    store: string;
}

export interface StaffState {
    staff: Staff[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: StaffState = {
    staff: [],
    status: 'idle',
    error: null
}

export const fetchAllStaff = createAsyncThunk<Staff[], void, { rejectValue: string }>(
    'staff/fetchAllStaff',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/staff`);
            console.log("API Response: ", response.data);
            return response.data;
        } catch (error) {
            console.log("API Error: ", error);
            return rejectWithValue('Failed to fetch staff');
        }
    }
)

export const createStaff = createAsyncThunk<Staff, Staff, { rejectValue: string }>(
    'staff/createStaff',
    async (newStaff, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/staff`, newStaff);
            console.log("Staff Added: ", response.data);
            return response.data;
        } catch (error) {
            console.log("API Error: ", error);
            return rejectWithValue('Failed to add staff');
        }
    }
)

export interface UpdateRole {
    _id: string;
    role: string;
}

export const updateRole = createAsyncThunk<Staff, UpdateRole, { rejectValue: string }>(
    'staff/updateRole',
    async (updateData, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${apiUrl}/staff/role/${updateData._id}`, updateData);
            console.log("Role Updated: ", response.data);
            return response.data;
        } catch (error) {
            console.log("API Error: ", error);
            return rejectWithValue('Failed to update role');
        }
    }
)

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllStaff.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllStaff.fulfilled, (state, action: PayloadAction<Staff[]>) => {
                state.status = 'succeeded';
                state.staff = action.payload;
            })
            .addCase(fetchAllStaff.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(createStaff.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createStaff.fulfilled, (state, action: PayloadAction<Staff>) => {
                state.status = 'succeeded';
                state.staff.push(action.payload);
            })
            .addCase(createStaff.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(updateRole.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateRole.fulfilled, (state, action: PayloadAction<Staff>) => {
                state.status = 'succeeded';
                const index = state.staff.findIndex((s) => s._id === action.payload._id);
                if (index !== -1) {
                    state.staff[index].role = action.payload.role;
                }
            })
            .addCase(updateRole.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    }
});

export default staffSlice.reducer;
