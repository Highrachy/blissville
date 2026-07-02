// =============================================================================
// Construction Log Data
// =============================================================================
// Unified schema — every section uses ONLY a `gallery` array.
// Components derive display images from gallery slices:
//   type:'primary' → gallery[0] = large hero, gallery[1-2] = stacked pair
//   type:'alt'     → gallery[0-3] = 2×2 grid tiles
// The full gallery array powers the lightbox.
// =============================================================================

// ── Filter tabs ───────────────────────────────────────────────────────────────
export const CONSTRUCTION_LOG_FILTERS = [
  { id: 'all', label: 'All Updates' },
  { id: '3d-renders', label: '3D Renders' },
  { id: 'foundation', label: 'Foundation' },
  { id: 'construction', label: 'Construction' },
  { id: 'exterior', label: 'Exterior' },
  { id: 'interior', label: 'Interior' },
];

// ── Sections ──────────────────────────────────────────────────────────────────
export const CONSTRUCTION_LOG_SECTIONS = [
  // ── 1. 3D RENDERS ────────────────────────────────────────────────────────
  {
    type: 'primary', // large hero LEFT + 2 stacked RIGHT
    id: 'cl-3d-renders',
    filter: '3d-renders',
    category: '3D Renders',
    date: 'March 2024',
    heading: 'Conceptualizing\nThe Landmark',
    subheading: 'Where vision becomes blueprint',
    description:
      'Before a single foundation was poured, our architectural team spent months translating the "Modern Luxury" ethos into photorealistic visualizations. Every facade angle, material finish, and spatial rhythm was tested in high-fidelity 3D renders — ensuring the built reality would honour the dream.',
    stat: { value: '47', unit: 'Render Iterations', label: 'before final approval' },
    // gallery[0] → primary hero  |  gallery[1–2] → stacked pair
    gallery: [
      {
        favorite: true,
        src: '/assets/img/landing/1.png',
        alt: 'Blissville Terraces dusk elevation render',
        caption: 'Dusk elevation — signature facade lighting concept',
      },
      {
        favorite: true,
        src: '/assets/img/landing/2.png',
        alt: 'Street-level approach render',
        caption: 'Street-level approach — landscaped forecourt with palms',
      },
      {
        favorite: true,
        src: '/assets/img/landing/3.png',
        alt: 'Aerial amenity courtyard render',
        caption: "Bird's-eye amenity layout — central recreation hub",
      },
      {
        favorite: true,
        src: '/assets/img/landing/4.png',
        alt: 'South wing elevation render',
        caption: 'South wing — balcony rhythm and stone cladding detail',
      },
      {
        src: '/assets/img/landing/5.png',
        alt: 'Grand entrance gate render',
        caption: 'Grand entrance gate — security meets elegance',
      },
      {
        src: '/assets/img/landing/6.png',
        alt: 'Rooftop terrace concept render',
        caption: 'Rooftop terrace concept — Lagos skyline panorama',
      },
    ],
  },

  // ── 2. FOUNDATION ─────────────────────────────────────────────────────────
  {
    type: 'alt', // 2×2 grid LEFT + text RIGHT
    id: 'cl-foundation',
    filter: 'foundation',
    category: 'Foundation',
    date: 'June 2024',
    heading: 'Built to\nLast Generations',
    subheading: 'Engineering excellence begins underground',
    description:
      'Our geotechnical survey revealed the need for raft and pile foundations reaching 12 metres deep. Every structural decision was made to exceed Lagos State Building Codes — not merely to comply with them. The result is a podium engineered to carry beauty without compromise.',
    quote: 'The invisible strength that supports the visible elegance.',
    stat: { value: '12 m', unit: 'Pile Depth', label: 'exceeding code by 40%' },
    // gallery[0–3] → 2×2 grid tiles
    gallery: [
      {
        favorite: true,
        src: '/assets/img/landing/4.png',
        alt: 'Raft foundation pour — Block A',
        caption: 'Raft foundation pour — Block A, Phase 1',
      },
      {
        src: '/assets/img/landing/5.png',
        alt: 'Pile-driving operation on site',
        caption: 'Pile-driving operation — reaching design depth',
      },
      {
        favorite: true,
        src: '/assets/img/landing/2.png',
        alt: 'Reinforcement cage inspection',
        caption: 'Reinforcement cage — pre-pour quality inspection',
      },
      {
        favorite: true,
        src: '/assets/img/landing/3.png',
        alt: 'Concrete curing — substructure level',
        caption: 'Concrete curing — substructure level complete',
      },
      {
        src: '/assets/img/landing/6.png',
        alt: 'Backfill and compaction operation',
        caption: 'Backfill and compaction — site levelling phase',
      },
      {
        favorite: true,
        src: '/assets/img/landing/1.png',
        alt: 'Site overview after foundation',
        caption: 'Site overview — foundation phase complete',
      },
    ],
  },

  // ── 3. CONSTRUCTION ───────────────────────────────────────────────────────
  {
    type: 'primary', // large hero LEFT + 2 stacked RIGHT
    id: 'cl-construction',
    filter: 'construction',
    category: 'Construction',
    date: 'September 2024',
    heading: 'Rising Floor\nby Floor',
    subheading: 'Structural frame and superstructure works',
    description:
      'With the slab in place, our contractors moved with precision through each floor plate. Columns, beams, and ring beams were cast to structural engineer specifications — with independent third-party quality audits at every critical pour stage to guarantee long-term integrity.',
    stat: { value: '3', unit: 'Floors', label: 'completed ahead of programme' },
    // gallery[0] → primary hero  |  gallery[1–2] → stacked pair
    gallery: [
      {
        src: '/assets/img/landing/5.png',
        alt: 'Superstructure rising — Block B second floor',
        caption: 'Superstructure — Block B reaching second floor plate',
      },
      {
        src: '/assets/img/landing/6.png',
        alt: 'Column formwork and rebar cage',
        caption: 'Column formwork and rebar cage — ground floor',
      },
      {
        favorite: true,
        src: '/assets/img/landing/4.png',
        alt: 'Overhead slab pour — third floor',
        caption: 'Overhead slab pour — third floor deck complete',
      },
      {
        favorite: true,
        src: '/assets/img/landing/1.png',
        alt: 'Full structural frame overview',
        caption: 'Full structural frame overview — progress week 18',
      },
      {
        favorite: true,
        src: '/assets/img/landing/2.png',
        alt: 'Ring beam close-up detail',
        caption: 'Ring beam — ensuring lateral load stability',
      },
      {
        favorite: true,
        src: '/assets/img/landing/3.png',
        alt: 'External scaffolding erected',
        caption: 'External scaffolding — facade preparation underway',
      },
    ],
  },

  // ── 4. EXTERIOR ───────────────────────────────────────────────────────────
  {
    type: 'alt', // 2×2 grid LEFT + text RIGHT
    id: 'cl-exterior',
    filter: 'exterior',
    category: 'Exterior',
    date: 'January 2025',
    heading: 'The Face of\nModern Lagos',
    subheading: 'Cladding, façade and landscaping works',
    description:
      'The exterior skin — a curated combination of off-white render, dark aluminium window frames, and textured stone banding — was applied panel by panel. Every detail honours the photorealistic concept renders, ensuring the built form matches the vision from day one.',
    quote: 'Architecture is the art of how to waste space beautifully.',
    stat: { value: '840 m²', unit: 'Façade Area', label: 'hand-finished render' },
    // gallery[0–3] → 2×2 grid tiles
    gallery: [
      {
        src: '/assets/img/landing/6.png',
        alt: 'Facade render application — west elevation',
        caption: 'Facade render application — west elevation',
      },
      {
        favorite: true,
        src: '/assets/img/landing/1.png',
        alt: 'Aluminium window frame installation',
        caption: 'Double-glazed aluminium frames — unit 4A installed',
      },
      {
        favorite: true,
        src: '/assets/img/landing/2.png',
        alt: 'Stone banding detail — ground level',
        caption: 'Textured stone banding — ground level accent strip',
      },
      {
        favorite: true,
        src: '/assets/img/landing/3.png',
        alt: 'Landscaped forecourt in progress',
        caption: 'Forecourt paving — interlocking stone pattern',
      },
      {
        favorite: true,
        src: '/assets/img/landing/4.png',
        alt: 'Glass balustrade installation',
        caption: 'Glass balustrade installation — upper floor balconies',
      },
      {
        src: '/assets/img/landing/5.png',
        alt: 'Completed east wing exterior',
        caption: 'East wing — completed exterior package',
      },
    ],
  },

  // ── 5. INTERIOR ───────────────────────────────────────────────────────────
  {
    type: 'primary', // large hero LEFT + 2 stacked RIGHT
    id: 'cl-interior',
    filter: 'interior',
    category: 'Interior',
    date: 'March 2025',
    heading: 'Luxury\nLived From Within',
    subheading: 'Fit-out, finishes and interior detailing',
    description:
      'Every unit was fitted with engineered hardwood flooring, large-format Italian wall tiles, and fully fitted kitchens with stone countertops. The interior team obsessed over crown moulding, door reveals, and light-fitting positions — because the finest homes are defined by what most people never consciously notice.',
    stat: { value: '18', unit: 'Finish Options', label: 'per unit, buyer-selected' },
    // gallery[0] → primary hero  |  gallery[1–2] → stacked pair
    gallery: [
      {
        favorite: true,
        src: '/assets/img/landing/3.png',
        alt: 'Living room — signature interior finish',
        caption: 'Living room — engineered hardwood and statement ceiling',
      },
      {
        favorite: true,
        src: '/assets/img/landing/4.png',
        alt: 'Master bathroom — Italian porcelain tiles',
        caption: 'Master bathroom — large-format Italian porcelain tiles',
      },
      {
        src: '/assets/img/landing/5.png',
        alt: 'Open-plan kitchen with stone island',
        caption: 'Open-plan kitchen — stone island and integrated appliances',
      },
      {
        favorite: true,
        src: '/assets/img/landing/1.png',
        alt: 'Master bedroom with built-in wardrobes',
        caption: 'Master bedroom — custom built-in wardrobe package',
      },
      {
        favorite: true,
        src: '/assets/img/landing/2.png',
        alt: 'Dining area with pendant lighting',
        caption: 'Dining area — pendant lighting and wall panelling',
      },
      {
        src: '/assets/img/landing/6.png',
        alt: 'Feature staircase with glass balustrade',
        caption: 'Feature staircase — glass balustrade and oak tread',
      },
    ],
  },
];
