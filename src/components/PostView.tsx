import Image from "next/image";

import { Link } from "~/components/ui";
import { fromNow, type RouterOutputs } from "~/utils";

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
export const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  return (
    <div className="relative flex justify-start gap-3 rounded-lg py-4 px-3 bg-dark-red">
      <Link to={`/@${author.username}`} className="z-1">
        <Image
          src={author.profileImageUrl}
          alt={`@${author.username}'s profile picture`}
          height={50}
          width={50}
          className="rounded-full"
        />
      </Link>
      <div className="flex w-full flex-col gap-2">
        <header className="flex items-center justify-between">
          <Link
            text={`@${author.username}`}
            to={`/@${author.username}`}
            className="z-1 clr-red"
          />
          <span className="clr-gray">{fromNow(post.createdAt)}</span>
        </header>
        <span className="text-xl">{post.content}</span>
      </div>

      {/* You can't have nested <a />'s */}
      <Link
        to={`/post/${post.id}`}
        className="absolute top-0 left-0 h-full w-full"
      />
    </div>
  );
};
