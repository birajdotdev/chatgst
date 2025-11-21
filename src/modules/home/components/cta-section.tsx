import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center rounded-2xl bg-muted px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="mb-6 max-w-3xl text-4xl leading-tight font-semibold tracking-tighter text-foreground sm:text-5xl lg:text-6xl dark:text-primary-foreground">
          Ready to Experience Smarter Legal Drafting?
        </h2>
        <p className="mx-auto mb-10 text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
          Upload your first document and see how AI transforms legal processing
          in just seconds.
        </p>
        <Button size="lg" className="px-8">
          Try Now
        </Button>
      </div>
    </section>
  );
}
