import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { Feed } from "~/components";

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data: userProfileData } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (!userProfileData || !userProfileData.username)
    return <div>User Page Not Found</div>;

  const { data: userPosts, isLoading: userPostsLoading } =
    api.posts.getPostsByUserId.useQuery({
      userId: userProfileData?.id,
    });

  return (
    <>
      <Head>
        <title>{userProfileData.username}</title>
      </Head>
      <div className="py-4">
        <Image
          src={userProfileData.profileImageUrl}
          alt={`${userProfileData.username}'s profile picture`}
          height={128}
          width={128}
          className="rounded-full"
        />
        <div className="p-4 text-2xl font-bold">
          @{userProfileData.username}
        </div>
      </div>
      <Feed data={userPosts} isLoading={userPostsLoading} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const usernameWithAt = context.params?.username;

  if (typeof usernameWithAt !== "string")
    throw new Error("Username is not a string");

  const username = usernameWithAt.replace("@", "");

  await ssg.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ProfilePage;
