"use client";

import { use } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/animate-ui/components/radix/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";

interface ReferencesProps {
  references: Promise<unknown>;
}

export function References({ references }: ReferencesProps) {
  const data = use(references);
  console.log("References:", data);

  return (
    <Accordion type="single" defaultValue="classification-of-goods" collapsible>
      <AccordionItem value="classification-of-goods">
        <AccordionTrigger className="mb-3 p-0 no-underline!">
          <div className="flex grow items-center justify-between gap-4">
            <h1 className="text-lg">Classification of Goods</h1>
            <span className="text-primary">2 Selected Items</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="grid grid-cols-1 md:grid-cols-2">
          <Card className="@container/card gap-4 py-5">
            <CardHeader className="flex items-center justify-between">
              <div>
                <Field orientation="horizontal">
                  <Checkbox />
                  <FieldLabel className="text-muted-foreground">
                    Select
                  </FieldLabel>
                </Field>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="rounded-full bg-muted px-3.5 py-1.5"
                >
                  ACT
                </Badge>
                <Badge
                  variant="outline"
                  className="rounded-full border-emerald-200 bg-emerald-100 px-3.5 py-1.5 text-emerald-600"
                >
                  98% Match
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <CardTitle className="text-[16px]">
                Central Goods and Services Tax Act, 2017
              </CardTitle>
              <CardDescription className="text-xs text-accent-foreground">
                Section 16 - Eligibility and Conditions for Taking Input Tax
                Credit
              </CardDescription>
              <CardDescription className="text-xs">
                Conditions for claiming Input Tax Credit (ITC) on capital goods
              </CardDescription>
            </CardContent>
            <CardContent>
              <h1>Authority</h1>
              <p>Parliament of India (2017)</p>
            </CardContent>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="hello">
                  <AccordionTrigger className="p-1 no-underline!">
                    Key Points
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-2 pl-5">
                      <li>
                        Capital Goods Usage - ITC can be claimed only when used
                        for business purposes.
                      </li>
                      <li>
                        Valid Tax Invoice - Proper invoice must be available to
                        support ITC claim.
                      </li>
                      <li>
                        Receipt of Goods - ITC is allowed only upon receipt of
                        goods.
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
