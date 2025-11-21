import { CopyIcon, DownloadIcon, PlusCircleIcon } from "lucide-react";
import { nanoid } from "nanoid";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

import { Suggestion, Suggestions } from "./ai-elements/suggestion";
import { Button, buttonVariants } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "ta", name: "Tamil" },
  { code: "ml", name: "Malayalam" },
  { code: "kn", name: "Kannada" },
  { code: "te", name: "Telugu" },
  { code: "gu", name: "Gujarati" },
  { code: "bn", name: "Bengali" },
  { code: "mr", name: "Marathi" },
];

const suggestions: { id: string; value: string }[] = [
  { id: nanoid(), value: "How can I file a GST appeal?" },
  { id: nanoid(), value: "How does AI help in drafting appeals?" },
];

export function TranslationInterface() {
  return (
    <div>
      {/* Language Selection */}
      {/* Desktop */}
      <RadioGroup
        defaultValue="English"
        className="mb-6 hidden w-fit rounded-full border border-input bg-card! px-6 py-2 md:flex"
      >
        {languages.map((language) => (
          <div key={language.code} className="relative">
            <RadioGroupItem
              className="peer sr-only"
              id={language.code}
              value={language.name}
            />
            <Label
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "rounded-full transition-colors peer-data-[state=checked]:text-primary!"
              )}
              htmlFor={language.code}
            >
              <span>{language.name}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
      {/* Mobile */}
      <Select defaultValue="English">
        <SelectTrigger className="mb-6 w-[180px] rounded-full px-4 py-2 md:hidden">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Languages</SelectLabel>
            {languages.map((language) => (
              <SelectItem key={language.code} value={language.name}>
                {language.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="grid grid-cols-1 drop-shadow-lg md:grid-cols-2">
        {/* Input */}
        <InputGroup className="rounded-none rounded-l-3xl bg-card p-2">
          <InputGroupAddon align="block-start">
            <InputGroupText className="rounded-sm bg-muted px-3 py-2 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
              Input Text Here
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupTextarea
            placeholder="Upload or paste a document, and instantly translate it into your preferred language."
            className="min-h-[300px] text-lg!"
          />
          <InputGroupAddon
            align="block-end"
            className="mb-6 flex flex-col items-center text-center"
          >
            <p className="text-foreground">
              Here are some sample questions you can start with:
            </p>
            <Suggestions className="flex w-full items-center justify-center">
              {suggestions.map((suggestion) => (
                <Suggestion
                  key={suggestion.id}
                  suggestion={suggestion.value}
                  size="sm"
                  className="bg-transparent"
                />
              ))}
            </Suggestions>
          </InputGroupAddon>
          <InputGroupAddon align="block-end">
            <Button variant="outline" className="rounded-full bg-transparent">
              <PlusCircleIcon />
              <span>Upload Document</span>
            </Button>
            <Button variant="default" className="ml-auto">
              Start Translating
            </Button>
          </InputGroupAddon>
        </InputGroup>

        {/* Output */}
        <InputGroup className="rounded-none rounded-r-3xl bg-card p-2">
          <InputGroupAddon align="block-start">
            <InputGroupText className="rounded-sm bg-muted px-3 py-2 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
              Translation output
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupTextarea
            placeholder="Your translated text will be displayed here !"
            className="min-h-[400px] text-lg!"
          />
          <InputGroupAddon
            align="block-end"
            className="flex items-center justify-end gap-2"
          >
            <Button variant="secondary">
              <CopyIcon />
              <span>Copy Text</span>
            </Button>
            <Button variant="default">
              <DownloadIcon />
              <span>Download</span>
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  );
}
