import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { nanoid } from 'nanoid';

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

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

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
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        (existingPost.title = title), (existingPost.content = content);
      }
    },
    addReaction: (state, action) => {
      const { reaction, postId } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
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
        (state.status = 'succeeded'), (state.posts = action.payload);
      })

      .addCase(fetchPosts.rejected, (state, action) => {
        (state.status = 'failed'), (state.error = action.error.message);
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

export const { editPost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;
