import { useRouter } from "next/router";
import { type PropsWithChildren } from "react";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

import { Logo } from "~/components/icons";
import { Link } from "~/components/ui";
import { Skeleton } from "~/components";

const Navigation = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  if (!isLoaded)
    return (
      <Skeleton containerCn="flex gap-3" itemCn="h-[40px] w-full" length={3} />
    );

  if (!user?.username) return null;

  return (
    <nav className="flex-evenly b-t b-b">
      {[
        { text: "profile", to: `/${user.username}` },
        { text: "feed", to: `/` },
        { text: "activity", to: `/${user.username}/activity` },
      ].map(({ text, to }) => (
        <Link
          key={text}
          text={text}
          to={to}
          baseCn="p-2"
          className={router.asPath === to && "b-b-active"}
        />
      ))}
    </nav>
  );
};

export const PageLayout = (props: PropsWithChildren) => {
  const { isSignedIn } = useUser();

  return (
    <div className="flex flex-col items-center [&>*]:container">
      <header className="flex-between py-5">
        <Link to="/">
          <Logo className="h-[30px] w-[160px]" />
        </Link>
        {isSignedIn ? (
          <SignOutButton>sign out</SignOutButton>
        ) : (
          <SignInButton>sign in to give a schit</SignInButton>
        )}
      </header>
      <Navigation />
      <main>{props.children}</main>
    </div>
  );
};
