import { useEffect } from "react";
import { useLanguage, languages } from "@/context/LanguageContext";

export function HreflangTags() {
  const { language } = useLanguage();

  useEffect(() => {
    const existingLinks = document.querySelectorAll('link[hreflang]');
    existingLinks.forEach(link => link.remove());

    const baseUrl = window.location.origin;
    const currentPath = window.location.pathname;

    languages.forEach((lang) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang.code;
      link.href = `${baseUrl}${currentPath}?lang=${lang.code}`;
      document.head.appendChild(link);
    });

    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    defaultLink.href = `${baseUrl}${currentPath}`;
    document.head.appendChild(defaultLink);

    return () => {
      const links = document.querySelectorAll('link[hreflang]');
      links.forEach(link => link.remove());
    };
  }, [language]);

  return null;
}
