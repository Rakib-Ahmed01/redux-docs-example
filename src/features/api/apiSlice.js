import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
  tagTypes: ['Post', 'Users'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: (result = [], _error, _arg) => {
        return ['Post', result.map(({ id }) => ({ type: 'Post', id: id }))];
      },
    }),
    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
      providesTags: (_result, _error, arg) => [{ type: 'Post', id: arg }],
    }),
    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: '/posts',
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Post'],
    }),
    editPost: builder.mutation({
      query: (initialPost) => ({
        url: `/posts/${initialPost.id}`,
        method: 'PATCH',
        body: initialPost,
      }),
      invalidatesTags: (_result, _error, arg) => [
        'Post',
        { type: 'Post', id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,
} = apiSlice;
