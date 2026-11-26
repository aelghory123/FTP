import { Mail, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#160d0f] text-white py-14 border-t border-[#dc2626]/20">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          {/* Brand & Location */}
          <div className="space-y-3">
            <div className="font-display text-lg font-bold tracking-tight text-white">
              FTP Logistix
            </div>
            <div className="inline-flex items-start gap-2 text-sm text-[#fca5a5]">
              <MapPin className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" aria-hidden="true" />
              <span>Serving the Dallas–Fort Worth (DFW Metroplex) &amp; Surrounding Areas</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:justify-self-center">
            <div className="text-xs font-semibold text-[#fca5a5] mb-3">Navigation</div>
            <nav aria-label="Footer Navigation" className="flex flex-col gap-2.5 text-sm text-white/80">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('home');
                }}
                className="hover:text-[#ef4444] transition-colors w-fit"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('about');
                }}
                className="hover:text-[#ef4444] transition-colors w-fit"
              >
                About Us
              </a>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('services');
                }}
                className="hover:text-[#ef4444] transition-colors w-fit"
              >
                Services
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4 md:justify-self-end">
            <div className="text-xs font-semibold text-[#fca5a5]">Contact</div>

            <div className="space-y-2.5 text-sm text-white/85">
              <div>
                <a
                  href="tel:9729460448"
                  className="inline-flex items-center gap-2 hover:text-[#ef4444] transition-colors tabular-nums font-medium"
                >
                  <Phone className="w-4 h-4 text-[#ef4444] shrink-0" aria-hidden="true" />
                  <span>972-946-0448</span>
                </a>
              </div>

              <div>
                <a
                  href="mailto:feedthepeople2805@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-[#ef4444] transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#ef4444] shrink-0" aria-hidden="true" />
                  <span>feedthepeople2805@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 text-center text-xs text-white/55">
          &copy; {new Date().getFullYear()} FTP Logistix. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
