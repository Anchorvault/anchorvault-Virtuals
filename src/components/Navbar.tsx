

const Navbar = () => {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel !rounded-none !border-t-0 !border-x-0 border-b border-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Side: Dual branding alignment */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="AnchorVault Logo" className="w-10 h-10 object-contain" />
              <span className="font-bold text-xl text-anchor-blue">AnchorVault</span>
            </div>
            <div className="text-slate-400 font-light text-xl mx-2">x</div>
            <div className="flex items-center gap-2">
              <img src="/virtual-logo.png" alt="Virtuals Protocol Logo" className="w-8 h-8 object-contain" />
              <span className="font-bold text-lg text-virtual-green">Virtuals</span>
            </div>
          </div>

          {/* Middle: Anchor links */}
          <div className="hidden md:flex space-x-8">
            <a href="#vision" className="text-slate-600 hover:text-anchor-blue font-medium transition-colors">Vision</a>
            <a href="#ecosystem" className="text-slate-600 hover:text-anchor-blue font-medium transition-colors">Ecosystem</a>
            <a href="#architecture" className="text-slate-600 hover:text-anchor-blue font-medium transition-colors">Architecture</a>
            <a href="#simulator" className="text-slate-600 hover:text-anchor-blue font-medium transition-colors">Live Simulator</a>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4 text-slate-400">
              <a href="https://www.anchorvault.xyz/" target="_blank" rel="noopener noreferrer" className="hover:text-anchor-blue transition-colors" title="AnchorVault Main Website">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              </a>
              <a href="https://x.com/Anchor_Vault" target="_blank" rel="noopener noreferrer" className="hover:text-anchor-blue transition-colors" title="AnchorVault Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
            </div>
            
            <button 
              onClick={scrollToWaitlist}
              className="px-5 py-2.5 rounded-full font-semibold text-white bg-anchor-blue hover:bg-anchor-blueAccent transition-all border border-virtual-green shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.7)] ml-4"
            >
              Join the Waitlist
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
