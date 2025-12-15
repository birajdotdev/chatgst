"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LegalReferenceSelection } from "@/modules/appeal-draft/components/legal-reference-selection";
import { LegalReferenceSection } from "@/modules/appeal-draft/types";

interface ReferenceCardProps extends React.ComponentProps<typeof Card> {
  reference: LegalReferenceSection;
}

export function ReferenceCard({ reference, ...props }: ReferenceCardProps) {
  return (
    <Card className="@container/card gap-4 py-5" {...props}>
      <CardFooter>
        <LegalReferenceSelection
          referenceId={reference.id}
          selected={reference.selected}
        />
        <Badge variant="secondary" className="rounded-full">
          ACT
        </Badge>
      </CardFooter>
      <CardHeader>
        <CardTitle className="text-[16px] leading-[20px]">
          {reference.section_name}
        </CardTitle>
        <CardDescription className="text-xs">
          {reference.brief_description_of_section}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-[4px] text-xs font-medium">
        <h3 className="leading-[20px]">Authority</h3>
        <p className="text-foreground">{reference.authority}</p>
      </CardContent>
      <CardContent className="space-y-[4px] text-xs font-medium">
        <h3 className="leading-[20px]">Key Points</h3>
        <ul className="list-disc space-y-[6px] px-4 text-foreground">
          {reference.key_points.map((point, index) => (
            <li key={`point-${index}`}>{point}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
