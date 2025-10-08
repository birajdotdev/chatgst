import { PromptInput } from "../prompt-input";
import { Button } from "../ui/button";

const sampleQuestions = [
  "How can I file a GST appeal?",
  "What documents do I need for GST compliance?",
  "How does AI help in drafting appeals?",
  "How can I file a GST appeal?",
  "How does AI help in drafting appeals?",
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative m-3 flex min-h-screen flex-col items-center justify-center overflow-hidden rounded-b-2xl bg-gradient-to-b from-background to-primary/20 py-20"
    >
      {/* Background curve design */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <CurveLineDesign />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center lg:px-0">
        <div className="flex flex-col items-center gap-12 text-center">
          <div className="max-w-3xl">
            <div className="relative">
              {/* Stars decoration */}
              <div className="absolute -top-2 -left-6 scale-110">
                <StarsDesign />
              </div>
              <h1 className="text-5xl leading-tight font-semibold">
                <span className="text-primary">AI-Powered</span> GST Appeal
                Drafting
              </h1>
            </div>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Simplify GST appeals with automated data extraction, an
              intelligent knowledge base, and multilingual support. Transform
              complex legal documents into accurate, structured appeals in
              minutes.
            </p>
          </div>

          <PromptInput className="w-full max-w-xl" />

          <div className="max-w-5xl">
            <h2 className="mb-6">
              Here are some sample questions you can start with:
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {sampleQuestions.map((question, idx) => (
                <Button
                  key={`${idx}-${question}`}
                  variant="outline"
                  className="rounded-full border-muted-foreground/30 bg-transparent text-muted-foreground hover:border-muted-foreground/50"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg">Start Appeal Drafting</Button>
          <Button size="lg" variant="outline">
            GST in Your Language
          </Button>
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

function CurveLineDesign() {
  return (
    <svg
      width="1420"
      height="91"
      viewBox="0 0 1420 91"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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
          <stop offset="0.0288462" stopColor="white" />
          <stop offset="0.615385" stopColor="#D97D54" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1391_2235"
          x1="1534"
          y1="76"
          x2="-69.5"
          y2="76.1647"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0336538" stopColor="white" />
          <stop offset="0.498934" stopColor="#D97D54" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
      </defs>
    </svg>
  );
}
