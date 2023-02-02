import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectPostsByUser } from '../posts/postsSlice';
import { selectUserById } from './usersSlice';

export default function UsersPage() {
  const { userId } = useParams();

  // const posts = useSelector(selectAllPosts);

  const user = useSelector((state) => selectUserById(state, userId));

  // const postsForUser = posts.filter((post) => post.user.id === userId);

  // const postsForUser = useSelector((state) => {
  //   const allPosts = selectAllPosts(state);
  //   return allPosts.filter((post) => post.user.id === userId);
  // });

  const postsForUser = useSelector((state) => selectPostsByUser(state, userId));

  return (
    <section className="w-1/2 mx-auto">
      <h2 className="text-3xl text-center font-bold my-2">{user?.name}</h2>
      {postsForUser.length !== 0 ? (
        <ul>
          {postsForUser.map((post, idx) => {
            return (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>
                  {idx + 1}.{' '}
                  <span className="underline text-violet-500">
                    {post.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center">
          No post is added by{' '}
          <span className="text-violet-500"> {user?.name}</span>
        </p>
      )}
    </section>
  );
}
