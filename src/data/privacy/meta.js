/** UI chrome + TOC labels (bilingual). Policy body lives in en.js / de.js section arrays. */

export const privacyMeta = {
  en: {
    docNavLabel: 'Document navigation',
    onThisPage: 'On this page',
    heroIntro:
      'This page contains our full privacy statement. For mandatory provider information (legal imprint), please use the Legal imprint page.',
    legalImprintCta: 'Legal imprint',
    effectivePrefix: 'Data Protection Statement valid from:',
    effectiveDate: 'April 1st, 2026',
  },
  de: {
    docNavLabel: 'Dokumentnavigation',
    onThisPage: 'Auf dieser Seite',
    heroIntro:
      'Diese Seite enthält unsere vollständige Datenschutzerklärung. Die gesetzlich vorgeschriebenen Anbieterangaben finden Sie im Impressum.',
    legalImprintCta: 'Zum Impressum',
    effectivePrefix: 'Diese Datenschutzerklärung gilt ab:',
    effectiveDate: '1. April 2026',
  },
}

export const privacyToc = {
  en: [
    {
      category: 'Foundation',
      items: [
        { id: 'data-protection-statement', label: 'Data Protection Statement' },
        { id: 'information-collection', label: 'Information on the collection of personal data' },
        { id: 'your-rights', label: 'Your rights' },
        { id: 'collection-website', label: 'Collection of personal data when using our website' },
        { id: 'further-functions', label: 'Further functions and offerings of our website' },
      ],
    },
    {
      category: 'Consent & communication',
      items: [
        {
          id: 'objection-revocation',
          label: 'Objection to or revocation of consent to the processing of your data',
        },
        { id: 'newsletter', label: 'Newsletter' },
      ],
    },
    {
      category: 'Social & integrations',
      items: [
        { id: 'facebook', label: 'Facebook' },
        { id: 'instagram', label: 'Instagram' },
        { id: 'x-social', label: 'X' },
        { id: 'tiktok', label: 'TikTok' },
        { id: 'youtube', label: 'YouTube' },
        { id: 'xing', label: 'Xing' },
        { id: 'linkedin', label: 'LinkedIn' },
        { id: 'whatsapp', label: 'WhatsApp Business' },
        { id: 'links-other-sites', label: 'Links to other websites' },
      ],
    },
    {
      category: 'Marketing & analytics',
      items: [
        { id: 'google-adwords', label: 'Use of Google AdWords Conversion' },
        { id: 'google-remarketing', label: 'Google Remarketing' },
        { id: 'doubleclick', label: 'DoubleClick by Google' },
      ],
    },
    {
      category: 'Legal notices & contests',
      items: [
        { id: 'copyright', label: 'Copyright' },
        { id: 'exclusion-liability', label: 'Exclusion of liability' },
        { id: 'brand-trademarks', label: 'Brand names and trademarks' },
        { id: 'data-security', label: 'Data security' },
        { id: 'technology-used', label: 'Technology used' },
        { id: 'competitions', label: 'Competitions' },
        { id: 'prediction-game', label: 'Terms and Conditions for the Prediction Game' },
        { id: 'advent-calendar', label: 'Terms and Conditions – Advent Calendar' },
        { id: 'audio-video-conferences', label: 'Audio and Video Conferences' },
      ],
    },
  ],
  de: [
    {
      category: 'Grundlagen',
      items: [
        { id: 'data-protection-statement', label: 'Datenschutzerklärung' },
        { id: 'information-collection', label: 'Informationen zur Erhebung personenbezogener Daten' },
        { id: 'your-rights', label: 'Ihre Rechte' },
        { id: 'collection-website', label: 'Erhebung personenbezogener Daten bei Nutzung der Website' },
        { id: 'further-functions', label: 'Weitere Funktionen und Angebote unserer Website' },
      ],
    },
    {
      category: 'Einwilligung & Kommunikation',
      items: [
        {
          id: 'objection-revocation',
          label: 'Widerspruch gegen bzw. Widerruf der Einwilligung in die Datenverarbeitung',
        },
        { id: 'newsletter', label: 'Newsletter' },
      ],
    },
    {
      category: 'Soziale Medien & Integrationen',
      items: [
        { id: 'facebook', label: 'Facebook' },
        { id: 'instagram', label: 'Instagram' },
        { id: 'x-social', label: 'X' },
        { id: 'tiktok', label: 'TikTok' },
        { id: 'youtube', label: 'YouTube' },
        { id: 'xing', label: 'Xing' },
        { id: 'linkedin', label: 'LinkedIn' },
        { id: 'whatsapp', label: 'WhatsApp Business' },
        { id: 'links-other-sites', label: 'Links zu anderen Websites' },
      ],
    },
    {
      category: 'Marketing & Analyse',
      items: [
        { id: 'google-adwords', label: 'Nutzung von Google AdWords Conversion' },
        { id: 'google-remarketing', label: 'Google Remarketing' },
        { id: 'doubleclick', label: 'DoubleClick von Google' },
      ],
    },
    {
      category: 'Rechtliches & Gewinnspiele',
      items: [
        { id: 'copyright', label: 'Urheberrecht' },
        { id: 'exclusion-liability', label: 'Haftungsausschluss' },
        { id: 'brand-trademarks', label: 'Marken und Kennzeichen' },
        { id: 'data-security', label: 'Datensicherheit' },
        { id: 'technology-used', label: 'Eingesetzte Technologien' },
        { id: 'competitions', label: 'Gewinnspiele' },
        { id: 'prediction-game', label: 'Teilnahmebedingungen für das Tippspiel' },
        { id: 'advent-calendar', label: 'Teilnahmebedingungen – Adventskalender' },
        { id: 'audio-video-conferences', label: 'Audio- und Videokonferenzen' },
      ],
    },
  ],
}
