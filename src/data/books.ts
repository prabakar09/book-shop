import { Book, BookClubEvent } from '../types';

export const BOOKS: Book[] = [
  {
    id: 'the-cartographers-silence',
    title: "The Cartographer's Silence",
    subtitle: "A Novel of Lost Coastlines and Unwritten Passages",
    author: "Elena Rostova",
    authorBio: "Elena Rostova is a maritime historian and novelist based in Porto. Her work investigates the disappearance of early nautical charts during the Lisbon earthquake of 1755.",
    year: 2025,
    pages: 412,
    isbn: "978-0-1431-2854-9",
    publisher: "Athenaeum Press, London",
    genre: "Literary Fiction",
    price: 32.00,
    rating: 4.9,
    reviewCount: 148,
    stock: 7,
    isStaffPick: true,
    isBestseller: true,
    isCollectorEdition: true,
    staffRecommendation: {
      curator: "Eleanor Vance",
      role: "Senior Curator of Fiction",
      quote: "A spellbinding meditation on memory and vanishing topography. The description of hand-inked sea depths alone kept me awake until dawn."
    },
    coverDesign: {
      bg: "#182825",
      spineBg: "#0F1A18",
      textColor: "#F4EFE6",
      accentColor: "#C5A880",
      foilColor: "#D4AF37",
      pattern: "waves",
      motifIcon: "compass",
      texture: "buckram"
    },
    formats: [
      { id: 'clothbound', name: 'Clothbound Collector\'s Edition', price: 32.00, description: 'Debossed green buckram with ribbon bookmark and gold foil title', inStock: true },
      { id: 'hardcover', name: 'Standard Hardcover', price: 26.00, description: 'Dust jacket with uncoated cotton-touch laminate', inStock: true },
      { id: 'paperback', name: 'Trade Paperback', price: 18.50, description: 'French flaps on textured antique laid card', inStock: true },
      { id: 'signed', name: 'Signed First Edition', price: 58.00, description: 'Signed and numbered bookplate with archival slipcase (Strictly 250 copies)', inStock: true }
    ],
    synopsis: "In the damp winter of 1888, master mapmaker Thomas Vance receives an unsigned wooden chest containing twelve parchment fragments depicting an unmapped archipelago in the South Atlantic. As he reconstructs the coastlines, Vance discovers each contour corresponds not to terra firma, but to the forgotten memories of seafaring navigators who never returned.",
    excerpt: {
      chapterTitle: "Chapter One: The Salt in the Varnish",
      paragraphs: [
        "The tallow candle burned with a faint blue rim, smelling of suet and dead lavender. Thomas Vance wiped his horn-rimmed lenses with the hem of his woolen waistcoat and leaned over the drafting desk.",
        "There were three kinds of sea-ink kept in the high cabinet: sepia harvested from Adriatic cuttlefish, iron gall pressed from oak apples in the New Forest, and a dark mineral pigment brought out of the salt marshes near Cadiz. It was this third ink that refused to dry.",
        "He drew the nib of his crow-quill along the contour line of what should have been the Tristan da Cunha shelf. But where the soundings should have ceased at forty fathoms, the fragment indicated an arch of drowned basilicas. A note in cinnabar script read simply: 'The bells continue at slack tide.'",
        "Outside, the Thames fog pressed its wet cheek against the leaded panes. A dray rattled along the cobblestones of Wapping Wall, its iron-shod wheels echoing through the brick cellar like dry bones."
      ]
    },
    specs: {
      binding: "Smyth-sewn cloth binding with foil stamped spine and headbands",
      paperStock: "120gsm Munken Pure cream woodfree book paper",
      dimensions: "152 × 228 mm (Royal Octavo)",
      weight: "680g",
      editionInfo: "First UK Edition, typography set in Monotype Bembo Book"
    },
    reviews: [
      {
        id: 'rev-1',
        author: "Julian H. Croft",
        rating: 5,
        date: "September 14, 2026",
        title: "A masterwork of quiet devastation",
        body: "The tactile quality of this Folio & Quill edition matches Rostova's prose perfectly. The prose feels carved into boxwood.",
        verifiedPurchase: true
      },
      {
        id: 'rev-2',
        author: "Margaret S.",
        rating: 5,
        date: "August 28, 2026",
        title: "Unmatched bindery and pacing",
        body: "Received in exquisite brown kraft wrapping with wax seal. The book itself is one of the loveliest objects on my shelves.",
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'architecture-of-stillness',
    title: "The Architecture of Stillness",
    subtitle: "Sacred Spaces, Monastic Light, and the Inhabited Void",
    author: "Alvaro Mendes & Clara Neri",
    authorBio: "Alvaro Mendes is a fellow of the Architectural Association in London. Clara Neri is an architectural photographer whose monographs explore Cistercian cloisters across Iberia.",
    year: 2024,
    pages: 320,
    isbn: "978-1-9125-4402-1",
    publisher: "Phaidon & Athenaeum Press",
    genre: "Art & Architecture",
    price: 45.00,
    rating: 4.8,
    reviewCount: 92,
    stock: 12,
    isStaffPick: false,
    isBestseller: false,
    isCollectorEdition: true,
    coverDesign: {
      bg: "#2A2826",
      spineBg: "#1C1B1A",
      textColor: "#FAF8F5",
      accentColor: "#E0D7C6",
      foilColor: "#FAF8F5",
      pattern: "geometric",
      motifIcon: "arch",
      texture: "linen"
    },
    formats: [
      { id: 'monograph', name: 'Clothbound Hardcover Monograph', price: 45.00, description: 'Coarse natural oat linen with blind debossed architectural elevation', inStock: true },
      { id: 'deluxe', name: 'Slipcase Collector\'s Folio', price: 85.00, description: 'Includes 4 loose architectural risograph prints on handmade washi', inStock: true }
    ],
    synopsis: "An exhaustive visual and philosophical survey of silent architectural spaces: from 12th-century Romanesque oratories to modern concrete sanctuaries by Tadao Ando, Peter Zumthor, and John Pawson. Explores how aperture, material density, and proportion shape contemplative human thought.",
    excerpt: {
      chapterTitle: "Introduction: The Geometry of Silence",
      paragraphs: [
        "Light does not merely illuminate space; it measures the weight of time. When one steps through the narthex of the Abbey of Thoronet at three in the afternoon, the stone is not passive. It absorbs speech.",
        "We have forgotten that architecture was once acoustic before it was retinal. The monks did not calculate daylight with lumens, but with the length of a Gregorian chant before the echo decayed into the limestone vaulting.",
        "To build for silence is an act of defiance in a world frantic with notifications and luminous glass. Here, we present thirty structures that ask nothing of the eye except permission to breathe."
      ]
    },
    specs: {
      binding: "Hardcover with exposed cloth spine and blind debossed front board",
      paperStock: "150gsm Gardapat Kiara matte art paper",
      dimensions: "240 × 300 mm (Large Quarto)",
      weight: "1420g",
      editionInfo: "Printed by Grafiche Veneziane on dual-run offset litho"
    },
    reviews: [
      {
        id: 'rev-3',
        author: "David K. Thornton",
        rating: 5,
        date: "September 02, 2026",
        title: "Breathtaking production quality",
        body: "The matte reproduction of Zumthor's Bruder Klaus Chapel is simply the best I have seen in print. A coffee-table book that demands slow reading.",
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'notes-on-botanical-melancholy',
    title: "Notes on Botanical Melancholy",
    subtitle: "Specimens, Herbaria, and the Grief of Vanishing Flora",
    author: "Dr. Silas Hawthorne",
    authorBio: "Dr. Silas Hawthorne was for twenty-two years senior keeper of Cryptogamic Botany at the Royal Botanic Gardens, Edinburgh.",
    year: 2025,
    pages: 288,
    isbn: "978-0-2419-7833-2",
    publisher: "Sylva Press, Oxford",
    genre: "Natural History",
    price: 24.00,
    rating: 4.9,
    reviewCount: 204,
    stock: 15,
    isStaffPick: true,
    isBestseller: true,
    isCollectorEdition: false,
    staffRecommendation: {
      curator: "Rowan Thorne",
      role: "Natural History Specialist",
      quote: "Hawthorne writes about moss and alpine ferns with the heartbreak of a poet and the forensic precision of a Victorian naturalist. Essential reading."
    },
    coverDesign: {
      bg: "#1E3326",
      spineBg: "#14241B",
      textColor: "#E7EFE6",
      accentColor: "#8FA882",
      foilColor: "#C3D9B8",
      pattern: "botanical",
      motifIcon: "fern",
      texture: "linen"
    },
    formats: [
      { id: 'hardcover', name: 'Clothbound Hardcover', price: 24.00, description: 'Sage green woven cloth with debossed fern silhouette and gilt top edge', inStock: true },
      { id: 'paperback', name: 'Deckle-Edge Paperback', price: 16.00, description: 'Cream cover with untrimmed deckle page edges', inStock: true },
      { id: 'signed', name: 'Author Signed Edition', price: 42.00, description: 'Signed with an original pressed specimen leaf from the Oxford garden', inStock: false }
    ],
    synopsis: "Part memoir, part forensic botanical chronicle, Hawthorne examines twenty-four plant species that have slipped into extinction over the past two centuries. Drawing on archival herbarium sheets, Victorian field diaries, and his own solitary walks through the Scottish Highlands, he reconstructs their fleeting existence.",
    excerpt: {
      chapterTitle: "Chapter 3: The Ghost Orchid of the Wyre",
      paragraphs: [
        "In herbarium drawer 41B at South Kensington, there lies a single sheet of heavy Dutch rag paper bearing an envelope of translucent glassine. Inside are three dried corollas of Epipogium aphyllum, the ghost orchid.",
        "It produces no chlorophyll. It possesses no leaves. For decades at a time, its root system sleeps in subterranean symbiosis with mycorrhizal fungi beneath thick beech mast, waiting for an incomprehensible chemical cue to throw up a pale, translucent stem like spun sugar.",
        "Those who have seen it speak of its scent as something between fermented quinces and cold river stones. It blooms for four days, then dissolves back into the mulch."
      ]
    },
    specs: {
      binding: "Square backed cloth binding with emerald ribbon marker",
      paperStock: "115gsm Holmen Book Cream, 100% post-consumer recycled",
      dimensions: "135 × 210 mm (Crown Octavo)",
      weight: "440g",
      editionInfo: "Features 32 dual-tone botanical line engravings"
    },
    reviews: [
      {
        id: 'rev-4',
        author: "Fiona MacLeod",
        rating: 5,
        date: "July 19, 2026",
        title: "Deeply moving and beautifully made",
        body: "I bought this on a rainy afternoon in Edinburgh and read it straight through by the fire. The deckle edges and heavy cream paper are sublime.",
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'the-solitude-of-comets',
    title: "The Solitude of Comets",
    subtitle: "Speculations on Deep Time, Orbital Mechanics & Memory",
    author: "Astrid Lindholm",
    authorBio: "Astrid Lindholm is a theoretical astrophysicist and essayist living in Tromsø, Norway. She was awarded the Nordic Council Literature Prize in 2023.",
    year: 2024,
    pages: 356,
    isbn: "978-0-3742-1904-8",
    publisher: "Nordic Heritage & Athenaeum",
    genre: "Speculative Fiction",
    price: 28.00,
    rating: 4.7,
    reviewCount: 88,
    stock: 9,
    isStaffPick: false,
    isBestseller: false,
    isCollectorEdition: true,
    coverDesign: {
      bg: "#101B2B",
      spineBg: "#09101B",
      textColor: "#E2E8F0",
      accentColor: "#93C5FD",
      foilColor: "#E0E7FF",
      pattern: "constellation",
      motifIcon: "star",
      texture: "buckram"
    },
    formats: [
      { id: 'hardcover', name: 'Clothbound Hardcover', price: 28.00, description: 'Deep midnight blue cloth with foil constellations on front and back', inStock: true },
      { id: 'paperback', name: 'Trade Paperback', price: 17.50, description: 'Matte dark cover with silver foil spot varnish', inStock: true }
    ],
    synopsis: "Set aboard the exploratory research vessel Oort-7 as it coasts along the fringes of the Kuiper Belt, Lindholm's novel explores a small crew of chronobiologists tasked with recording the final radio signatures of extinct terrestrial civilizations through gravitational lensing.",
    excerpt: {
      chapterTitle: "Aphelion: The Speed of Forgetting",
      paragraphs: [
        "Light from the sun took five hours and forty-one minutes to reach the forward observation dome. By the time it arrived, it was no longer warm; it had the faint, blue sharpness of starlight seen through thick ice.",
        "Vara sat with her hands palms-down on the warm copper thermal plate of the console. Through the quartz viewport, the comet Neowise-12 was an irregular lump of coal veiled in sublimating cyanogen gas, turning silently in the dark.",
        "'Every rock out here has been cold since before the Cambrian,' Nils said, his voice flat in the cabin intercom. 'It doesn't care whether you write a diary about it.'"
      ]
    },
    specs: {
      binding: "Sewn hardcover with silver foiled spine and headbands",
      paperStock: "100gsm Munken Kristall stark white paper",
      dimensions: "140 × 215 mm",
      weight: "510g",
      editionInfo: "Typeset in Adobe Caslon Pro with tabular astronomical ephemeris"
    },
    reviews: [
      {
        id: 'rev-5',
        author: "Marcus Aurel",
        rating: 5,
        date: "August 11, 2026",
        title: "Cold, luminous, and unforgettable",
        body: "Imagine Stanislaw Lem filtered through Virginia Woolf. A masterpiece of modern speculative literature.",
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'essays-from-the-hermitage',
    title: "Essays from the Hermitage",
    subtitle: "On Solitude, Handcraft, and the Practice of Attention",
    author: "Michel de Boissieu",
    translator: "Translated from the French by Arthur Pendelton",
    authorBio: "Michel de Boissieu spent thirty years as a bookbinder in the Jura mountains before composing this cycle of philosophical vignettes.",
    year: 2023,
    pages: 224,
    isbn: "978-0-9140-5511-2",
    publisher: "Veritas Books, Paris & Oxford",
    genre: "Essays & Philosophy",
    price: 22.00,
    rating: 4.9,
    reviewCount: 167,
    stock: 18,
    isStaffPick: true,
    isBestseller: false,
    isCollectorEdition: false,
    staffRecommendation: {
      curator: "Julian Sterling",
      role: "Director of Rare Editions",
      quote: "The book I press into the hands of everyone who tells me they feel overwhelmed by the modern world. Wise, unhurried, and deeply restorative."
    },
    coverDesign: {
      bg: "#3B271E",
      spineBg: "#281A14",
      textColor: "#F7F2EC",
      accentColor: "#D4B996",
      foilColor: "#C5A880",
      pattern: "marbled",
      motifIcon: "feather",
      texture: "leather"
    },
    formats: [
      { id: 'clothbound', name: 'Fine Clothbound Edition', price: 22.00, description: 'Russet linen with gold foil lettering and marbled endpapers', inStock: true },
      { id: 'paperback', name: 'Paperback Pocket Edition', price: 14.00, description: 'Handy pocket format with durable sewn binding', inStock: true }
    ],
    synopsis: "In seventy-four brief essays, Boissieu reflects on the tools of manual thought: the bone folder, the sharpening stone, the smell of hide glue, the sound of rain on slate, and the discipline of giving one's undivided attention to a single sentence.",
    excerpt: {
      chapterTitle: "V. The Bone Folder",
      paragraphs: [
        "A piece of boiled ox bone, smoothed with pumice until it feels like silk. It has no edge that could cut flesh, yet when pressed along the grain of a sheet of folded paper, it creates a crease so absolute that the fibers yield without a sound.",
        "We are always in such haste to slice, to separate, to declare our sharp opinions. The bone folder does not sever; it convinces. It teaches us that form is achieved through steady, compassionate pressure rather than violence.",
        "Keep your tools clean. Wipe the dust from the bench before you begin work each morning. Let your breath slow until it matches the ticking of the grandfather clock in the stairwell."
      ]
    },
    specs: {
      binding: "Hand-cased in fine Italian book cloth with custom marbled endpapers",
      paperStock: "115gsm Salzer EOS antique book paper",
      dimensions: "125 × 190 mm (Pocket Duodecimo)",
      weight: "320g",
      editionInfo: "Printed letterpress by Hand & Eye Press, London"
    },
    reviews: [
      {
        id: 'rev-6',
        author: "Claire Beauchamp",
        rating: 5,
        date: "September 29, 2026",
        title: "A balm for the soul",
        body: "I keep this on my bedside table and read one essay before sleep. Boissieu's clarity is a tonic.",
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'collected-cantos-of-the-north',
    title: "Collected Cantos of the North",
    subtitle: "Translations from the Old Norse and Gaelic Sea-Psalms",
    author: "Seamus MacIntyre",
    authorBio: "Seamus MacIntyre is a poet and Celtic scholar whose work has been celebrated for bringing medieval maritime elegies into resonant modern English.",
    year: 2025,
    pages: 196,
    isbn: "978-0-5713-6420-1",
    publisher: "Hebridean Press & Athenaeum",
    genre: "Poetry & Letters",
    price: 26.00,
    rating: 4.8,
    reviewCount: 64,
    stock: 11,
    isStaffPick: false,
    isBestseller: false,
    isCollectorEdition: true,
    coverDesign: {
      bg: "#202E39",
      spineBg: "#141E26",
      textColor: "#EEF4F8",
      accentColor: "#89A7BC",
      foilColor: "#B5D0E3",
      pattern: "waves",
      motifIcon: "quill",
      texture: "linen"
    },
    formats: [
      { id: 'hardcover', name: 'Sewn Clothbound Hardcover', price: 26.00, description: 'Slate blue cloth with silver foil debossing and dark blue ribbon', inStock: true },
      { id: 'paperback', name: 'Letterpress Chapbook Edition', price: 16.00, description: 'Printed on hand-moulded paper with deckle edges', inStock: true }
    ],
    synopsis: "A bilingual anthology pairing 9th-century Irish monastic marginalia with skaldic verses composed on the stormy crossing between the Faroes and the Western Isles. Richly annotated with historical notes on runes, gannet migrations, and tidal beacons.",
    excerpt: {
      chapterTitle: "Canto IV: The Anchorite's Cat",
      paragraphs: [
        "I and Pangur Bán my cat, / Tis a like task we are at: / Hunting mice is his delight, / Hunting words I sit all night.",
        "Better far than praise of men / Now to sit with book and pen; / Pangur bears me no ill will, / He too plies his simple skill.",
        "Against the wall he sets his eye, / Fierce and keen and sharp and sly; / Against the dark of ignorance / I cast my quiet lance."
      ]
    },
    specs: {
      binding: "Hardcover with foil blocking on front board and spine",
      paperStock: "120gsm Arcoprint Edizioni 1.3 ivory",
      dimensions: "138 × 216 mm",
      weight: "360g",
      editionInfo: "Typeset in Dante types designed by Giovanni Mardersteig"
    },
    reviews: [
      {
        id: 'rev-7',
        author: "Eileen O'Donnell",
        rating: 5,
        date: "June 04, 2026",
        title: "Electric translations",
        body: "The salt air and solitary candle-flame practically rise off the page. Beautifully printed.",
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'the-typographers-cabinet',
    title: "The Typographer's Cabinet",
    subtitle: "Specimens, Foundry Records, and the Lost Matrices of Mainz",
    author: "Jan-Willem Van Eyck",
    authorBio: "Jan-Willem Van Eyck is curator emeritus of the Plantin-Moretus Museum in Antwerp and a master typecaster.",
    year: 2024,
    pages: 464,
    isbn: "978-9-0566-2810-9",
    publisher: "Foundry Editions, Antwerp",
    genre: "Rare & Antiquarian",
    price: 65.00,
    rating: 5.0,
    reviewCount: 53,
    stock: 4,
    isStaffPick: true,
    isBestseller: false,
    isCollectorEdition: true,
    staffRecommendation: {
      curator: "Eleanor Vance",
      role: "Senior Curator of Fiction & Rare Books",
      quote: "The crown jewel of our bibliographical collection. Contains fold-out foundry specimens printed from actual 16th-century wooden type."
    },
    coverDesign: {
      bg: "#1C1C1E",
      spineBg: "#0F0F10",
      textColor: "#F2EFE9",
      accentColor: "#C5A880",
      foilColor: "#D4AF37",
      pattern: "vintage-border",
      motifIcon: "book",
      texture: "leather"
    },
    formats: [
      { id: 'deluxe', name: 'Hand-Bound Leather & Cloth Folio', price: 65.00, description: 'Bound in quarter black goatskin with English book cloth and hand-gilded edges', inStock: true },
      { id: 'archival', name: 'Archival Boxed Edition with Type Slug', price: 125.00, description: 'Includes an authentic lead casting of the Garamond italic ampersand', inStock: true }
    ],
    synopsis: "A definitive history of punch-cutting, lead alloy formulation, and specimen books from Gutenberg to Bodoni. Featuring 12 gatefold inserts reproducing original foundry specimen broadsides from Paris, Basel, and Venice.",
    excerpt: {
      chapterTitle: "Chapter 2: The Tempering of the Counter-Punch",
      paragraphs: [
        "Before there is a letter, there is the counter—the hollow white space held prisoner within the bowl of the 'b' or the arch of the 'm'. The punch-cutter does not carve the stroke; he carves the air.",
        "Steel when brought to cherry-red heat in charcoal embers becomes docile as beeswax under the fine files of the Swiss watchmaker. But quench it in salt well-water at the wrong second, and the matrix will shatter under the strike of the hammer.",
        "To inspect a 15th-century casting under twenty-power magnification is to encounter human fingerprints in the metal. The ink was made of lampblack and walnut oil; it sits atop the vellum with the thickness of a moth's wing."
      ]
    },
    specs: {
      binding: "Quarter-bound in vegetable tanned calfskin with buckram boards",
      paperStock: "140gsm Hahnemühle Biblio mould-made paper",
      dimensions: "210 × 297 mm (A4 Folio)",
      weight: "1850g",
      editionInfo: "Limited to 750 numbered copies worldwide"
    },
    reviews: [
      {
        id: 'rev-8',
        author: "Bartholomew Crane",
        rating: 5,
        date: "May 18, 2026",
        title: "Worth every penny for any serious book lover",
        body: "An astonishing tactile artifact. Opening the slipcase smells of beeswax, leather, and antique paper. Truly magnificent.",
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'in-search-of-lost-avenues',
    title: "In Search of Lost Avenues",
    subtitle: "A Flâneur's Chronicle of Secret Arcades, Passage-Ways, and Rain",
    author: "Camille Laurent",
    authorBio: "Camille Laurent writes essays for Le Monde and has spent two decades mapping Parisian glass passages and hidden courtyards.",
    year: 2025,
    pages: 310,
    isbn: "978-2-0701-4458-1",
    publisher: "Gallimard & Athenaeum",
    genre: "Literary Fiction",
    price: 25.00,
    rating: 4.8,
    reviewCount: 112,
    stock: 14,
    isStaffPick: false,
    isBestseller: true,
    isCollectorEdition: false,
    coverDesign: {
      bg: "#2E1C22",
      spineBg: "#1F1216",
      textColor: "#F6EAEB",
      accentColor: "#D19CA3",
      foilColor: "#E8B4BA",
      pattern: "geometric",
      motifIcon: "compass",
      texture: "buckram"
    },
    formats: [
      { id: 'hardcover', name: 'Clothbound Hardcover', price: 25.00, description: 'Burgundy book cloth with debossed art-nouveau ironwork motif', inStock: true },
      { id: 'paperback', name: 'Trade Paperback with French Flaps', price: 16.50, description: 'Cream cover with archival map printed on inside flaps', inStock: true }
    ],
    synopsis: "A haunting, labyrinthine chronicle following an antiquarian bookseller as she tracks down nineteen forgotten glazed arcades slated for demolition in the eastern arrondissements. As she walks between rain showers, the city reveals its uncanny layers of past revolutions, clandestine print shops, and lost lovers.",
    excerpt: {
      chapterTitle: "Passage des Panoramas: 4:15 PM",
      paragraphs: [
        "When the autumn rain falls over the Boulevard Montmartre, everyone with sense steps under the green iron canopy of the Passage. The sound transforms instantly: the roar of motorized traffic vanishes, replaced by the domestic murmur of wet shoes upon black and white marble flags.",
        "In the window of the stamp shop at Number 12, there is an envelope addressed to an apothecary in Smyrna, postmarked October 1891. The stamp bears the profile of the young Queen Wilhelmina in carmine ink.",
        "How many hands carried that scrap of paper across the Mediterranean? A letter is an attempt to defy physics, a paper bridge thrown across oblivion."
      ]
    },
    specs: {
      binding: "Clothbound with headbands and silk marker",
      paperStock: "115gsm Munken Lynx uncoated book paper",
      dimensions: "140 × 210 mm",
      weight: "460g",
      editionInfo: "Includes 16 duotone photographs by the author"
    },
    reviews: [
      {
        id: 'rev-9',
        author: "Sophie Delacroix",
        rating: 5,
        date: "September 08, 2026",
        title: "Pure atmosphere",
        body: "Laurent makes you want to pack an umbrella, book a room near the Palais-Royal, and spend weeks reading in cafés.",
        verifiedPurchase: true
      }
    ]
  }
];

export const UPCOMING_EVENTS: BookClubEvent[] = [
  {
    id: 'salon-elena-rostova',
    title: "Evening Salon: Cartography, Memory & Maritime Ghosts",
    date: "Thursday, October 22, 2026",
    time: "7:00 PM – 9:00 PM GMT",
    author: "Elena Rostova",
    moderator: "Dr. Silas Hawthorne",
    bookTitle: "The Cartographer's Silence",
    spotsLeft: 6,
    location: "The Upper Reading Room & Hearth, Bloomsbury",
    description: "Join novelist Elena Rostova and botanist Dr. Silas Hawthorne for mulled cider, reading from original 18th-century nautical charts, and a discussion of topography."
  },
  {
    id: 'salon-typographers-guild',
    title: "Workshop: Smyth-Sewing & Leather Tooling Masterclass",
    date: "Saturday, November 07, 2026",
    time: "2:00 PM – 5:30 PM GMT",
    author: "Jan-Willem Van Eyck",
    moderator: "Julian Sterling",
    bookTitle: "The Typographer's Cabinet",
    spotsLeft: 4,
    location: "The Bindery Workshop, Basement Level",
    description: "Hands-on instruction in classic bookbinding. Each participant will fold, sew, and case-bind their own blank journal in Italian book cloth."
  },
  {
    id: 'salon-poetry-hebrides',
    title: "Hebridean Sea-Psalms: Bilingual Recitation by Candlelight",
    date: "Wednesday, November 18, 2026",
    time: "7:30 PM – 9:30 PM GMT",
    author: "Seamus MacIntyre",
    moderator: "Eleanor Vance",
    bookTitle: "Collected Cantos of the North",
    spotsLeft: 12,
    location: "Main Bookshop Hall",
    description: "An acoustic reading of medieval Gaelic and Old Norse sea verses accompanied by Celtic harpist Mairéad Kelly."
  }
];

export const GENRES = [
  'All Collections',
  'Literary Fiction',
  'Essays & Philosophy',
  'Natural History',
  'Art & Architecture',
  'Poetry & Letters',
  'Speculative Fiction',
  'Rare & Antiquarian'
] as const;
