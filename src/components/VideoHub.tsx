import { useState, useEffect } from 'react';
import { PlayCircle, Code, Coins, ArrowRight } from 'lucide-react';

const VideoHub = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [avltBalance, setAvltBalance] = useState(0);
  const [yieldAccrued, setYieldAccrued] = useState(0.000);

  useEffect(() => {
    let interval: number;
    if (isSimulating && avltBalance > 0) {
      interval = window.setInterval(() => {
        setYieldAccrued(prev => prev + 0.0017);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isSimulating, avltBalance]);

  const handleSimulate = () => {
    setIsSimulating(true);
    setAvltBalance(0);
    setYieldAccrued(0);
    
    // Simulate API delay for minting
    setTimeout(() => {
      setAvltBalance(100); // 100 USDC mock
    }, 1200);
  };

  return (
    <section id="ecosystem" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-anchor-blue mb-4">The Interactive Demonstration Hub</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explore our high-fidelity promotional assets, technical deep-dives, and test the protocol yourself in real-time.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Card 1 */}
        <div className="glass-panel group cursor-pointer hover:-translate-y-1 transition-transform overflow-hidden bg-white/80">
          <div className="flex flex-col md:flex-row h-full">
            <div className="relative md:w-1/2 p-2">
              <div className="w-full h-full rounded-xl overflow-hidden bg-[#1E293B]">
                 <img src="/photo1.png" alt="Feature 1" className="w-full h-full object-cover min-h-[250px]" />
              </div>
            </div>
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <h3 className="text-slate-900 font-bold text-2xl mb-3">The Alliance is Born</h3>
              <p className="text-slate-600 text-base leading-relaxed">Experience the convergence of global liquidity and decentralized validation. AnchorVault unites these ecosystems to power the next generation of seamless asset transfers.</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="glass-panel group cursor-pointer hover:-translate-y-1 transition-transform overflow-hidden bg-white/80">
          <div className="flex flex-col md:flex-row h-full">
            <div className="relative md:w-1/2 p-2">
              <div className="w-full h-full rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center">
                <img src="/photo2.png" alt="Feature 2" className="w-full h-full object-contain min-h-[250px] p-4" />
              </div>
            </div>
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <h3 className="text-slate-900 font-bold text-2xl mb-3">Solving the RWA Oracle Problem</h3>
              <p className="text-slate-600 text-base leading-relaxed">Bridging real-world assets with unmatched on-chain security. We remove single points of failure through decentralized autonomous validation networks.</p>
            </div>
          </div>
        </div>



        {/* Card 4: Sandbox */}
        <div id="simulator" className="glass-panel p-6 flex flex-col relative overflow-hidden bg-white/40">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-[#E8F5EE] text-[#10B981] rounded-xl border border-[#D1EBE0]">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Live Yield Simulator</h3>
              <p className="text-sm text-slate-500">Test the Corridor Pool Vault</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-6">
            {!isSimulating ? (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-2">Deposit Amount (USDC)</label>
                  <input type="number" defaultValue={100} className="w-full bg-white p-3.5 border border-slate-200 outline-none focus:border-virtual-green focus:ring-1 focus:ring-virtual-green rounded-xl transition-all font-medium text-slate-800 shadow-sm" readOnly />
                </div>
                <button 
                  onClick={handleSimulate}
                  className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  Simulate Deposit <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="glass-panel p-4 bg-white/80 border-virtual-green/30">
                  <p className="text-sm text-slate-500 font-medium mb-1">Minted Position</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-extrabold text-anchor-blue">{avltBalance === 0 ? '---' : avltBalance.toFixed(2)}</span>
                    <span className="text-lg font-bold text-slate-400 mb-1">$AVLT</span>
                  </div>
                  {avltBalance === 0 && <p className="text-xs text-virtual-green mt-2 animate-pulse">Routing liquidity & minting shares...</p>}
                </div>
                
                <div className="glass-panel p-4 bg-gradient-to-br from-white to-green-50/50 border-virtual-green/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Coins className="w-16 h-16 text-virtual-green" />
                  </div>
                  <p className="text-sm text-virtual-green font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-virtual-green animate-pulse"></span>
                    Live Yield Accrual
                  </p>
                  <div className="flex items-end gap-2 font-mono">
                    <span className="text-3xl font-bold text-slate-800">+{yieldAccrued.toFixed(4)}</span>
                    <span className="text-slate-500 mb-1">USDC</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsSimulating(false)}
                  className="w-full text-slate-500 hover:text-anchor-blue text-sm font-medium transition-colors"
                >
                  Reset Simulator
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default VideoHub;
