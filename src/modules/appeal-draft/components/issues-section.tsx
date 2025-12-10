"use client";

import { use } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertMessage } from "@/modules/appeal-draft/components/alert-message";
import { IssueCard } from "@/modules/appeal-draft/components/issue-card";
import { PotentialIssues } from "@/modules/appeal-draft/types";

interface IssuesSectionProps {
  issues: Promise<PotentialIssues>;
}

export function IssuesSection({ issues }: IssuesSectionProps) {
  const issuesData = use(issues);

  return (
    <>
      <AlertMessage
        message={`Identified ${issuesData.length} potential ${issuesData.length === 1 ? "issue" : "issues"} using legal pattern recognition.`}
      />
      <ScrollArea className="max-h-[34rem]">
        <section className="grid grid-cols-1 gap-4.5 md:grid-cols-2">
          {issuesData.map((issue, index) => (
            <IssueCard key={index} {...issue} />
          ))}
        </section>
      </ScrollArea>
    </>
  );
}
