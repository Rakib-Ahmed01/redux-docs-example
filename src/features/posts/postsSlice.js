import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { apiSlice } from '../api/apiSlice';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await axios('http://localhost:3500/posts');
  return res.data;
});

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (initialPost) => {
    const res = await axios({
      method: 'post',
      url: 'http://localhost:3500/posts',
      data: {
        ...initialPost,
        id: nanoid(),
        date: new Date().toISOString(),
        reactions: {
          eyes: 0,
          rocket: 0,
          heart: 0,
          hooray: 0,
          thumbsUp: 0,
          haha: 0,
        },
      },
    });
    return res.data;
  }
);

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

// const initialState = {
//   posts: [],
//   status: 'idle',
//   error: null,
// };

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

{
  ids: [];
  entities: {
  }
  status: 'idle';
  error: null;
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // addPost: {
    //   reducer(state, action) {
    //     state.posts.push(action.payload);
    //   },
    //   prepare(title, content, author) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         title,
    //         content,
    //         author,
    //         date: new Date().toISOString(),
    //         reactions: {
    //           eyes: 0,
    //           rocket: 0,
    //           heart: 0,
    //           hooray: 0,
    //           thumbsUp: 0,
    //           haha: 0,
    //         },
    //       },
    //     };
    //   },
    // },
    editPost: (state, action) => {
      const { title, content, postId } = action.payload;
      // const existingPost = state.posts.find((post) => post.id === postId);
      const existingPost = state.entities[postId];
      if (existingPost) {
        (existingPost.title = title), (existingPost.content = content);
      }
    },
    addReaction: (state, action) => {
      const { reaction, postId } = action.payload;
      // const existingPost = state.posts.find((post) => post.id === postId);
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        (state.status = 'succeeded'),
          postsAdapter.upsertMany(state, action.payload);
      })

      .addCase(fetchPosts.rejected, (state, action) => {
        (state.status = 'failed'), (state.error = action.error.message);
      })
      .addCase(addPost.fulfilled, postsAdapter.addOne);
  },
});

// export const selectAllPosts = (state) => state.posts.posts;

// export const selectPostById = (state, postId) =>
//   state.posts.posts.find((post) => post.id === postId);

// export const {
//   selectAll: selectAllPosts,
//   selectIds: selectPostIds,
//   selectById: selectPostById,
//   selectEntities: selectPostEntities,
//   selectTotal: selectPostTotal,
// } = postsAdapter.getSelectors((state) => state.posts);

// export const selectPostsByUser = createSelector(
//   [selectAllPosts, (_state, userId) => userId],
//   (allPosts, userId) => allPosts.filter((post) => post.user.id === userId)
// );

export const { editPost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;

export const selectPostsResult = apiSlice.endpoints.getPosts.select();

const emptyPosts = [];

export const selectAllPosts = createSelector(
  [selectPostsResult],
  (postsResult) => postsResult?.data ?? emptyPosts
);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (_state, userId) => userId],
  (allPosts, userId) => allPosts.filter((post) => post.user.id === userId)
);
