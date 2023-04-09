import { type NextPage } from "next";

import { api } from "~/utils";
import { CreateWizard, Skeleton, PostView } from "~/components";

const Feed = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading)
    return (
      <Skeleton
        containerCn="flex flex-col gap-2"
        itemCn="w-full py-10"
        length={10}
      />
    );

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col gap-2">
      {data.map((fullPost) => (
        <PostView key={fullPost.post.id} {...fullPost} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  /**
   * Start fetching asap. With React Query it only needs to fetch
   * data once and then it will be cached
   */
  api.posts.getAll.useQuery();

  return (
    <div className="mt-3 flex flex-col gap-3">
      <CreateWizard wizardType="posts" />
      <Feed />
    </div>
  );
};

export default Home;
