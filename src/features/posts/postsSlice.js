import { createSlice } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import { nanoid } from 'nanoid';

const initialState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      eyes: 0,
      rocket: 0,
      heart: 0,
      hooray: 0,
      thumbsUp: 0,
      haha: 0,
    },
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    author: 'Madison Price',
    date: sub(new Date(), { minutes: 7 }).toISOString(),
    reactions: {
      eyes: 0,
      rocket: 0,
      heart: 0,
      hooray: 0,
      thumbsUp: 0,
      haha: 0,
    },
  },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, author) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            author,
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
        };
      },
    },
    editPost: (state, action) => {
      const { title, content, postId } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        (existingPost.title = title), (existingPost.content = content);
      }
    },
    addReaction: (state, action) => {
      const { reaction, postId } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
});

export const selectAllPosts = (state) => state.posts;

export const selectPostById = (state, postId) =>
  state.posts.find((post) => post.id === postId);

export const { addPost, editPost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;
