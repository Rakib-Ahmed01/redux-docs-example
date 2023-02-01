import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import { selectAllPosts } from './postsSlice';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';

export default function PostsList() {
  const posts = useSelector(selectAllPosts);

  const renderedPosts = posts?.map((post) => {
    return (
      <article key={post?.id} className="border rounded p-3 w-1/2 mx-auto my-4">
        <h3 className="text-xl font-semibold">{post?.title}</h3>
        <PostAuthor author={post?.author} />
        <TimeAgo date={post?.date} />
        <p className="text-gray-700">
          {post?.content.length > 100
            ? post?.content?.substring(0, 100) + '...'
            : post?.content}
        </p>
        <ReactionButtons reactions={post.reactions} postId={post.id} />
        <Link
          to={`/posts/${post.id}`}
          className="bg-violet-500 text-white px-4 py-2 rounded-sm mt-1 inline-block"
        >
          View Post
        </Link>
      </article>
    );
  });
  return (
    <section>
      <h2 className="text-3xl text-center font-bold my-2">Posts</h2>
      {renderedPosts}
    </section>
  );
}
