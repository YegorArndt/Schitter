import { type RouterOutputs } from "~/utils";

import { Skeleton } from "./Skeleton";
import { PostView } from "./PostView";

type FeedProps = {
  data: RouterOutputs["posts"]["getAll"] | undefined;
  isLoading: boolean;
};
export const Feed = (props: FeedProps) => {
  const { data, isLoading } = props;

  if (isLoading)
    return (
      <Skeleton
        containerCn="flex flex-col gap-2"
        itemCn="w-full py-10"
        length={10}
      />
    );

  if (!data) return <div>Something went wrong. Probably the database is asleep</div>;

  return (
    <div className="flex flex-col gap-2">
      {data.map((fullPost) => (
        <PostView key={fullPost.post.id} {...fullPost} />
      ))}
    </div>
  );
};
