export const navLinks = [
  { title: "Aktualności", url: "/aktualnosci" },
  {
    title: "Seniorzy",
    url: "/seniorzy",
    items: [{ title: "Skład", url: "/seniorzy/sklad" }],
  },
  {
    title: "Szkółka Piłkarska „Młoda Gdovia”",
    url: "/mloda-gdovia",
    items: [
      {
        title: "Dla rodziców",
        url: "/mloda-gdovia/dla-rodzicow",
        items: [
          { title: "Nabór", url: "/mloda-gdovia/dla-rodzicow/nabor" },
          { title: "Opłaty", url: "/mloda-gdovia/dla-rodzicow/oplaty" },
          {
            title: "Dokumenty",
            url: "/mloda-gdovia/dla-rodzicow/dokumenty",
            items: [
              {
                title: "Standardy Ochrony Małoletnich",
                url: "/mloda-gdovia/dla-rodzicow/dokumenty/standardy-ochrony-maloletnich",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Multimedia",
    url: "/multimedia",
    items: [
      { title: "Galeria", url: "/multimedia/galeria" },
      { title: "Pliki do pobrania", url: "/multimedia/pliki-do-pobrania" },
      { title: "Przydatne linki", url: "/multimedia/przydatne-linki" },
    ],
  },
  { title: "100 lat Gdovii", url: "/100-lat-gdovii" },
  { title: "Kontakt", url: "/kontakt" },
];
