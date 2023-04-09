import { Skeleton } from "./Skeleton";

type SchitCounterProps = {
  count: number | undefined;
  isLoading: boolean;
  placeholder?: string;
};
export const SchitCounter = (props: SchitCounterProps) => {
  const { count, isLoading, placeholder = "schits given:" } = props;

  return isLoading ? (
    <Skeleton itemCn="py-5" />
  ) : count ? (
    <div className="text-center clr-red">
      {placeholder} {count}
    </div>
  ) : null;
};
