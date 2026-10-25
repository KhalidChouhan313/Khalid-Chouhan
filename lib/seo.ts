// Single source of truth for identity/SEO data used in metadata and JSON-LD.
export const SITE_URL = "https://khalidchouhan.me";
export const SITE_NAME = "Khalid Chouhan";
export const FULL_NAME = "Muhammad Khalid Chouhan";
export const JOB_TITLE = "Full Stack Developer";

export const SITE_DESCRIPTION =
  "Portfolio of Muhammad Khalid Chouhan, a Full Stack Developer from Pakistan building fintech products with React, Next.js, Node.js and MongoDB. Open to remote work.";

// public profiles of the same person: lets Google merge them into one entity
export const SAME_AS = [
  "https://github.com/KhalidChouhan313",
  "https://www.linkedin.com/in/muhammad-khalid-chouhan-68b24738b",
  "https://x.com/Mkhalidcho8520M",
  "https://www.instagram.com/khalidchouhan313",
  "https://www.tiktok.com/@khalid.chouhan.gu",
  "https://www.facebook.com/khalid.chouhan.gujjar",
  "https://www.hiringmine.com/khalidchuhan313",
  "https://www.npmjs.com/package/magic-translate",
];

export const personSchema = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: FULL_NAME,
  givenName: "Muhammad Khalid",
  familyName: "Chouhan",
  alternateName: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/images/hero/logo-avatar.png`,
  jobTitle: JOB_TITLE,
  description: SITE_DESCRIPTION,
  email: "mailto:khalidchuhan7886@gmail.com",
  nationality: { "@type": "Country", name: "Pakistan" },
  address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
  worksFor: { "@type": "Organization", name: "TechOn Ventures" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Virtual University of Pakistan" },
  knowsAbout: [
    "Full Stack Development", "React", "Next.js", "TypeScript", "Node.js", "Express.js",
    "MongoDB", "Angular", "Redux Toolkit", "Socket.IO", "REST APIs", "Docker",
    "Microsoft Azure", "AWS", "Fintech", "Payments", "Web Development",
  ],
  sameAs: SAME_AS,
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: `${SITE_NAME} — Full Stack Developer Portfolio`,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#person` },
};

export const rootSchema = {
  "@context": "https://schema.org",
  "@graph": [
    personSchema,
    websiteSchema,
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: `${SITE_NAME} | Full Stack Developer`,
      mainEntity: { "@id": `${SITE_URL}/#person` },
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
  ],
};
