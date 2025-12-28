import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  type?: "website" | "article" | "course";
  image?: string;
  jsonLd?: object;
}

const BASE_URL = "https://rotechshiksha.com";

export function SEOHead({ 
  title, 
  description, 
  keywords, 
  canonicalUrl,
  type = "website",
  image = "/favicon.png",
  jsonLd
}: SEOHeadProps) {
  useEffect(() => {
    document.title = title;
    
    const updateOrCreateMeta = (selector: string, attr: string, attrValue: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateOrCreateMeta('meta[name="description"]', 'name', 'description', description);
    
    if (keywords) {
      updateOrCreateMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
    }

    updateOrCreateMeta('meta[property="og:title"]', 'property', 'og:title', title);
    updateOrCreateMeta('meta[property="og:description"]', 'property', 'og:description', description);
    updateOrCreateMeta('meta[property="og:type"]', 'property', 'og:type', type === "course" ? "website" : type);
    updateOrCreateMeta('meta[property="og:image"]', 'property', 'og:image', image.startsWith('http') ? image : `${BASE_URL}${image}`);
    updateOrCreateMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Rotech Shiksha');

    updateOrCreateMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateOrCreateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateOrCreateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    const fullCanonicalUrl = canonicalUrl 
      ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${BASE_URL}${canonicalUrl}`)
      : `${BASE_URL}${window.location.pathname}`;
    
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullCanonicalUrl);
    updateOrCreateMeta('meta[property="og:url"]', 'property', 'og:url', fullCanonicalUrl);

    const existingJsonLd = document.querySelector('script[type="application/ld+json"][data-seo="true"]');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'true');
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.querySelector('script[type="application/ld+json"][data-seo="true"]');
      if (script) {
        script.remove();
      }
    };
  }, [title, description, keywords, canonicalUrl, type, image, jsonLd]);

  return null;
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Rotech Shiksha",
    "url": BASE_URL,
    "logo": `${BASE_URL}/favicon.png`,
    "description": "India's trusted stock market education platform in Hindi. Learn investing from basics to advanced trading.",
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Hindi", "English"]
    }
  };
}

export function generateCourseSchema(courseName: string, description: string, level: number) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": courseName,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Rotech Shiksha",
      "url": BASE_URL
    },
    "educationalLevel": level <= 3 ? "Beginner" : level <= 6 ? "Intermediate" : "Advanced",
    "inLanguage": ["hi", "en"],
    "isAccessibleForFree": true,
    "courseMode": "online"
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`
    }))
  };
}
