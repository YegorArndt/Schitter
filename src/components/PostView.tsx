import Link from "next/link";
import Image from "next/image";

import { fromNow, type RouterOutputs } from "~/utils";

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
            {fromNow(post.createdAt)}
          </Link>
        </div>
        <span className="text-xl">{post.content}</span>
      </div>
    </div>
  );
};
