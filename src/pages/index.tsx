import { type NextPage } from "next";
import Image from "next/image";
import Head from "next/head";
import { SignInButton, useUser } from "@clerk/nextjs";

import { api, type RouterOutputs } from "~/utils/api";
import { LoadingPage } from "~/components";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const CreatePostWizard = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex w-full items-center gap-3">
      <Image
        src={user.profileImageUrl}
        alt="Profile Image"
        width={56}
        height={56}
        className="rounded-full"
      />
      <input
        placeholder="Type some emojis!"
        className="grow bg-transparent outline-none"
      />
    </div>
  );
};

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
const PostView = (props: PostWithUser) => {
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
          <span>@{author.username}</span>
          <span className="font-thin before:mx-1 before:content-['·']">
            {dayjs(post.createdAt).fromNow()}
          </span>
        </div>
        <span>{post.content}</span>
      </div>
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col">
      {[...data, ...data].map((fullPost) => (
        <PostView key={fullPost.post.id} {...fullPost} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  /**
   * Start fetching asap. With React Query it only needs to fetch
   * data once and then it will be cached
   */
  api.posts.getAll.useQuery();

  if (!userLoaded) return <div />;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
          <div className="flex border-b border-slate-400 p-4 ">
            <div className="flex justify-center">
              {!isSignedIn && <SignInButton />}
            </div>
            {isSignedIn && <CreatePostWizard />}
          </div>
          <Feed />
        </div>
      </main>
    </>
  );
};

export default Home;
