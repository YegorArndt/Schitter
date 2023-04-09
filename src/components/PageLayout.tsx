import { useRouter } from "next/router";
import type { PropsWithChildren } from "react";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

import { Logo } from "~/components/icons";
import { Link } from "~/components/ui";

const TopPanel = () => {
  const router = useRouter();
  const { isSignedIn, user } = useUser();

  return (
    <div className="flex flex-col">
      <header className="flex-between py-5">
        <Logo className="h-[30px] w-[160px]" />
        {isSignedIn ? (
          <SignOutButton>sign out</SignOutButton>
        ) : (
          <SignInButton>sign in to give a schit</SignInButton>
        )}
      </header>
      {isSignedIn && user.username && (
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
      )}
    </div>
  );
};

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center [&>*]:container">
      <TopPanel />
      <main>{props.children}</main>
    </div>
  );
};
