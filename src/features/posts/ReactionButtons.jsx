import { useDispatch } from 'react-redux';
import { addReaction } from './postsSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  haha: '😂',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
};

export default function ReactionButtons({ reactions, postId }) {
  const dispatch = useDispatch();

  const onReactionButtonClicked = (reaction) => {
    dispatch(addReaction({ reaction, postId }));
  };

  return (
    <div className="flex gap-2 my-2">
      {Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
          <div
            key={name}
            className="border w-14 py-1 rounded flex gap-1 cursor-pointer hover:border-gray-500 justify-center"
            onClick={() => onReactionButtonClicked(name)}
          >
            {emoji}
            <span className="font-semibold"> {reactions[name]}</span>
          </div>
        );
      })}
    </div>
  );
}
