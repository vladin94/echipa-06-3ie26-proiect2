import { Category, Article, About, TeamMember } from '../types';

export const FALLBACK_CATEGORIES: Category[] = [
  {
    id: 1, documentId: 'c1', slug: 'temples-shrines',
    name: 'Temples & Shrines',
    title: 'Temples & Shrines',
    description: 'Ancient sacred spaces — from golden pavilions to moss-covered stone lanterns guiding mountain paths.',
    createdAt: '', updatedAt: '',
  },
  {
    id: 2, documentId: 'c2', slug: 'gastronomy',
    name: 'Gastronomy',
    title: 'Gastronomy',
    description: 'The art of Kyoto cuisine — kaiseki precision, tofu mastery, and tea ceremony rituals rooted in centuries of refinement.',
    createdAt: '', updatedAt: '',
  },
  {
    id: 3, documentId: 'c3', slug: 'gardens-nature',
    name: 'Gardens & Nature',
    title: 'Gardens & Nature',
    description: 'Raked gravel, sculpted stone, and the fleeting beauty of cherry blossoms and autumn maples.',
    createdAt: '', updatedAt: '',
  },
  {
    id: 4, documentId: 'c4', slug: 'arts-crafts',
    name: 'Arts & Crafts',
    title: 'Arts & Crafts',
    description: 'Living heritage in weaving, ceramics, and lacquerwork — skills passed through generations of Kyoto artisans.',
    createdAt: '', updatedAt: '',
  },
  {
    id: 5, documentId: 'c5', slug: 'neighborhoods',
    name: 'Neighborhoods',
    title: 'Neighborhoods',
    description: 'Cobblestone lanes of Gion, the machiya townhouses of Nishiki, and the lantern-lit paths of Higashiyama.',
    createdAt: '', updatedAt: '',
  },
  {
    id: 6, documentId: 'c6', slug: 'seasons-festivals',
    name: 'Seasons & Festivals',
    title: 'Seasons & Festivals',
    description: 'Gion Matsuri lanterns, Obon fires on mountain slopes, and the quiet reverence of winter snowfall on temple roofs.',
    createdAt: '', updatedAt: '',
  },
];

export const FALLBACK_ARTICLES: Article[] = [
  {
    id: 1, documentId: 'a1', slug: 'kinkakuji-golden-temple',
    title: 'Kinkaku-ji: The Pavilion That Mirrors Heaven',
    excerpt: "Centuries of shogunal ambition crystallized into gold leaf, pine, and reflected water — Kyoto's most iconic structure continues to astonish.",
    content: `<p>Kinkaku-ji, the Temple of the Golden Pavilion, stands at the northern reaches of Kyoto as one of the most photographed structures in all of Japan. Built originally as a retirement villa for shogun Ashikaga Yoshimitsu in 1397, it was converted into a Zen Buddhist temple after his death.</p><p>The three-storey pavilion is covered in gold leaf and capped with a bronze phoenix atop its shingled roof. Its reflection shimmers in Kyōko-chi, the Mirror Pond, creating a scene so perfect it feels composed rather than real.</p>`,
    author: 'Yuki Tanaka', layoutVariant: 'editorial',
    publishedAt: '2024-03-15', createdAt: '', updatedAt: '',
    category: FALLBACK_CATEGORIES[0],
  },
  {
    id: 2, documentId: 'a2', slug: 'kaiseki-ryori-living-art',
    title: 'Kaiseki Ryori: Where Food Becomes a Living Art',
    excerpt: 'The ceremonial meal of Kyoto distills a philosophy of transience, seasonal attunement, and the aesthetics of restraint onto a lacquered tray.',
    content: `<p>Kaiseki is the pinnacle of Japanese culinary tradition, a multi-course meal that has evolved over five centuries from simple tea ceremony accompaniments into an elaborate expression of Japan's aesthetic philosophy.</p><p>Each dish arrives as a curated statement: a single slice of grilled ayu sweetfish on an autumn leaf, a transparent consommé with yuzu rind, vinegar-cured mackerel on pressed rice that dissolves before you can fully taste it.</p>`,
    author: 'Mei Kobayashi', layoutVariant: 'split',
    publishedAt: '2024-02-28', createdAt: '', updatedAt: '',
    category: FALLBACK_CATEGORIES[1],
  },
  {
    id: 3, documentId: 'a3', slug: 'ryoanji-garden-of-silence',
    title: 'Ryoan-ji: The Garden That Asks a Question',
    excerpt: "Fifteen stones in white gravel — no two visible at once. Japan's most celebrated rock garden has resisted interpretation for five centuries.",
    content: `<p>The karesansui rock garden at Ryoan-ji is perhaps the most debated two hundred square meters in the world. Composed of fifteen stones arranged in five groups on a bed of raked white gravel, the garden was created in the late 15th century.</p><p>No definitive interpretation has ever been accepted. What is certain is this: wherever you stand within the viewing veranda, fourteen stones are visible. The fifteenth is always hidden.</p>`,
    author: 'Hiroshi Nakamura', layoutVariant: 'editorial',
    publishedAt: '2024-02-10', createdAt: '', updatedAt: '',
    category: FALLBACK_CATEGORIES[2],
  },
  {
    id: 4, documentId: 'a4', slug: 'nishijin-textile-weaving',
    title: 'Nishijin: Where Threads Carry Centuries',
    excerpt: 'In the narrow lanes north of the imperial palace, the sound of the loom has not stopped for over a thousand years.',
    content: `<p>The Nishijin district of Kyoto has produced some of the world's most exquisite textiles since the Heian Period. Nishijin-ori, the traditional weaving technique of the district, creates the brocade fabric used in imperial court garments, Noh theater costumes, and the elaborate obi sashes of formal kimono.</p>`,
    author: 'Akiko Shimizu', layoutVariant: 'feature',
    publishedAt: '2024-01-22', createdAt: '', updatedAt: '',
    category: FALLBACK_CATEGORIES[3],
  },
  {
    id: 5, documentId: 'a5', slug: 'gion-higashiyama-at-dusk',
    title: 'Gion at Dusk: The City That Never Fully Wakes',
    excerpt: 'As lanterns ignite along Hanamikoji Street, the boundary between the ancient and the present dissolves in amber light.',
    content: `<p>There is a particular quality to dusk in Gion that no photograph fully captures. The ochre glow of paper lanterns warming the lacquered facades of the ochaya teahouses creates a light that seems to come from within the buildings rather than from the street.</p>`,
    author: 'Ryu Watanabe', layoutVariant: 'editorial',
    publishedAt: '2024-01-08', createdAt: '', updatedAt: '',
    category: FALLBACK_CATEGORIES[4],
  },
  {
    id: 6, documentId: 'a6', slug: 'gion-matsuri-festival',
    title: 'Gion Matsuri: One Month of Sacred Thunder',
    excerpt: "Japan's grandest festival fills July with towering yamaboko floats, ancient ritual music, and a city returned to its medieval self.",
    content: `<p>The Gion Matsuri is not a weekend event. For the entire month of July, Kyoto transforms into its ancient self. The festival, continuous since 869 CE when it was held to appease the gods during a pestilence, is conducted by the Yasaka Shrine with a seriousness that centuries of unbroken tradition create.</p>`,
    author: 'Yuki Tanaka', layoutVariant: 'gallery',
    publishedAt: '2023-12-14', createdAt: '', updatedAt: '',
    category: FALLBACK_CATEGORIES[5],
  },
];

const FALLBACK_TEAM: TeamMember[] = [
  {
    id: 1, name: 'Vlad', role: 'Lead Frontend Developer',
    bio: 'Vlad a condus implementarea interfeței React și a proiectat arhitectura generală a informației. Cu un ochi atent pentru detalii vizuale, s-a asigurat că direcția estetică a site-ului reflectă spiritul editorial al Kyoto-ului.',
  },
  {
    id: 2, name: 'Alex', role: 'Backend Developer & Arhitect CMS',
    bio: 'Alex a configurat Strapi CMS, a definit toate tipurile de conținut și a construit stratul de integrare cu API-ul. Experiența sa cu sistemele headless CMS a făcut ca pipeline-ul Strapi–React să fie curat și scalabil.',
  },
  {
    id: 3, name: 'Ariana', role: 'UI/UX Designer & Curator de Conținut',
    bio: 'Ariana s-a ocupat de sistemul de design, biblioteca de componente și tot conținutul editorial. A cercetat în profunzime patrimoniul cultural al Kyoto-ului pentru a se asigura că articolele sunt atât precise, cât și evocatoare.',
  },
  {
    id: 4, name: 'Robert', role: 'DevOps & Inginer de Deployment',
    bio: 'Robert a gestionat pipeline-ul de deployment pe Netlify, a configurat mediul de build și s-a asigurat că proiectul funcționează fiabil în toate mediile. S-a ocupat și de optimizarea performanței și auditarea accesibilității.',
  },
];

export const FALLBACK_ABOUT: About = {
  id: 1, documentId: 'about1',
  title: 'Despre Proiectul Nostru',
  intro: 'KYOTO este un proiect final de echipă realizat în cadrul universității, care explorează intersecția dintre dezvoltarea web modernă și povestirea culturală. Am construit un site editorial de calitate profesională, alimentat de Strapi CMS ca backend headless, demonstrând competențe full-stack reale cu React, TypeScript și Tailwind CSS.\n\nEchipa noastră de patru studenți a ales Kyoto ca subiect — nu doar pentru bogăția sa vizuală, ci pentru că această cultură răsplătește atenția răbdătoare și profundă. Am dorit ca site-ul să facă același lucru: să recompenseze explorarea, să ofere profunzime și să transmită că a fost construit cu grijă, nu generat la întâmplare.',
  teamMembers: FALLBACK_TEAM,
  createdAt: '', updatedAt: '',
};
