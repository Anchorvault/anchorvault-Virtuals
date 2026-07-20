import { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToWaitlist = () => {
    document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navLinks = [
    { href: '#vision', label: 'Vision' },
    { href: '#ecosystem', label: 'Ecosystem' },
    { href: '#architecture', label: 'Architecture' },
    { href: '#simulator', label: 'Live Simulator' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel !rounded-none !border-t-0 !border-x-0 border-b border-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">

          {/* Left: Dual branding */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <img src="/logo.png" alt="AnchorVault" className="w-7 h-7 sm:w-10 sm:h-10 object-contain flex-shrink-0" />
              <span className="font-bold text-base sm:text-xl text-anchor-blue whitespace-nowrap">AnchorVault</span>
            </div>
            <div className="text-slate-400 font-light text-base sm:text-xl mx-0.5 sm:mx-2">x</div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <img src="/virtual-logo.png" alt="Virtuals" className="w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0" />
              <span className="font-bold text-sm sm:text-lg text-virtual-green whitespace-nowrap">Virtuals</span>
            </div>
          </div>

          {/* Center: Nav links — desktop only */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-anchor-blue font-medium transition-colors text-sm lg:text-base"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Social icons — large screens only */}
            <div className="hidden lg:flex items-center gap-4 text-slate-400">
              <a href="https://www.anchorvault.xyz/" target="_blank" rel="noopener noreferrer" className="hover:text-anchor-blue transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </a>
              <a href="https://x.com/Anchor_Vault" target="_blank" rel="noopener noreferrer" className="hover:text-anchor-blue transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>

            {/* CTA Button — always visible, smaller on mobile */}
            <button
              onClick={scrollToWaitlist}
              className="px-3 py-2 sm:px-5 sm:py-2.5 rounded-full font-semibold text-white text-xs sm:text-sm bg-anchor-blue hover:bg-anchor-blueAccent transition-all border border-virtual-green shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.7)] whitespace-nowrap"
            >
              <span className="hidden sm:inline">Join the Waitlist</span>
              <span className="sm:hidden">Join</span>
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-slate-700 transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-slate-700 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-slate-700 transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-4 pt-2 flex flex-col gap-1 border-t border-white/30 bg-white/80 backdrop-blur-md">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-slate-700 hover:text-anchor-blue font-medium py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors text-base"
            >
              {link.label}
            </a>
          ))}
          {/* Social links in mobile menu */}
          <div className="flex gap-4 pt-2 px-3">
            <a href="https://www.anchorvault.xyz/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-anchor-blue transition-colors text-sm font-medium">
              Website
            </a>
            <a href="https://x.com/Anchor_Vault" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-anchor-blue transition-colors text-sm font-medium">
              @Anchor_Vault
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
