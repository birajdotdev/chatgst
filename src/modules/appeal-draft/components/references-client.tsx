"use client";

import { use } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertMessage } from "@/modules/appeal-draft/components/alert-message";
import { ReferenceSection } from "@/modules/appeal-draft/components/reference-section";
import { LegalReference } from "@/modules/appeal-draft/types";

interface ReferencesClientProps {
  references: Promise<LegalReference[]>;
}

export function ReferencesClient({ references }: ReferencesClientProps) {
  const data = use(references);
  return (
    <>
      <AlertMessage
        message={`Analyzed ${data.length} legal authorities from our comprehensive GST database.`}
      />
      <ScrollArea className="max-h-[34rem]" scrollFade>
        <ReferenceSection data={data} />
      </ScrollArea>
    </>
  );
}
