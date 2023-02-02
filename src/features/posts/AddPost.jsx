import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddNewPostMutation } from '../api/apiSlice';
import { selectAllUsers } from '../users/usersSlice';

export default function AddPost() {
  const [data, setData] = useState({
    title: '',
    content: '',
    user: null,
  });
  const { title, content, user } = data;
  const userData = JSON.parse(user);

  const users = useSelector(selectAllUsers);
  // const [addPostStatus, setAddPostStatus] = useState('idle');
  // const dispatch = useDispatch();

  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  // const canSave = title && content && user;
  const canSave = [title, content, user].every(Boolean) && !isLoading;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        await addNewPost({
          title,
          content,
          user: userData,
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
        }).unwrap();
        setData({ title: '', content: '', user: null });
      } catch (err) {
        console.error('Failed to add the post: ', err);
      } finally {
        e.target.reset();
      }
    }
  };

  return (
    <section>
      <h2 className="text-3xl text-center font-bold my-2">Add Post</h2>
      <form
        className="flex flex-col space-y-2 w-1/2 mx-auto my-2"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="text-[17px]">
            Post Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="border  p-2 rounded focus:outline-none focus:border-violet-200"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="user" className="text-[17px]">
            Author:
          </label>
          <select
            name="user"
            id="user"
            className="border focus:p-2 p-2 rounded focus:outline-none resize-none focus:border-violet-200"
            onChange={handleChange}
          >
            <option value="">Select Author</option>
            {users.map((user) => {
              return (
                <option value={JSON.stringify(user)} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="content" className="text-[17px]">
            Content:
          </label>
          <textarea
            type="text"
            name="content"
            id="content"
            className="border focus:p-2 p-2 rounded focus:outline-none resize-none focus:border-violet-200"
            value={content}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-violet-500 text-white px-4 py-2 mt-2 rounded-sm disabled:bg-violet-400 disabled:cursor-not-allowed"
          disabled={!canSave}
        >
          Save Post
        </button>
      </form>
    </section>
  );
}
