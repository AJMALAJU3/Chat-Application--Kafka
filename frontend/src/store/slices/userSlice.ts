import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
    _id: string | null; // Use string instead of mongoose.ObjectId
    email: string | null;
}

const initialState: IUserState = {
    _id: null,
    email: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUserState>) => {
            state._id = action.payload._id;
            state.email = action.payload.email;
        },
        clearUser: (state) => {
            state._id = null;
            state.email = null;
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
