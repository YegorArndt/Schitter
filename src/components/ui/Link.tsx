import NextLink, { type LinkProps as NextLinkProps } from "next/link";

import { composeClassnames, type composeClassnamesProps } from "./button";
import type { DefaultProps } from "./types";

export type LinkProps = {
  text?: string;
  to: NextLinkProps["href"];
} & composeClassnamesProps &
  Omit<NextLinkProps, "href"> &
  DefaultProps;

export const Link = (props: LinkProps) => {
  const {
    className,
    baseCn,
    text,
    children = text,
    to,
    sm,
    md,
    red,
    white,
    ghost,
    ...rest
  } = props;

  return (
    <NextLink
      aria-label="link"
      className={composeClassnames({
        className,
        baseCn,
        sm,
        md,
        red,
        white,
        ghost,
      })}
      href={to}
      {...rest}
    >
      {children}
    </NextLink>
  );
};
