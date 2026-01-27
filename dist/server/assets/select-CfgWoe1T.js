import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { SearchIcon, ChevronsUpDown, CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { c as cn, B as Button } from "./button-D5vTpyVN.js";
import { Command as Command$1 } from "cmdk";
import { I as Input } from "./input-DokJ73Yy.js";
import { Popover as Popover$1, Select as Select$1 } from "radix-ui";
import { S as ScrollArea } from "./scroll-area-Bvwd_GHq.js";
function Command({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1,
    {
      "data-slot": "command",
      className: cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        className
      ),
      ...props
    }
  );
}
function CommandInput({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": "command-input-wrapper",
      className: "flex h-9 items-center gap-2 border-b px-3",
      children: [
        /* @__PURE__ */ jsx(SearchIcon, { className: "size-4 shrink-0 opacity-50" }),
        /* @__PURE__ */ jsx(
          Command$1.Input,
          {
            "data-slot": "command-input",
            className: cn(
              "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
              className
            ),
            ...props
          }
        )
      ]
    }
  );
}
function CommandList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1.List,
    {
      "data-slot": "command-list",
      className: cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className
      ),
      ...props
    }
  );
}
function CommandEmpty({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1.Empty,
    {
      "data-slot": "command-empty",
      className: "py-6 text-center text-sm",
      ...props
    }
  );
}
function CommandGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1.Group,
    {
      "data-slot": "command-group",
      className: cn(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
        className
      ),
      ...props
    }
  );
}
function CommandItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1.Item,
    {
      "data-slot": "command-item",
      className: cn(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      ),
      ...props
    }
  );
}
function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsx(Popover$1.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(Popover$1.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(Popover$1.Portal, { children: /* @__PURE__ */ jsx(
    Popover$1.Content,
    {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        className
      ),
      ...props
    }
  ) });
}
function PhoneInput({ className, onChange, value, ...props }) {
  return /* @__PURE__ */ jsx(
    RPNInput.default,
    {
      className: cn("flex", className),
      flagComponent: FlagComponent,
      countrySelectComponent: CountrySelect,
      inputComponent: InputComponent,
      smartCaret: false,
      value: value || void 0,
      onChange: (value2) => onChange?.(value2 || ""),
      ...props
    }
  );
}
function InputComponent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Input,
    {
      className: cn("rounded-s-none rounded-e-lg", className),
      ...props
    }
  );
}
const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange
}) => {
  const scrollAreaRef = React.useRef(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  return /* @__PURE__ */ jsxs(
    Popover,
    {
      open: isOpen,
      modal: true,
      onOpenChange: (open) => {
        setIsOpen(open);
        if (open) setSearchValue("");
      },
      children: [
        /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            className: "flex gap-1 rounded-s-lg rounded-e-none border-r-0 border-input px-3 focus:z-10",
            disabled,
            children: [
              /* @__PURE__ */ jsx(
                FlagComponent,
                {
                  country: selectedCountry,
                  countryName: selectedCountry
                }
              ),
              /* @__PURE__ */ jsx(
                ChevronsUpDown,
                {
                  className: cn(
                    "-mr-2 size-4 opacity-50",
                    disabled ? "hidden" : "opacity-100"
                  )
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(PopoverContent, { className: "w-[300px] p-0", children: /* @__PURE__ */ jsxs(Command, { children: [
          /* @__PURE__ */ jsx(
            CommandInput,
            {
              value: searchValue,
              onValueChange: (value) => {
                setSearchValue(value);
                setTimeout(() => {
                  if (scrollAreaRef.current) {
                    const viewportElement = scrollAreaRef.current.querySelector(
                      "[data-radix-scroll-area-viewport]"
                    );
                    if (viewportElement) {
                      viewportElement.scrollTop = 0;
                    }
                  }
                }, 0);
              },
              placeholder: "Search country..."
            }
          ),
          /* @__PURE__ */ jsx(CommandList, { children: /* @__PURE__ */ jsxs(ScrollArea, { ref: scrollAreaRef, className: "h-72", children: [
            /* @__PURE__ */ jsx(CommandEmpty, { children: "No country found." }),
            /* @__PURE__ */ jsx(CommandGroup, { children: countryList.map(
              ({ value, label }) => value ? /* @__PURE__ */ jsx(
                CountrySelectOption,
                {
                  country: value,
                  countryName: label,
                  selectedCountry,
                  onChange,
                  onSelectComplete: () => setIsOpen(false)
                },
                value
              ) : null
            ) })
          ] }) })
        ] }) })
      ]
    }
  );
};
const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete
}) => {
  const handleSelect = () => {
    onChange(country);
    onSelectComplete();
  };
  return /* @__PURE__ */ jsxs(CommandItem, { className: "gap-2", onSelect: handleSelect, children: [
    /* @__PURE__ */ jsx(FlagComponent, { country, countryName }),
    /* @__PURE__ */ jsx("span", { className: "flex-1 text-sm", children: countryName }),
    /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground/50", children: `+${RPNInput.getCountryCallingCode(country)}` }),
    /* @__PURE__ */ jsx(
      CheckIcon,
      {
        className: `ml-auto size-4 ${country === selectedCountry ? "opacity-100" : "opacity-0"}`
      }
    )
  ] });
};
const FlagComponent = ({ country, countryName }) => {
  const Flag = flags[country];
  return /* @__PURE__ */ jsx("span", { className: "flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg:not([class*='size-'])]:size-full", children: Flag && /* @__PURE__ */ jsx(Flag, { title: countryName }) });
};
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsx(Select$1.Root, { "data-slot": "select", ...props });
}
function SelectGroup({
  ...props
}) {
  return /* @__PURE__ */ jsx(Select$1.Group, { "data-slot": "select-group", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsx(Select$1.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    Select$1.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "flex w-fit items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(Select$1.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}) {
  return /* @__PURE__ */ jsx(Select$1.Portal, { children: /* @__PURE__ */ jsxs(
    Select$1.Content,
    {
      "data-slot": "select-content",
      className: cn(
        "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      align,
      ...props,
      children: [
        /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx(
          Select$1.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Select$1.Label,
    {
      "data-slot": "select-label",
      className: cn("px-2 py-1.5 text-xs text-muted-foreground", className),
      ...props
    }
  );
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    Select$1.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(Select$1.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsx(Select$1.ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Select$1.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronUpIcon, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Select$1.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4" })
    }
  );
}
export {
  PhoneInput as P,
  Select as S,
  SelectTrigger as a,
  SelectValue as b,
  SelectContent as c,
  SelectGroup as d,
  SelectLabel as e,
  SelectItem as f
};
