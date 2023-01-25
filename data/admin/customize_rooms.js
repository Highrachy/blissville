export const CUSTOMIZE_OPTIONS = {
  FLOORING: {
    name: 'Flooring',
    slug: 'flooring',
    description: `Choose the perfect flooring for your new home with our wide selection of options. From tile to wood, carpet to vinyl, you'll be able to find the material that best fits your personal style, budget, and the intended use of each room.`,
    note: `We would get in touch with you for the actual tile design selection`,
    images: [
      { name: 'Nigerian Tiles', price: 0, image: '1' },
      { name: 'Chinese Tiles', price: 0, image: '4' },
      { name: 'Spanish Tiles', price: 40_000, image: '3' },
      { name: 'Epoxy Floor', price: 50_000, image: '5', premium: true },
    ],
  },
  POP: {
    name: 'POP',
    slug: 'pop',
    description: `POP or Plaster of Paris is a commonly used material used to make false ceiling, accent decors and wall trims. This lightweight and heat-resistant material is mixed at the site and makes for a stunning POP design for ceilings.`,
    note: `We would get in touch with you for the actual POP Design selection`,
    images: [
      // { name: 'Square Wonder', price: 0, image: '1' },
      { name: 'Plain Design', price: 0, image: '1' },
      { name: 'Simple Design', price: 0, image: '3' },
      { name: 'Royal Design', price: 20_000, image: '4' },
      { name: 'Premium Design', price: 30_000, image: '5', premium: true },
    ],
  },
  WALL_PAINT: {
    name: 'Wall Paint',
    slug: 'paint',
    description: `Add a splash of color to your new home with a wide range of wall paint options. From bold hues to subtle shades, you'll be able to find the perfect tone to suit your personal style and the atmosphere of each room. `,
    note: `We would get in touch with you for the actual color selection`,
    images: [
      { name: 'Emulsion', price: 0, image: '1' },
      { name: 'Textcoat', price: 0, image: '4' },
      { name: 'Satin', price: 40_000, image: '3', premium: true },
      { name: 'Silk', price: 40_000, image: '2', premium: true },
    ],
  },
  WALL_TILES: {
    name: 'Wall Tiles',
    slug: 'wall-tiles',
    description: `Add a stylish and durable finishing touch to your home with a variety of wall tile options. From ceramic to stone, you'll be able to find the perfect material and design to suit your personal style and the atmosphere of each room.`,
    note: `We would get in touch with you for the actual Wall Tiles design selection`,
    images: [
      { name: 'Nigerian Tiles', price: 0, image: '1' },
      { name: 'Chinese Tiles', price: 0, image: '2' },
      { name: 'Italian Tiles', price: 20_000, image: '3' },
      { name: 'Spanish Tiles', price: 30_000, image: '4', premium: true },
    ],
  },
  TOILETS: {
    name: 'Toilets',
    slug: 'toilets',
    description: `This plumbing fixture is essential for the disposal of human waste, and it is important to consider factors such as accessibility and privacy when deciding on its location.  `,
    images: [
      { name: 'Normal WC', price: 0, image: '1' },
      { name: 'Round Bowl WC', price: 0, image: '2' },
      { name: 'Square Bowl WC', price: 0, image: '3' },
      { name: 'Two Piece WC', price: 220_000, image: '4' },
      { name: 'Wall Hung WC', price: 220_000, image: '5' },
    ],
  },
  KITCHEN_SINKS: {
    name: 'Kitchen Sinks',
    slug: 'kitchen-sinks',
    description: `A sink is a bowl-shaped plumbing fixture used for washing hands, dishwashing, and other purposes. It is installed with either a drainboard, a drainpipe with a stopper, a faucet with a spray nozzle, or a combination of these.`,
    images: [
      { name: 'Sink Mixer Tap Flexible', price: 0, image: '1' },
      {
        name: 'Chrome Waterfilter Taps',
        image: '3',
      },
      { name: 'Flexible Kitchen Tap', price: 60_000, image: '2' },
      { name: 'Modern Square Tap', price: 120_000, image: '4', premium: true },
    ],
  },
  BATHROOM_SINKS: {
    name: 'Bathroom Sinks',
    slug: 'bathroom-sinks',
    description: `A sink is a bowl-shaped plumbing fixture used for washing hands, dishwashing, and other purposes. It is installed with either a drainboard, a drainpipe with a stopper, a faucet with a spray nozzle, or a combination of these.`,
    images: [
      { name: 'Corner Wall Mount', price: 0, image: '1' },
      { name: 'Simple Sink', price: 0, image: '2' },
      { name: 'Round Artistic', price: 0, image: '3' },
      {
        name: 'Floating Bathroom Vanity',
        price: 100_000,
        image: '4',
        premium: true,
      },
      {
        name: 'Double Vanity',
        price: 250_000,
        image: '5',
        premium: true,
      },
    ],
  },
  SHOWER: {
    name: 'Shower',
    slug: 'shower',
    description: `A shower is a place where a person bathes under a spray of typically warm or hot water. Most showers have temperature, spray pressure, and spray head or nozzle controls.`,
    images: [
      { name: 'Normal Shower', price: 0, image: '1' },
      { name: 'Power Shower', price: 0, image: '2' },
      { name: 'Power Shower with Niche', price: 0, image: '3' },
      { name: 'Rainfall Shower', price: 0, image: '4' },
    ],
  },
};

const OPTIONS = {
  ROOM: [
    CUSTOMIZE_OPTIONS.FLOORING,
    CUSTOMIZE_OPTIONS.POP,
    CUSTOMIZE_OPTIONS.WALL_PAINT,
  ],
  TOILET: [
    CUSTOMIZE_OPTIONS.FLOORING,
    CUSTOMIZE_OPTIONS.POP,
    CUSTOMIZE_OPTIONS.WALL_TILES,
    CUSTOMIZE_OPTIONS.TOILETS,
    CUSTOMIZE_OPTIONS.BATHROOM_SINKS,
    CUSTOMIZE_OPTIONS.SHOWER,
  ],
  KITCHEN: [
    CUSTOMIZE_OPTIONS.FLOORING,
    CUSTOMIZE_OPTIONS.POP,
    CUSTOMIZE_OPTIONS.KITCHEN_SINKS,
    CUSTOMIZE_OPTIONS.WALL_TILES,
  ],
};

export const AVAILABLE_ROOMS_FOR_CUSTOMIZATION = {
  'Living Room': {
    name: 'Living Room',
    description: `A living room is a room in a home that's used for entertaining friends, talking, reading, or watching television. It is also known as a lounge, a sitting room, a front room, or a parlor.`,
    image: 'living-room.png',
    options: OPTIONS.ROOM,
  },
  'Master Bedroom': {
    name: 'Master Bedroom',
    description: `The master bedroom is a retreat, a place to escape from the hustle and bustle of daily life and rest. It is typically the largest bedroom in the house and may have an en-suite bathroom and walk-in closet for added luxury and convenience.`,
    image: 'master-bedroom.png',
    options: OPTIONS.ROOM,
  },
  'Children Room': {
    name: 'Children Room',
    description: `The children's room is a place for kids to play, learn, and sleep. It is often colorful and filled with toys, books, and other items to inspire creativity.`,
    image: 'children-room.png',
    options: OPTIONS.ROOM,
  },
  'Other Rooms': {
    name: 'Other Rooms',
    description: `Other rooms in the house may include guest bedrooms, home offices, and hobby rooms. These spaces serve a variety of purposes and are often decorated to reflect the interests and needs of the occupants.`,
    image: 'visitor.png',
    options: OPTIONS.ROOM,
  },
  Kitchen: {
    name: 'Kitchen',
    description: `The kitchen is the hub of the home, a place where meals are prepared and shared. It is often equipped with modern appliances, such as a stove, oven, and refrigerator, and may have a separate dining area for formal meals.`,
    image: 'kitchen.png',
    options: OPTIONS.KITCHEN,
  },
  'Master Toilet': {
    name: 'Master Toilet',
    description: `The master toilet is a private bathroom reserved for the use of the occupants of the master bedroom. It may have a spacious layout and feature high-end fixtures and finishes for a luxurious experience.`,
    image: 'master-toilet.jpg',
    options: OPTIONS.TOILET,
  },
  'Children Toilet': {
    name: 'Children Toilet',
    description: `The children's toilet is a bathroom specifically designed for the use of children. It may be smaller in size and have features such as a lower counter height and safety handles to accommodate younger users.`,
    image: 'children-toilet.jpg',
    options: OPTIONS.TOILET,
  },
  'Other Rooms Toilet': {
    name: 'Other Rooms Toilet',
    description: `Toilets located in other rooms of the house are typically used by guests or occupants of those rooms. They may be located near a guest bedroom or home office, for example.`,
    image: 'other-rooms-toilet.jpg',
    options: OPTIONS.TOILET,
  },
  'Visitor Toilet': {
    name: 'Visitor Toilet',
    description: `A visitor toilet is a bathroom located in a convenient location for guests to use. It is often located near the entrance of the house or on the ground floor for easy access.`,
    image: 'visitor-toilet.jpg',
    options: OPTIONS.TOILET,
  },
};
