import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IssueToggleSwitch } from "@/modules/appeal-draft/components/issue-toggle-switch";
import { PotentialIssue } from "@/modules/appeal-draft/types";

export function IssueCard({
  id,
  title,
  supporting_text,
  dispute_type,
  legal_bases,
  selected,
}: PotentialIssue) {
  return (
    <Card className="@container/card gap-4 py-5">
      <CardHeader className="gap-0 px-6">
        <div className="ml-auto">
          <IssueToggleSwitch issueId={id} selected={selected} />
        </div>
      </CardHeader>
      <CardContent className="grow space-y-2 px-6">
        <CardTitle className="text-[16px] leading-[20px] font-medium">
          {title}
        </CardTitle>
        <CardDescription className="text-xs">{dispute_type}</CardDescription>
        <CardDescription className="text-xs text-secondary-foreground dark:text-accent-foreground">
          {supporting_text}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 px-6">
        <h1
          className="bg-linear-to-r from-blue-600 to-pink-600 text-sm font-medium"
          style={{
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          AI Suggestions
        </h1>
        <Suggestions scrollFade>
          {legal_bases.map((suggestion) => (
            <Suggestion
              key={suggestion}
              suggestion={suggestion}
              className="px-3.5 py-1.5 text-xs"
            />
          ))}
        </Suggestions>
      </CardFooter>
    </Card>
  );
}
