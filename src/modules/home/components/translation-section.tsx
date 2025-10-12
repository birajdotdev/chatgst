"use client";

import { TranslationInterface } from "@/components/translation-interface";

export function TranslationSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="mb-6 text-4xl font-semibold tracking-tighter text-foreground sm:text-5xl">
            Multilingual Support
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            From uploading documents to generating polished drafts, ChatGST
            makes the entire process fast, accurate, and effortless with
            AI-powered automation.
          </p>
        </div>
        <TranslationInterface />
      </div>
    </section>
  );
}
