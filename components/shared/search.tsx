import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function Search(props: Props = { className: "" }) {
  return (
    <Input
      type="search"
      placeholder="Search..."
      className={cn("mr-6 h-10", props.className)}
    />
  );
}
