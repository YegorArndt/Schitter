import { type NextPage } from "next";

import { api } from "~/utils";
import { CreateWizard, Feed } from "~/components";

const Home: NextPage = () => {
  /**
   * Start fetching asap. With React Query it only needs to fetch
   * data once and then it will be cached
   */
  const { data, isLoading } = api.posts.getAll.useQuery();

  return (
    <div className="mt-3 flex flex-col gap-3">
      <CreateWizard wizardType="posts" />
      <Feed data={data} isLoading={isLoading} />
    </div>
  );
};

export default Home;
