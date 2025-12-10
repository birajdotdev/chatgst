import { InfoIcon } from "lucide-react";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface AlertMessageProps extends React.ComponentProps<typeof Alert> {
  message?: string;
}

export function AlertMessage({
  message,
  className,
  ...props
}: AlertMessageProps) {
  return (
    <Alert
      className={cn("border-none bg-transparent px-3 py-0", className)}
      {...props}
    >
      <InfoIcon />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
}
