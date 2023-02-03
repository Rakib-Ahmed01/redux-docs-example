import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllUsers } from './usersSlice';

export default function UsersList() {
  const users = useSelector(selectAllUsers);
  // const { data: users, isLoading } = useGetUsersQuery();

  console.log(users);

  // if (isLoading) {
  //   return <Spinner text="Loading Users..." />;
  // }
  return (
    <section className="w-1/2 mx-auto">
      <h2 className="text-3xl text-center font-bold my-2">Users</h2>
      <ul>
        {users?.map((user, idx) => {
          return (
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>
                {idx + 1}.{' '}
                <span className="underline text-violet-500">{user.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
