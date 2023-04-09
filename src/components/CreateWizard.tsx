import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { api } from "~/utils";
import { LoadingSpinner, Skeleton } from "~/components";
import { Button } from "~/components/ui";

type CreateWizardProps = {
  type: "posts";
};
export const CreateWizard = (props: CreateWizardProps) => {
  const { type } = props;
  const { user, isSignedIn, isLoaded } = useUser();
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

  const { mutate: create, isLoading: isPosting } = api.posts.create.useMutation(
    {
      onSuccess: () => {
        resetUserInput();
        void ctx[type].getAll.invalidate();
      },
      onError: (error) => {
        const errorMessage = error.data?.zodError?.fieldErrors.content;

        if (errorMessage?.[0]) {
          toast.error(errorMessage[0]);
          return;
        }

        toast.error("Something went wrong");
      },
    }
  );

  const inputLength = watch("userInput").length;

  if (!isLoaded) return <Skeleton itemCn="py-10" />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(({ userInput }) => create({ content: userInput }));
      }}
      className="b focus-within:b-active flex w-full flex-col gap-4 rounded-xl [&>*]:p-4"
    >
      <textarea
        {...register("userInput", {})}
        placeholder={
          type === "posts"
            ? "give a schit..."
            : "well, comment away, smart-ass..."
        }
        disabled={isPosting}
        className="w-full overflow-y-hidden outline-none bg-transparent"
      />

      {Boolean(inputLength) && (
        <footer className="flex-between">
          <small className="clr-gray">{inputLength} / 255</small>
          <Button
            type="submit"
            text="Post"
            red
            disabled={isPosting}
            data-tooltip-id="post-button"
          />
        </footer>
      )}

      {(inputLength < 20 || inputLength > 255) && (
        <Tooltip
          id="post-button"
          content="Your post must be at least 20 and at most 255 symbols long"
          positionStrategy="absolute"
          variant="light"
        />
      )}

      {isPosting && (
        <div className="w-[2rem]">
          <LoadingSpinner />
        </div>
      )}
    </form>
  );
};
