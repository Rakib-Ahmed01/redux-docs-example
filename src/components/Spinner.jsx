export const Spinner = ({ text }) => {
  const header = text ? (
    <h4 className="text-xl font-semibold capitalize">{text}</h4>
  ) : null;
  return (
    <div className="flex flex-col gap-2 justify-center items-center mt-5">
      {header}
      <div className="w-12 h-12 border-4 border-dotted border-violet-500 rounded-full animate-spin" />
    </div>
  );
};
