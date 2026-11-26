import { Check, MapPin, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'motion/react';

const HIGHLIGHTS = [
  {
    title: 'Reliable & Professional Service',
    subtitle: 'Trained crews handling every item with precision and care.',
    icon: ShieldCheck,
    dir: 'ltr' as const,
  },
  {
    title: 'Residential & Commercial Solutions',
    subtitle: 'Homes, apartments, corporate offices, and property cleanouts.',
    icon: Truck,
    dir: 'ltr' as const,
  },
  {
    title: 'Serving the Dallas–Fort Worth (DFW Metroplex) & Surrounding Areas',
    subtitle: 'Dependable local moving and cleanouts across North Texas communities.',
    icon: MapPin,
    dir: 'ltr' as const,
  },
];

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 sm:py-28 bg-[#faf8f8] border-t border-[#b91c1c]/10 overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Symmetrical Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-sm font-semibold text-[#dc2626] mb-3">About Us</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold leading-[1.12] tracking-tight text-[#160d0f] text-balance">
            More Than Moving. We Move You Forward.
          </h2>

          <p className="mt-5 text-base sm:text-[17px] text-[#4e4245] leading-relaxed mx-auto max-w-[62ch]">
            At FTP Logistix, we are dedicated to making every move and cleanup project easier. From residential and commercial relocations to junk removal and property cleanouts, we provide dependable solutions tailored to your needs across the Dallas–Fort Worth area.
          </p>
        </motion.div>

        {/* Symmetrical 3-Column Highlights */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {HIGHLIGHTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: 0.08 * idx,
                  ease: EASE_OUT_EXPO,
                }}
                className="bg-white rounded-2xl border border-[#b91c1c]/12 p-7 text-center flex flex-col items-center shadow-[0_8px_24px_rgba(22,13,15,0.03)]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#fef2f2] border border-[#b91c1c]/15 text-[#dc2626] flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>

                <h3
                  dir={item.dir}
                  className="font-display text-lg font-bold text-[#160d0f] leading-snug text-balance"
                >
                  {item.title}
                </h3>

                <p className="mt-2.5 text-sm text-[#5e5054] leading-relaxed">
                  {item.subtitle}
                </p>

                <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#b91c1c]">
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Licensed &amp; Insured</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
