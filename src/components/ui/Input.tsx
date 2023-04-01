import cn from "classnames";

import type { DefaultProps } from "./types";

type InputProps = {
  onEnter?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement> &
  JSX.IntrinsicElements["input"] &
  DefaultProps;

export const Input = (props: InputProps) => {
  return (
    <input
      type="text"
      className={cn(
        "bg-transparent outline-none",
        props.className,
        props.baseCn
      )}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          props.onEnter?.();
        }
      }}
      autoComplete="off"
      {...props}
    />
  );
};
