export default function PostAuthor({ user: { name } }) {
  return (
    <>
      by{' '}
      <span className="text-violet-500">{name ? name : 'Unknown Author'}</span>
    </>
  );
}
