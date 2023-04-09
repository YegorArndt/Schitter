import { type PropsWithChildren } from "react";
import cn from "classnames";

type SkeletonProps = PropsWithChildren<{
  containerCn?: string;
  itemCn?: string;
  length?: number;
}>;
export const Skeleton = (props: SkeletonProps) => {
  return (
    <div
      className={cn(
        "[&>*]:animate-pulse [&>*]:rounded-md [&>*]:opacity-10 [&>*]:bg-gray",
        props.containerCn
      )}
    >
      {props.children ||
        Array.from({ length: props.length || 1 }, (_, i) => i + 1).map(
          (skeletonItem) => <div key={skeletonItem} className={props.itemCn} />
        )}
    </div>
  );
};
