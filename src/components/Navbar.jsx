import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="bg-violet-500 text-white py-6 text-center">
      <section className="w-1/2 mx-auto">
        <h1 className="text-5xl">Redux Essentials Example</h1>
        <div className="navContent">
          <div className="navLinks flex justify-center gap-2 mt-2">
            <Link to="/">Home</Link>
            <Link to="/posts">Posts</Link>
          </div>
        </div>
      </section>
    </nav>
  );
};
