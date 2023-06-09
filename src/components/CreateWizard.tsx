import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { api } from "~/utils";
import { LoadingSpinner, Skeleton } from "~/components";
import { Button } from "~/components/ui";

const wizardConfigs = {
  posts: {
    placeholder: "give a schit...",
    minSymbols: 20,
  },
  // comments: {
  //   placeholder: 'well, comment away, smart-ass...',
  //   minSymbols: 1
  // }
};

type CreateWizardProps = {
  wizardType: "posts";
};
export const CreateWizard = (props: CreateWizardProps) => {
  const { wizardType } = props;
  const { user, isLoaded: isUserLoaded } = useUser();
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

  const { mutate: create, isLoading: isPosting } = api[
    wizardType
  ].create.useMutation({
    onSuccess: () => {
      resetUserInput();
      void ctx[wizardType].getAll.invalidate();
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

  const inputLength = watch("userInput").length;
  const { minSymbols } = wizardConfigs[wizardType];

  if (!isUserLoaded) return <Skeleton itemCn="py-10" />;

  if (!user) return null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(({ userInput }) => create({ content: userInput }))();
      }}
      className="b focus-within:b-active flex w-full flex-col gap-4 rounded-xl [&>*]:p-4"
    >
      <textarea
        {...register("userInput", { minLength: 20, maxLength: 255 })}
        placeholder={wizardConfigs[wizardType].placeholder}
        disabled={isPosting}
        className="w-full overflow-y-hidden outline-none bg-transparent"
      />

      {Boolean(inputLength) && (
        <footer className="flex-between clr-gray">
          <small>{inputLength} / 255</small>
          {inputLength >= minSymbols ? (
            isPosting ? (
              <LoadingSpinner />
            ) : (
              <Button type="submit" text="Post" red disabled={isPosting} />
            )
          ) : (
            <small>At least {minSymbols} symbols</small>
          )}
        </footer>
      )}
    </form>
  );
};
