import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function ButtonPopover(props: {
  label: string;
  items: { label: string; onClick?: () => void }[];
  buttonProps?: React.ComponentProps<typeof Button>;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="pr-0 bg-black" {...props.buttonProps}>
          {props.label}
          <span className="border-l border-l-white/40 px-2 flex items-center justify-center">
            <ChevronDown />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-44 p-1">
        {props.items.map((item, index) => (
          <Button
            key={index}
            onClick={item.onClick}
            variant="ghost"
            className="w-full"
          >
            {item.label}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
