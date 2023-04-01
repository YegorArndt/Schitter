import { type NextPage } from "next";
import Image from "next/image";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { api } from "~/utils";
import {
  LoadingPage,
  LoadingSpinner,
  PageLayout,
  PostView,
} from "~/components";
import { Input } from "~/components/ui";

const CreatePostWizard = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    reset: resetUserInput,
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      userInput: "",
    },
  });

  const ctx = api.useContext();

  const { mutate: createPost, isLoading: isPosting } =
    api.posts.create.useMutation({
      onSuccess: () => {
        resetUserInput();
        void ctx.posts.getAll.invalidate();
      },
      onError: (error) => {
        const errorMessage = error.data?.zodError?.fieldErrors.content;

        if (errorMessage?.[0]) {
          toast.error(errorMessage[0]);
          return;
        }

        toast.error("Something went wrong");
      },
    });

  const shouldDisplayPostButton = !isPosting && watch("userInput");

  /**
   * Make TS happy
   */

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
      <form
        onSubmit={
          void handleSubmit(({ userInput }) =>
            createPost({ content: userInput })
          )
        }
        className="grow"
      >
        <Input
          {...register("userInput", {})}
          type="text"
          placeholder="Feel free to schit!"
          className="bg-transparent outline-none"
          disabled={isPosting}
        />

        {shouldDisplayPostButton && (
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isPosting}
          >
            Post
          </button>
        )}
        {isPosting && (
          <div className="w-[2rem]">
            <LoadingSpinner />
          </div>
        )}
      </form>
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
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
    <PageLayout>
      {isSignedIn && (
        <div className="flex justify-center p-4">
          <SignOutButton />
        </div>
      )}
      <div className="flex border-b border-slate-400 p-4 ">
        <div className="flex justify-center">
          {!isSignedIn && (
            <SignInButton>Sign in to leave a comment</SignInButton>
          )}
        </div>
        {isSignedIn && <CreatePostWizard />}
      </div>
      <Feed />
    </PageLayout>
  );
};

export default Home;
