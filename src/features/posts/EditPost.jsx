import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditPostMutation, useGetPostQuery } from '../api/apiSlice';

export default function EditPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  // const post = useSelector((state) => selectPostById(state, postId));
  const { data: post, isLoading } = useGetPostQuery(postId);
  const [editPost] = useEditPostMutation();

  if (isLoading) {
    return <Spinner text="loading post..." />;
  }

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const [data, setData] = useState({
    title: post.title,
    content: post.content,
  });

  // const dispatch = useDispatch();
  const { title, content } = data;
  const canSave = title && content;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editPost({ id: postId, title, content });
    setData({ title: '', content: '' });
    e.target.reset();
    navigate(`/posts/${postId}`);
  };

  return (
    <section>
      <h2 className="text-3xl text-center font-bold my-2">Edit Post</h2>
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
