import { Link, useParams } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import { useGetPostQuery } from '../api/apiSlice';
import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';

export default function SinglePost() {
  const { postId } = useParams();
  // const post = useSelector((state) => selectPostById(state, postId));
  const { data: post, isLoading } = useGetPostQuery(postId);

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

  return (
    <section className="w-1/2 mx-auto my-4">
      <h2 className="text-3xl text-center font-bold my-2">Post</h2>
      <article className="border rounded p-3">
        <h3 className="text-xl font-semibold">{post?.title}</h3>
        <PostAuthor user={post?.user} />
        <TimeAgo date={post?.date} />
        <p className="text-gray-700">{post?.content}</p>
        <ReactionButtons reactions={post.reactions} postId={post.id} />
        <Link
          to={`/edit-post/${post.id}`}
          className="bg-violet-500 text-white px-4 py-2 rounded-sm mt-1 inline-block"
        >
          Edit Post
        </Link>
      </article>
      <Link to="/" className="text-violet-500">
        Back To Homepage
      </Link>
    </section>
  );
}
