"use client";

import { useEffect, useState } from "react";

interface UseScrollOptions {
  threshold?: number;
}

export function useScroll({ threshold = 10 }: UseScrollOptions = {}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { isScrolled };
}
