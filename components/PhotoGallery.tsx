import { useState, useEffect, useCallback } from 'react';

interface PhotoGalleryProps {
  images: string[];
  title: string;
  isBoosted?: boolean;
}

export default function PhotoGallery({ images, title, isBoosted }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const photos = images?.length > 0 ? images : [];

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prev = useCallback(() => {
    setCurrentIndex(i => (i === 0 ? photos.length - 1 : i - 1));
  }, [photos.length]);

  const next = useCallback(() => {
    setCurrentIndex(i => (i === photos.length - 1 ? 0 : i + 1));
  }, [photos.length]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, prev, next]);

  if (photos.length === 0) return null;

  const gridPhotos = photos.slice(0, 5);
  const hasMultiple = photos.length > 1;

  return (
    <>
      {/* Photo Grid */}
      <div className="relative mb-12">
        <div
          className={`grid gap-2 h-[400px] md:h-[560px] rounded-3xl overflow-hidden shadow-md ${
            hasMultiple ? 'grid-cols-4 grid-rows-2' : 'grid-cols-1'
          }`}
        >
          {/* Main large photo */}
          <div
            className={`relative cursor-pointer overflow-hidden group ${
              hasMultiple ? 'col-span-2 row-span-2' : 'col-span-4 row-span-2'
            }`}
            onClick={() => openLightbox(0)}
          >
            <img
              src={gridPhotos[0]}
              alt={`${title} — photo 1`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {isBoosted && (
              <div className="absolute top-6 left-6 bg-[#f13053] text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-lg z-10 tracking-widest">
                FEATURED
              </div>
            )}
          </div>

          {/* Secondary photos (up to 4) */}
          {hasMultiple &&
            gridPhotos.slice(1, 5).map((photo, idx) => (
              <div
                key={idx}
                className="relative cursor-pointer overflow-hidden group"
                onClick={() => openLightbox(idx + 1)}
              >
                <img
                  src={photo}
                  alt={`${title} — photo ${idx + 2}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Dim overlay on last cell if more photos exist */}
                {idx === 3 && photos.length > 5 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">+{photos.length - 5}</span>
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* Show all photos button */}
        {hasMultiple && (
          <button
            onClick={() => openLightbox(0)}
            className="absolute bottom-5 right-5 bg-white text-gray-900 font-bold text-sm px-4 py-2.5 rounded-xl shadow-lg hover:bg-gray-50 active:scale-95 transition-all flex items-center gap-2 border border-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            Show all {photos.length} photos
          </button>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col" onClick={closeLightbox}>
          {/* Header bar */}
          <div
            className="flex items-center justify-between px-6 py-4 flex-shrink-0"
            onClick={e => e.stopPropagation()}
          >
            <span className="text-white/70 font-semibold text-sm tabular-nums">
              {currentIndex + 1} / {photos.length}
            </span>
            <button
              onClick={closeLightbox}
              className="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Close gallery"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main image */}
          <div
            className="flex-1 flex items-center justify-center relative px-16 min-h-0"
            onClick={e => e.stopPropagation()}
          >
            {photos.length > 1 && (
              <button
                onClick={prev}
                className="absolute left-4 text-white hover:text-gray-300 transition-colors p-3 rounded-full hover:bg-white/10 z-10"
                aria-label="Previous photo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            <img
              src={photos[currentIndex]}
              alt={`${title} — photo ${currentIndex + 1}`}
              className="max-w-full object-contain select-none"
              style={{ maxHeight: 'calc(100vh - 200px)' }}
            />

            {photos.length > 1 && (
              <button
                onClick={next}
                className="absolute right-4 text-white hover:text-gray-300 transition-colors p-3 rounded-full hover:bg-white/10 z-10"
                aria-label="Next photo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Thumbnail strip */}
          {photos.length > 1 && (
            <div className="flex-shrink-0 py-4 px-6" onClick={e => e.stopPropagation()}>
              <div className="flex gap-2 overflow-x-auto justify-center pb-1">
                {photos.map((photo, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`flex-shrink-0 h-14 w-20 rounded-lg overflow-hidden transition-all ${
                      idx === currentIndex
                        ? 'ring-2 ring-white opacity-100'
                        : 'opacity-40 hover:opacity-70'
                    }`}
                    aria-label={`Go to photo ${idx + 1}`}
                  >
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
