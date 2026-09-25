export const packages = [
  {
    key: 'shell',
    name: 'The Canvas Package',
    description: `The Canvas gives you a beautifully structured home, ready to be shaped around your personal taste. Each elevated three-bedroom, 185 sqm apartment or penthouse includes a maid's room, four bathrooms, five toilets, living and dining areas, a kitchen, pantry, guest toilet and dedicated parking.`,
  },
  {
    key: 'standard',
    name: 'The Complete Package',
    description: `The Complete is a thoughtfully finished, move-in-ready home with refined kitchens, wardrobes, doors and electrical systems already in place.`,
  },
  {
    key: 'supreme',
    name: 'The Prestige Package',
    description: `The Prestige is our signature expression of elevated living, pairing sophisticated finishes with advanced energy systems and exceptional lifestyle upgrades.`,
  },
];

export const PACKAGE_NAME = {
  SHELL: packages[0].name,
  STANDARD: packages[1].name,
  SUPREME: packages[2].name,
};

const PACKAGE_DISPLAY_NAMES = {
  shell: 'The Canvas',
  'the canvas': 'The Canvas',
  standard: 'The Complete',
  finished: 'The Complete',
  'the complete': 'The Complete',
  supreme: 'The Prestige',
  grand: 'The Prestige',
  'the prestige': 'The Prestige',
};

export const getPackageDisplayName = (packageName = 'shell') => {
  const normalizedName = String(packageName)
    .trim()
    .toLowerCase()
    .replace(/\s+package$/, '');

  return PACKAGE_DISPLAY_NAMES[normalizedName] || packageName;
};
