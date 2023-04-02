import { type NextPage } from "next";
import Image from "next/image";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { api } from "~/utils";
import {
  LoadingPage,
  LoadingSpinner,
  PageLayout,
  PostView,
} from "~/components";
import { Button, Input } from "~/components/ui";
import { Logo } from "~/components/icons";

const CreatePostWizard = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    reset: resetUserInput,
    watch,
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

  const isButtonDisabled = Boolean(!isPosting && watch("userInput"));

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
          placeholder="Feel free to schit!"
          disabled={isPosting}
        />

        <Button type="submit" text="Post" disabled={isButtonDisabled} />

        <Tooltip
          id="post-button"
          content="Your post must be at least 20 and at most 255 symbols long"
          positionStrategy="absolute"
          variant="light"
        />
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
    <div className="flex flex-col gap-2">
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

  if (!userLoaded) return null;

  return (
    <PageLayout>
      <header className="flex items-center justify-between py-5">
        <Logo className="h-[30px] w-[160px]" />
        {isSignedIn ? (
          <SignOutButton>sign out</SignOutButton>
        ) : (
          <SignInButton>sign in to give a schit</SignInButton>
        )}
      </header>

      {isSignedIn && <CreatePostWizard />}
      <Feed />
    </PageLayout>
  );
};

export default Home;
