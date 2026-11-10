import React from 'react';

export function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://sakif.pro.bd/#person',
        name: 'Sakif Istiak Fahim',
        alternateName: [
          'Sakif Istiak',
          'Sakif Fahim',
          'সাকিফ ইশতিয়াক ফাহিম',
          'সাকিফ ইশতিয়াক',
        ],
        givenName: 'Sakif',
        familyName: 'Istiak',
        additionalName: 'Fahim',
        url: 'https://sakif.pro.bd',
        image: 'https://sakif.pro.bd/images/sakif-istiak.jpg',
        description:
          'Sakif Istiak (Sakif Istiak Fahim) is a Laravel Developer, Technology Enthusiast, and Product Builder from Rajshahi, Bangladesh. Former Development Team Lead at Ecare Solution and BBA student at Varendra University.',
        jobTitle: 'Laravel Developer & Product Builder',
        telephone: '+8801727164101',
        worksFor: {
          '@type': 'Organization',
          name: 'Ecare Solution',
        },
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'Varendra University',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Rajshahi',
          addressRegion: 'Rajshahi Division',
          addressCountry: 'BD',
        },
        sameAs: [
          'https://github.com/sakifistiak',
          'https://www.linkedin.com/in/sakifistiak',
          'https://www.facebook.com/sakifistiak1/',
        ],
        knowsAbout: [
          'Laravel Development',
          'PHP Backend Architecture',
          'MySQL Database Optimization',
          'Linux VPS & Server Administration',
          'cPanel & CloudLinux Management',
          'RESTful API Development',
          'SaaS Product Development',
          'Business Technology Integration',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://sakif.pro.bd/#website',
        url: 'https://sakif.pro.bd',
        name: 'Sakif Istiak — Official Portfolio',
        alternateName: 'Sakif Istiak Fahim Portfolio',
        description:
          'Official personal website and developer portfolio of Sakif Istiak (Sakif Istiak Fahim). Laravel Developer, Product Builder, and Tech Enthusiast.',
        publisher: {
          '@id': 'https://sakif.pro.bd/#person',
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'ProfilePage',
        '@id': 'https://sakif.pro.bd/#profilepage',
        url: 'https://sakif.pro.bd',
        name: 'About Sakif Istiak',
        isPartOf: {
          '@id': 'https://sakif.pro.bd/#website',
        },
        about: {
          '@id': 'https://sakif.pro.bd/#person',
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: 'https://sakif.pro.bd/images/sakif-istiak.jpg',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
