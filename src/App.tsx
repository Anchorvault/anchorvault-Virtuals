import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoHub from './components/VideoHub';
import BentoGrid from './components/BentoGrid';
import Waitlist from './components/Waitlist';

function App() {
  return (
    <div className="font-sans text-slate-900 overflow-hidden relative">
      <Navbar />
      
      <main>
        <Hero />
        
        <div id="vision" className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold text-anchor-blue mb-6">Our Vision</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            AnchorVault represents a paradigm shift in how capital flows globally. By merging the predictability of stablecoin reserves with the decentralization of Virtuals Protocol, we are eliminating the friction, cost, and delays of cross-border settlements. This isn't just an upgrade; it's a completely new foundation for real-world assets on-chain.
          </p>
        </div>

        <VideoHub />
        <BentoGrid />
        <Waitlist />
      </main>

      <footer className="glass-panel !rounded-none !border-b-0 !border-x-0 border-t border-white/50 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="/logo.png" alt="AnchorVault" className="w-6 h-6 grayscale opacity-60" />
            <span>x</span>
            <img src="/virtual-logo.png" alt="Virtuals" className="w-5 h-5 grayscale opacity-60" />
          </div>
          <p>&copy; {new Date().getFullYear()} AnchorVault Protocol. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
