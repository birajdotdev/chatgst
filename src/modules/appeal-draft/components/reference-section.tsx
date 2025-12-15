"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReferenceCard } from "@/modules/appeal-draft/components/reference-card";
import { LegalReference } from "@/modules/appeal-draft/types";

export function ReferenceSection({ data }: { data: LegalReference[] }) {
  const defaultValues = data.map(
    (reference, index) => `${reference.dispute_type}-${index}`
  );
  return (
    <Accordion
      type="multiple"
      defaultValue={defaultValues}
      className="space-y-6"
    >
      {data.map((reference, index) => {
        const selectedCount = reference.sections.filter(
          (section) => section.selected
        ).length;

        return (
          <AccordionItem
            key={`${reference.dispute_type}-${index}`}
            value={`${reference.dispute_type}-${index}`}
          >
            <AccordionTrigger className="mb-3 items-center p-0">
              <h1 className="text-lg">{reference.dispute_type}</h1>
              {selectedCount !== 0 && (
                <p className="ml-auto text-primary no-underline!">
                  {selectedCount} selected item{selectedCount !== 1 ? "s" : ""}
                </p>
              )}
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-1 gap-4.5 pb-0 md:grid-cols-2">
              {reference.sections.map((section, secIndex) => (
                <ReferenceCard
                  reference={section}
                  key={`section-${secIndex}`}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
