import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import PostAuthor from './PostAuthor';
import { fetchPosts, selectPostById, selectPostIds } from './postsSlice';
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';

export default function PostsList() {
  // const posts = useSelector(selectAllPosts);
  const postIds = useSelector(selectPostIds);
  const postsStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, []);

  // const renderedPosts = posts
  //   .slice()
  //   .sort((a, b) => b.date.localeCompare(a.date))
  //   ?.map((post) => {
  //     return <Post key={post.id} post={post} />;
  //   });

  const renderedPosts = postIds?.map((postId) => {
    return <Post key={postId} postId={postId} />;
  });

  let content;

  if (postsStatus === 'loading') {
    content = <Spinner />;
  } else if (postsStatus === 'succeeded') {
    content = renderedPosts;
  } else if (postsStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <section>
      <h2 className="text-3xl text-center font-bold my-2">Posts</h2>
      {content}
    </section>
  );
}

function Post({ postId }) {
  const post = useSelector((state) => selectPostById(state, postId));
  return (
    <article className="border rounded p-3 w-1/2 mx-auto my-4">
      <h3 className="text-xl font-semibold">{post?.title}</h3>
      <PostAuthor user={post?.user} />
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
}
