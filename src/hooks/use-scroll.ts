"use client";

import { useEffect, useState } from "react";

interface UseScrollOptions {
  threshold?: number;
}

export function useScroll({ threshold = 10 }: UseScrollOptions = {}) {
  // Always initialize to false to match SSR, then sync on client mount
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Mark as mounted to avoid hydration mismatch
    setHasMounted(true);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > threshold);
    };

    // Set initial state based on current scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  // Return false during SSR and first render to avoid hydration mismatch
  return { isScrolled: hasMounted ? isScrolled : false };
}
