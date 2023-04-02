import { forwardRef } from "react";
import cn from "classnames";

import type { DefaultProps } from "./types";

type InputProps = {
  onEnter?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement> &
  JSX.IntrinsicElements["input"] &
  DefaultProps;

export const Input = forwardRef(
  (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
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
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "UI Kit Input";
