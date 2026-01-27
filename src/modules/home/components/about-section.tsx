"use client";

import { useRef } from "react";

import { ClockIcon, FileTextIcon, TargetIcon } from "lucide-react";
import {
  MotionValue,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const contentBlocks = [
  {
    icon: FileTextIcon,
    number: "01",
    highlight:
      "Handling GST queries, notices, and appeal drafting is often time-consuming and requires careful interpretation of law and facts.",
    rest: "ChatGST was created to make this process faster, clearer, and more efficient by using artificial intelligence trained specifically for GST-related use cases.",
  },
  {
    icon: ClockIcon,
    number: "02",
    highlight:
      "With ChatGST, users can ask GST questions, upload notices or orders, and receive structured outputs such as explanations, summaries, and draft replies or appeal content.",
    rest: "What traditionally takes hours of manual work can now be done in minutes helping users focus on review, decision-making, and advisory work rather than repetitive drafting.",
  },
  {
    icon: TargetIcon,
    number: "03",
    highlight:
      "ChatGST is designed for real-world GST scenarios faced by GST practitioners, CA firms, businesses, finance teams, and students.",
    rest: "The platform is not intended to replace professional judgment, but to assist users by improving productivity, consistency, and clarity in GST-related work.",
  },
];

const badges = [
  "GST Practitioners",
  "CA Firms",
  "Businesses",
  "Finance Teams",
  "Students",
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0.8, 0.6]
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
    >
      {/* Enhanced gradient mesh with parallax */}
      <AnimatedGradientMesh scrollY={backgroundY} opacity={backgroundOpacity} />

      {/* Floating geometric shapes */}
      <FloatingShapes />

      {/* Grid pattern overlay */}
      <GridPattern />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Enhanced header with refined typography */}
        <EnhancedHeader />

        {/* Enhanced content blocks with icons, numbers, and 3D effects */}
        <div className="mt-20 flex flex-col gap-16 lg:gap-20">
          {contentBlocks.map((block, index) => (
            <EnhancedContentBlock key={index} index={index} content={block} />
          ))}
        </div>

        {/* Premium badge grid with magnetic effects */}
        <PremiumBadgeGrid badges={badges} />
      </div>
    </section>
  );
}

interface AnimatedGradientMeshProps {
  scrollY: MotionValue<number>;
  opacity: MotionValue<number>;
}

function AnimatedGradientMesh({ scrollY, opacity }: AnimatedGradientMeshProps) {
  const prefersReducedMotion = useReducedMotion();

  // Static gradient mesh for reduced motion
  if (prefersReducedMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/8 via-primary/5 to-transparent" />
        <div className="absolute top-1/4 -left-1/4 h-[700px] w-[700px] rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute -right-1/4 bottom-1/4 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/6 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
      </div>
    );
  }

  return (
    <motion.div
      style={{ y: scrollY, opacity }}
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Base gradient layer */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/8 via-primary/5 to-transparent" />

      {/* Multiple radial gradient orbs with varying sizes */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 -left-1/4 h-[700px] w-[700px] rounded-full bg-primary/12 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -25, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-1/4 bottom-1/4 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -15, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/6 blur-3xl"
      />

      {/* Enhanced noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
    </motion.div>
  );
}

function FloatingShapes() {
  const prefersReducedMotion = useReducedMotion();

  // Return static shapes if user prefers reduced motion
  if (prefersReducedMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] h-32 w-32 rounded-full border-2 border-primary/20 bg-primary/5 opacity-30 blur-sm" />
        <div className="absolute top-[60%] right-[15%] h-24 w-24 rounded-full border-2 border-primary/15 bg-primary/5 opacity-20 blur-sm" />
        <div className="absolute bottom-[25%] left-[20%] h-20 w-20 rounded-full border-2 border-primary/20 bg-primary/5 opacity-25 blur-sm" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Floating circles */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 180, 360],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] left-[10%] h-32 w-32 rounded-full border-2 border-primary/20 bg-primary/5 blur-sm"
      />
      <motion.div
        animate={{
          y: [0, 25, 0],
          rotate: [360, 180, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[60%] right-[15%] h-24 w-24 rounded-full border-2 border-primary/15 bg-primary/5 blur-sm"
      />
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, -180, -360],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[25%] left-[20%] h-20 w-20 rounded-full border-2 border-primary/20 bg-primary/5 blur-sm"
      />

      {/* Floating triangles */}
      <motion.div
        animate={{
          rotate: [0, 120, 240, 360],
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[30%] right-[25%]"
      >
        <div
          className="h-16 w-16 border-t-2 border-l-2 border-primary/20 bg-primary/5"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        />
      </motion.div>
    </div>
  );
}

function GridPattern() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(to right, currentColor 1px, transparent 1px),
          linear-gradient(to bottom, currentColor 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    />
  );
}

function EnhancedHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mb-20 text-center"
    >
      <h2 className="mb-8 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
        <span className="text-primary">About</span>{" "}
        <span className="text-foreground">ChatGST</span>
      </h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl"
      >
        ChatGST is an AI-powered GST assistance platform built to simplify GST
        compliance for businesses and professionals in India.
      </motion.p>
    </motion.div>
  );
}

interface EnhancedContentBlockProps {
  index: number;
  content: {
    icon: React.ComponentType<{ className?: string }>;
    number: string;
    highlight: string;
    rest: string;
  };
}

function EnhancedContentBlock({
  index,
  content,
}: EnhancedContentBlockProps) {
  const isEven = index % 2 === 0;
  const delay = index * 0.2;
  const Icon = content.icon;
  const prefersReducedMotion = useReducedMotion();

  // Rotation for 3D effect
  const springConfig = { stiffness: 100, damping: 30 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  // Mouse handlers with clamping and reduced motion support
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Clamp rotation to -15 to 15 degrees to prevent jarring transforms
    const newRotateX = Math.max(-15, Math.min(15, (y - centerY) / 20));
    const newRotateY = Math.max(-15, Math.min(15, (centerX - x) / 20));
    rotateX.set(newRotateX);
    rotateY.set(newRotateY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, x: isEven ? -60 : 60, rotateY: isEven ? -15 : 15 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-150px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group relative",
        isEven ? "lg:mr-auto lg:max-w-2xl" : "lg:ml-auto lg:max-w-2xl",
        "mx-auto max-w-full lg:max-w-2xl"
      )}
    >
      {/* Numbered indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
        className={cn(
          "absolute -top-6 z-20 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/30 bg-background/80 text-2xl font-bold text-primary shadow-lg backdrop-blur-sm",
          isEven ? "-left-6" : "-right-6"
        )}
      >
        {content.number}
      </motion.div>

      {/* Connecting line (only between blocks) */}
      {index > 0 && (
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: delay - 0.2 }}
          className={cn(
            "absolute w-0.5 bg-linear-to-b from-primary/40 to-transparent",
            "h-16 -top-16 lg:h-20 lg:-top-20",
            isEven ? "left-0" : "right-0"
          )}
        />
      )}

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="hover:shadow-3xl relative rounded-2xl border-2 border-border/50 bg-background/70 p-8 shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-primary/40 hover:shadow-primary/10 sm:p-10 lg:p-12"
      >
        {/* Enhanced decorative corner accent */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={cn(
            "absolute h-1.5 w-24 rounded-full bg-linear-to-r from-primary/80 via-primary/60 to-transparent",
            isEven ? "top-0 left-0" : "top-0 right-0"
          )}
        />

        {/* Icon with gradient background - uniform styling */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: delay + 0.3,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className={cn(
            "absolute flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-primary/25 to-primary/10 text-primary shadow-md ring-1 ring-primary/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
            isEven ? "top-8 right-8" : "top-8 left-8"
          )}
        >
          <Icon className="size-6" />
        </motion.div>

        {/* Content with enhanced typography */}
        <div
          className={cn(
            // Consistent padding based on icon position
            isEven ? "pr-16 sm:pr-20" : "pl-16 sm:pl-20"
          )}
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: delay + 0.4 }}
            className="text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl"
          >
            <span className="font-bold text-foreground drop-shadow-sm">
              {content.highlight}
            </span>{" "}
            {content.rest}
          </motion.p>
        </div>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-2xl bg-primary/0 blur-2xl transition-all duration-500 group-hover:bg-primary/10"
          initial={false}
        />
      </motion.div>
    </motion.div>
  );
}

function PremiumBadgeGrid({ badges }: { badges: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="mt-20 flex flex-wrap justify-center gap-4"
    >
      {badges.map((badge, index) => (
        <MagneticBadge key={badge} badge={badge} index={index} />
      ))}
    </motion.div>
  );
}

interface MagneticBadgeProps {
  badge: string;
  index: number;
}

function MagneticBadge({ badge, index }: MagneticBadgeProps) {
  const prefersReducedMotion = useReducedMotion();
  const springConfig = { stiffness: 150, damping: 15 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);

  // Mouse handlers with reduced motion support
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const maxDistance = 100;

    if (distance < maxDistance) {
      const force = (maxDistance - distance) / maxDistance;
      x.set((distanceX / maxDistance) * force * 10);
      y.set((distanceY / maxDistance) * force * 10);
      scale.set(1 + force * 0.1);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.5, rotate: prefersReducedMotion ? 0 : -10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: 0.7 + index * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      style={{ x, y, scale }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <Badge
        variant="outline"
        className="group relative cursor-pointer border-2 px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:border-primary/60 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20 sm:px-7 sm:py-3 sm:text-base"
      >
        <span className="relative z-10">{badge}</span>
        {/* Enhanced gradient border effect */}
        <motion.span
          className="absolute inset-0 rounded-md bg-linear-to-r from-primary/0 via-primary/30 to-primary/0"
          initial={{ opacity: 0, x: "-100%" }}
          whileHover={{ opacity: 1, x: "100%" }}
          transition={{ duration: 0.6 }}
        />
        {/* Ripple effect */}
        <motion.span
          className="absolute inset-0 rounded-md bg-primary/20"
          initial={{ scale: 0, opacity: 0.8 }}
          whileTap={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      </Badge>
    </motion.div>
  );
}
