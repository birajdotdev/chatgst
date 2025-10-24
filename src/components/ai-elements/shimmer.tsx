"use client";

import { type CSSProperties, type ElementType, memo, useMemo } from "react";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export type TextShimmerProps = {
  children: string;
  as?: ElementType;
  className?: string;
  duration?: number;
  spread?: number;
};

const ShimmerComponent = ({
  children,
  as: Component = "p",
  className,
  duration = 2,
  spread = 2,
}: TextShimmerProps) => {
  const dynamicSpread = useMemo(
    () => (children?.length ?? 0) * spread,
    [children, spread]
  );

  const sharedProps = {
    animate: { backgroundPosition: "0% center" },
    className: cn(
      "relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent",
      "[background-repeat:no-repeat,padding-box] [--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--color-background),#0000_calc(50%+var(--spread)))]",
      className
    ),
    initial: { backgroundPosition: "100% center" },
    style: {
      "--spread": `${dynamicSpread}px`,
      backgroundImage:
        "var(--bg), linear-gradient(var(--color-muted-foreground), var(--color-muted-foreground))",
    } as CSSProperties,
    transition: {
      repeat: Number.POSITIVE_INFINITY,
      duration,
      ease: "linear" as const,
    },
  };

  // Use a switch to select the correct motion element to avoid creating components during render
  const MotionElement = useMemo(() => {
    switch (Component) {
      case "h1":
        return motion.h1;
      case "h2":
        return motion.h2;
      case "h3":
        return motion.h3;
      case "h4":
        return motion.h4;
      case "h5":
        return motion.h5;
      case "h6":
        return motion.h6;
      case "span":
        return motion.span;
      case "div":
        return motion.div;
      case "p":
      default:
        return motion.p;
    }
  }, [Component]);

  return <MotionElement {...sharedProps}>{children}</MotionElement>;
};

export const Shimmer = memo(ShimmerComponent);
