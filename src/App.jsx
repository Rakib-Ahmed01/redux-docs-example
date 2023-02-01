import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import AddPost from './features/posts/AddPost';
import EditPost from './features/posts/EditPost';
import PostsList from './features/posts/PostsList';
import SinglePost from './features/posts/SinglePost';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <header>
        <Navbar />
        <Outlet />
      </header>
    ),
    children: [
      {
        index: true,
        element: (
          <main>
            <AddPost />
            <PostsList />
          </main>
        ),
      },
      {
        path: '/posts',
        element: <PostsList />,
      },
      {
        path: '/posts/:postId',
        element: <SinglePost />,
      },
      {
        path: '/edit-post/:postId',
        element: <EditPost />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
