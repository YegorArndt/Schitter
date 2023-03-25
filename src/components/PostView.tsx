import Link from "next/link";
import Image from "next/image";

import { type RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
export const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  return (
    <div className="flex justify-start gap-3 border-b border-slate-400 p-8">
      <Image
        src={author.profileImageUrl}
        alt={`@${author.username}'s profile picture`}
        height={50}
        width={50}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <div className="flex items-center text-slate-300">
          <Link href={`/@${author.username}`}>@{author.username}</Link>
          <Link
            href={`/post/${post.id}`}
            className="font-thin before:mx-1 before:content-['·']"
          >
            {dayjs(post.createdAt).fromNow()}
          </Link>
        </div>
        <span className="text-xl">{post.content}</span>
      </div>
    </div>
  );
};
