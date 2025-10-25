"use client";

import { useRef } from "react";

import { nanoid } from "nanoid";

import { Suggestion } from "@/components/ai-elements/suggestion";
import { AIPromptInput } from "@/components/ai-prompt-input";
import { ChatProps } from "@/modules/home/types/chat-props";

const suggestions: { key: string; value: string }[] = [
  { key: nanoid(), value: "How can I file a GST appeal?" },
  { key: nanoid(), value: "What documents do I need for GST compliance?" },
  { key: nanoid(), value: "How does AI help in drafting appeals?" },
  { key: nanoid(), value: "What are the common GST penalty reasons?" },
  {
    key: nanoid(),
    value: "How to calculate interest on delayed GST payments?",
  },
];

export function Hero(props: Omit<ChatProps, "messages">) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSuggestionClick = (suggestion: string) => {
    props.onChange?.(suggestion);
    inputRef.current?.focus();
  };

  return (
    <section className="relative m-3 flex items-center justify-center overflow-hidden rounded-xl bg-linear-to-b from-background to-primary/20 px-6 py-16 md:rounded-2xl md:px-6 md:py-26">
      <CurveLineDesign className="absolute inset-x-0 inset-y-1/2 mx-auto hidden w-full max-w-7xl sm:block" />
      <div className="relative z-10 w-full max-w-4xl text-center">
        <h1 className="mt-6 text-2xl leading-tight font-semibold tracking-tighter sm:text-3xl md:text-4xl md:leading-[1.2] lg:text-5xl xl:text-6xl">
          <span className="relative inline-block">
            {/* Stars decoration - positioned relative to just the "AI-Powered" text */}
            <div className="absolute -top-2 -left-2 origin-top-left scale-[0.4] sm:-top-3 sm:-left-3 sm:scale-[0.6] md:-top-4 md:-left-4 md:scale-[0.8] lg:-top-5 lg:-left-5 lg:scale-100">
              <StarsDesign />
            </div>
            <span className="bg-linear-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              AI-Powered
            </span>
          </span>{" "}
          GST Genie
        </h1>
        <p className="mt-4 text-sm leading-relaxed tracking-tight text-pretty text-foreground/80 sm:text-base md:mt-6 md:text-lg">
          Get clear, reliable, and quick GST solutions backed by AI, helping you
          understand and navigate GST rules, notices, and compliance
          effortlessly.
        </p>

        <AIPromptInput
          ref={inputRef}
          className="mx-auto my-8 max-w-none sm:max-w-md md:my-12 md:max-w-xl"
          {...props}
        />

        <h2 className="mb-3 text-base font-medium sm:text-lg md:mb-0">
          Here are some sample questions you can start with:
        </h2>
        <div className="mt-3 flex flex-col flex-wrap justify-center gap-3 sm:flex-row sm:gap-2 md:mt-4 md:gap-4">
          {suggestions.map((suggestion) => (
            <Suggestion
              key={suggestion.key}
              onClick={handleSuggestionClick}
              suggestion={suggestion.value}
              className="text-xs tracking-tight sm:text-sm"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StarsDesign() {
  return (
    <svg
      width="41"
      height="38"
      viewBox="0 0 41 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.8843 0C32.0047 5.12 34.1305 8.25125 40.0352 8.88435C38.6181 10.08 31.5324 10.3162 31.1509 18.0353C29.189 13.5867 27.9895 10.08 21.9999 9.15093C27.2809 7.95428 30.3514 5.12 30.8843 0Z"
        fill="url(#stars_paint0_linear)"
      />
      <path
        d="M14.1059 9.0352C15.8849 17.1642 19.2599 22.1358 28.6349 23.1409C26.3849 25.0392 15.1349 25.4142 14.5292 37.6699C11.4143 30.6069 9.50992 25.0392 0.000220852 23.5642C8.38492 21.6642 13.2599 17.1642 14.1059 9.0352Z"
        fill="url(#stars_paint1_linear)"
      />
      <defs>
        <linearGradient
          id="stars_paint0_linear"
          x1="35.4597"
          y1="4.44217"
          x2="26.5754"
          y2="13.5931"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3C7AFF" />
          <stop offset="1" stopColor="#B63EE5" />
        </linearGradient>
        <linearGradient
          id="stars_paint1_linear"
          x1="21.3704"
          y1="16.0881"
          x2="7.26472"
          y2="30.6171"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4B84FF" />
          <stop offset="1" stopColor="#A247E9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CurveLineDesign(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1420"
      height="91"
      viewBox="0 0 1420 91"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      {...props}
    >
      <path
        d="M-70 28.5651C-55.2 31.3651 468 27.0043 735.5 6.56512C1003 -13.8741 1432.5 28.5651 1432.5 28.5651"
        stroke="url(#paint0_linear_1391_2235)"
      />
      <path
        d="M1433 62.7643C1418.2 59.9643 895 64.3251 627.5 84.7644C360 105.204 -69.5 62.7643 -69.5 62.7643"
        stroke="url(#paint1_linear_1391_2235)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1391_2235"
          x1="-70"
          y1="15.1647"
          x2="1432.5"
          y2="15.1647"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0288462" stopColor="var(--background)" />
          <stop offset="0.615385" stopColor="var(--primary)" />
          <stop offset="1" stopColor="var(--background)" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1391_2235"
          x1="1534"
          y1="76"
          x2="-69.5"
          y2="76.1647"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0336538" stopColor="var(--background)" />
          <stop offset="0.498934" stopColor="var(--primary)" />
          <stop offset="1" stopColor="var(--background)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
