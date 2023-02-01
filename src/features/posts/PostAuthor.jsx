export default function PostAuthor({ author }) {
  return (
    <>
      by{' '}
      <span className="text-violet-500">
        {author ? author : 'Unknown Author'}
      </span>
    </>
  );
}
