"use client";

import { useEffect, useState } from "react";

interface UseScrollOptions {
  threshold?: number;
}

export function useScroll({ threshold = 10 }: UseScrollOptions = {}) {
  // Always initialize to false to match SSR
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > threshold);
    };

    // Set initial state based on current scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { isScrolled };
}
