import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await axios('http://localhost:3500/users');
  return res.data;
});

const usersAdapter = createEntityAdapter();

// const initialState = [];
const initialState = usersAdapter.getInitialState();

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // state.push(...action.payload);
      usersAdapter.upsertMany(state, action.payload);
    });
  },
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;

// export const selectAllUsers = (state) => state.users;
// export const selectUserById = (state, userId) =>
//   state.users.find((user) => user.id === userId);

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.users);
