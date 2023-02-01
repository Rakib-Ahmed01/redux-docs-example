import { formatDistanceToNow } from 'date-fns';

export default function TimeAgo({ date }) {
  const difference = formatDistanceToNow(new Date(date));
  return <span className="italic ml-2 inline-block">{difference} ago</span>;
}
