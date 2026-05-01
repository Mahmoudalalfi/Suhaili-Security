import servicesPageLocales from '../data/servicesPageI18n.js'
import newsPageLocales from '../data/newsPageI18n.js'
import galleryPageLocales from '../data/galleryPageI18n.js'

const translations = {
  de: {
    nav: {
      home:     'Start',
      projects: 'Projekte',
      about:    'Über uns',
      services: 'Leistungen',
      news:     'News',
      gallery:  'Galerie',
      contact:  'Kontakt',
    },
    pages: {
      wip: 'Diese Seite wird derzeit aufgebaut. Inhalt folgt in Kürze.',
      privacyTitle: 'Datenschutz',
    },
    contact: {
      eyebrow: 'Kontakt aufnehmen',
      title: 'Kontakt',
      detailsTitle: 'Kontaktdaten',
      formTitle: 'Nachricht senden',
      addressLabel: 'Adresse',
      phoneLabel: 'Telefon',
      emailLabel: 'E-Mail',
      socialTitle: 'Social Media',
      nameLabel: 'Name',
      namePlaceholder: 'Ihr Name',
      emailPlaceholder: 'ihre@email.de',
      messageLabel: 'Nachricht',
      messagePlaceholder: 'Wie können wir helfen?',
      requiredHint: 'Pflichtfeld',
      submit: 'Senden',
      submitAria: 'Nachricht per E-Mail-Client senden',
      formPrivacy: 'Mit dem Absenden nutzen Sie den E-Mail-Versand von Ihrem Gerät. Informationen zur Datenverarbeitung:',
      formPrivacyLink: 'Datenschutz',
      mailSubjectPrefix: 'Anfrage über suhaili-security.de',
      socialFacebookUrl: '',
      socialTiktokUrl: '',
      socialInstagramUrl: '',
      availabilityTitle: 'Einsatz & Erreichbarkeit',
      availabilityBody:
        'Wir koordinieren Objekt- und Veranstaltungsschutz für Berlin und Umgebung. Dringende Anfragen erreichen uns telefonisch oder per E-Mail — wir melden uns schnellstmöglich.',
      exploreTitle: 'Mehr entdecken',
      capabilitiesTitle: 'Kerneinsatzfelder',
      capabilitiesIntro: 'Auszug aus unserem Leistungsspektrum:',
      capLine1: 'Objekt-, VIP- & Veranstaltungsschutz',
      capLine2: 'Videoüberwachung, Alarmreaktion & Streifendienst',
      capLine3: 'Empfang, Zutrittskontrolle & Parkregelung',
      capLine4: 'Baustellenbewachung, Keyholding & Beratung',
    },
    projects: {
      eyebrow: 'Ausgewählte Referenzen',
      titleLine1: 'Wo Vertrauen auf',
      titleLine2: 'Wachsamkeit trifft.',
      badge: 'Projekte',
      cardInquiry: 'Projekt anfragen',
      openImage: 'Bild in Vollansicht öffnen',
      closeLightbox: 'Schließen',
      p1: { meta: 'Ladendetektiv · 2024', title: 'Premium-Retail — Berlin' },
      p2: { meta: 'Zutrittskontrolle · 2024', title: 'Hochsicherheits-Logistikareal' },
      p3: { meta: 'Personenschutz · 2024', title: 'VIP-Schutz & Begleitung' },
      p4: { meta: 'CCTV & Monitoring · 2024', title: 'Integriertes Video-Center' },
      p5: { meta: 'Veranstaltungsschutz · 2023', title: 'Gala & exklusive Venues' },
      p6: { meta: 'Empfangsdienst · 2023', title: 'Hotel — Empfang & Zutritt' },
      p7: { meta: 'Alarmreaktion · 2023', title: 'Schnelle Intervention & Objektschutz' },
      p8: { meta: 'Streifendienst · 2024', title: 'Mobile Nacht- & Objektrunden' },
    },
    imprint: {
      eyebrow: 'Rechtliches',
      title: 'Impressum',
      lead: 'Angaben gemäß § 5 TMG und § 55 RStV — entsprechend der Darstellung auf unserer Geschäftskommunikation.',
      card1: 'Professionell',
      card2: 'Diskret',
      card3: 'Zuverlässig',
      sectionCompany: 'Unternehmen & Anschrift',
      companyName: 'Suhaili Security',
      companyTagline: 'Sicherheitsdienst',
      companyIntro:
        'Suhaili Security ist ein Sicherheitsdienst.',
      locationLabel: 'Anschrift',
      addressLines: 'Ritterlandweg 2, 13409 Berlin\nLagerhofstr. 2, 04103 Leipzig',
      sectionContact: 'Kontakt',
      email: 'info@suhaili-security.de',
      phones: '+49 176 41180455',
      website: 'www.suhaili-security.de',
      sectionPrivacy: 'Datenschutz',
      sectionPrivacyBody: 'Informationen zur Erhebung personenbezogener Daten finden Sie in unserer Datenschutzerklärung.',
      privacyLink: 'Datenschutzerklärung öffnen',
      sectionNote: 'Einsatz & Erreichbarkeit',
      noteP1:
        'Wir planen Leistungen für Unternehmen und Privatkunden — Schwerpunkte sind Objekt- und Veranstaltungsschutz, Streifendienste sowie diskrete Begleitung. Einsätze werden mit Ihnen abgestimmt und dokumentiert, wo es der Auftrag erfordert.',
      noteP2:
        'Anfragen zu Verfügbarkeit, Referenzen oder konkreten Einsatzprofilen können Sie per E-Mail oder telefonisch stellen. Für vertrauliche Themen empfehlen wir den schriftlichen Weg.',
      disclaimerTitle: 'Haftungsausschluss',
      disclaimerBody:
        'Inhalt dieses Webangebots wurde mit Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit und Aktualität übernehmen wir keine Gewähr. Haftungsansprüche aus der Nutzung dieser Informationen sind ausgeschlossen, soweit gesetzlich zulässig. Für Inhalte externer Links sind ausschließlich deren Betreiber verantwortlich.',
      copyrightTitle: 'Urheberrecht',
      copyrightBody:
        'Texte, Bilder, Grafiken sowie Layout unterliegen dem Urheberrecht und anderen Schutzgesetzen. Vervielfältigung oder Verbreitung bedürfen der vorherigen schriftlichen Zustimmung.',
    },
    home: {
      heroEyebrow: 'Berlin — Sicherheitsdienst',
      heroTitle1:  'SUHAILI',
      heroTitle2:  'SECURITY',
      heroSub:     'Professioneller Schutz für Unternehmen und Privatpersonen. Zuverlässig, diskret und rund um die Uhr einsatzbereit.',
      heroCta1:    'Unsere Leistungen',
      heroCta2:    'Jetzt anfragen',
      ticker: [
        'Professionell', 'Diskret', 'Zuverlässig', '24/7 Einsatzbereit',
        'Berlin', 'Objektschutz', 'VIP-Schutz', 'Videoüberwachung',
        'Veranstaltungsschutz', 'Streifendienst', 'Qualifiziertes Team', 'Sicherheitsdienst',
      ],
      servicesTitle: 'Unsere Leistungen',
      servicesSub:   'Ein umfassendes Portfolio — vom Objektschutz bis zum VIP-Schutz.',
      servicesLink:  'Alle Leistungen →',
      missionEyebrow: 'Unsere Mission',
      mission: 'Wir stehen für Sicherheit, die Sie spüren — durch Kompetenz, Integrität und einen unermüdlichen Einsatz für den Schutz von Menschen und Werten.',
      aboutLink: 'Über uns →',
      cta1: 'SICHERN SIE',
      cta2: 'IHR UNTERNEHMEN',
      cta3: 'JETZT.',
      ctaPhone: '+49 176 41180455',
      ctaEmail: 'info@suhaili-security.de',
    },
    servicesPage: servicesPageLocales.de,
    newsPage: newsPageLocales.de,
    galleryPage: galleryPageLocales.de,
    about: {
      hero1: 'Willkommen bei Suhaili Security',
      hero2: '',
      mission2: 'Seit unserer Gründung stehen wir als Unternehmen für Vertrauen, Qualität und Innovation. Mit Hauptsitz in Berlin sind wir ein zuverlässiger Partner für Sicherheitsdienstleistungen — professionell, diskret und rund um die Uhr einsatzbereit.',
      aboutImage: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490337/suhail-services/about_1_1777327649561.jpg',
      aboutImgAlt: 'Berliner Fernsehturm und Skyline bei Sonnenuntergang',
      learnMoreHref: '/contact',
      learnMoreLabel: 'Mehr erfahren',
      statsTitle: 'Unsere Expertise in Zahlen',
      stats: [
        { num: '100', label: 'Standorte bundesweit' },
        { num: '770', label: 'Millionen Euro Gruppenerlös' },
        { num: '92', label: 'Jahre Expertenerfahrung' },
        { num: '16.400', label: 'Herausragende Mitarbeiter' },
      ],
      statsBody: 'Unsere Kennzahlen stehen für mehr als nur Wachstum: Sie belegen langjährige Partnerschaften, das Vertrauen unserer Kunden und das kontinuierliche Engagement unserer Mitarbeitenden.',
      solutionsTitle: 'Suhaili Security – maßgeschneiderte Lösungen aus einer Hand',
      solutionsDesc: 'Unser Leistungsspektrum umfasst Objekt- und Personenschutz, Videoüberwachung, Streifendienste und Veranstaltungsschutz. Unsere individuell zugeschnittenen Konzepte schaffen die Freiheit, die Sie benötigen, um sich vollständig auf Ihr Kerngeschäft zu konzentrieren.',
      aboutSections: [
        { id: 'history-facts', title: 'Geschichte & Fakten' },
        { id: 'references', title: 'Referenzen' },
        { id: 'quality-certificates', title: 'Qualität / Zertifikate / Auszeichnungen' },
        { id: 'csr-esg', title: 'CSR / ESG' },
        { id: 'philosophy-code', title: 'Philosophie & Verhaltenskodex' },
        { id: 'compliance-lksg', title: 'Compliance & LkSG' },
        { id: 'association-work', title: 'Verbandsarbeit' },
        { id: 'other-companies', title: 'Weitere Gesellschaften & Beteiligungen' },
      ],
      historyTitle: 'Von der Gründung bis heute',
      historySubtitle: 'UNSERE GESCHICHTE IN ZAHLEN UND MOMENTEN',
      historyIntro:
        'Seit der Gründung im Jahr 1934 hat sich die KÖTTER Gruppe von einem regionalen Sicherheitsdienstleister zu einem der führenden Anbieter von Facility Services in Deutschland entwickelt. Als eigenständiges Familienunternehmen in dritter Generation bieten wir maßgeschneiderte Lösungen in den Bereichen Personenschutz, Cybersicherheit und Sicherheitstechnik, Reinigung und Personaldienstleistungen sowie Facility Management.',
      historyBodyText:
        'Als größter familiengeführter Sicherheitsdienstleister Deutschlands und zweitgrößter Anbieter der Sicherheitsbranche zählen wir laut Lünendonk-Liste zu den zehn führenden Facility-Service-Anbietern in Deutschland. Unsere Unabhängigkeit von Aktionären und Finanzinvestoren ermöglicht es uns, nachhaltige Strategien zu verfolgen und stets im besten Interesse unserer Kunden und Mitarbeitenden zu entscheiden. Vertrauen, hohe Qualitätsstandards und verantwortungsvolles Management bilden die Grundlage unseres Handelns. Durch langfristige Partnerschaften schaffen wir für Sie die Freiheit, sich voll und ganz auf Ihr Kerngeschäft zu konzentrieren.',
      historyBodyImage: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490547/suhail-services/other-companies-hero.png',
      historyTimelineHeading: 'Meilensteine',
      historyTimeline: [
        { year: '1934', title: 'Gründung WWSD', event: 'Karl Friedrich Kötter gründet den Westdeutschen Wach- und Schutzdienst (WWSD) in Wanne-Eickel.' },
        { year: '1957', title: '2. Generation', event: 'Friedrich Karl Kötter übernimmt das Unternehmen in zweiter Generation.' },
        { year: '1960', title: 'Expansion', event: 'Eröffnung der ersten Niederlassungen in Köln, Stuttgart und Frankfurt am Main.' },
        { year: '1966', title: 'Sicherheitstechnik', event: 'Start der Sparte Sicherheitstechnik.' },
        { year: '1970', title: 'Werttransport', event: 'Start der KÖTTER Wert- und Geldtransportdienste.' },
        { year: '1985', title: 'Reinigung', event: 'Gründung von KÖTTER Reinigung.' },
        { year: '1993', title: '3. Generation', event: 'Martina Kötter und Friedrich P. Kötter treten in die Geschäftsführung ein (dritte Generation). Aus der WWSD wird KÖTTER Services.' },
        { year: '1997', title: 'Personal Service', event: 'Start von KÖTTER Personal Service.' },
        { year: '1999', title: 'Akademie', event: 'Gründung der KÖTTER Akademie.' },
        { year: '2001', title: 'Luftsicherheit', event: 'Gründung von KÖTTER Aviation Security.' },
        { year: '2011', title: 'muTiger', event: 'Gründung der muTiger-Stiftung gemeinsam mit dem Verkehrsverbund Rhein-Ruhr (VRR).' },
        { year: '2012', title: 'Fire & GBP', event: 'Gründung von KÖTTER Fire & Service und German Business Protection.' },
        { year: '2017', title: 'Leitstand Essen', event: 'Inbetriebnahme des High-Tech-Leitstands in Essen.' },
        { year: '2024', title: 'Cybersicherheit', event: 'Anbieter von Cybersicherheitslösungen.' },
        { year: '2024', title: 'WAKO-Gruppe', event: 'KÖTTER Security übernimmt die Stader WAKO-Gruppe — gegründet 1904 mit über 800 Mitarbeitenden.' },
        { year: '2024', title: '360° Sicherheit', event: 'Mit der Beteiligung am IT-Spezialisten G.I.P. wird KÖTTER Security einer der ersten Sicherheitsdienstleister in Europa mit echten 360-Grad-Sicherheitslösungen.' },
      ],
    },
    common: {
      backTo: 'Zurück zu',
    },
    referencesPage: {
      eyebrow: 'UNSERE KUNDEN',
      eyebrowMuted: 'Referenzen',
      title: 'Referenzen',
      intro:
        'Von globalen Konzernen über regionale Unternehmen bis hin zu lokalen Betrieben: Wir unterstützen Organisationen jeder Größenordnung. Sicherheit, Reinigung, Personaldienstleistungen und integrierte Facility-Programme werden auf Ihre Standorte, Risiken und den täglichen Betrieb zugeschnitten.',
      spotlightBody: 'Nachfolgend finden Sie eine repräsentative Auswahl langjähriger Partnerschaften.',
      logosHeading: 'Ausgewählte Kunden',
      closing:
        'Verlässlichkeit, Qualität und maßgeschneiderte Servicepakete sind es, die Partnerschaften über Jahre hinweg tragen — über Branchen hinweg und in ganz Deutschland.',
      clients: [
        { slug: 'der-gruene-punkt', name: 'Der Grüne Punkt', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490775/suhail-services/ref-clients/der-gruene-punkt.png' },
        { slug: 'huf', name: 'Huf', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490779/suhail-services/ref-clients/huf.png' },
        { slug: 'intersport-voswinkel', name: 'Intersport Voswinkel', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490780/suhail-services/ref-clients/intersport-voswinkel.png' },
        { slug: 'makita', name: 'Makita', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490781/suhail-services/ref-clients/makita.png' },
        { slug: 'medion', name: 'Medion', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490782/suhail-services/ref-clients/medion.png' },
        { slug: 'blb-nrw', name: 'BLB NRW', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490772/suhail-services/ref-clients/blb-nrw.png' },
        { slug: 'currenta', name: 'Currenta', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490773/suhail-services/ref-clients/currenta.png' },
        { slug: 'funke-medien', name: 'Funke Medien Gruppe', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490778/suhail-services/ref-clients/funke-medien.png' },
        { slug: 'gasag', name: 'Gasag', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490779/suhail-services/ref-clients/gasag.png' },
        { slug: 'siemens', name: 'Siemens', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490787/suhail-services/ref-clients/siemens.png' },
        { slug: 'mkk', name: 'MKK', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490783/suhail-services/ref-clients/mkk.png' },
        { slug: 'nkg-kala-hamburg', name: 'NKG Kala Hamburg', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490784/suhail-services/ref-clients/nkg-kala-hamburg.png' },
        { slug: 'rhenus-logistics', name: 'Rhenus Logistics', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490785/suhail-services/ref-clients/rhenus-logistics.png' },
        { slug: 'sangro-homecare', name: 'Sangro homecare', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490785/suhail-services/ref-clients/sangro-homecare.jpg' },
        { slug: 'shell', name: 'Shell', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490786/suhail-services/ref-clients/shell.png' },
        { slug: 'sparkasse-essen', name: 'Sparkasse Essen', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490788/suhail-services/ref-clients/sparkasse-essen.png' },
        { slug: 'theresia-albers-stiftung', name: 'Theresia Albers Stiftung', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490789/suhail-services/ref-clients/theresia-albers-stiftung.png' },
        { slug: 'tmd-friction', name: 'TMD Friction', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490790/suhail-services/ref-clients/tmd-friction.png' },
        { slug: 'uni-duisburg-essen', name: 'Universität Duisburg-Essen', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490791/suhail-services/ref-clients/uni-duisburg-essen.png' },
        { slug: 'deutsches-historisches-museum', name: 'Deutsches Historisches Museum', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490776/suhail-services/ref-clients/deutsches-historisches-museum.png' },
      ],
    },
    qualityPage: {
      eyebrowMuted: 'Qualität & Zertifikate',
      title: 'Qualität / Zertifikate / Auszeichnungen',
      introP1:
        'Alle reden von Qualität — wir konzentrieren uns dort, wo Standards greifen und Ergebnisse messbar werden.',
      introP2:
        'Unsere gesamte Prozesskette ist darauf ausgerichtet, Ihre Anforderungen zu erfüllen — so entsteht nachhaltiges Vertrauen.',
      heroImage: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490771/suhail-services/quality-hero-certified.png',
      pillarsHeading: 'Wo Qualität greifbar wird',
      pillarsTop: [
        {
          title: 'Branchenspezifische Kontrollen',
          body:
            'Über wiederkehrende interne Audits hinaus passen wir Prüfpunkte an die jeweilige Branche an — Reinigung, Bewachung und Personalüberlassung zeigen etwa in Banken, Chemie oder öffentlicher Immobilienbewirtschaftung unterschiedliche Compliance-Anforderungen.',
        },
        {
          title: 'Machbarkeit vor Zusage',
          body:
            'Vor der Mobilisierung klären wir Umfang, Zeitrahmen, Schnittstellen und Risiken — damit Zusagen für Sie und für die Teams vor Ort realistisch bleiben.',
        },
        {
          title: 'Hochlauf bei großen Vorhaben',
          body:
            'Komplexe Programme erhalten in Konzeption und früher Umsetzung dedizierte Hochlaufkapazität — Übergaben in die laufende Steuerung bleiben mit dem Regelbetrieb abgestimmt.',
        },
      ],
      communicationTitle: 'Information & Kommunikation',
      communicationBody:
        'Transparenter Dialog sichert zuverlässige Lieferung: Stakeholder sind früh dabei, der Fortschritt folgt vereinbarten Rhythmen, und alle behalten ein gemeinsames Lagebild.\n\nStrukturierte Feedback-Zyklen mit Ihnen und benannten Ansprechpartnern bleiben übersichtlich — Abweichungen werden früh sichtbar, und Korrekturpfade bleiben umsetzbar.',
      infoSecurityTitle: 'Informationssicherheit & Datenschutz',
      infoSecurityBody:
        'Die Erwartungen an den Umgang mit Informationen — über Kanäle, Systeme und Geräte hinweg — steigen weiter.\n\nWo Verträge es verlangen, orientieren wir uns an anerkannten Anforderungen an Informationssicherheit (einschließlich ISO/IEC 27001 als Referenzrahmen) und untermauern dies mit pragmatischen Regeln — sinnvolle Zugangsgewohnheiten, Sensibilisierung sowie „Clean Desk / Clear Screen“ im Büro und im Außendienst.',
      frontLineTitle: 'Verbesserung aus der Praxis',
      frontLineBody:
        'Operative Erkenntnisse treiben Verfeinerung voran: Kolleginnen und Kollegen sind angehalten, Abläufe zu hinterfragen und Verbesserungen einzureichen — tragfähige Vorschläge werden geprüft und bei Machbarkeit vor dem Roll-out mit Ihnen abgestimmt.',
      onsiteQualityTitle: 'Unabhängige Qualitätsbegehungen vor Ort',
      onsiteQualityBody:
        'Über den täglichen Führungsrhythmus hinaus prüfen Fachreviewer vereinbarte Standards vor Ort, dokumentieren Beobachtungen und leiten bei Bedarf Korrekturmaßnahmen ein — Sie erhalten Transparenz über Ergebnisse und Nachverfolgung.',
      securityTitle: 'Datensicherheit & Vertraulichkeit',
      securityBody:
        'Alle im Einsatz erfassten Daten werden gemäß DSGVO verarbeitet und gespeichert. Unsere Mitarbeitenden sind zur Vertraulichkeit verpflichtet.\n\nZugriff auf sensible Informationen ist streng geregelt und wird regelmäßig überprüft.',
      ideaTitle: 'Kontinuierliche Verbesserung',
      ideaBody:
        'Qualität ist kein Zielzustand, sondern ein fortlaufender Prozess. Durch regelmäßige interne Audits, Kundenbefragungen und Benchmarking stellen wir sicher, dass wir uns stetig verbessern.\n\nJeder Hinweis, jede Kritik und jede Anregung wird ernst genommen und systematisch ausgewertet.',
      mqsTitle: 'Unser Qualitätsmanagementsystem',
      mqsBody:
        'Unser zertifiziertes Qualitätsmanagementsystem bildet die Grundlage für alle operativen Prozesse. Es stellt sicher, dass Standards eingehalten, Abweichungen erkannt und Verbesserungen systematisch umgesetzt werden.',
      standardsHeading: 'Zertifizierungen & Standards',
      standardsIntro:
        'Unsere Zertifizierungen bestätigen, dass wir höchste Qualitäts-, Sicherheits- und Managementstandards erfüllen.\n\nJe nach Auftrag können Leistungen an Managementsystem-Erwartungen oder branchenspezifische Regeln ausgerichtet werden. Nachfolgend repräsentative Beispiele — die konkrete Verfügbarkeit bitte im Angebot und Vertrag bestätigen:',
      standardsSwipeHint: '‹ SWIPE ›',
      standardsFootnote:
        '* Die Anwendbarkeit einzelner Nachweise variiert je nach Einheit, Standort und Vereinbarung — das Anschreiben zum Angebot definiert, was gilt.',
      closing:
        'Nachweise oder Assurance-Artefakte für eine Ausschreibung abstimmen? Beschreiben Sie uns das Szenario — wir gehen die Kriterien gemeinsam durch.',
    },
    philosophyPage: {
      eyebrowMuted: 'Werte und Leitlinien',
      title: 'Philosophie & Verhaltenskodex',
      introP1:
        'Unsere Unternehmensphilosophie und unser Verhaltenskodex bilden die Grundlage dafür, wie wir bei Suhaili Service täglich entscheiden und handeln.',
      introP2:
        'Als inhabergeführter Partner mit klarem Qualitätsanspruch verbinden wir Verlässlichkeit mit einem offenen Blick auf Märkte, Menschen und Standards — lokal verwurzelt, gestützt durch ein professionelles Leistungsportfolio über Service- und Facility-Disziplinen hinweg.',
      heroImage: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490768/suhail-services/philosophy-hero-collaboration.png',
      philosophyHeading: 'Unsere Philosophie',
      pillars: [
        {
          title: 'Zukunftsorientiert',
          body:
            'Wir verfolgen Branchenentwicklungen, regulatorische Erwartungen und pragmatische Digitalisierungsoptionen — ohne Trends um der Trends willen zu verfolgen. Wo ergänzende Kompetenzen Risiken nachhaltig senken oder die Effizienz an Ihren Standorten erhöhen, prüfen wir sie vor der Einführung sorgfältig.',
        },
        {
          title: 'Qualität, die überzeugt',
          body:
            'Qualität zahlt sich auf Dauer aus: Wir legen Wert auf tragfähige Konzepte, disziplinierte Übergaben und verlässliche Umsetzung in den Bereichen, die Sie uns anvertrauen — von der Mobilisierung bis zum laufenden Betrieb.',
        },
        {
          title: 'Verbesserung aus der Praxis',
          body:
            'Unsere Teams liefern operative Einblicke in Abläufe, Schnittstellen und Reibungspunkte. Vielversprechende Ideen werden transparent geprüft; was sich bewährt, wird mit Ihnen abgestimmt und dort verankert, wo es wirkt.',
        },
        {
          title: 'Dialog, der Vertrauen schafft',
          body:
            'Offene Kommunikation mit Kundinnen und Kunden, Kolleginnen und Kollegen sowie Partnern ist wesentlich — nicht nur in Workshops, sondern dort, wo Schichten, Spitzen und Schnittstellen den Alltag prägen.',
        },
        {
          title: 'Faire Zusammenarbeit',
          body:
            'Fairness, klare Erwartungen und Verlässlichkeit prägen unsere interne Zusammenarbeit — denn äußere Verlässlichkeit beginnt mit tragfähiger Organisation und respektvollem Miteinander.',
        },
        {
          title: 'Verantwortungsvolles Handeln',
          body:
            'Nachhaltiges wirtschaftliches Urteilsvermögen, fairer Wettbewerb und bewusster Umgang mit Ressourcen gehören zu unserem Handeln — ergänzt durch gezieltes zivilgesellschaftliches Engagement, wo es zu unserer Organisation passt.',
        },
        {
          title: 'Zugeschnitten auf Ihre Realität',
          body:
            'Ihre Anforderungen setzen den Maßstab: Als unabhängiger Anbieter schlagen wir Zusammenstellungen aus Reinigung, Service und Facility-Elementen vor, die zu Ihren Prozessen, Ihrem Risikoprofil und Ihrem Budget passen — ohne Einheitslösungen zu erzwingen.',
        },
      ],
      codeHeading: 'Verhaltenskodex',
      codeBody:
        'Die Bestandteile unseres Verhaltenskodex bieten einen gemeinsamen Rahmen zur Umsetzung von Werten und Zielen — für Mitarbeitende, Führungskräfte und Geschäftspartner. Über den untenstehenden Link steht ein umfassendes deutsches PDF-Referenzdokument zur Verfügung.',
      codePdfHref: 'https://www.koetter.de/fileadmin/user_upload/Dokumente_Einkauf/Verhaltenskodex_KOETTER.pdf',
      codePdfLabel: 'Verhaltenskodex (PDF, Deutsch)',
    },
    complianceLksgPage: {
      eyebrowMuted: 'Für faire Zusammenarbeit',
      title: 'Compliance & LkSG',
      heroP1:
        'Bei Suhaili Service verpflichten sich Geschäftsführung und Teams zur Einhaltung geltenden Rechts und zu fairem Miteinander mit Kundinnen und Kunden, Lieferanten und Partnern — gestützt durch klare interne Regeln und nachvollziehbare Verantwortlichkeiten.',
      heroP2:
        'Hinweise auf Rechtsverstöße, tarifliche Regelungen, Gleichbehandlungsvorgaben oder im Verhaltenskodex verankerte Erwartungen nehmen wir ernst — und leiten sie über festgelegte Prüf- und Eskalationswege weiter.',
      heroImage: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490347/suhail-services/compliance-hero-integrity.png',
      splitComplianceHeading: 'Compliance',
      splitComplianceBody:
        'Compliance ist für uns mehr als Papierarbeit: Wir bringen gesetzliche Pflichten, vertragliche Verpflichtungen und den respektvollen Umgang aller Beteiligten in Einklang. Wo Grenzfälle auftreten, klären wir Zuständigkeiten und dokumentieren nachvollziehbare nächste Schritte.',
      adviceHeading: 'Compliance-Kontakte & Meldewege',
      adviceBody:
        'Für compliance-bezogene Fragen stehen qualifizierte Ansprechpersonen zur Verfügung — intern sowie für Geschäftspartner, soweit Rahmenverträge und Datenschutzvereinbarungen proaktive Austausche erlauben.',
      adviceContactNote:
        'Konkrete Namen, Erreichbarkeiten und Eskalationswege werden je Organisationseinheit oder Projekt koordiniert und überall dort dokumentiert, wo Prüfungen Nachvollziehbarkeit erfordern.',
      adviceContactLinkLabel: 'Kontakt aufnehmen',
      whistleHeading: 'Hinweisgeberportal',
      whistleBody:
        'Möchten Sie Hinweise auf mögliche Verstöße gegen Gesetze oder Vorschriften einreichen? Über das unten verlinkte Hinweisgeberportal ist dies auch anonym möglich, sofern der jeweilige Workflow dies erlaubt. Die dort beschriebenen Datenschutzhinweise gelten.',
      whistleHref: 'https://sicher-melden.de/whistle/#/mainpage/KScase/k_tter_gmbh_co_kg_verwaltungsdienstleistungen',
      whistleLinkLabel: 'Hinweisgeberportal öffnen',
      lksgHeading: 'Lieferkettensorgfaltspflichtengesetz (LkSG)',
      lksgP1:
        'Das LkSG verpflichtet nach seinem Anwendungsbereich fallende Unternehmen, menschenrechtliche und ausgewählte umweltbezogene Sorgfaltspflichten umzusetzen — von der Risikoanalyse über Präventionsmaßnahmen bis zur Abhilfe in bestimmten Teilen der eigenen Geschäftstätigkeit und bei unmittelbaren vertraglichen Zulieferstufen.',
      lksgP2:
        'Wir strukturieren Informationsflüsse, Screening-Rhythmen und Eskalation so, dass Risiken früh sichtbar werden — passend zum Programmumfang und zu realistischer Hebelwirkung über Lieferkettenstufen hinweg.',
      statementHeading: 'Grundsatzerklärung — Menschenrechte',
      statementBody:
        'Als bundesweit tätige Organisation erkennen wir Verantwortung für Partner, Mitarbeitende, Gesellschaft und Umwelt an — ausgedrückt in dokumentierten Verpflichtungen zum Schutz der Menschenrechte, ergänzend zu unserem Verhaltenskodex.',
      statementPdfIntro: 'Die vollständige Grundsatzerklärung auf Deutsch:',
      statementPdfHref: 'https://www.koetter.de/fileadmin/user_upload/Dokumente_Einkauf/KOETTER_Grundsatzerklaerung_Menschenrechte_06.03.2024.pdf',
      statementPdfLabel: 'Grundsatzerklärung (PDF, Deutsch)',
      reportsHeading: 'LkSG-Berichte',
      reportsIntro:
        'Nachfolgend ausgewählte PDF-Berichte, die Maßnahmen und Risikomanagement dokumentieren — Veröffentlichungsdaten entnehmen Sie bitte der jeweiligen Datei.',
      report2023Href: 'https://www.koetter.de/fileadmin/user_upload/Dokumente_Einkauf/Bericht_KOETTER_-_Lieferkettensorgfaltspflichtengesetz_2023_03-2024.pdf',
      report2023Label: 'Bericht zum Lieferkettensorgfaltspflichtengesetz (LkSG) — 2023',
      report2024Href: 'https://www.koetter.de/fileadmin/user_upload/Dokumente_Einkauf/Bericht_KOETTER_-_Lieferkettensorgfaltspflichtengesetz_2024_12-2024.pdf',
      report2024Label: 'Bericht zum Lieferkettensorgfaltspflichtengesetz (LkSG) — 2024',
      supplierHeading: 'Verhaltenskodex für Lieferanten und Subunternehmer',
      supplierBody:
        'Unser Lieferanten- und Subunternehmerkodex verankert vertragliche Erwartungen rund um Menschenrechte, Arbeitssicherheit und Umweltsorgfalt überall dort, wo Beschaffungsumfänge ausdrückliche Schutzmaßnahmen erfordern.',
      supplierPdfIntro: 'Der vollständige Lieferantenkodex auf Deutsch:',
      supplierPdfHref: 'https://www.koetter.de/fileadmin/user_upload/Dokumente_Einkauf/Lieferantenkodex_KOETTER_3538_05.03.2024.pdf',
      supplierPdfLabel: 'Lieferantenkodex (PDF, Deutsch)',
    },
    associationWorkPage: {
      eyebrowMuted: 'Verbandsarbeit',
      title: 'Verbandsarbeit',
      heroP1:
        'Hochkarätige Leistung endet nicht an unserer eigenen Organisation — deshalb nimmt Suhaili Service an nationalen und internationalen Verbänden teil: um Erfahrung zu teilen, anerkannte Standards weiterzuentwickeln und berufliche Bildungswege nachhaltig zu stärken.',
      heroP2:
        'Über dieses Netzwerk tragen wir zur fachlichen Orientierung über unsere Branchen hinweg bei — geleitet von verlässlichen Qualitäts- und Servicestandards.',
      heroImage: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490344/suhail-services/association-work-hero.png',
      engagementImage: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490341/suhail-services/association-work-engagement.png',
      engagementHeading: 'Engagement',
      engagementBody:
        'Mitgliedschaft und Mitwirkung — etwa in Foren wie der International Security League oder dem Bundesverband der Sicherheitswirtschaft (BDSW) — unterlegen einen kontinuierlichen globalen Dialog zu Trends und Benchmarks.',
      internationalHeading: 'Internationale Verbandsarbeit',
      internationalItems: [
        { title: 'ASSA-I Aviation Security Services Association International (Brüssel, Belgien)', body: 'Ein Zusammenschluss führender europäischer Flughafensicherheitsorganisationen, der Benchmark-Qualitätsrahmen für Ausbildung und Weiterbildung fördert.' },
        { title: 'International Security League (Zollikofen, Schweiz)', body: 'Ein weltweites Netzwerk privater Sicherheitsunternehmen zur Förderung nachhaltiger Professionalität und ethischen Verhaltens in allen Märkten.' },
      ],
      nationalHeading: 'Nationale Verbandsarbeit',
      nationalLines: [
        'ASW — Allianz für Sicherheit in der Wirtschaft (Regionalgruppen)',
        'Bundesverband der Träger beruflicher Bildung e. V.',
        'BDLS — Bundesverband der Luftsicherheitsunternehmen e.V. (Bad Homburg)',
        'BDSW — Bundesverband der Sicherheitswirtschaft e.V. (Bad Homburg)',
        'BHE — Bundesverband der Hersteller- und Errichterfirmen von Sicherheitssystemen (Brücken)',
        'Bundesinnungsverband des Gebäudereinigerhandwerks (Bonn)',
        'EUV — Essener Unternehmensverband e. V. (Essen)',
        'Förderkreis der Deutschen Industrie e.V. (Berlin)',
        'GEFMA — Deutscher Verband für Facility Management e.V. (Bonn)',
        'Gesamtverband der Personaldienstleister (Berlin)',
        'Industrie- und Handelskammer für Essen, Mülheim an der Ruhr und Oberhausen (Essen)',
        'ILS — Verband Instore und Logistik Services e. V. (Berlin)',
        'Initiativkreis Ruhr GmbH (Essen)',
        'muTiger-Stiftung',
        'Stiftung Familienunternehmen (München)',
        'VdS Schadenverhütung GmbH (Köln)',
        'vfdb — Vereinigung zur Förderung des Deutschen Brandschutzes e.V. (Altenberge)',
        'WIFU — Stiftung Wittener Institut für Familienunternehmen (Witten)',
        'ZVEI — Zentralverband Elektrotechnik- und Elektroindustrie e.V. (Frankfurt am Main)',
        'BDSV Ausstellungen e.V.',
      ],
    },
    csrPage: {
      eyebrowMuted: 'CSR / ESG',
      title: 'CSR / ESG',
      introP1:
        'Als bundesweit tätige Organisation mit langjähriger Erfahrung und tausenden Kolleginnen und Kollegen tragen wir Verantwortung — gegenüber Kundinnen und Kunden, Teams, Gesellschaft und Umwelt.',
      introP2:
        'Wir nehmen diese Pflicht bewusst an. Nachhaltiges Handeln stützt die wirtschaftlichen, ökologischen und sozialen Grundlagen, die wir künftigen Generationen hinterlassen wollen.',
      heroImage: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490363/suhail-services/csr-hero-forest.png',
      economicHeading: 'Ökonomische Nachhaltigkeit',
      economicBullets: [
        'Inhabergeführte Governance ohne kurzfristigen externen Renditedruck — strategische Entscheidungen folgen einer resilienten Langfristperspektive.',
        'Finanzielle Unabhängigkeit ermöglicht es uns, uns Anpassungen bei Märkten oder Programmen anzupassen, ohne die Richtung zu verlieren.',
        'Verlässliche Partnerschaften mit Kundinnen und Kunden, Mitarbeitenden und Lieferanten stehen im Mittelpunkt — auch über Konjunkturzyklen hinweg.',
        'Beständige Zusammenarbeit schlägt opportunistische Einzelaktionen, die Kontinuität gefährden.',
      ],
      reportTitle: 'Unser CSR-Bericht',
      reportBody: 'Wir berichten regelmäßig über unsere CSR-Aktivitäten. Für weitere Informationen kontaktieren Sie uns gerne.',
      reportLinkContactLabel: 'CSR-Bericht anfordern',
      reportLinkContactHref: '/contact',
      ecologicalHeading: 'Ökologische Nachhaltigkeit',
      ecologicalIntro:
        'Ein intaktes Umfeld weiterzugeben, gehört zu unserem Selbstverständnis. Dazu gehören unter anderem:',
      ecologicalImage: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490351/suhail-services/csr-ecological-photo.png',
      ecologicalBullets: [
        'Schulung und Sensibilisierung für umweltgerechtes Verhalten — beim Kunden vor Ort und in unseren eigenen Arbeitswelten.',
        'Förderung alternativer Antriebe, wo es passt, und schrittweiser Ausbau der Ladeinfrastruktur an ausgewählten Standorten.',
        'Bevorzugung erneuerbarer Strombezüge und nachverfolgbare Beschaffung gegenüber klaren Zielen.',
        'Digitale Alternativen zu Papierpost, wo Prozesse es erlauben und Datenschutzregeln dies zulassen.',
        'Umweltverträgliche Reinigungsmittel und -materialien in Abstimmung mit Kundinnen, Kunden und Lieferanten.',
        'Regelmäßige Prüfung von Leistungen, Equipment und Verbrauchsmaterialien auf Umweltauswirkungen.',
        'Verankerung ökologischer Kriterien in internen Audits und Verbesserungszyklen.',
      ],
      socialHeading: 'Soziale Nachhaltigkeit',
      socialBody:
        'Seit Jahrzehnten unterstützen wir soziale und gemeinnützige Initiativen sowie regionale Kultureinrichtungen und Sportvereine. Wir tun dies in der Überzeugung, dass unsere Förderung dem Gemeinwohl dient — und vielen Menschen die Chance gibt, persönliche Ziele zu erreichen und ihre Hoffnungen zu verwirklichen.',
      muTigerSpotlightTitle: 'muTiger-Stiftung',
      muTigerSpotlightBody:
        'Soziale Verantwortung nehmen wir ernst — nicht nur innerhalb unseres Konzerns, sondern auch in der Gesellschaft insgesamt. Deshalb wurde die muTiger-Stiftung für Zivilcourage 2011 gemeinsam mit dem Verkehrsverbund Rhein-Ruhr (VRR) gegründet. Unser gemeinsames Ziel: Hilfsbereitschaft und Zivilcourage in der Gesellschaft zu fördern. In über 1.000 Schulungsveranstaltungen haben bereits rund 18.000 Teilnehmende erfahren, wie sie sich in kritischen Situationen richtig verhalten und anderen helfen können, ohne sich selbst zu gefährden. Selbstverständlich nehmen alle Auszubildenden aus Nordrhein-Westfalen im ersten Lehrjahr am Kurs der Stiftung teil.',
      joblingeSpotlightTitle: 'JOBLINGE-Initiative',
      joblingeSpotlightBody:
        'Chancen zu eröffnen — deshalb unterstützen wir seit mehreren Jahren die JOBLINGE-Initiative. Sie gibt jungen Menschen mit schwierigen Startbedingungen eine zweite Chance beim Berufseinstieg. Das Programm „JOBLINGE Compass“ wurde zudem entwickelt, um die Integration junger Geflüchteter zu unterstützen. Wir fördern diesen gemeinnützigen Träger strategisch, finanziell und praktisch. Führungskräfte unternehmensseitig sind im Aufsichtsrat der Joblinge gAG Ruhr vertreten. JOBLINGE und JOBLINGE Compass haben bereits erfolgreich Auszubildende für Partnerorganisationen gewonnen.',
      essenMedicineSpotlightTitle: 'Stiftung Universitätsmedizin Essen',
      essenMedicineSpotlightBody:
        'Innovation und Verantwortung gehören zusammen — deshalb ist uns die Stiftung Universitätsmedizin Essen wichtig. Sie unterstützt Vorhaben am Universitätsklinikum Essen und der Universität Duisburg-Essen, die über die Grundversorgung hinausgehen: innovative Forschung, exzellente Lehre angehender Ärztinnen und Ärzte sowie eine weiter ausgebaute Patientenversorgung. Unser Unternehmen unterstützt diese Arbeit durch langjähriges Engagement in den Programmen und der Governance der Stiftung.',
      closing: 'CSR ist für uns ein fortlaufender Prozess. Wir verpflichten uns, unsere Maßnahmen kontinuierlich zu verbessern.',
    },
    otherCompaniesPage: {
      eyebrowMuted: 'Weitere Gesellschaften',
      title: 'Weitere Gesellschaften & Beteiligungen',
      heroP1: 'Als Unternehmensgruppe sind wir in verschiedenen Segmenten der Sicherheits- und Dienstleistungsbranche tätig.',
      heroP2: 'Jede Gesellschaft operiert mit eigener Führung und Identität — eingebettet in die gemeinsamen Werte der Gruppe.',
      heroImage: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490547/suhail-services/other-companies-hero.png',
      activeBrandsHeading: 'Aktive Marken',
      activeBrands: [
        { slug: 'osd-schaefer', name: 'OSD SCHÄFER', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490401/suhail-services/other-companies/osd-schaefer.webp', body: '1979 gegründet, ist die OSD SCHÄFER GmbH & Co. KG (mit Sitz in Karlsruhe) seit 2014 eine hundertprozentige Tochtergesellschaft der KÖTTER Gruppe. Neben klassischen Sicherheitsdienstleistungen ist OSD SCHÄFER auf die Absicherung kritischer Infrastrukturen, insbesondere Kernanlagen und -einrichtungen, spezialisiert.' },
        { slug: 'gbp', name: 'German Business Protection', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490397/suhail-services/other-companies/german-business-protection.webp', body: 'German Business Protection (GBP) wurde 2012 von der KÖTTER Gruppe in Berlin gegründet. GBP bietet Unternehmen, Behörden, Nichtregierungsorganisationen (NGOs) und Privatpersonen Beratungsleistungen als integrierte Risikomanagementlösung mit den Schwerpunkten Sicherheit und Compliance.' },
        { slug: 'terapon', name: 'TERAPON', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/terapon.jpg', body: 'Die TERAPON Consulting GmbH wurde 2007 von der KÖTTER Gruppe in Essen gegründet und ist auf effizientes Gesundheitsmanagement spezialisiert. Dazu gehören die schnelle, bundesweite und nachhaltige Betreuung traumatisierter oder anderweitig psychisch belasteter Personen.' },
        { slug: 'medgravity', name: 'MedGravity', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/medgravity.png', body: 'Zum 1. Januar 2023 hat die KÖTTER Gruppe alle Anteile an der Hannoveraner MedGravity übernommen. MedGravity ist auf die Aus- und Weiterbildung von Ersthelfern sowie Betriebs-, Rettungs- und Notfallsanitätern spezialisiert und ergänzt damit ideal das Angebot der KÖTTER Akademie.' },
        { slug: 'stuk', name: 'STuK Sicherheitstechnik', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/stuk.png', body: 'Mit Wirkung zum 1. Januar 2025 hat die KÖTTER Gruppe das norddeutsche Unternehmen STuK Sicherheitstechnik GmbH übernommen. Dieser strategische Schritt ermöglicht es, die Kompetenz in der Sicherheitstechnik und im technischen Brandschutz weiter auszubauen.' },
      ],
      portfolioBrands: [],
      integratedBrandsHeading: 'Integrierte Marken',
      integratedBrands: [
        { slug: 'wako', name: 'WAKO Group', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/wako.png', body: 'Die in Stade ansässige WAKO-Gruppe ist mit all ihren Tochtergesellschaften seit 2024 eine hundertprozentige Tochter der KÖTTER Gruppe. Mit dem Rebranding 2026 wurde das Unternehmen vollständig in die bestehenden Gesellschaften der KÖTTER Gruppe integriert.' },
        { slug: 'arndt', name: 'ARNDT-Group', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/arndt.jpg', body: 'Die in Fürth ansässige ARNDT-Gruppe wurde 1925 in Nürnberg gegründet und ist seit 2018 eine hundertprozentige Tochtergesellschaft der KÖTTER Gruppe. 1992 war ARNDT das erste Sicherheitsunternehmen in Deutschland, das nach DIN ISO 9000 ff. zertifiziert wurde. 2022 erfolgte die Fusion mit den bestehenden Gesellschaften der KÖTTER Sicherheitsgruppe.' },
        { slug: 'ise', name: 'I.S.E. Alarm-Service Berlin GmbH', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/ise-alarm.webp', body: 'Die I.S.E. Alarm-Service Berlin GmbH wurde 2002 in der Hauptstadt gegründet und ist auf Alarmverfolgung, Interventionsdienste, Aufzugsrettung und Streifendienste spezialisiert. 2019 wurde I.S.E. von KÖTTER Security (Berlin) übernommen und 2022 fusioniert.' },
        { slug: 'inter', name: 'INTER Group', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/intergruppe.webp', body: '1976 gegründet, wurde die INTER-Gruppe (mit den Sparten INTERSCHUTZ, INTERCLEAN und INTERSERVICE) mit Sitz in Bonn 2011 von der KÖTTER Gruppe übernommen. Mit dem Namenswechsel 2013 wurde das Unternehmen vollständig in die bestehenden Gesellschaften der KÖTTER Gruppe integriert.' },
        { slug: 'wsp', name: 'Wachschutz Paderborn', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/wachschutz.webp', body: '1968 gegründet und hauptsächlich in Ostwestfalen tätig, trat das Paderborner Sicherheitsunternehmen 2008 der KÖTTER Gruppe bei. Seit 2009 firmiert das Unternehmen als KÖTTER Security GmbH.' },
        { slug: 'gsw', name: 'GSW Sicherheit und Werkschutz', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/gswsicherheit.jpg', body: 'Die „GSW Sicherheit und Werkschutz GmbH" wurde 1999 in Saarbrücken gegründet und trat 2008 der KÖTTER Gruppe bei. Mit dem Namenswechsel 2011 wurde das Unternehmen vollständig in ein Unternehmen der KÖTTER Gruppe integriert.' },
        { slug: 'buerder', name: 'Wachdienst Bürder', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/burder.jpg', body: '1964 im Ruhrgebiet gegründet, trat der Bürder-Wachdienst 2006 der KÖTTER Gruppe bei. Der Firmenname wurde 2008 geändert und damit die Integration in die KÖTTER Gruppe abgeschlossen.' },
        { slug: 'abakus', name: 'ABAKUS Personalüberlassung', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/abakus.webp', body: 'Die 1993 gegründete und in Köln ansässige ABAKUS Personalüberlassung GmbH wurde 2005 von KÖTTER Personal Service übernommen. Die Integration in die KÖTTER Gruppe wurde mit der Umbenennung 2007 abgeschlossen.' },
        { slug: 'control', name: 'Control Risk Management', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/control-risk-management.jpg', body: 'Die in Norddeutschland gegründete Control Risk Management GmbH ist seit Anfang 2005 Teil der KÖTTER Gruppe.' },
        { slug: 'bielefelder', name: 'Bielefelder Heimschutz', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/bielefelder-heimschutz.png', body: 'Der Bielefelder Heimschutz wurde 1933 gegründet und 2004 von der KÖTTER Gruppe übernommen. 2007 wurde das Unternehmen in KÖTTER Security GmbH umbenannt.' },
        { slug: 'duesseldorfer', name: 'Düsseldorfer Wach- und Schließgesellschaft', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/duesseldorfer-crop.webp', body: 'Das Düsseldorfer Sicherheits- und Schließunternehmen wurde 1903 gegründet und 1995 von der KÖTTER Gruppe übernommen. Mit dem Namenswechsel im August 2009 wurde es vollständig in eine Gesellschaft der KÖTTER Gruppe integriert.' },
      ],
    },
  },
  en: {
    nav: {
      home:     'Home',
      projects: 'Projects',
      about:    'About',
      services: 'Services',
      news:     'News',
      gallery:  'Gallery',
      contact:  'Contact',
    },
    pages: {
      wip: 'This page is under construction. Content will be added soon.',
      privacyTitle: 'Privacy policy',
    },
    contact: {
      eyebrow: 'Get in touch',
      title: 'Contact',
      detailsTitle: 'Contact details',
      formTitle: 'Send a message',
      addressLabel: 'Address',
      phoneLabel: 'Phone',
      emailLabel: 'E-mail',
      socialTitle: 'Social',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your@email.com',
      messageLabel: 'Message',
      messagePlaceholder: 'How can we help?',
      requiredHint: 'Required',
      submit: 'Send',
      submitAria: 'Send message via your email app',
      formPrivacy: 'Submitting opens your email app to send the message. Privacy information:',
      formPrivacyLink: 'Data protection',
      mailSubjectPrefix: 'Inquiry via suhaili-security.de',
      socialFacebookUrl: '',
      socialTiktokUrl: '',
      socialInstagramUrl: '',
      availabilityTitle: 'Operations & availability',
      availabilityBody:
        'We coordinate site and event security in and around Berlin. For urgent requests, call or email — we will get back to you as soon as possible.',
      exploreTitle: 'Explore',
      capabilitiesTitle: 'Core capabilities',
      capabilitiesIntro: 'A snapshot of how we support your operations:',
      capLine1: 'Site, VIP & event security',
      capLine2: 'CCTV, alarm response & mobile patrols',
      capLine3: 'Reception, access control & parking management',
      capLine4: 'Construction sites, keyholding & security consulting',
    },
    projects: {
      eyebrow: 'Selected references',
      titleLine1: 'Where trust meets',
      titleLine2: 'vigilance.',
      badge: 'Projects',
      cardInquiry: 'Inquire about project',
      openImage: 'Open full-size image',
      closeLightbox: 'Close',
      p1: { meta: 'Store detective · 2024', title: 'Flagship retail — Berlin' },
      p2: { meta: 'Access control · 2024', title: 'High-security logistics hub' },
      p3: { meta: 'VIP protection · 2024', title: 'Executive close-protection detail' },
      p4: { meta: 'CCTV & monitoring · 2024', title: 'Integrated video operations centre' },
      p5: { meta: 'Event security · 2023', title: 'Gala & private venue coverage' },
      p6: { meta: 'Reception service · 2023', title: 'Five-star lobby & access' },
      p7: { meta: 'Alarm response · 2023', title: 'Rapid intervention & site security' },
      p8: { meta: 'Patrol service · 2024', title: '24/7 mobile security rounds' },
    },
    imprint: {
      eyebrow: 'Legal',
      title: 'Imprint',
      lead: 'Information pursuant to German TMG and RStV, consistent with our published business communications.',
      card1: 'Professional',
      card2: 'Discreet',
      card3: 'Reliable',
      sectionCompany: 'Company & address',
      companyName: 'Suhaili Security',
      companyTagline: 'Security services',
      companyIntro:
        'Suhaili Security is a security services provider.',
      locationLabel: 'Location',
      addressLines: 'Ritterlandweg 2, 13409 Berlin\nLagerhofstr. 2, 04103 Leipzig',
      sectionContact: 'Contact',
      email: 'info@suhaili-security.de',
      phones: '+49 176 41180455',
      website: 'www.suhaili-security.de',
      sectionPrivacy: 'Data protection',
      sectionPrivacyBody: 'Please see our privacy statement for how we handle personal data.',
      privacyLink: 'Open privacy statement',
      sectionNote: 'Operations & availability',
      noteP1:
        'We provide security services for commercial and private clients — with a focus on site and event protection, patrol assignments, and discreet escort where agreed. Deployments are coordinated with you and documented when the engagement requires it.',
      noteP2:
        'For availability, references, deployment profiles, or tailored briefs, contact us by email or phone. For sensitive matters we recommend using email first.',
      disclaimerTitle: 'Disclaimer',
      disclaimerBody:
        'This site is maintained with care; we do not warrant accuracy, completeness, or timeliness. Liability for use of this information is excluded where permitted by law. Linked third-party sites are the responsibility of their operators.',
      copyrightTitle: 'Copyright',
      copyrightBody:
        'Copy, layout, and media are protected by copyright and related laws. Reproduction or distribution requires prior written consent.',
    },
    home: {
      heroEyebrow: 'Berlin — Security Services',
      heroTitle1:  'SUHAILI',
      heroTitle2:  'SECURITY',
      heroSub:     'Professional protection for businesses and private clients. Reliable, discreet and available 24/7.',
      heroCta1:    'Our Services',
      heroCta2:    'Get in touch',
      ticker: [
        'Professional', 'Discreet', 'Reliable', '24/7 Ready',
        'Berlin', 'Object Protection', 'VIP Security', 'CCTV Surveillance',
        'Event Security', 'Patrol Service', 'Qualified Staff', 'Security Services',
      ],
      servicesTitle: 'Our Services',
      servicesSub:   'A complete portfolio — from object protection to VIP security.',
      servicesLink:  'All Services →',
      missionEyebrow: 'Our Mission',
      mission: 'We stand for security you can feel — through expertise, integrity and an unwavering commitment to protecting people and assets.',
      aboutLink: 'About us →',
      cta1: 'PROTECT YOUR',
      cta2: 'BUSINESS',
      cta3: 'NOW.',
      ctaPhone: '+49 176 41180455',
      ctaEmail: 'info@suhaili-security.de',
    },
    servicesPage: servicesPageLocales.en,
    newsPage: newsPageLocales.en,
    galleryPage: galleryPageLocales.en,
    about: {
      hero1: 'Welcome to Suhaili Security',
      hero2: '',
      mission2: 'Since our founding, we have stood for trust, quality, and innovation. With headquarters in Berlin, we are a reliable partner for security services — providing comprehensive solutions from a single source.',
      aboutImage: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490337/suhail-services/about_1_1777327649561.jpg',
      aboutImgAlt: 'Berlin TV Tower and skyline at sunset',
      learnMoreHref: '/contact',
      learnMoreLabel: 'Learn more',
      statsTitle: 'Our Expertise in Numbers',
      stats: [
        { num: '100', label: 'Branches Nationwide' },
        { num: '770', label: 'Million Euros in Group Revenue' },
        { num: '92', label: 'Years of Expert Experience' },
        { num: '16.400', label: 'Outstanding Employees' },
      ],
      statsBody: 'Our key figures represent more than just growth: they are proof of long-standing partnerships, the trust of our clients, and the continuous dedication of our employees.',
      solutionsTitle: 'Suhaili Security – tailor-made solutions from a single source',
      solutionsDesc: 'Our range of services includes site and personal security, CCTV surveillance, patrol services, and event security. Our individually tailored concepts create the freedom you need to focus entirely on your core business.',
      aboutSections: [
        { id: 'history-facts', title: 'History & Facts' },
        { id: 'references', title: 'References' },
        { id: 'quality-certificates', title: 'Quality / Certificates / Awards' },
        { id: 'csr-esg', title: 'CSR / ESG' },
        { id: 'philosophy-code', title: 'Philosophy & Code of Conduct' },
        { id: 'compliance-lksg', title: 'Compliance & LkSG' },
        { id: 'association-work', title: 'Association Work' },
        { id: 'other-companies', title: 'Other Companies & Investments' },
      ],
      historyTitle: 'From the founding to today',
      historySubtitle: 'OUR HISTORY IN NUMBERS AND MOMENTS',
      historyIntro:
        'Since its founding in 1934, the KÖTTER Group has developed from a regional security service provider to one of the leading providers of facility services in Germany. As an independent, third-generation family business, we offer customized solutions in the areas of personal security, cybersecurity and security technology, cleaning and personnel services, and facility management.',
      historyBodyText:
        'As Germany\'s largest family-run security service provider and the second-largest provider in the security industry, we are among the top 10 facility services providers in Germany according to the Lünendonk List. Our independence from shareholders and financial investors enables us to pursue sustainable strategies and always make decisions in the best interests of our customers and employees. Trust, high quality standards, and responsible management form the basis of our actions. Through long-term partnerships, we create the freedom for you so you can fully concentrate on your core business.',
      historyBodyImage: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490547/suhail-services/other-companies-hero.png',
      historyTimelineHeading: 'Milestones',
      historyTimeline: [
        { year: '1934', title: 'WWSD founded', event: 'Karl Friedrich Kötter founded the Westdeutscher Wach- und Schutzdienst (WWSD) in Wanne-Eickel.' },
        { year: '1957', title: 'Second generation', event: 'Friedrich Karl Kötter takes over the company in the second generation.' },
        { year: '1960', title: 'Branches', event: 'Establishment of the first branches in Cologne, Stuttgart and Frankfurt am Main.' },
        { year: '1966', title: 'Security technology', event: 'Start of the security technology department.' },
        { year: '1970', title: 'Cash & valuables', event: 'Launch of KÖTTER cash and valuables services.' },
        { year: '1985', title: 'Cleaning', event: 'Founding of KÖTTER Cleaning.' },
        { year: '1993', title: 'Third generation', event: 'Martina Kötter and Friedrich P. Kötter join company management (third generation). WWSD becomes KÖTTER Services.' },
        { year: '1997', title: 'Personal Service', event: 'Launch of KÖTTER Personal Service.' },
        { year: '1999', title: 'Academy', event: 'Founding of the KÖTTER Academy.' },
        { year: '2001', title: 'Aviation Security', event: 'Founding of KÖTTER Aviation Security.' },
        { year: '2011', title: 'muTiger Foundation', event: 'Founding of the muTiger Foundation together with the Rhine-Ruhr Transport Association.' },
        { year: '2012', title: 'Fire & GBP', event: 'Founding of KÖTTER Fire & Service and German Business Protection.' },
        { year: '2017', title: 'Essen control centre', event: 'Commissioning of the high-tech control center in Essen.' },
        { year: '2024', title: 'Cyber security', event: 'Provider of cyber security solutions.' },
        { year: '2024', title: 'WAKO Group', event: 'KÖTTER Security acquires the Stade-based WAKO Group — founded in 1904 with more than 800 employees.' },
        { year: '2024', title: '360° security', event: 'Through its investment in IT specialist G.I.P., KÖTTER Security becomes one of the first security service providers in Europe to offer truly 360-degree security solutions.' },
      ],
    },
    common: {
      backTo: 'Back to',
    },
    referencesPage: {
      eyebrow: 'OUR CUSTOMERS',
      eyebrowMuted: 'References',
      title: 'References',
      intro:
        'From global groups to regional businesses and local trades: we support organisations of every scale. Security, cleaning, people services, and integrated facility programmes are shaped around your sites, risks, and day-to-day operations.',
      spotlightBody: 'Below is a representative selection of long-standing relationships.',
      logosHeading: 'Selected clients',
      closing:
        'Reliability, quality, and tailored service bundles are what sustain partnerships over years—across sectors and throughout Germany.',
      clients: [
        { slug: 'der-gruene-punkt', name: 'Der Grüne Punkt', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490775/suhail-services/ref-clients/der-gruene-punkt.png' },
        { slug: 'huf', name: 'Huf', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490779/suhail-services/ref-clients/huf.png' },
        { slug: 'intersport-voswinkel', name: 'Intersport Voswinkel', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490780/suhail-services/ref-clients/intersport-voswinkel.png' },
        { slug: 'makita', name: 'Makita', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490781/suhail-services/ref-clients/makita.png' },
        { slug: 'medion', name: 'Medion', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490782/suhail-services/ref-clients/medion.png' },
        { slug: 'blb-nrw', name: 'BLB NRW', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490772/suhail-services/ref-clients/blb-nrw.png' },
        { slug: 'currenta', name: 'Currenta', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490773/suhail-services/ref-clients/currenta.png' },
        { slug: 'funke-medien', name: 'Funke Medien Gruppe', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490778/suhail-services/ref-clients/funke-medien.png' },
        { slug: 'gasag', name: 'Gasag', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490779/suhail-services/ref-clients/gasag.png' },
        { slug: 'siemens', name: 'Siemens', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490787/suhail-services/ref-clients/siemens.png' },
        { slug: 'mkk', name: 'MKK', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490783/suhail-services/ref-clients/mkk.png' },
        { slug: 'nkg-kala-hamburg', name: 'NKG Kala Hamburg', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490784/suhail-services/ref-clients/nkg-kala-hamburg.png' },
        { slug: 'rhenus-logistics', name: 'Rhenus Logistics', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490785/suhail-services/ref-clients/rhenus-logistics.png' },
        { slug: 'sangro-homecare', name: 'Sangro homecare', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490785/suhail-services/ref-clients/sangro-homecare.jpg' },
        { slug: 'shell', name: 'Shell', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490786/suhail-services/ref-clients/shell.png' },
        { slug: 'sparkasse-essen', name: 'Sparkasse Essen', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490788/suhail-services/ref-clients/sparkasse-essen.png' },
        { slug: 'theresia-albers-stiftung', name: 'Theresia Albers Stiftung', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490789/suhail-services/ref-clients/theresia-albers-stiftung.png' },
        { slug: 'tmd-friction', name: 'TMD Friction', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490790/suhail-services/ref-clients/tmd-friction.png' },
        { slug: 'uni-duisburg-essen', name: 'Universität Duisburg-Essen', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490791/suhail-services/ref-clients/uni-duisburg-essen.png' },
        { slug: 'deutsches-historisches-museum', name: 'Deutsches Historisches Museum', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490776/suhail-services/ref-clients/deutsches-historisches-museum.png' },
      ],
    },
    qualityPage: {
      eyebrowMuted: 'Quality & Certificates',
      title: 'Quality / Certificates / Awards',
      introP1:
        'Everyone talks about quality — we focus where standards bite and outcomes become measurable.',
      introP2:
        'Our entire process chain is geared toward meeting your requirements — that is how lasting trust is earned.',
      heroImage: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490771/suhail-services/quality-hero-certified.png',
      pillarsHeading: 'Where quality becomes tangible',
      pillarsTop: [
        {
          title: 'Sector-specific controls',
          body:
            'Beyond recurring internal audits, we tailor checkpoints to sector realities — cleaning, guarding, and staffing surface different compliance edges in banking vs chemicals vs public-sector estates.',
        },
        {
          title: 'Feasibility before commitment',
          body:
            'Before mobilisation we clarify scope, timing, interfaces, and risk — keeping commitments realistic for you and for front-line teams.',
        },
        {
          title: 'Ramp-up on larger engagements',
          body:
            'Complex programmes gain dedicated ramp-up capacity during conception and early delivery — aligning governance hand-offs with steady running routines.',
        },
      ],
      communicationTitle: 'Information & communication',
      communicationBody:
        'Transparent dialogue anchors reliable delivery: stakeholders join early, progress follows agreed rhythms, and everyone maintains shared situational awareness.\n\nStructured feedback cadences with you and named contacts stay compact — deviations remain visible early and corrective paths stay actionable.',
      infoSecurityTitle: 'Information security & data protection',
      infoSecurityBody:
        'Expectations for how information is handled — across channels, systems, and devices — continue to rise.\n\nWhere contracts call for it, we align with recognised information-security expectations (including ISO/IEC 27001 as a reference) and underpin them with practical rules — sensible access habits, awareness prompts, and clear desk / clear screen hygiene across office and field.',
      frontLineTitle: 'Improvement from the front line',
      frontLineBody:
        'Operational insight fuels refinement: colleagues are encouraged to question routines and submit improvements — workable proposals are reviewed and, when viable, coordinated with you prior to rollout.',
      onsiteQualityTitle: 'Independent on-site quality walks',
      onsiteQualityBody:
        'Beyond daily management rhythm, specialist reviewers validate agreed standards at sites, record observations, and trigger corrective steps — you receive transparency on outcomes and follow-through.',
      securityTitle: 'Data Security & Confidentiality',
      securityBody:
        'All data captured during operations is processed and stored in accordance with GDPR. Our employees are bound by strict confidentiality obligations.\n\nAccess to sensitive information is tightly regulated and regularly reviewed.',
      ideaTitle: 'Continuous Improvement',
      ideaBody:
        'Quality is not a destination — it is an ongoing process. Through regular internal audits, client surveys and benchmarking, we ensure we are constantly improving.\n\nEvery comment, criticism and suggestion is taken seriously and systematically evaluated.',
      mqsTitle: 'Our Quality Management System',
      mqsBody:
        'Our certified quality management system is the foundation for all operational processes. It ensures that standards are met, deviations are identified and improvements are systematically implemented.',
      standardsHeading: 'Certifications & Standards',
      standardsIntro:
        'Our certifications confirm that we meet the highest quality, safety and management standards.\n\nDepending on the assignment, services may be aligned with management-system expectations or sector-specific rules. Representative examples below — always confirm availability in the proposal and contract:',
      standardsSwipeHint: '‹ SWIPE ›',
      standardsFootnote:
        '* Applicability of individual attestations varies by entity, site, and agreement — the proposal letter defines what applies.',
      closing:
        'Need to align evidence or assurance artefacts with a tender? Tell us the scenario — we will walk through the criteria together.',
    },
    philosophyPage: {
      eyebrowMuted: 'Values and guidelines',
      title: 'Philosophy & Code of Conduct',
      introP1:
        'Our corporate philosophy and code of conduct underpin how we decide and act every day at suhaili Service.',
      introP2:
        'As an owner-led partner with a clear quality ambition, we combine reliability with an open eye on markets, people, and standards — rooted locally, supported by a professional portfolio across service and facility disciplines.',
      heroImage: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490768/suhail-services/philosophy-hero-collaboration.png',
      philosophyHeading: 'Our philosophy',
      pillars: [
        {
          title: 'Forward-looking',
          body:
            'We track sector developments, regulatory expectations, and practical digitalisation options — without chasing trends for their own sake. Where complementary capabilities genuinely reduce risk or raise efficiency on your sites, we evaluate them carefully before adoption.',
        },
        {
          title: 'Quality that convinces',
          body:
            'Quality pays off over time: we emphasise sound concepts, disciplined handovers, and dependable execution across the spaces you entrust to us — from mobilisation through steady-state operations.',
        },
        {
          title: 'Improvement from the field',
          body:
            'Our teams contribute operational insight about flows, interfaces, and friction points. Promising ideas are reviewed transparently; what proves workable is aligned with you and embedded where it delivers.',
        },
        {
          title: 'Dialogue that builds trust',
          body:
            'Open communication with clients, colleagues, and partners is essential — not only in workshops but where shifts, peaks, and interfaces meet day to day.',
        },
        {
          title: 'Fair teamwork',
          body:
            'Fairness, clarity of expectations, and reliability define how we work together internally — because outward dependability starts with sound organisation and respectful cooperation.',
        },
        {
          title: 'Responsible action',
          body:
            'Sustainable economic judgement, fair competition, and deliberate resource awareness are part of how we operate — complemented by selective civic engagement where it fits our organisation.',
        },
        {
          title: 'Tailored to your reality',
          body:
            'Your requirements set the benchmark: as an independent provider we propose compositions of cleaning, service, and facility elements that align with your processes, risk profile, and budget — without forcing one-size templates.',
        },
      ],
      codeHeading: 'Code of Conduct',
      codeBody:
        'Our Code of Conduct components provide a shared framework for implementing values and objectives — addressing employees, managers, and business partners. A comprehensive German PDF reference document is available via the link below.',
      codePdfHref: 'https://www.koetter.de/fileadmin/user_upload/Dokumente_Einkauf/Verhaltenskodex_KOETTER.pdf',
      codePdfLabel: 'Code of Conduct (PDF, German)',
    },
    complianceLksgPage: {
      eyebrowMuted: 'For fair cooperation',
      title: 'Compliance & LkSG',
      heroP1:
        'At suhaili Service, management and teams commit to complying with applicable law and working fairly with clients, suppliers, and partners — supported by clear internal rules and accountable responsibilities.',
      heroP2:
        'We take seriously any indications of breaches of law, collective-bargaining provisions, equal treatment rules, or expectations anchored in our Code of Conduct — and route them through defined review and escalation paths.',
      heroImage: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490347/suhail-services/compliance-hero-integrity.png',
      splitComplianceHeading: 'Compliance',
      splitComplianceBody:
        'Compliance is more than paperwork for us: it aligns statutory duties, contractual commitments, and respectful dealings between everyone involved. Where edge cases arise, we clarify responsibilities and document coherent next steps.',
      adviceHeading: 'Compliance contacts & reporting routes',
      adviceBody:
        'Qualified contacts are available for compliance-related questions — internally as well as for business partners where master agreements and data-protection arrangements permit proactive exchanges.',
      adviceContactNote:
        'Specific names, availability windows, and escalation routes are coordinated per organisational unit or project and documented wherever audits expect traceability.',
      adviceContactLinkLabel: 'Go to contact',
      whistleHeading: 'Whistleblower portal',
      whistleBody:
        'Would you like to submit information about possible breaches of laws or regulations? You can use the whistleblower portal linked below — including anonymously where the workflow permits. Privacy notices apply as described there.',
      whistleHref: 'https://sicher-melden.de/whistle/#/mainpage/KScase/k_tter_gmbh_co_kg_verwaltungsdienstleistungen',
      whistleLinkLabel: 'Open whistleblower portal',
      lksgHeading: 'Supply Chain Due Diligence Act (LkSG)',
      lksgP1:
        'Germany\'s Supply Chain Due Diligence Act (LkSG) obligates covered enterprises to implement human-rights and selected environmental due diligence — spanning risk analysis, preventive measures, and remediation across certain parts of their own operations and direct contractual upstream stages.',
      lksgP2:
        'We organise information flows, screening cadence, and escalation such that risks surface early — sized appropriately to programme footprint and realistic leverage across supply tiers.',
      statementHeading: 'Statement of Principles — Human Rights',
      statementBody:
        'As a nationwide organisation we recognise responsibility for partners, employees, society, and environment — expressed alongside documented commitments on protecting human rights, complementary to our Code of Conduct.',
      statementPdfIntro: 'The full statement of principles in German:',
      statementPdfHref: 'https://www.koetter.de/fileadmin/user_upload/Dokumente_Einkauf/KOETTER_Grundsatzerklaerung_Menschenrechte_06.03.2024.pdf',
      statementPdfLabel: 'Statement of principles (PDF, German)',
      reportsHeading: 'LkSG reports',
      reportsIntro:
        'Below are selected PDF reports documenting measures and risk management — publication dates inside each file.',
      report2023Href: 'https://www.koetter.de/fileadmin/user_upload/Dokumente_Einkauf/Bericht_KOETTER_-_Lieferkettensorgfaltspflichtengesetz_2023_03-2024.pdf',
      report2023Label: 'Report on the Supply Chain Due Diligence Act (LkSG) — 2023',
      report2024Href: 'https://www.koetter.de/fileadmin/user_upload/Dokumente_Einkauf/Bericht_KOETTER_-_Lieferkettensorgfaltspflichtengesetz_2024_12-2024.pdf',
      report2024Label: 'Report on the Supply Chain Due Diligence Act (LkSG) — 2024',
      supplierHeading: 'Code of Conduct for Suppliers and Subcontractors',
      supplierBody:
        'Our supplier and subcontractor code anchors contractual expectations around human rights, occupational safety, and environmental diligence wherever procurement scopes demand explicit safeguards.',
      supplierPdfIntro: 'The complete supplier code in German:',
      supplierPdfHref: 'https://www.koetter.de/fileadmin/user_upload/Dokumente_Einkauf/Lieferantenkodex_KOETTER_3538_05.03.2024.pdf',
      supplierPdfLabel: 'Supplier code (PDF, German)',
    },
    associationWorkPage: {
      eyebrowMuted: 'Association work',
      title: 'Association Work',
      heroP1:
        'High-calibre service extends beyond our own organisation — which is why suhaili Service participates in national and international associations: to share experience, evolve recognised standards, and strengthen vocational pathways sustainably.',
      heroP2:
        'Through that network we contribute to professional orientation across our sectors — guided by dependable quality and service standards.',
      heroImage: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490344/suhail-services/association-work-hero.png',
      engagementImage: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490341/suhail-services/association-work-engagement.png',
      engagementHeading: 'Engagement',
      engagementBody:
        'Membership and participation — including forums such as the International Security League or the Federal Association of the Security Industry (BDSW) — underpin continuous global dialogue on trends and benchmarks.',
      internationalHeading: 'International association work',
      internationalItems: [
        { title: 'ASSA-I Aviation Security Services Association International (Brussels, Belgium)', body: 'An alliance of leading European airport-security organisations promoting benchmark-quality frameworks for training and continuing education.' },
        { title: 'International Security League (Zollikofen, Switzerland)', body: 'A worldwide network of private security firms fostering sustained professionalism and ethical conduct across markets.' },
      ],
      nationalHeading: 'National association work',
      nationalLines: [
        'ASW — Allianz für Sicherheit in der Wirtschaft (regional chapters)',
        'Bundesverband der Träger beruflicher Bildung e. V.',
        'BDLS — Bundesverband der Luftsicherheitsunternehmen e.V. (Bad Homburg)',
        'BDSW — Bundesverband der Sicherheitswirtschaft e.V. (Bad Homburg)',
        'BHE — Bundesverband der Hersteller- und Errichterfirmen von Sicherheitssystemen (Brücken)',
        'Bundesinnungsverband des Gebäudereinigerhandwerks (Bonn)',
        'EUV — Essener Unternehmensverband e. V. (Essen)',
        'Förderkreis der Deutschen Industrie e.V. (Berlin)',
        'GEFMA — Deutscher Verband für Facility Management e.V. (Bonn)',
        'Gesamtverband der Personaldienstleister (Berlin)',
        'Industrie- und Handelskammer für Essen, Mülheim an der Ruhr und Oberhausen (Essen)',
        'ILS — Verband Instore und Logistik Services e. V. (Berlin)',
        'Initiativkreis Ruhr GmbH (Essen)',
        'muTiger-Stiftung',
        'Stiftung Familienunternehmen (München)',
        'VdS Schadenverhütung GmbH (Köln)',
        'vfdb — Vereinigung zur Förderung des Deutschen Brandschutzes e.V. (Altenberge)',
        'WIFU — Stiftung Wittener Institut für Familienunternehmen (Witten)',
        'ZVEI — Zentralverband Elektrotechnik- und Elektroindustrie e.V. (Frankfurt am Main)',
        'BDSV Ausstellungen e.V.',
      ],
    },
    csrPage: {
      eyebrowMuted: 'CSR / ESG',
      title: 'CSR / ESG',
      introP1:
        'As a nationwide organisation with decades of experience and thousands of colleagues, we carry responsibility — for clients, teams, society, and the environment.',
      introP2:
        'We embrace that duty deliberately. Sustainable operations underpin the economic, ecological, and social foundations we want to leave for future generations.',
      heroImage: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490363/suhail-services/csr-hero-forest.png',
      economicHeading: 'Economic sustainability',
      economicBullets: [
        'Owner-led governance without short-term external return pressure — strategic choices follow a resilient, long-term horizon.',
        'Financial independence lets us adapt when markets or programmes shift, without losing our compass.',
        'Reliable partnerships with clients, employees, and suppliers matter most — even through economic cycles.',
        'Enduring collaboration beats opportunistic one-offs that sacrifice continuity.',
      ],
      reportTitle: 'Our CSR report',
      reportBody: 'We report regularly on our CSR activities. For further information please contact us.',
      reportLinkContactLabel: 'Request CSR report',
      reportLinkContactHref: '/contact',
      ecologicalHeading: 'Ecological sustainability',
      ecologicalIntro:
        'Passing on an intact environment is part of how we see ourselves. Measures include:',
      ecologicalImage: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490351/suhail-services/csr-ecological-photo.png',
      ecologicalBullets: [
        'Training and awareness for environmentally sound behaviour — on site for clients and in our own workplaces.',
        'Promoting alternative drivetrains where it fits, and expanding charging infrastructure gradually at selected locations.',
        'Preferring renewable electricity and tracking sourcing against clear targets.',
        'Digital alternatives to postal paper flows wherever processes allow and privacy rules permit.',
        'Environmentally considerate cleaning agents and supplies agreed with clients and suppliers.',
        'Regular review of services, equipment, and consumables for environmental impact.',
        'Embedding environmental criteria in internal audits and improvement cycles.',
      ],
      socialHeading: 'Social sustainability',
      socialBody:
        'For decades we have supported social and charitable initiatives as well as regional cultural institutions and sports clubs. We do this with the conviction that our funding serves the common good — and gives many people the chance to achieve personal goals and realise their hopes.',
      muTigerSpotlightTitle: 'muTiger Foundation',
      muTigerSpotlightBody:
        'We take social responsibility seriously — within our group and in society. That is why the muTiger Foundation for civic courage was founded in 2011 together with the Rhine-Ruhr Transport Association (VRR). Our shared aim is to promote helpfulness and civic courage. In more than 1,000 training sessions, around 18,000 participants have learned how to behave safely in critical situations and help others without putting themselves at risk. As a matter of course, all trainees from North Rhine-Westphalia take part in the foundation\'s course in their first year of apprenticeship.',
      joblingeSpotlightTitle: 'JOBLINGE initiative',
      joblingeSpotlightBody:
        'We create opportunities — which is why we have supported the JOBLINGE initiative for several years. It gives young people with difficult starting conditions a second chance to enter working life. The "JOBLINGE Compass" programme also supports the integration of young refugees. We back this non-profit strategically, financially, and in practice. Management representatives serve on the supervisory board of Joblinge gAG Ruhr. JOBLINGE and JOBLINGE Compass have already successfully recruited trainees for partner organisations.',
      essenMedicineSpotlightTitle: 'Essen University Medicine Foundation',
      essenMedicineSpotlightBody:
        'Thinking ahead responsibly — that is why the Essen University Medicine Foundation matters to us. It funds projects at Essen University Hospital and the University of Duisburg-Essen that go beyond basic care: innovative research, excellent training for future physicians, and continuously improving patient care. Our company supports this work through long-standing engagement with the foundation\'s programmes and governance.',
      closing: 'CSR is an ongoing process for us. We are committed to continuously improving our measures and reporting on them transparently.',
    },
    otherCompaniesPage: {
      eyebrowMuted: 'Other companies',
      title: 'Other Companies & Investments',
      heroP1: 'As a corporate group, we operate across various segments of the security and services industry.',
      heroP2: 'Each company operates with its own leadership and identity — embedded in the group\'s shared values and standards.',
      heroImage: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490547/suhail-services/other-companies-hero.png',
      activeBrandsHeading: 'Active brands',
      activeBrands: [
        { slug: 'osd-schaefer', name: 'OSD SCHÄFER', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490401/suhail-services/other-companies/osd-schaefer.webp', body: 'Founded in 1979, OSD SCHÄFER GmbH & Co. KG (headquartered in Karlsruhe) has been a wholly owned subsidiary of the KÖTTER Group since 2014. In addition to traditional security services, OSD SCHÄFER specializes in securing critical infrastructures, especially nuclear facilities and installations.' },
        { slug: 'gbp', name: 'German Business Protection', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/v1777490397/suhail-services/other-companies/german-business-protection.webp', body: 'German Business Protection (GBP) was founded in Berlin by the KÖTTER Group in 2012. GBP offers companies, administrations, non-governmental organizations (NGOs), and private clients consulting services as an integrated risk management solution with a focus on security and compliance.' },
        { slug: 'terapon', name: 'TERAPON', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/terapon.jpg', body: 'TERAPON Consulting GmbH was founded in 2007 by the KÖTTER Group in Essen and specializes in efficient health management. This includes rapid, nationwide, and sustainable support for traumatized or otherwise mentally distressed individuals.' },
        { slug: 'medgravity', name: 'MedGravity', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/medgravity.png', body: 'To January 1, 2023, the KÖTTER Group acquired all shares in Hanover-based MedGravity. MedGravity specializes in the training and continuing education of first responders, as well as company, rescue, and emergency paramedics, thus ideally complementing the offerings of the KÖTTER Academy.' },
        { slug: 'stuk', name: 'STuK Sicherheitstechnik', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/stuk.png', body: 'With effect from January 1, 2025, the KÖTTER Group has acquired the northern German company STuK Sicherheitstechnik GmbH. This strategic move allows us to further strengthen and expand our expertise in security technology and technical fire protection.' },
      ],
      portfolioBrands: [],
      integratedBrandsHeading: 'Integrated brands',
      integratedBrands: [
        { slug: 'wako', name: 'WAKO Group', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/wako.png', body: 'The Stade-based WAKO Group, with all its subsidiaries, has been a wholly owned subsidiary of the KÖTTER Group since 2024. With the rebranding in 2026, the company was fully integrated into the existing entities of the KÖTTER Group.' },
        { slug: 'arndt', name: 'ARNDT-Group', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/arndt.jpg', body: 'The ARNDT Group, headquartered in Fürth, was founded in Nuremberg in 1925 and has been a fully owned subsidiary of the KÖTTER Group since 2018. In 1992, ARNDT was the first security company in Germany certified according to DIN ISO 9000 ff. In 2022, it was merged with the existing companies of the KÖTTER Security Group.' },
        { slug: 'ise', name: 'I.S.E. Alarm-Service Berlin GmbH', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/ise-alarm.webp', body: 'I.S.E. Alarm-Service Berlin GmbH was founded in the capital in 2002 and specializes in alarm tracking, intervention services, elevator rescue, and patrol services. In 2019, I.S.E. Alarm-Service Berlin GmbH was acquired by KÖTTER Security (Berlin) and merged with it in 2022.' },
        { slug: 'inter', name: 'INTER Group', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/intergruppe.webp', body: 'Founded in 1976, the INTER Group (with the divisions INTERSCHUTZ, INTERCLEAN, and INTERSERVICE) with headquarters in Bonn was acquired by the KÖTTER Group in 2011. With the name change in 2013, the company was fully integrated into the existing companies of the KÖTTER Group.' },
        { slug: 'wsp', name: 'Wachschutz Paderborn', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/wachschutz.webp', body: 'Founded in 1968 and operating primarily in East Westphalia, the Paderborn security company joined the KÖTTER Group in 2008. Since 2009, the company has operated as KÖTTER Security GmbH.' },
        { slug: 'gsw', name: 'GSW Sicherheit und Werkschutz', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/gswsicherheit.jpg', body: '"GSW Sicherheit und Werkschutz GmbH" was founded in Saarbrücken in 1999 and joined the KÖTTER Group in 2008. With the name change in 2011, the company was fully integrated into a KÖTTER Group company.' },
        { slug: 'buerder', name: 'Wachdienst Bürder', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/burder.jpg', body: 'Founded in 1964 in the Ruhr region, the Bürder security service joined the KÖTTER Group in 2006. The company\'s name was changed in 2008, thus completing its integration into the KÖTTER Group.' },
        { slug: 'abakus', name: 'ABAKUS Personalüberlassung', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/abakus.webp', body: 'ABAKUS Personalüberlassung GmbH, founded in 1993 and based in Cologne, was acquired by KÖTTER Personal Service in 2005. The company\'s integration into the KÖTTER Group was completed with the name change in 2007.' },
        { slug: 'control', name: 'Control Risk Management', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/control-risk-management.jpg', body: 'Control Risk Management GmbH, founded in northern Germany, has been part of the KÖTTER Group since the beginning of 2005.' },
        { slug: 'bielefelder', name: 'Bielefelder Heimschutz', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/bielefelder-heimschutz.png', body: 'Bielefeld Home Protection was founded in 1933 and acquired by the KÖTTER Group in 2004. In 2007, the company was renamed KÖTTER Security GmbH.' },
        { slug: 'duesseldorfer', name: 'Düsseldorfer Wach- und Schließgesellschaft', logo: 'https://res.cloudinary.com/dfc0qnh88/image/upload/suhail-services/images/other-companies/duesseldorfer-crop.webp', body: 'The Düsseldorf-based security and locking company, founded in 1903, was acquired by the KÖTTER Group in 1995. With the name change in August 2009, it was fully integrated into an existing company of the KÖTTER Group.' },
      ],
    },
  },
}

export default translations
