// Single source of truth for identity/SEO data used in metadata and JSON-LD.
export const SITE_URL = "https://khalidchouhan.me";
export const SITE_NAME = "Khalid Chouhan";
export const FULL_NAME = "Muhammad Khalid Chouhan";
export const JOB_TITLE = "Full Stack Developer & Team Lead";

// every spelling people search for; Google uses these to match name queries
export const ALT_NAMES = [
  "Khalid Chouhan",
  "Khalid Chouhan Gujjar",
  "Muhammad Khalid Chouhan",
  "Muhammad Khalid Chouhan Gujjar",
  "Khalid Chuhan",
  "Khalid Chauhan Developer",
  "Khalid Chouhan Dev",
  "khalidchouhan313",
];

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

export const KEYWORDS = [
  ...ALT_NAMES,
  "Khalid Chouhan portfolio",
  "Khalid Chouhan developer",
  "Khalid Chouhan full stack developer",
  "Khalid Chouhan web developer",
  "Khalid Chouhan Pakistan",
  "Khalid Chouhan Karachi",
  "Khalid Chouhan TechOn Ventures",
  "Khalid Chouhan InstaPay",
  "Khalid Chouhan MERN",
  "Khalid Chouhan Next.js",
  "Full Stack Developer Pakistan",
  "MERN Stack Developer Pakistan",
  "Next.js Developer Pakistan",
  "React Developer Pakistan",
  "Node.js Developer Pakistan",
  "Fintech Developer Pakistan",
  "Remote Full Stack Developer",
  "Hire Full Stack Developer Pakistan",
];

export const personSchema = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: FULL_NAME,
  givenName: "Muhammad Khalid",
  familyName: "Chouhan",
  alternateName: ALT_NAMES,
  url: SITE_URL,
  image: `${SITE_URL}/images/hero/logo-avatar.png`,
  jobTitle: JOB_TITLE,
  description:
    "Muhammad Khalid Chouhan (Khalid Chouhan Gujjar) is a Full Stack Developer and Team Lead from Pakistan building fintech web applications with React, Next.js, Node.js and MongoDB.",
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
  alternateName: ["Khalid.dev", "Khalid Chouhan Portfolio", "Khalid Chouhan Gujjar Portfolio"],
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
      name: `${SITE_NAME} | Full Stack Developer Portfolio`,
      mainEntity: { "@id": `${SITE_URL}/#person` },
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
  ],
};
