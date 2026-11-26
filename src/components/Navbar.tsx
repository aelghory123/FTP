import { Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'services', label: 'Services' },
];

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-20 bg-white/92 backdrop-blur-md border-b border-[#b91c1c]/15">
      <div className="max-w-[1320px] mx-auto h-full px-4 sm:px-6 lg:px-10 grid grid-cols-2 md:grid-cols-3 items-center gap-8">
        {/* Zone 1: Brand Logo on Left */}
        <div className="flex items-center justify-start">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
            aria-label="FTP Logistix Home"
            className="inline-flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dc2626]"
          >
            <img
              src="/assets/aistudio/Glossy_FTP_Logistix_Logo_Emblem_e02c12b8.png"
              alt="FTP Logistix"
              referrerPolicy="no-referrer"
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </a>
        </div>

        {/* Zone 2: Centered Symmetrical Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center justify-center gap-7 text-sm font-medium text-[#3b2f32]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className={`relative py-1.5 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dc2626] ${
                  isActive
                    ? 'text-[#b91c1c] font-semibold'
                    : 'hover:text-[#b91c1c]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-[#dc2626]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Phone Action on Right + Mobile Drawer Toggle */}
        <div className="flex items-center justify-end gap-3 shrink-0">
          <a
            href="tel:9729460448"
            className="hidden sm:inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-semibold text-white bg-[#dc2626] rounded-lg hover:bg-[#b91c1c] transition-colors duration-150 whitespace-nowrap shrink-0 tabular-nums shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#dc2626]"
          >
            <Phone className="w-4 h-4 text-white/90" aria-hidden="true" />
            <span>972-946-0448</span>
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[#fef2f2] border border-[#b91c1c]/15 text-[#160d0f] hover:bg-[#fee2e2] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-b border-[#b91c1c]/15 px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.id);
              }}
              className={`block py-2.5 px-4 rounded-lg text-base font-medium transition-colors ${
                activeSection === item.id
                  ? 'bg-[#fef2f2] text-[#b91c1c] font-semibold'
                  : 'text-[#3b2f32] hover:bg-[#faf8f8]'
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="tel:9729460448"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-[#dc2626] rounded-lg hover:bg-[#b91c1c] transition-colors tabular-nums"
            >
              <Phone className="w-4 h-4 text-white/90" aria-hidden="true" />
              <span>972-946-0448</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
