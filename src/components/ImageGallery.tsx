import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { StrapiImage } from '../types';
import { getStrapiImageUrl } from '../lib/strapi-api';

const GALLERY_FALLBACKS = [
  'https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/27109409/pexels-photo-27109409.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1200',
];

interface ImageGalleryProps {
  images?: StrapiImage[];
  coverUrl?: string;
}

export default function ImageGallery({ images, coverUrl }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const urls: string[] = [];
  if (coverUrl) urls.push(coverUrl);
  if (images?.length) {
    images.forEach(img => {
      const u = getStrapiImageUrl(img);
      if (u && !urls.includes(u)) urls.push(u);
    });
  }
  // fill with fallbacks if no real images
  if (urls.length === 0) {
    GALLERY_FALLBACKS.forEach(u => urls.push(u));
  }

  const displayUrls = urls.slice(0, 6);
  const active = lightboxIndex !== null ? displayUrls[lightboxIndex] : null;

  const go = (dir: number) => {
    if (lightboxIndex === null) return;
    const next = (lightboxIndex + dir + displayUrls.length) % displayUrls.length;
    setLightboxIndex(next);
  };

  // Masonry-style layout assignments
  const layouts = [
    'col-span-2 row-span-2',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-2 row-span-1',
  ];

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-3 gap-2 h-[560px]">
        {displayUrls.map((url, i) => (
          <button
            key={i}
            className={`${layouts[i] || 'col-span-1 row-span-1'} overflow-hidden group relative focus:outline-none focus:ring-2 focus:ring-amber-600`}
            onClick={() => setLightboxIndex(i)}
          >
            <img src={url} alt={`Gallery image ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
            </div>
          </button>
        ))}
      </div>

      {active !== null && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors text-2xl"
            onClick={e => { e.stopPropagation(); go(-1); }}
            aria-label="Previous"
          >
            ‹
          </button>
          <img
            src={active}
            alt="Gallery lightbox"
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors text-2xl"
            onClick={e => { e.stopPropagation(); go(1); }}
            aria-label="Next"
          >
            ›
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm font-body">
            {lightboxIndex + 1} / {displayUrls.length}
          </div>
        </div>
      )}
    </>
  );
}
