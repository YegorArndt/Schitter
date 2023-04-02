import cn from "classnames";

import type { DefaultProps } from "../types";
import styles from "./styles.module.css";

export type composeClassnamesProps = {
  className?: DefaultProps["className"];
  baseCn?: DefaultProps["baseCn"];
  sm?: boolean;
  md?: boolean;
  red?: boolean;
  white?: boolean;
  ghost?: boolean;
};
export const composeClassnames = ({
  className,
  baseCn,
  sm,
  md,
  red,
  white,
  ghost,
}: composeClassnamesProps) =>
  cn(baseCn, className, {
    [styles["btn-sm"] as string]: sm,
    [styles["btn-md"] as string]: md,
    [styles["btn-red"] as string]: red,
    [styles["btn-white"] as string]: white,
    [styles["btn-ghost"] as string]: ghost,
  });

export type ButtonProps = { text?: string } & composeClassnamesProps &
  JSX.IntrinsicElements["button"] &
  DefaultProps;

export const Button = (props: ButtonProps) => {
  const { className, baseCn, text, children = text, ...rest } = props;

  return (
    <button
      aria-label="button"
      type="button"
      className={composeClassnames({ className, baseCn })}
      {...rest}
    >
      {children}
    </button>
  );
};
