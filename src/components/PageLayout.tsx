import type { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex justify-center">
      <div className="container h-full">{props.children}</div>
    </main>
  );
};
