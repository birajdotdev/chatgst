"use client";

import { BrainIcon, ClipboardCheckIcon, UsersIcon } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xs transition-all duration-300 hover:bg-white/15 hover:shadow-lg">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b from-white/95 to-white/45 text-primary">
        {icon}
      </div>
      <h3 className="mb-4 text-xl font-medium tracking-tight text-white">
        {title}
      </h3>
      <p className="text-base leading-snug tracking-tighter text-pretty text-white/90">
        {description}
      </p>
    </div>
  );
}

export function Features() {
  const features = [
    {
      icon: <BrainIcon className="size-6" />,
      title: "AI-Powered GST Query Solver",
      description:
        "Instant answers to all your GST-related questions using AI.",
    },
    {
      icon: <ClipboardCheckIcon className="size-6" />,
      title: "Appeal & Notice Assistance",
      description: "Step-by-sep help to draft replies and manage GST appeals.",
    },
    {
      icon: <UsersIcon className="size-6" />,
      title: "Expert Consultancy Connect",
      description:
        "Connect with trusted GST consultants for personalized guidance.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-primary px-4 py-20 sm:px-6 lg:px-8">
      <CircleDesign className="absolute top-0 right-0 origin-top-right scale-50 sm:scale-75 md:scale-90 lg:scale-100" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14">
          <h2 className="mb-4 text-3xl leading-tight font-semibold tracking-tighter text-white sm:text-4xl md:text-5xl">
            Draft Smarter, File Faster with AI
          </h2>
          <p className="max-w-3xl text-lg leading-tight text-white/90">
            Automate your GST appeal drafting with intelligent document
            processing, a curated legal knowledge base, and multilingual
            support. Save time, reduce errors, and focus on what matters your
            case.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CircleDesign(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="482"
      height="446"
      viewBox="0 0 482 446"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_1479_78)">
        <circle opacity="0.4" cx="460" cy="-29" r="350" fill="#F6E0D1" />
        <circle opacity="0.4" cx="460.5" cy="-29.5" r="267.5" fill="#FAEDE5" />
        <circle opacity="0.4" cx="460.5" cy="-29.5" r="176.5" fill="#FDF7F3" />
      </g>
      <defs>
        <filter
          id="filter0_d_1479_78"
          x="0.0999985"
          y="-427.9"
          width="873.8"
          height="873.8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-23" dy="38" />
          <feGaussianBlur stdDeviation="43.45" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1479_78"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1479_78"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
