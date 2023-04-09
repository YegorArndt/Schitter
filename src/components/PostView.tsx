import Image from "next/image";

import { Link } from "~/components/ui";
import { fromNow, type RouterOutputs } from "~/utils";

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
export const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  return (
    <div className="flex justify-start gap-3 rounded-lg py-4 px-3 bg-dark-red">
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
            className="z-1 text-base font-bold clr-red"
          />
          <span className="clr-gray">{fromNow(post.createdAt)}</span>
        </header>
        <span>{post.content}</span>
      </div>
    </div>
  );
};
