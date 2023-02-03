import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { apiSlice } from '../api/apiSlice';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await axios('http://localhost:3500/users');
  return res.data;
});

// const usersAdapter = createEntityAdapter();

// // const initialState = [];
// const initialState = usersAdapter.getInitialState();

const usersSlice = createSlice({
  name: 'users',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // state.push(...action.payload);
      usersAdapter.upsertMany(state, action.payload);
    });
  },
});

// export const {} = usersSlice.actions;

export default usersSlice.reducer;

// export const selectAllUsers = (state) => state.users;
// export const selectUserById = (state, userId) =>
//   state.users.find((user) => user.id === userId);

// export const { selectAll: selectAllUsers, selectById: selectUserById } =
//   usersAdapter.getSelectors((state) => state.users);

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: (responseData) => {
        return usersAdapter.setAll(initialState, responseData);
      },
      providesTags: ['Users'],
    }),
  }),
});

console.log({ usersAdapter });

export const selectUsersResult = apiSlice.endpoints.getUsers.select();

const emptyUsers = [];

// export const selectAllUsers = createSelector(
//   selectUsersResult,
//   (usersResult) => usersResult?.data ?? emptyUsers
// );

// export const selectUserById = createSelector(
//   [selectAllUsers, (_state, userId) => userId],
//   (users, userId) => users.find((user) => user.id === userId)
// );

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);

export const { useGetUsersQuery } = extendedApiSlice;
