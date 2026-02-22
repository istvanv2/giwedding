import type { Locale } from "./config"

export interface Dictionary {
  nav: { home: string; schedule: string; qa: string; confirm: string }
  hero: {
    preTitle: string
    bride: string
    groom: string
    date: string
    location: string
    scrollMore: string
  }
  family: {
    intro: string
    and: string
    parentsLabel: string
    godparentsLabel: string
    godparentsIntro: string
    brideParents: string
    groomParents: string
    godparents: string
  }
  countdown: { days: string; hours: string; min: string; sec: string }
  events: {
    sectionLabel: string
    sectionTitle: string
    sectionDate: string
    ceremony: {
      title: string
      time: string
      description: string
      location: string
      address: string
    }
    celebration: {
      title: string
      time: string
      description: string
      location: string
      address: string
    }
    directions: string
    addCalendar: string
  }
  qa: {
    sectionLabel: string
    sectionTitle: string
    sectionDescription: string
    questions: { question: string; answer: string }[]
  }
  rsvp: {
    sectionLabel: string
    sectionTitle: string
    sectionDescription: string
    steps: {
      yourName: string
      namePlaceholder: string
      guests: string
      guestsDescription: string
      addGuest: string
      removeGuest: string
      guestNamePlaceholder: string
      attendance: string
      attendanceDescription: string
      attendYes: string
      attendNo: string
      accommodation: string
      accommodationDescription: string
      accommodationYes: string
      accommodationNo: string
      accommodationDetails: string
      accommodationPlaceholder: string
      menu: string
      menuDescription: string
      menuClassic: string
      menuVegetarian: string
      contact: string
      contactDescription: string
      emailLabel: string
      emailPlaceholder: string
      phoneLabel: string
      phonePlaceholder: string
      atLeastOne: string
      invalidEmail: string
      invalidPhone: string
      messageLabel: string
      messagePlaceholder: string
    }
    next: string
    back: string
    submit: string
    thankYou: string
    thankYouMessage: string
  }
  footer: { names: string; date: string; madeWith: string }
}

const ro: Dictionary = {
  nav: { home: "Acasă", schedule: "Programul", qa: "Q&A", confirm: "Confirmă" },
  hero: {
    preTitle: "Avem bucuria de a v\u0103 invita la celebrarea c\u0103s\u0103toriei noastre.",
    bride: "Giorgia",
    groom: "Istv\u00e1n",
    date: "S\u00e2mb\u0103t\u0103, 11 Iulie 2026",
    location: "T\u00e2rgu Mure\u0219, Jude\u021bul Mure\u0219",
    scrollMore: "Descoper\u0103 mai mult",
  },
  family: {
    intro: "Am hot\u0103r\u00e2t s\u0103 ne \u00eencepem propria poveste, pe care ne-o dorim plin\u0103 de soare \u0219i fericire, \u00een data de 11 iulie 2026, al\u0103turi de dragii no\u0219tri p\u0103rin\u021bi:",
    and: "\u0219i",
    parentsLabel: "P\u0103rin\u021bii no\u0219tri",
    godparentsLabel: "Na\u0219ii",
    godparentsIntro: "Pa\u0219ii vie\u021bii noastre vor fi c\u0103l\u0103uzi\u021bi de cei care au acceptat cu bucurie s\u0103 ne fie na\u0219i:",
    brideParents: "Alina & Cristian Boeriu",
    groomParents: "\u00c9va & Istv\u00e1n So\u00f3s",
    godparents: "Marina Zanfir & Mihai Rozsa",
  },
  countdown: { days: "Zile", hours: "Ore", min: "Min", sec: "Sec" },
  events: {
    sectionLabel: "Programul zilei",
    sectionTitle: "Ziua în care spunem \u201eDA\u201d",
    sectionDate: "Sâmbătă, 11 Iulie 2026",
    ceremony: {
      title: "Ceremonia religioasă",
      time: "1:00 PM",
      description: "Cu emoție și recunoștință, vom pași în fața altarului Bisericii Cetății din Târgu Mureș pentru a ne uni sufletele.",
      location: "Biserica Reformată din Cetate",
      address: "Piața Bernády György, Târgu Mureș, România",
    },
    celebration: {
      title: "Primirea invita\u021bilor",
      time: "2:00 PM",
      description: "Vom continua aceast\u0103 zi special\u0103 la Hotel Privo, unde v\u0103 invit\u0103m s\u0103 petrecem \u00eempreun\u0103 momente de neuitat.",
      location: "Hotel Privo",
      address: "Strada Gheorghe Doja, Târgu Mureș, România",
    },
    directions: "Indicații",
    addCalendar: "Adaugă în calendar",
  },
  qa: {
    sectionLabel: "Întrebări frecvente",
    sectionTitle: "Q&A",
    sectionDescription: "Pentru toți cei care au curiozități sau întrebări, am pregătit această secțiune special pentru voi.",
    questions: [
      { question: "C\u00e2nd ar trebui s\u0103 confirm?", answer: "Pentru o bun\u0103 organizare, v\u0103 rug\u0103m s\u0103 ne confirma\u021bi prezen\u021ba dumneavoastr\u0103 p\u00e2n\u0103 la data de 12 iunie 2026.\n\nConfirmarea se poate realiza prin completarea formularului de mai jos, telefonic sau prin mesaj." },
      { question: "A\u021bi preg\u0103tit op\u021biuni de cazare?", answer: "Asigur\u0103m cazare pentru noaptea evenimentului, iar dac\u0103 ave\u021bi nevoie, v\u0103 rug\u0103m s\u0103 ne anun\u021ba\u021bi \u00een formular pentru a putea organiza totul din timp." },
      { question: "Am o \u00eentrebare care nu este aici. Ce fac?", answer: "Pentru orice nel\u0103murire, ne pute\u021bi contacta oric\u00e2nd.\n\nGiorgia \u2013 0726 220 515\nIstv\u00e1n \u2013 0770 105 639\n\nV\u0103 vom r\u0103spunde cu drag, prin mesaj, apel sau WhatsApp." },
    ],
  },
  rsvp: {
    sectionLabel: "Confirmă prezența",
    sectionTitle: "Confirmă acum",
    sectionDescription: "Vă rugăm să ne transmiteți confirmarea prezenței până la 12 iunie 2026.",
    steps: {
      yourName: "Cum vă numiți?",
      namePlaceholder: "Introduceți numele dvs. complet",
      guests: "Persoane însoțitoare",
      guestsDescription: "Adăugați persoanele care vă vor însoți.",
      addGuest: "Adaugă persoană",
      removeGuest: "Elimină",
      guestNamePlaceholder: "Numele complet al persoanei",
      attendance: "Veți participa?",
      attendanceDescription: "Alegeți pentru fiecare persoană dacă va participa.",
      attendYes: "Da, cu bucurie!",
      attendNo: "Din păcate, nu",
      accommodation: "Aveți nevoie de cazare?",
      accommodationDescription: "",
      accommodationYes: "Da, avem nevoie",
      accommodationNo: "Nu, mulțumim",
      accommodationDetails: "Detalii cazare",
      accommodationPlaceholder: "Ex: 2 nopți, 10-12 iulie...",
      menu: "Ce preferințe culinare aveți?",
      menuDescription: "Alegeți meniul preferat pentru fiecare persoană.",
      menuClassic: "Meniu clasic",
      menuVegetarian: "Meniu vegetarian",
      contact: "Cum vă putem contacta?",
      contactDescription: "Completați cel puțin un câmp de contact.",
      emailLabel: "Email",
      emailPlaceholder: "adresa@email.com",
      phoneLabel: "Telefon",
      phonePlaceholder: "+40 712 345 678",
      atLeastOne: "Cel pu\u021bin un c\u00e2mp de contact este obligatoriu.",
      invalidEmail: "Format de email invalid.",
      invalidPhone: "Format de telefon invalid.",
      messageLabel: "Un gând pentru noi (opțional)",
      messagePlaceholder: "Un mesaj frumos...",
    },
    next: "Continuă",
    back: "Înapoi",
    submit: "Trimite confirmarea",
    thankYou: "Mulțumim!",
    thankYouMessage: "Am primit confirmarea ta. Abia așteptăm să ne vedem pe 11 Iulie 2026!",
  },
  footer: { names: "Giorgia & Istv\u00e1n", date: "11 Iulie 2026", madeWith: "Cu drag," },
}

const hu: Dictionary = {
  nav: { home: "Főoldal", schedule: "Program", qa: "Kérdések", confirm: "Visszajelzés" },
  hero: {
    preTitle: "\u00d6r\u00f6mmel megh\u00edvunk h\u00e1zass\u00e1gk\u00f6t\u00e9s\u00fcnk \u00fcnnep\u00e9re.",
    bride: "Giorgia",
    groom: "Istv\u00e1n",
    date: "2026. július 11., szombat",
    location: "Marosvásárhely, Maros megye",
    scrollMore: "Tov\u00e1bb",
  },
  family: {
    intro: "\u00dagy d\u00f6nt\u00f6tt\u00fcnk, hogy elind\u00edtjuk k\u00f6z\u00f6s t\u00f6rt\u00e9net\u00fcnket, amelyet naps\u00fct\u00e9ssel \u00e9s boldogs\u00e1ggal szeretn\u00e9nk megtelt\u00f6lteni, 2026. j\u00falius 11-\u00e9n, szeretett sz\u00fcleink oldal\u00e1n:",
    and: "\u00e9s",
    parentsLabel: "Sz\u00fcleink",
    godparentsLabel: "Keresztsz\u00fcl\u0151k",
    godparentsIntro: "\u00c9let\u00fcnk l\u00e9p\u00e9seit azok fogj\u00e1k vezérelni, akik \u00f6r\u00f6mmel fogadt\u00e1k el, hogy keresztsz\u00fcleink legyenek:",
    brideParents: "Alina & Cristian Boeriu",
    groomParents: "\u00c9va & Istv\u00e1n So\u00f3s",
    godparents: "Marina Zanfir & Mihai Rozsa",
  },
  countdown: { days: "Nap", hours: "\u00d3ra", min: "Perc", sec: "Mp" },
  events: {
    sectionLabel: "A nap programja",
    sectionTitle: "A nap, amikor igent mondunk",
    sectionDate: "2026. július 11., szombat",
    ceremony: {
      title: "Egyházi szertartás",
      time: "13:00",
      description: "Meghatottsággal és hálával lépünk az oltár elé a Marosvásárhelyi Vártemplomban, hogy egybeforrasszuk életünket.",
      location: "Vártemplom",
      address: "Bernády György tér, Marosvásárhely, Románia",
    },
    celebration: {
      title: "Vend\u00e9gek fogad\u00e1sa",
      time: "14:00",
      description: "Ezt a k\u00fcl\u00f6nleges napot a Hotel Priv\u00f3ban folytatjuk, ahov\u00e1 szeretettel v\u00e1runk, hogy egy\u00fctt t\u00f6lts\u00fcnk felejthetetlen pillanatokat.",
      location: "Hotel Privo",
      address: "Gheorghe Doja utca, Marosvásárhely, Románia",
    },
    directions: "Útvonaltervező",
    addCalendar: "Naptárhoz adás",
  },
  qa: {
    sectionLabel: "Gyakori kérdések",
    sectionTitle: "Kérdések és válaszok",
    sectionDescription: "Összegyűjtöttük a leggyakoribb kérdéseket és válaszokat.",
    questions: [
      { question: "Mikorra kell visszajelezni?", answer: "A j\u00f3 szervez\u00e9s \u00e9rdek\u00e9ben k\u00e9rj\u00fck, jelezd r\u00e9szv\u00e9teledet 2026. j\u00fanius 12-ig.\n\nA visszajelz\u00e9st megteheted a lenti \u0171rlap kit\u00f6lt\u00e9s\u00e9vel, telefonon vagy \u00fczenetben." },
      { question: "Van-e sz\u00e1ll\u00e1sfoglal\u00e1si lehet\u0151s\u00e9g?", answer: "Biztos\u00edtunk sz\u00e1ll\u00e1st az esem\u00e9ny \u00e9jszak\u00e1j\u00e1ra, \u00e9s ha sz\u00fcks\u00e9ged van r\u00e1, k\u00e9rj\u00fck jelezd az \u0171rlapon, hogy mindent id\u0151ben megszervezhess\u00fcnk." },
      { question: "Van egy k\u00e9rd\u00e9sem, ami itt nem szerepel.", answer: "B\u00e1rmilyen k\u00e9rd\u00e9ssel keress minket b\u00e1rmikor.\n\nGiorgia \u2013 0726 220 515\nIstv\u00e1n \u2013 0770 105 639\n\nSzeretettel v\u00e1rjuk megkeres\u00e9sedet \u00fczenetben, h\u00edv\u00e1ssal vagy WhatsApp-on." },
    ],
  },
  rsvp: {
    sectionLabel: "Visszajelzés",
    sectionTitle: "Visszajelzés",
    sectionDescription: "Kérjük, jelezd részvételedet 2026. június 12-ig.",
    steps: {
      yourName: "Hogy hívnak?",
      namePlaceholder: "Teljes neved",
      guests: "Kísérők",
      guestsDescription: "Add hozzá a veled érkező személyeket.",
      addGuest: "Személy hozzáadása",
      removeGuest: "Eltávolítás",
      guestNamePlaceholder: "A személy teljes neve",
      attendance: "Részt veszel?",
      attendanceDescription: "Válaszd ki, hogy ki tud részt venni.",
      attendYes: "Igen, örömmel!",
      attendNo: "Sajnos nem tudok",
      accommodation: "Szükségetek van szállásra?",
      accommodationDescription: "",
      accommodationYes: "Igen, szükségünk van",
      accommodationNo: "Nem, köszönjük",
      accommodationDetails: "Szállás részletei",
      accommodationPlaceholder: "Pl.: 2 éjszaka, július 10-12...",
      menu: "Milyen étkezési preferenciáitok vannak?",
      menuDescription: "Válasszátok ki a menüt minden személy számára.",
      menuClassic: "Klasszikus menü",
      menuVegetarian: "Vegetáriánus menü",
      contact: "Hogyan érhetünk el?",
      contactDescription: "Legalább egy elérhetőséget adj meg.",
      emailLabel: "E-mail",
      emailPlaceholder: "email@pelda.hu",
      phoneLabel: "Telefon",
      phonePlaceholder: "+36 30 123 4567",
      atLeastOne: "Legal\u00e1bb egy el\u00e9rhet\u0151s\u00e9g megad\u00e1sa k\u00f6telez\u0151.",
      invalidEmail: "\u00c9rv\u00e9nytelen e-mail form\u00e1tum.",
      invalidPhone: "\u00c9rv\u00e9nytelen telefonsz\u00e1m form\u00e1tum.",
      messageLabel: "Üzenet számunkra (opcionális)",
      messagePlaceholder: "Egy kedves gondolat...",
    },
    next: "Tovább",
    back: "Vissza",
    submit: "Visszajelzés küldése",
    thankYou: "Köszönjük!",
    thankYouMessage: "Megkaptuk a visszajelzésedet. Alig várjuk, hogy találkozzunk 2026. július 11-én!",
  },
  footer: { names: "Giorgia & Istv\u00e1n", date: "2026. j\u00falius 11.", madeWith: "Szeretettel," },
}

const en: Dictionary = {
  nav: { home: "Home", schedule: "Schedule", qa: "Q&A", confirm: "RSVP" },
  hero: {
    preTitle: "We are delighted to invite you to the celebration of our marriage.",
    bride: "Giorgia",
    groom: "Istv\u00e1n",
    date: "Saturday, July 11, 2026",
    location: "T\u00e2rgu Mure\u0219, Romania",
    scrollMore: "Discover more",
  },
  family: {
    intro: "We have decided to begin our own story, one we hope will be filled with sunshine and happiness, on July 11, 2026, alongside our beloved parents:",
    and: "and",
    parentsLabel: "Our parents",
    godparentsLabel: "Godparents",
    godparentsIntro: "Our steps through life will be guided by those who joyfully accepted to be our godparents:",
    brideParents: "Alina & Cristian Boeriu",
    groomParents: "\u00c9va & Istv\u00e1n So\u00f3s",
    godparents: "Marina Zanfir & Mihai Rozsa",
  },
  countdown: { days: "Days", hours: "Hours", min: "Min", sec: "Sec" },
  events: {
    sectionLabel: "The schedule",
    sectionTitle: "The day we say I DO",
    sectionDate: "Saturday, July 11, 2026",
    ceremony: {
      title: "Church ceremony",
      time: "1:00 PM",
      description: "With hearts full of joy, we will exchange our vows at the historic Fortress Church in T\u00e2rgu Mure\u0219.",
      location: "Reformed Fortress Church",
      address: "Pia\u021ba Bern\u00e1dy Gy\u00f6rgy, T\u00e2rgu Mure\u0219, Romania",
    },
    celebration: {
      title: "Guest reception",
      time: "2:00 PM",
      description: "We will continue this special day at Hotel Privo, where we invite you to share unforgettable moments together.",
      location: "Hotel Privo",
      address: "Strada Gheorghe Doja, T\u00e2rgu Mure\u0219, Romania",
    },
    directions: "Get directions",
    addCalendar: "Add to calendar",
  },
  qa: {
    sectionLabel: "Frequently asked questions",
    sectionTitle: "Q&A",
    sectionDescription: "We have gathered answers to the most common questions to help you plan your visit.",
    questions: [
      { question: "When should I RSVP by?", answer: "For proper planning, please confirm your attendance by June 12, 2026.\n\nYou can confirm by filling out the form below, by phone, or by message." },
      { question: "Are there accommodation options?", answer: "We provide accommodation for the night of the event. If you need it, please let us know in the form so we can organize everything in time." },
      { question: "I have a question that is not listed here. What should I do?", answer: "For any questions, feel free to contact us anytime.\n\nGiorgia \u2013 0726 220 515\nIstv\u00e1n \u2013 0770 105 639\n\nWe will be happy to reply by message, call, or WhatsApp." },
    ],
  },
  rsvp: {
    sectionLabel: "Confirm your attendance",
    sectionTitle: "RSVP",
    sectionDescription: "Please let us know if you can join us by June 12, 2026.",
    steps: {
      yourName: "What is your name?",
      namePlaceholder: "Your full name",
      guests: "Additional guests",
      guestsDescription: "Add anyone who will be joining you.",
      addGuest: "Add a guest",
      removeGuest: "Remove",
      guestNamePlaceholder: "Guest's full name",
      attendance: "Will you be attending?",
      attendanceDescription: "Select attendance for each person.",
      attendYes: "Yes, with pleasure!",
      attendNo: "Regretfully, no",
      accommodation: "Do you need accommodation?",
      accommodationDescription: "",
      accommodationYes: "Yes, we do",
      accommodationNo: "No, thank you",
      accommodationDetails: "Accommodation details",
      accommodationPlaceholder: "e.g. 2 nights, July 10\u201312\u2026",
      menu: "Meal preferences",
      menuDescription: "Choose a menu option for each person.",
      menuClassic: "Classic menu",
      menuVegetarian: "Vegetarian menu",
      contact: "How can we reach you?",
      contactDescription: "Please provide at least one form of contact.",
      emailLabel: "Email",
      emailPlaceholder: "your@email.com",
      phoneLabel: "Phone",
      phonePlaceholder: "+40 712 345 678",
      atLeastOne: "At least one contact field is required.",
      invalidEmail: "Invalid email format.",
      invalidPhone: "Invalid phone number format.",
      messageLabel: "A message for us (optional)",
      messagePlaceholder: "A kind word\u2026",
    },
    next: "Continue",
    back: "Back",
    submit: "Send RSVP",
    thankYou: "Thank you!",
    thankYouMessage: "We have received your RSVP. We cannot wait to celebrate with you on July 11, 2026!",
  },
  footer: { names: "Giorgia & Istv\u00e1n", date: "July 11, 2026", madeWith: "With love," },
}

const de: Dictionary = {
  nav: { home: "Start", schedule: "Ablauf", qa: "FAQ", confirm: "R\u00fcckmeldung" },
  hero: {
    preTitle: "Wir freuen uns, euch zur Feier unserer Hochzeit einzuladen.",
    bride: "Giorgia",
    groom: "Istv\u00e1n",
    date: "Samstag, 11. Juli 2026",
    location: "T\u00e2rgu Mure\u0219, Rum\u00e4nien",
    scrollMore: "Mehr entdecken",
  },
  family: {
    intro: "Wir haben uns entschieden, unsere eigene Geschichte zu beginnen, die wir uns voller Sonnenschein und Gl\u00fcck w\u00fcnschen, am 11. Juli 2026, an der Seite unserer geliebten Eltern:",
    and: "und",
    parentsLabel: "Unsere Eltern",
    godparentsLabel: "Trauzeugen",
    godparentsIntro: "Unsere Schritte durchs Leben werden von denen geleitet, die mit Freude angenommen haben, unsere Trauzeugen zu sein:",
    brideParents: "Alina & Cristian Boeriu",
    groomParents: "\u00c9va & Istv\u00e1n So\u00f3s",
    godparents: "Marina Zanfir & Mihai Rozsa",
  },
  countdown: { days: "Tage", hours: "Std", min: "Min", sec: "Sek" },
  events: {
    sectionLabel: "Der Tagesablauf",
    sectionTitle: "Der Tag, an dem wir JA sagen",
    sectionDate: "Samstag, 11. Juli 2026",
    ceremony: {
      title: "Kirchliche Trauung",
      time: "13:00 Uhr",
      description: "Voller Freude und Dankbarkeit treten wir vor den Altar der Burgkirche in T\u00e2rgu Mure\u0219, um uns das Ja-Wort zu geben.",
      location: "Reformierte Burgkirche",
      address: "Pia\u021ba Bern\u00e1dy Gy\u00f6rgy, T\u00e2rgu Mure\u0219, Rum\u00e4nien",
    },
    celebration: {
      title: "G\u00e4steempfang",
      time: "14:00 Uhr",
      description: "Wir setzen diesen besonderen Tag im Hotel Privo fort, wo wir euch einladen, gemeinsam unvergessliche Momente zu erleben.",
      location: "Hotel Privo",
      address: "Strada Gheorghe Doja, T\u00e2rgu Mure\u0219, Rum\u00e4nien",
    },
    directions: "Anfahrt",
    addCalendar: "Zum Kalender hinzuf\u00fcgen",
  },
  qa: {
    sectionLabel: "H\u00e4ufig gestellte Fragen",
    sectionTitle: "FAQ",
    sectionDescription: "Wir haben die h\u00e4ufigsten Fragen und Antworten f\u00fcr euch zusammengestellt.",
    questions: [
      { question: "Bis wann soll ich zusagen?", answer: "F\u00fcr eine gute Organisation bitten wir euch, eure Teilnahme bis zum 12. Juni 2026 zu best\u00e4tigen.\n\nDie Best\u00e4tigung kann \u00fcber das untenstehende Formular, telefonisch oder per Nachricht erfolgen." },
      { question: "Gibt es \u00dcbernachtungsm\u00f6glichkeiten?", answer: "Wir stellen Unterkunft f\u00fcr die Nacht der Veranstaltung bereit. Falls ihr diese ben\u00f6tigt, gebt es bitte im Formular an, damit wir alles rechtzeitig organisieren k\u00f6nnen." },
      { question: "Ich habe eine Frage, die hier nicht aufgef\u00fchrt ist. Was soll ich tun?", answer: "Bei Fragen k\u00f6nnt ihr uns jederzeit kontaktieren.\n\nGiorgia \u2013 0726 220 515\nIstv\u00e1n \u2013 0770 105 639\n\nWir antworten gerne per Nachricht, Anruf oder WhatsApp." },
    ],
  },
  rsvp: {
    sectionLabel: "R\u00fcckmeldung",
    sectionTitle: "R\u00fcckmeldung",
    sectionDescription: "Bitte best\u00e4tigt eure Teilnahme bis zum 12. Juni 2026.",
    steps: {
      yourName: "Wie hei\u00dft ihr?",
      namePlaceholder: "Euer vollst\u00e4ndiger Name",
      guests: "Begleitpersonen",
      guestsDescription: "F\u00fcgt Personen hinzu, die euch begleiten werden.",
      addGuest: "Person hinzuf\u00fcgen",
      removeGuest: "Entfernen",
      guestNamePlaceholder: "Vollst\u00e4ndiger Name der Person",
      attendance: "Werdet ihr teilnehmen?",
      attendanceDescription: "W\u00e4hlt f\u00fcr jede Person, ob sie teilnehmen kann.",
      attendYes: "Ja, sehr gerne!",
      attendNo: "Leider nicht m\u00f6glich",
      accommodation: "Ben\u00f6tigt ihr eine Unterkunft?",
      accommodationDescription: "",
      accommodationYes: "Ja, bitte",
      accommodationNo: "Nein, danke",
      accommodationDetails: "Details zur Unterkunft",
      accommodationPlaceholder: "z.B. 2 N\u00e4chte, 10.\u201312. Juli\u2026",
      menu: "Welche Essensvorlieben habt ihr?",
      menuDescription: "W\u00e4hlt das Men\u00fc f\u00fcr jede Person.",
      menuClassic: "Klassisches Men\u00fc",
      menuVegetarian: "Vegetarisches Men\u00fc",
      contact: "Wie k\u00f6nnen wir euch erreichen?",
      contactDescription: "Bitte gebt mindestens eine Kontaktm\u00f6glichkeit an.",
      emailLabel: "E-Mail",
      emailPlaceholder: "eure@email.de",
      phoneLabel: "Telefon",
      phonePlaceholder: "+49 170 123 4567",
      atLeastOne: "Mindestens ein Kontaktfeld ist erforderlich.",
      invalidEmail: "Ung\u00fcltiges E-Mail-Format.",
      invalidPhone: "Ung\u00fcltiges Telefonnummernformat.",
      messageLabel: "Eine Nachricht an uns (optional)",
      messagePlaceholder: "Ein lieber Gru\u00df\u2026",
    },
    next: "Weiter",
    back: "Zur\u00fcck",
    submit: "R\u00fcckmeldung senden",
    thankYou: "Vielen Dank!",
    thankYouMessage: "Wir haben eure R\u00fcckmeldung erhalten. Wir freuen uns riesig auf den 11. Juli 2026!",
  },
  footer: { names: "Giorgia & Istv\u00e1n", date: "11. Juli 2026", madeWith: "Mit Liebe," },
}

const fr: Dictionary = {
  nav: { home: "Accueil", schedule: "Programme", qa: "FAQ", confirm: "RSVP" },
  hero: {
    preTitle: "Nous avons la joie de vous inviter \u00e0 la c\u00e9l\u00e9bration de notre mariage.",
    bride: "Giorgia",
    groom: "Istv\u00e1n",
    date: "Samedi 11 juillet 2026",
    location: "T\u00e2rgu Mure\u0219, Roumanie",
    scrollMore: "D\u00e9couvrir la suite",
  },
  family: {
    intro: "Nous avons d\u00e9cid\u00e9 de commencer notre propre histoire, que nous esp\u00e9rons remplie de soleil et de bonheur, le 11 juillet 2026, aux c\u00f4t\u00e9s de nos chers parents\u00a0:",
    and: "et",
    parentsLabel: "Nos parents",
    godparentsLabel: "Parrains",
    godparentsIntro: "Nos pas dans la vie seront guid\u00e9s par ceux qui ont accept\u00e9 avec joie d\u0027\u00eatre nos parrains\u00a0:",
    brideParents: "Alina & Cristian Boeriu",
    groomParents: "\u00c9va & Istv\u00e1n So\u00f3s",
    godparents: "Marina Zanfir & Mihai Rozsa",
  },
  countdown: { days: "Jours", hours: "Heures", min: "Min", sec: "Sec" },
  events: {
    sectionLabel: "Le programme de la journ\u00e9e",
    sectionTitle: "Le jour o\u00f9 nous disons OUI",
    sectionDate: "Samedi 11 juillet 2026",
    ceremony: {
      title: "C\u00e9r\u00e9monie religieuse",
      time: "13h00",
      description: "Avec \u00e9motion et gratitude, nous \u00e9changerons nos v\u0153ux devant l\u2019autel de l\u2019\u00c9glise de la Forteresse \u00e0 T\u00e2rgu Mure\u0219.",
      location: "\u00c9glise R\u00e9form\u00e9e de la Forteresse",
      address: "Pia\u021ba Bern\u00e1dy Gy\u00f6rgy, T\u00e2rgu Mure\u0219, Roumanie",
    },
    celebration: {
      title: "Accueil des invit\u00e9s",
      time: "14h00",
      description: "Nous poursuivrons cette journ\u00e9e sp\u00e9ciale \u00e0 l\u2019H\u00f4tel Privo, o\u00f9 nous vous invitons \u00e0 partager ensemble des moments inoubliables.",
      location: "H\u00f4tel Privo",
      address: "Strada Gheorghe Doja, T\u00e2rgu Mure\u0219, Roumanie",
    },
    directions: "Itin\u00e9raire",
    addCalendar: "Ajouter au calendrier",
  },
  qa: {
    sectionLabel: "Questions fr\u00e9quentes",
    sectionTitle: "FAQ",
    sectionDescription: "Nous avons rassembl\u00e9 les r\u00e9ponses aux questions les plus courantes pour vous aider \u00e0 pr\u00e9parer votre venue.",
    questions: [
      { question: "Avant quelle date dois-je confirmer\u00a0?", answer: "Pour une bonne organisation, merci de confirmer votre pr\u00e9sence avant le 12 juin 2026.\n\nLa confirmation peut se faire via le formulaire ci-dessous, par t\u00e9l\u00e9phone ou par message." },
      { question: "Y a-t-il des possibilit\u00e9s d\u2019h\u00e9bergement\u00a0?", answer: "Nous assurons l\u2019h\u00e9bergement pour la nuit de l\u2019\u00e9v\u00e9nement. Si vous en avez besoin, merci de nous le signaler dans le formulaire afin que nous puissions tout organiser \u00e0 temps." },
      { question: "J\u2019ai une question qui n\u2019appara\u00eet pas ici. Que faire\u00a0?", answer: "Pour toute question, n\u2019h\u00e9sitez pas \u00e0 nous contacter \u00e0 tout moment.\n\nGiorgia \u2013 0726 220 515\nIstv\u00e1n \u2013 0770 105 639\n\nNous vous r\u00e9pondrons avec plaisir par message, appel ou WhatsApp." },
    ],
  },
  rsvp: {
    sectionLabel: "Confirmer votre pr\u00e9sence",
    sectionTitle: "RSVP",
    sectionDescription: "Merci de nous faire part de votre pr\u00e9sence avant le 12 juin 2026.",
    steps: {
      yourName: "Comment vous appelez-vous\u00a0?",
      namePlaceholder: "Votre nom complet",
      guests: "Accompagnants",
      guestsDescription: "Ajoutez les personnes qui vous accompagneront.",
      addGuest: "Ajouter une personne",
      removeGuest: "Supprimer",
      guestNamePlaceholder: "Nom complet de la personne",
      attendance: "Serez-vous pr\u00e9sent(e)\u00a0?",
      attendanceDescription: "Indiquez la pr\u00e9sence de chaque personne.",
      attendYes: "Oui, avec joie\u00a0!",
      attendNo: "Malheureusement, non",
      accommodation: "Avez-vous besoin d\u2019un h\u00e9bergement\u00a0?",
      accommodationDescription: "",
      accommodationYes: "Oui, s\u2019il vous pla\u00eet",
      accommodationNo: "Non, merci",
      accommodationDetails: "D\u00e9tails de l\u2019h\u00e9bergement",
      accommodationPlaceholder: "Ex.\u00a0: 2 nuits, 10\u201312 juillet\u2026",
      menu: "Quelles sont vos pr\u00e9f\u00e9rences culinaires\u00a0?",
      menuDescription: "Choisissez le menu pour chaque personne.",
      menuClassic: "Menu classique",
      menuVegetarian: "Menu v\u00e9g\u00e9tarien",
      contact: "Comment vous joindre\u00a0?",
      contactDescription: "Veuillez renseigner au moins un moyen de contact.",
      emailLabel: "E-mail",
      emailPlaceholder: "votre@email.fr",
      phoneLabel: "T\u00e9l\u00e9phone",
      phonePlaceholder: "+33 6 12 34 56 78",
      atLeastOne: "Au moins un champ de contact est obligatoire.",
      invalidEmail: "Format d\u0027e-mail invalide.",
      invalidPhone: "Format de num\u00e9ro de t\u00e9l\u00e9phone invalide.",
      messageLabel: "Un mot pour nous (optionnel)",
      messagePlaceholder: "Une pens\u00e9e pour les mari\u00e9s\u2026",
    },
    next: "Continuer",
    back: "Retour",
    submit: "Envoyer la confirmation",
    thankYou: "Merci\u00a0!",
    thankYouMessage: "Nous avons bien re\u00e7u votre r\u00e9ponse. Nous avons h\u00e2te de c\u00e9l\u00e9brer avec vous le 11 juillet 2026\u00a0!",
  },
  footer: { names: "Giorgia & Istv\u00e1n", date: "11 juillet 2026", madeWith: "Avec amour," },
}

const dictionaries: Record<Locale, Dictionary> = { ro, hu, en, de, fr }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.ro
}
