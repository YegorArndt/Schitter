import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { LoadingPage, PostView } from "~/components";

const ProfileFeed = (props: { userId: string }) => {
  const { data, isLoading } = api.posts.getPostsByUserId.useQuery({
    userId: props.userId,
  });

  if (isLoading) return <LoadingPage />;

  if (!data || data.length === 0) return <div>404</div>;

  return (
    <div>
      {data.map((fullPost) => (
        <PostView key={fullPost.post.id} {...fullPost} />
      ))}
    </div>
  );
};

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <div className="relative h-36 bg-slate-600">
        <Image
          src={data.profileImageUrl}
          alt={`${data.username ?? ""}'s profile picture`}
          height={128}
          width={128}
          className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black bg-black"
        />
      </div>
      <div className="h-[64px]" />
      <div className="p-4 text-2xl font-bold">@{data.username}</div>

      <div className="w-full border-b border-slate-400">
        <ProfileFeed userId={data.id} />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const username = context.params?.username;

  if (typeof username !== "string") throw new Error("Username is not a string");

  const usernameWithAt = username.replace("@", "");

  await ssg.profile.getUserByUsername.prefetch({ username: usernameWithAt });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username: usernameWithAt,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ProfilePage;
