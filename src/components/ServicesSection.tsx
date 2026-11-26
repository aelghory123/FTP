import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  ChevronLeft,
  ChevronRight,
  Hammer,
  Home,
  Maximize2,
  Recycle,
  RotateCcw,
  Trash2,
  Trees,
  Truck,
  X,
  ZoomIn,
  ZoomOut,
  type LucideIcon,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type TouchEvent,
  type WheelEvent,
} from 'react';

interface GalleryPhoto {
  src: string;
  alt: string;
  title: string;
  objectPosition?: string;
}

interface ServiceCardItem {
  id: string;
  group: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const SERVICE_PHOTOS: GalleryPhoto[] = [
  {
    src: '/assets/aistudio/880303664_122256971558551591_8746746595043415527_n_f75cb80c.jpg',
    alt: 'FTP Logistix crew member in black polo standing in front of an open box truck loaded with a sofa',
    title: 'Residential Sofa & Home Moving',
    objectPosition: 'object-[50%_25%]',
  },
  {
    src: '/assets/aistudio/879349064_122256959996551591_5084020556270006902_n_2b38f518.jpg',
    alt: 'FTP Logistix mover outside a multi-story apartment complex beside a moving truck',
    title: 'Apartment Complex Relocations',
    objectPosition: 'object-[50%_22%]',
  },
  {
    src: '/assets/aistudio/774836351_122244876548551591_5707420391977368842_n_f3c67977.jpg',
    alt: 'FTP Logistix team member ready for pickup and delivery next to a moving truck at an apartment building',
    title: 'Dependable Moving Crew',
    objectPosition: 'object-[50%_20%]',
  },
  {
    src: '/assets/aistudio/481001689_17867294169330266_4605928381963987651_n_b3745c7a.jpg',
    alt: 'FTP Logistix truck bay loaded with stretch-wrapped furniture, fragile boxes, and moving dollies',
    title: 'Wrapped & Secured Cargo',
    objectPosition: 'object-center',
  },
  {
    src: '/assets/aistudio/883815705_122257088534551591_8536461274217794456_n_fc04faee.jpg',
    alt: 'Commercial office and warehouse cleanout with shrink-wrapped copiers and stacked equipment boxes',
    title: 'Commercial Office & Warehouse Cleanouts',
    objectPosition: 'object-center',
  },
];

const SERVICE_CARDS: ServiceCardItem[] = [
  {
    id: 'residential-commercial-moving',
    group: 'Moving Services',
    title: 'Residential & Commercial Moving',
    description:
      'Apartments, condos, houses, offices, corporate relocations, and commercial buildings moved safely from start to finish.',
    icon: Truck,
  },
  {
    id: 'furniture-equipment-moving',
    group: 'Moving Services',
    title: 'Furniture & Equipment Moving',
    description:
      'Small and large moves for furniture, appliances, desks, cubicles, workstations, and file cabinets — including loading, unloading, pickup, and delivery.',
    icon: Boxes,
  },
  {
    id: 'junk-bulky-removal',
    group: 'Junk Removal',
    title: 'Junk & Bulky Item Removal',
    description:
      'General junk removal for everyday and oversized items including furniture, appliances, mattresses, couches and sofas, scrap metal, and trash or debris.',
    icon: Trash2,
  },
  {
    id: 'property-interior-cleanouts',
    group: 'Cleanout Services',
    title: 'Property & Interior Cleanouts',
    description:
      'Full and partial house and property cleanouts — basements, attics, storage areas, foreclosures, evictions, estates, apartments, plus residential and commercial cleanups.',
    icon: Home,
  },
  {
    id: 'light-demolition',
    group: 'Demolition & Removal',
    title: 'Light Demolition & Tear-Downs',
    description:
      'Safe tear-down and haul-away for sheds, small structures, decks, fences, and interior cabinet or flooring removal.',
    icon: Hammer,
  },
  {
    id: 'yard-landscaping-cleanup',
    group: 'Outdoor & Landscaping',
    title: 'Yard & Landscaping Cleanup',
    description:
      'Yard cleanups, fall leaf removal, leaf collection and disposal, brush, weeds, yard waste, shed and backyard cleanouts, plus stone, rock, gravel, dirt, mulch, and landscaping debris.',
    icon: Trees,
  },
  {
    id: 'construction-recycling',
    group: 'Construction & Recycling',
    title: 'Construction Debris & Recycling',
    description:
      'Construction, renovation, and demolition debris cleanup, wood and lumber removal, scrap metal clearing, and old appliance recycling.',
    icon: Recycle,
  },
];

function getCircularOffset(index: number, activeIndex: number, total: number): number {
  const half = Math.floor(total / 2);
  let diff = (index - activeIndex) % total;
  if (diff < 0) diff += total;
  if (diff > half) diff -= total;
  return diff;
}

export function ServicesSection() {
  // Photo 3D slider state
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const dragStartXRef = useRef<number | null>(null);
  const didDragRef = useRef(false);

  // Service cards slider state
  const [cardIndex, setCardIndex] = useState(0);
  const [cardDragOffset, setCardDragOffset] = useState(0);
  const [isCardDragging, setIsCardDragging] = useState(false);
  const cardDragStartXRef = useRef<number | null>(null);
  const cardDidDragRef = useRef(false);

  // Lightbox zoom viewer state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef<{
    x: number;
    y: number;
    originX: number;
    originY: number;
  } | null>(null);
  const panMovedRef = useRef(false);
  const pinchStartRef = useRef<{ distance: number; zoom: number } | null>(null);

  const total = SERVICE_PHOTOS.length;
  const activePhoto = SERVICE_PHOTOS[activeIndex];
  const lightboxPhoto = lightboxIndex !== null ? SERVICE_PHOTOS[lightboxIndex] : null;
  const totalCards = SERVICE_CARDS.length;

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total);

  const goPrevCard = () => setCardIndex((prev) => Math.max(0, prev - 1));
  const goNextCard = () => setCardIndex((prev) => Math.min(totalCards - 1, prev + 1));

  const updateZoom = (nextZoom: number) => {
    const clamped = Math.min(4, Math.max(1, Number(nextZoom.toFixed(2))));
    setZoom(clamped);
    if (clamped <= 1) {
      setPan({ x: 0, y: 0 });
    } else {
      const maxOffset = (clamped - 1) * 280;
      setPan((prev) => ({
        x: Math.max(-maxOffset, Math.min(maxOffset, prev.x)),
        y: Math.max(-maxOffset, Math.min(maxOffset, prev.y)),
      }));
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setIsPanning(false);
  };

  const goLightboxPrev = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      const nextIdx = (prev - 1 + total) % total;
      setActiveIndex(nextIdx);
      return nextIdx;
    });
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const goLightboxNext = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      const nextIdx = (prev + 1) % total;
      setActiveIndex(nextIdx);
      return nextIdx;
    });
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (lightboxIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goLightboxPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goLightboxNext();
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setZoom((z) => Math.min(4, Number((z + 0.5).toFixed(2))));
      } else if (e.key === '-') {
        e.preventDefault();
        setZoom((z) => {
          const next = Math.max(1, Number((z - 0.5).toFixed(2)));
          if (next <= 1) setPan({ x: 0, y: 0 });
          return next;
        });
      } else if (e.key === '0') {
        e.preventDefault();
        setZoom(1);
        setPan({ x: 0, y: 0 });
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxIndex, total]);

  const handleLightboxWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const step = e.deltaY < 0 ? 0.3 : -0.3;
    updateZoom(zoom + step);
  };

  const handleLightboxPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    panStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      originX: pan.x,
      originY: pan.y,
    };
    panMovedRef.current = false;
    if (zoom > 1) {
      setIsPanning(true);
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
    }
  };

  const handleLightboxPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || !panStartRef.current) return;
    const dx = e.clientX - panStartRef.current.x;
    const dy = e.clientY - panStartRef.current.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      panMovedRef.current = true;
    }
    if (zoom > 1 && isPanning) {
      const maxOffset = (zoom - 1) * 280;
      setPan({
        x: Math.max(-maxOffset, Math.min(maxOffset, panStartRef.current.originX + dx)),
        y: Math.max(-maxOffset, Math.min(maxOffset, panStartRef.current.originY + dy)),
      });
    }
  };

  const handleLightboxPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    if (isPanning) {
      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // Ignore
      }
    }
    setIsPanning(false);
    panStartRef.current = null;
  };

  const getTouchDistance = (touches: TouchEvent<HTMLDivElement>['touches']) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  };

  const handleLightboxTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      pinchStartRef.current = {
        distance: getTouchDistance(e.touches),
        zoom,
      };
      panStartRef.current = null;
      setIsPanning(false);
    } else if (e.touches.length === 1 && zoom > 1) {
      panStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        originX: pan.x,
        originY: pan.y,
      };
      panMovedRef.current = false;
      setIsPanning(true);
    }
  };

  const handleLightboxTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && pinchStartRef.current) {
      const currentDist = getTouchDistance(e.touches);
      const scaleFactor = currentDist / Math.max(1, pinchStartRef.current.distance);
      updateZoom(pinchStartRef.current.zoom * scaleFactor);
    } else if (e.touches.length === 1 && zoom > 1 && panStartRef.current) {
      const dx = e.touches[0].clientX - panStartRef.current.x;
      const dy = e.touches[0].clientY - panStartRef.current.y;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        panMovedRef.current = true;
      }
      const maxOffset = (zoom - 1) * 280;
      setPan({
        x: Math.max(-maxOffset, Math.min(maxOffset, panStartRef.current.originX + dx)),
        y: Math.max(-maxOffset, Math.min(maxOffset, panStartRef.current.originY + dy)),
      });
    }
  };

  const handleLightboxTouchEnd = () => {
    pinchStartRef.current = null;
    panStartRef.current = null;
    setIsPanning(false);
  };

  // Photo 3D slider pointer handlers
  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragStartXRef.current = e.clientX;
    didDragRef.current = false;
    setIsDragging(true);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || dragStartXRef.current === null) return;
    const delta = e.clientX - dragStartXRef.current;
    if (Math.abs(delta) > 6 && !didDragRef.current) {
      didDragRef.current = true;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture is unavailable
      }
    }
    if (didDragRef.current) {
      const clamped = Math.max(-300, Math.min(300, delta));
      setDragOffset(clamped);
    }
  };

  const finishDrag = (e?: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    if (e) {
      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // Ignore
      }
    }

    const threshold = 48;
    if (dragOffset < -threshold) {
      goNext();
    } else if (dragOffset > threshold) {
      goPrev();
    }

    dragStartXRef.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    }
  };

  // Service cards horizontal swipe handlers
  const handleCardPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    cardDragStartXRef.current = e.clientX;
    cardDidDragRef.current = false;
    setIsCardDragging(true);
  };

  const handleCardPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isCardDragging || cardDragStartXRef.current === null) return;
    const delta = e.clientX - cardDragStartXRef.current;
    if (Math.abs(delta) > 6 && !cardDidDragRef.current) {
      cardDidDragRef.current = true;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Ignore
      }
    }
    if (cardDidDragRef.current) {
      const clamped = Math.max(-240, Math.min(240, delta));
      setCardDragOffset(clamped);
    }
  };

  const finishCardDrag = (e?: PointerEvent<HTMLDivElement>) => {
    if (!isCardDragging) return;
    if (e) {
      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // Ignore
      }
    }

    const threshold = 48;
    if (cardDragOffset < -threshold) {
      goNextCard();
    } else if (cardDragOffset > threshold) {
      goPrevCard();
    }

    cardDragStartXRef.current = null;
    setIsCardDragging(false);
    setCardDragOffset(0);
  };

  const handleCardKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrevCard();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNextCard();
    }
  };

  const dragProgress = Math.max(-1.15, Math.min(1.15, dragOffset / 280));

  return (
    <section id="services" aria-label="Services">
      {/* Part 1: 3D Photo Showcase with Dynamic Blurred Active Photo Background */}
      <div className="relative py-20 sm:py-28 bg-[#160d0f] text-white border-t border-white/10 overflow-hidden select-none">
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
          <AnimatePresence mode="sync">
            {!failedImages[activePhoto.src] && (
              <motion.img
                key={activePhoto.src}
                src={activePhoto.src}
                alt=""
                referrerPolicy="no-referrer"
                initial={{ opacity: 0, scale: 1.18 }}
                animate={{ opacity: 1, scale: 1.14 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-center blur-[32px] sm:blur-[42px] saturate-110 opacity-45"
              />
            )}
          </AnimatePresence>

          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(22,13,15,0.68) 0%, rgba(127,29,29,0.22) 50%, rgba(22,13,15,0.78) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2
              style={{ fontFamily: 'var(--font-hero)' }}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]"
            >
              Some of Our <span className="text-[#ef4444]">Past Work</span>
            </h2>
          </div>

          {/* 3D Perspective Card Slider */}
          <div
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="FTP Logistix jobsite gallery"
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
            className={`relative h-[380px] sm:h-[450px] md:h-[500px] flex items-center justify-center touch-pan-y focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef4444] ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{ perspective: '1200px' }}
          >
            {SERVICE_PHOTOS.map((photo, index) => {
              const baseOffset = getCircularOffset(index, activeIndex, total);
              const effectiveOffset = baseOffset + dragProgress;
              const absOffset = Math.abs(effectiveOffset);
              const isCenter = baseOffset === 0;

              const translateXPercent = effectiveOffset * 96;
              const scale = Math.max(0.68, 1 - absOffset * 0.16);
              const rotateY = Math.max(-22, Math.min(22, -effectiveOffset * 15));
              const translateY = Math.min(28, absOffset * 14);
              const opacity = Math.max(0, 1 - absOffset * 0.4);
              const zIndex = Math.round(40 - absOffset * 10);

              return (
                <motion.button
                  key={photo.src}
                  type="button"
                  aria-label={
                    isCenter
                      ? `Enlarge ${photo.title} (${index + 1} of ${total})`
                      : `View ${photo.title} (${index + 1} of ${total})`
                  }
                  aria-pressed={isCenter}
                  onClick={() => {
                    if (didDragRef.current) return;
                    if (isCenter) {
                      openLightbox(index);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  initial={false}
                  animate={{
                    x: `${translateXPercent}%`,
                    y: translateY,
                    scale,
                    rotateY,
                    opacity,
                    zIndex,
                  }}
                  transition={
                    isDragging
                      ? { duration: 0 }
                      : {
                          type: 'spring',
                          stiffness: 250,
                          damping: 27,
                          mass: 0.88,
                        }
                  }
                  style={{
                    transformStyle: 'preserve-3d',
                    zIndex,
                  }}
                  className={`group absolute w-[245px] sm:w-[295px] md:w-[330px] h-[355px] sm:h-[420px] md:h-[465px] rounded-[24px] overflow-hidden bg-[#160d0f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef4444] ${
                    isCenter
                      ? 'shadow-[0_28px_70px_rgba(0,0,0,0.78)] ring-1 ring-[#ef4444]/40 cursor-zoom-in'
                      : 'shadow-[0_16px_40px_rgba(0,0,0,0.55)] ring-1 ring-white/10 hover:ring-[#ef4444]/35 cursor-pointer'
                  }`}
                >
                  {failedImages[photo.src] ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 bg-gradient-to-br from-[#2a1216] to-[#160d0f] text-white/75">
                      <Truck className="w-8 h-8 text-[#ef4444]" aria-hidden="true" />
                      <span className="text-sm font-medium text-center">{photo.title}</span>
                    </div>
                  ) : (
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      referrerPolicy="no-referrer"
                      draggable={false}
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [photo.src]: true }))
                      }
                      className={`w-full h-full object-cover ${photo.objectPosition ?? 'object-center'} pointer-events-none`}
                    />
                  )}

                  {isCenter && !failedImages[photo.src] && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-3.5 right-3.5 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/25 text-white flex items-center justify-center shadow-lg transition-transform duration-150 group-hover:scale-110 group-hover:bg-[#dc2626] group-hover:border-[#dc2626]"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  )}

                  {!isCenter && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-black/25 pointer-events-none transition-opacity duration-200"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Photo Carousel Controls */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous photo"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white hover:bg-[#dc2626] hover:border-[#dc2626] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef4444]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Select photo">
              {SERVICE_PHOTOS.map((photo, idx) => {
                const active = idx === activeIndex;
                return (
                  <button
                    key={photo.src}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={`Photo ${idx + 1}: ${photo.title}`}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef4444] ${
                      active ? 'w-7 bg-[#ef4444]' : 'w-2 bg-white/35 hover:bg-white/60'
                    }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next photo"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white hover:bg-[#dc2626] hover:border-[#dc2626] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef4444]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Part 2: Symmetrical Swipeable Service Directory Cards */}
      <div className="py-20 sm:py-28 bg-[#faf8f8] text-[#160d0f] border-t border-[#b91c1c]/10 overflow-hidden select-none">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Symmetrical Centered Header & Controls */}
          <div className="max-w-2xl mx-auto text-center space-y-5 mb-12">
            <p className="text-sm font-semibold text-[#dc2626]">Our Services</p>
            <h3
              style={{ fontFamily: 'var(--font-hero)' }}
              className="text-3xl sm:text-4xl font-extrabold leading-[1.1] tracking-[-0.02em] text-[#160d0f] text-balance"
            >
              One Team for Every Move{' '}
              <span className="text-[#dc2626]">&amp; Cleanup.</span>
            </h3>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={goPrevCard}
                disabled={cardIndex === 0}
                aria-label="Previous service card"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-[#b91c1c]/15 text-[#160d0f] shadow-xs transition-colors duration-150 cursor-pointer hover:border-[#dc2626] hover:text-[#dc2626] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dc2626]"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={goNextCard}
                disabled={cardIndex === totalCards - 1}
                aria-label="Next service card"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#dc2626] text-white shadow-sm transition-colors duration-150 cursor-pointer hover:bg-[#b91c1c] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dc2626]"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Interactive Card Track */}
          <div className="min-w-0">
            <div
              tabIndex={0}
              role="region"
              aria-roledescription="carousel"
              aria-label="Moving and cleanup service cards"
              onKeyDown={handleCardKeyDown}
              onPointerDown={handleCardPointerDown}
              onPointerMove={handleCardPointerMove}
              onPointerUp={finishCardDrag}
              onPointerCancel={finishCardDrag}
              className={`overflow-hidden pb-4 pt-1 -mx-1 px-1 touch-pan-y focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dc2626] ${
                isCardDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
            >
              <motion.div
                animate={{
                  x: `calc(-${cardIndex} * var(--card-step) + ${cardDragOffset}px)`,
                }}
                transition={
                  isCardDragging
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }
                }
                className="flex gap-5 items-stretch [--card-step:310px] sm:[--card-step:324px]"
              >
                {SERVICE_CARDS.map((card, idx) => {
                  const Icon = card.icon;
                  const isActive = idx === cardIndex;

                  return (
                    <article
                      key={card.id}
                      onClick={() => {
                        if (!cardDidDragRef.current) {
                          setCardIndex(idx);
                        }
                      }}
                      className={`shrink-0 w-[290px] sm:w-[304px] rounded-2xl bg-white p-7 flex flex-col justify-between transition-shadow duration-200 cursor-pointer ${
                        isActive
                          ? 'border border-[#dc2626]/35 shadow-[0_14px_38px_rgba(185,28,28,0.1)]'
                          : 'border border-[#160d0f]/10 shadow-[0_8px_24px_rgba(22,13,15,0.03)] hover:border-[#dc2626]/25'
                      }`}
                    >
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-[#fef2f2] border border-[#b91c1c]/15 text-[#dc2626] flex items-center justify-center mb-6">
                          <Icon className="w-5 h-5" aria-hidden="true" />
                        </div>

                        <div className="text-xs font-semibold text-[#b91c1c] mb-1.5">
                          {card.group}
                        </div>

                        <h4 className="font-display text-xl font-bold leading-snug tracking-tight text-[#160d0f] mb-3">
                          {card.title}
                        </h4>

                        <p className="text-sm text-[#4e4245] leading-relaxed">
                          {card.description}
                        </p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-[#160d0f]/8 font-mono text-xs font-medium text-[#b91c1c] tabular-nums">
                        {String(idx + 1).padStart(2, '0')} /{' '}
                        {String(totalCards).padStart(2, '0')}
                      </div>
                    </article>
                  );
                })}
              </motion.div>
            </div>

            {/* Centered Pagination Dots */}
            <div
              className="mt-6 flex items-center justify-center gap-2"
              role="tablist"
              aria-label="Select service card"
            >
              {SERVICE_CARDS.map((card, idx) => {
                const active = idx === cardIndex;
                return (
                  <button
                    key={card.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={`Service ${idx + 1}: ${card.title}`}
                    onClick={() => setCardIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dc2626] ${
                      active ? 'w-7 bg-[#dc2626]' : 'w-2 bg-[#dc2626]/25 hover:bg-[#dc2626]/45'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Lightbox Modal with Zoom In / Zoom Out & Pan */}
      <AnimatePresence>
        {lightboxPhoto && lightboxIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={lightboxPhoto.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex flex-col select-none"
          >
            {/* Top Controls Bar */}
            <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5 border-b border-white/10 bg-black/50 text-white shrink-0">
              <div className="min-w-0 flex items-center gap-3">
                <span className="text-sm sm:text-base font-semibold truncate">
                  {lightboxPhoto.title}
                </span>
                <span className="text-xs font-mono text-white/60 tabular-nums shrink-0">
                  {lightboxIndex + 1} / {total}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => updateZoom(zoom - 0.5)}
                  disabled={zoom <= 1}
                  aria-label="Zoom out"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/15 text-white hover:bg-[#dc2626] hover:border-[#dc2626] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => updateZoom(1)}
                  aria-label="Reset zoom"
                  className="px-3 h-10 rounded-lg bg-white/10 border border-white/15 text-xs font-mono font-medium tabular-nums text-white hover:bg-white/20 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {Math.round(zoom * 100)}%
                </button>

                <button
                  type="button"
                  onClick={() => updateZoom(zoom + 0.5)}
                  disabled={zoom >= 4}
                  aria-label="Zoom in"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/15 text-white hover:bg-[#dc2626] hover:border-[#dc2626] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                {zoom > 1 && (
                  <button
                    type="button"
                    onClick={() => updateZoom(1)}
                    aria-label="Fit to screen"
                    className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close photo viewer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/15 text-white hover:bg-[#dc2626] hover:border-[#dc2626] transition-colors cursor-pointer ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Interactive Zoomable Image Canvas */}
            <div
              onClick={(e) => {
                if (e.target === e.currentTarget && !panMovedRef.current) {
                  closeLightbox();
                }
              }}
              onWheel={handleLightboxWheel}
              onPointerDown={handleLightboxPointerDown}
              onPointerMove={handleLightboxPointerMove}
              onPointerUp={handleLightboxPointerUp}
              onPointerCancel={handleLightboxPointerUp}
              onTouchStart={handleLightboxTouchStart}
              onTouchMove={handleLightboxTouchMove}
              onTouchEnd={handleLightboxTouchEnd}
              className={`relative flex-1 overflow-hidden flex items-center justify-center p-4 sm:p-10 touch-none ${
                zoom > 1
                  ? isPanning
                    ? 'cursor-grabbing'
                    : 'cursor-grab'
                  : 'cursor-zoom-in'
              }`}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goLightboxPrev();
                }}
                aria-label="Previous photo"
                className="absolute left-3 sm:left-6 z-20 inline-flex items-center justify-center w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-[#dc2626] hover:border-[#dc2626] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {failedImages[lightboxPhoto.src] ? (
                <div className="flex flex-col items-center justify-center gap-3 p-10 rounded-2xl bg-[#160d0f] border border-white/10 text-white/80">
                  <Truck className="w-10 h-10 text-[#ef4444]" aria-hidden="true" />
                  <span className="text-sm font-medium">{lightboxPhoto.title}</span>
                </div>
              ) : (
                <img
                  src={lightboxPhoto.src}
                  alt={lightboxPhoto.alt}
                  referrerPolicy="no-referrer"
                  draggable={false}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (panMovedRef.current) return;
                    updateZoom(zoom > 1 ? 1 : 2);
                  }}
                  style={{
                    transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
                    transition: isPanning ? 'none' : 'transform 160ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="max-h-[82vh] max-w-[90vw] w-auto h-auto object-contain rounded-lg shadow-[0_24px_80px_rgba(0,0,0,0.85)]"
                />
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goLightboxNext();
                }}
                aria-label="Next photo"
                className="absolute right-3 sm:right-6 z-20 inline-flex items-center justify-center w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-[#dc2626] hover:border-[#dc2626] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
