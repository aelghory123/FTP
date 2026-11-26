import { Phone, Truck } from 'lucide-react';
import { useState } from 'react';

interface ScrollTruckHeroProps {
  onExploreServices: () => void;
}

const HERO_IMAGE_SRC = '/assets/aistudio/69df0f4c-8c8b-445b-a51d-70ca8b8970f3_7aff2441.png';

export function ScrollTruckHero({ onExploreServices }: ScrollTruckHeroProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="home"
      aria-label="FTP Logistix Hero"
      className="relative w-full md:min-h-[min(86vh,68vw)] lg:min-h-[min(90vh,65vw)] xl:min-h-[92vh] pt-20 flex flex-col md:flex-row md:items-center bg-[#240203] overflow-hidden"
    >
      {/* Mobile (< md): Full uncropped truck image fitted edge-to-edge */}
      <div className="relative w-full md:hidden bg-[#240203]">
        {!imageError ? (
          <img
            src={HERO_IMAGE_SRC}
            alt="FTP Logistix moving box truck"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-auto max-h-[56vh] object-contain mx-auto block"
          />
        ) : (
          <div
            aria-hidden="true"
            className="w-full aspect-[3/2] max-h-[56vh] flex items-center justify-center bg-gradient-to-br from-[#4a0406] via-[#2b0203] to-[#140102]"
          >
            <Truck className="w-16 h-16 text-[#ef4444]/40" />
          </div>
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#240203] to-transparent"
        />
      </div>

      {/* Tablet & Desktop (md+): Full-bleed studio hero truck image */}
      {!imageError ? (
        <img
          src={HERO_IMAGE_SRC}
          alt="FTP Logistix moving box truck"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-[84%_center] lg:object-[74%_center] xl:object-[68%_center]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="hidden md:flex absolute inset-0 items-center justify-center bg-gradient-to-br from-[#4a0406] via-[#2b0203] to-[#140102]"
        >
          <Truck className="w-20 h-20 text-[#ef4444]/35" />
        </div>
      )}

      {/* Desktop Contrast Scrim so left-aligned text stays crisp while truck remains bright */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#1c0203]/92 via-[#2b0305]/68 to-transparent md:w-[58%] lg:w-[60%]"
      />

      {/* Foreground Content inside Symmetrical Container */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 pt-4 pb-14 sm:pt-6 sm:pb-16 md:py-16 lg:py-24 xl:py-28 w-full">
        <div className="max-w-[480px] md:max-w-[380px] lg:max-w-[460px] xl:max-w-[500px] mx-auto md:mx-0 text-center md:text-left">
          <h1
            style={{ fontFamily: 'var(--font-hero)' }}
            className="text-[clamp(2rem,4.1vw,3.75rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-white text-balance drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]"
          >
            Careful moving,{' '}
            <span className="text-[#ff3b3b]">loaded and delivered</span>{' '}
            on schedule.
          </h1>

          <p className="mt-4 sm:mt-5 text-base md:text-[15px] lg:text-lg text-white/85 leading-relaxed max-w-[44ch] mx-auto md:mx-0">
            Licensed residential and commercial relocations, furniture transport, and full-service property cleanouts across Dallas–Fort Worth.
          </p>

          <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center md:justify-start gap-3.5 sm:gap-4">
            <a
              href="tel:9729460448"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#dc2626] rounded-lg hover:bg-[#b91c1c] transition-colors duration-150 whitespace-nowrap shrink-0 shadow-lg tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef4444]"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>Call 972-946-0448</span>
            </a>

            <button
              type="button"
              onClick={onExploreServices}
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-white/12 border border-white/30 rounded-lg hover:bg-white/22 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore Services
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
