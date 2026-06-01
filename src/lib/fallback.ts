import { Category, Article, About, TeamMember } from '../types';

export const FALLBACK_CATEGORIES: Category[] = [
  {
    id: 1, documentId: 'c1', slug: 'temples-shrines',
    title: 'Temples & Shrines',
    description: 'Ancient sacred spaces — from golden pavilions to moss-covered stone lanterns guiding mountain paths.',
    cover: undefined,
    createdAt: '', updatedAt: '',
  },
  {
    id: 2, documentId: 'c2', slug: 'gastronomy',
    title: 'Gastronomy',
    description: 'The art of Kyoto cuisine — kaiseki precision, tofu mastery, and tea ceremony rituals rooted in centuries of refinement.',
    cover: undefined,
    createdAt: '', updatedAt: '',
  },
  {
    id: 3, documentId: 'c3', slug: 'gardens-nature',
    title: 'Gardens & Nature',
    description: 'Raked gravel, sculpted stone, and the fleeting beauty of cherry blossoms and autumn maples.',
    cover: undefined,
    createdAt: '', updatedAt: '',
  },
  {
    id: 4, documentId: 'c4', slug: 'arts-crafts',
    title: 'Arts & Crafts',
    description: 'Living heritage in weaving, ceramics, and lacquerwork — skills passed through generations of Kyoto artisans.',
    cover: undefined,
    createdAt: '', updatedAt: '',
  },
  {
    id: 5, documentId: 'c5', slug: 'neighborhoods',
    title: 'Neighborhoods',
    description: 'Cobblestone lanes of Gion, the machiya townhouses of Nishiki, and the lantern-lit paths of Higashiyama.',
    cover: undefined,
    createdAt: '', updatedAt: '',
  },
  {
    id: 6, documentId: 'c6', slug: 'seasons-festivals',
    title: 'Seasons & Festivals',
    description: 'Gion Matsuri lanterns, Obon fires on mountain slopes, and the quiet reverence of winter snowfall on temple roofs.',
    cover: undefined,
    createdAt: '', updatedAt: '',
  },
];

export const FALLBACK_ARTICLES: Article[] = [
  {
    id: 1, documentId: 'a1', slug: 'kinkakuji-golden-temple',
    title: 'Kinkaku-ji: The Pavilion That Mirrors Heaven',
    excerpt: 'Centuries of shogunal ambition crystallized into gold leaf, pine, and reflected water — Kyoto\'s most iconic structure continues to astonish.',
    content: `<p>Kinkaku-ji, the Temple of the Golden Pavilion, stands at the northern reaches of Kyoto as one of the most photographed structures in all of Japan. Built originally as a retirement villa for shogun Ashikaga Yoshimitsu in 1397, it was converted into a Zen Buddhist temple after his death.</p><p>The three-storey pavilion is covered in gold leaf and capped with a bronze phoenix atop its shingled roof. Its reflection shimmers in Kyōko-chi, the Mirror Pond, creating a scene so perfect it feels composed rather than real. Each floor represents a different architectural style — aristocratic shinden-zukuri, samurai bukke-zukuri, and Chinese Zen-influenced kara-yo.</p><p>The original structure was burned in 1950 by a young Buddhist monk, an event famously novelized by Yukio Mishima. The rebuilt pavilion, completed in 1955, was covered in new gold leaf in 1987. The impermanence Mishima saw as both beautiful and intolerable has, paradoxically, been preserved.</p>`,
    author: 'Yuki Tanaka', layoutVariant: 'editorial',
    publishedAt: '2024-03-15',
    cover: undefined, createdAt: '', updatedAt: '',
    category: FALLBACK_CATEGORIES[0],
  },
  {
    id: 2, documentId: 'a2', slug: 'kaiseki-ryori-living-art',
    title: 'Kaiseki Ryori: Where Food Becomes a Living Art',
    excerpt: 'The ceremonial meal of Kyoto distills a philosophy of transience, seasonal attunement, and the aesthetics of restraint onto a lacquered tray.',
    content: `<p>Kaiseki is the pinnacle of Japanese culinary tradition, a multi-course meal that has evolved over five centuries from simple tea ceremony accompaniments into an elaborate expression of Japan's aesthetic philosophy. To eat kaiseki in Kyoto is to experience <em>mono no aware</em> — the bittersweet awareness of impermanence — through taste.</p><p>Each dish arrives as a curated statement: a single slice of grilled ayu sweetfish on an autumn leaf, a transparent consommé with yuzu rind, vinegar-cured mackerel on pressed rice that dissolves before you can fully taste it. The chef communicates season, place, and feeling simultaneously.</p><p>The dining room is as considered as the food — a low table, tatami underfoot, a single seasonal flower arrangement in the tokonoma alcove. The cadence of arrival is choreographed, unhurried. You are expected to notice, to slow down, to taste with your eyes first.</p>`,
    author: 'Mei Kobayashi', layoutVariant: 'split',
    publishedAt: '2024-02-28',
    cover: undefined, createdAt: '', updatedAt: '',
    category: FALLBACK_CATEGORIES[1],
  },
  {
    id: 3, documentId: 'a3', slug: 'ryoanji-garden-of-silence',
    title: 'Ryoan-ji: The Garden That Asks a Question',
    excerpt: 'Fifteen stones in white gravel — no two visible at once. Japan\'s most celebrated rock garden has resisted interpretation for five centuries.',
    content: `<p>The karesansui rock garden at Ryoan-ji is perhaps the most debated two hundred square meters in the world. Composed of fifteen stones arranged in five groups on a bed of raked white gravel, the garden was created in the late 15th century and attributed — without certainty — to the painter Soami.</p><p>No definitive interpretation has ever been accepted. The stones have been read as tigers crossing a river, as islands in the sea, as the number that represents wholeness in Zen numerology. What is certain is this: wherever you stand within the viewing veranda, fourteen stones are visible. The fifteenth is always hidden.</p><p>This is the garden's enduring teaching. Not an answer, but a persistent, patient question. The raked gravel is refreshed daily. The moss grows slowly between stones, thickening over centuries. The cedars beyond the oil-clay wall grow imperceptibly taller.</p>`,
    author: 'Hiroshi Nakamura', layoutVariant: 'gallery',
    publishedAt: '2024-02-10',
    cover: undefined, createdAt: '', updatedAt: '',
    category: FALLBACK_CATEGORIES[2],
  },
  {
    id: 4, documentId: 'a4', slug: 'nishijin-textile-weaving',
    title: 'Nishijin: Where Threads Carry Centuries',
    excerpt: 'In the narrow lanes north of the imperial palace, the sound of the loom has not stopped for over a thousand years.',
    content: `<p>The Nishijin district of Kyoto has produced some of the world's most exquisite textiles since the Heian Period. Nishijin-ori, the traditional weaving technique of the district, creates the brocade fabric used in imperial court garments, Noh theater costumes, and the elaborate obi sashes of formal kimono.</p><p>Walking through Nishijin today, the narrow machiya townhouses still vibrate with the rhythmic clatter of the Jacquard loom — the same punched-card-driven machine that, in the 19th century, inspired the first programming concepts in Charles Babbage's analytical engine. The loom that helped birth computing still produces silk that sells for thousands of yen per centimeter.</p><p>Master weavers here work from pattern cards that took decades to perfect. A single elaborate obi can take weeks to complete, its design encoded in thousands of punched cards. Some workshops have been in continuous operation for fifteen or twenty generations.</p>`,
    author: 'Akiko Shimizu', layoutVariant: 'feature',
    publishedAt: '2024-01-22',
    cover: undefined, createdAt: '', updatedAt: '',
    category: FALLBACK_CATEGORIES[3],
  },
  {
    id: 5, documentId: 'a5', slug: 'gion-higashiyama-at-dusk',
    title: 'Gion at Dusk: The City That Never Fully Wakes',
    excerpt: 'As lanterns ignite along Hanamikoji Street, the boundary between the ancient and the present dissolves in amber light.',
    content: `<p>There is a particular quality to dusk in Gion that no photograph fully captures. The ochre glow of paper lanterns warming the lacquered facades of the ochaya teahouses creates a light that seems to come from within the buildings rather than from the street. The temperature drops. The sound of shamisen drifts from behind closed screens.</p><p>Gion is Kyoto's most famous geisha district, home to the maiko apprentices in their elaborate ichikobori hairstyles and the more senior geiko in understated elegance. In peak season, a figure in full formal kimono appears at the end of a cobblestone lane, checks the time on a small phone, and disappears into a waiting taxi — the ancient and the contemporary meeting without ceremony.</p><p>The best way to experience Gion is slowly, on foot, in the hour before dinner. Take the stone-paved lane of Ishibei-koji — so narrow two people cannot pass without turning sideways. Notice the pine branch over the teahouse door: an ochanoko saisai signal that the establishment is in service tonight.</p>`,
    author: 'Ryu Watanabe', layoutVariant: 'editorial',
    publishedAt: '2024-01-08',
    cover: undefined, createdAt: '', updatedAt: '',
    category: FALLBACK_CATEGORIES[4],
  },
  {
    id: 6, documentId: 'a6', slug: 'gion-matsuri-festival',
    title: 'Gion Matsuri: One Month of Sacred Thunder',
    excerpt: 'Japan\'s grandest festival fills July with towering yamaboko floats, ancient ritual music, and a city returned to its medieval self.',
    content: `<p>The Gion Matsuri is not a weekend event. For the entire month of July, Kyoto transforms into its ancient self. The festival, continuous since 869 CE when it was held to appease the gods during a pestilence, is conducted by the Yasaka Shrine with a seriousness that centuries of unbroken tradition create.</p><p>The yamaboko — the enormous wooden floats that give the festival its visual identity — begin to appear in the central streets from the second week of July. The largest, the Naginata Boko, towers over seven stories and requires over forty men to pull. Inside each float, ancient tapestries from Flanders and Persia hang alongside Japanese lacquerwork; medieval Kyoto was a city of extraordinary trade reach.</p><p>On the nights of July 14 to 16, the streets close to traffic. The air smells of wood smoke and chrysanthemum incense. Vendors line the alleys selling kakigori shaved ice and yakitori. The hayashi musicians atop the floats play the same repeating melodic pattern — konchikichin, konchikichin — a sound unchanged in a thousand years.</p>`,
    author: 'Yuki Tanaka', layoutVariant: 'gallery',
    publishedAt: '2023-12-14',
    cover: undefined, createdAt: '', updatedAt: '',
    category: FALLBACK_CATEGORIES[5],
  },
];

const FALLBACK_TEAM: TeamMember[] = [
  {
    id: 1, name: 'Aoi Hashimoto', role: 'Project Lead & Frontend Developer',
    bio: 'Aoi designed the overall information architecture and led the React frontend implementation. With a passion for Japanese aesthetics, she ensured the visual direction remained true to Kyoto\'s editorial spirit throughout the project.',
  },
  {
    id: 2, name: 'Kenji Mori', role: 'Backend Developer & CMS Architect',
    bio: 'Kenji configured the Strapi CMS, defined all content types, and built the API integration layer. His experience with headless CMS systems made the Strapi-to-React pipeline both clean and scalable.',
  },
  {
    id: 3, name: 'Saki Fujii', role: 'UI/UX Designer & Content Curator',
    bio: 'Saki handled the design system, component library, and all written content. She researched Kyoto\'s cultural heritage extensively to ensure the editorial content was both accurate and atmospheric.',
  },
  {
    id: 4, name: 'Taro Ishida', role: 'DevOps & Deployment Engineer',
    bio: 'Taro managed the Netlify deployment pipeline, configured the build environment, and ensured the project ran reliably across environments. He also handled performance optimization and accessibility auditing.',
  },
];

export const FALLBACK_ABOUT: About = {
  id: 1, documentId: 'about1',
  title: 'About This Project',
  intro: 'KYOTO is a final university team project exploring the intersection of modern web development and cultural storytelling. We built a production-quality editorial website powered by Strapi CMS as our headless backend, demonstrating real-world full-stack capabilities with React, TypeScript, and Tailwind CSS.\n\nOur team of four students chose Kyoto as our subject — not merely for its visual richness, but because its culture rewards patient, careful attention. We hoped the website would do the same: reward exploration, offer depth, and feel crafted rather than generated.',
  teamMembers: FALLBACK_TEAM,
  createdAt: '', updatedAt: '',
};
