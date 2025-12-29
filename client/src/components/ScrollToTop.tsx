import { useEffect } from "react";
import { useLocation } from "wouter";

export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Reset scroll position on route change
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    
    // Ensure body scroll is unlocked (cleanup from any modals/overlays)
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.documentElement.style.overflow = '';
  }, [location]);

  return null;
}
