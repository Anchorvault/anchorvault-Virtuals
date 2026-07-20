import { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, ShieldCheck, Activity } from 'lucide-react';
import { sendSubscriptionEmail } from '../lib/emailService';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [queueNum, setQueueNum] = useState(0);

  const handleJoin = async (e: any) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await sendSubscriptionEmail(email);
    } catch (err) {
      console.error('Subscription error:', err);
    }
    setQueueNum(Math.floor(100 + Math.random() * 50));
    setStatus('success');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#0F172A', '#ffffff']
    });
  };

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[90vh] flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column */}
        <div className="space-y-8">

          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-anchor-blue leading-tight">
            THE VAULT IS <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-anchor-blue to-virtual-green">OPENING</span>
          </h1>
          
          <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
            Bridging global stablecoin reserves with decentralized validation networks to enable instant, zero-friction cross-border remittances. Powered by $VAULT.
          </p>

          <div className="pt-4">
            {status === 'idle' && (
              <form onSubmit={handleJoin} className="relative max-w-md">
                <div className="glass-panel p-2 flex items-center shadow-lg border-virtual-green/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-shadow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 bg-transparent border-none outline-none px-4 text-slate-800 placeholder:text-slate-400"
                    required
                  />
                  <button type="submit" className="bg-virtual-green hover:bg-virtual-greenAccent text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                    Secure Early Access
                  </button>
                </div>
              </form>
            )}

            {status === 'loading' && (
              <div className="glass-panel p-4 max-w-md flex items-center gap-4">
                <svg className="animate-spin h-8 w-8 text-virtual-green flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <p className="text-slate-600 font-medium">Securing your spot…</p>
              </div>
            )}

            {status === 'success' && (
              <div className="glass-panel p-6 max-w-md border-virtual-green bg-virtual-green/5 flex items-center gap-4">
                <CheckCircle2 className="w-10 h-10 text-virtual-green flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-anchor-blue">Access Secured!</h3>
                  <p className="text-slate-600 text-sm">You are #{queueNum} in line for the protocol launch. 🎉</p>
                </div>
              </div>
            )}
            
            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full rounded-full" />
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium text-slate-500">
                Join <strong className="text-anchor-blue">100+</strong> retail savers and LPs securing early access.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-anchor-blue/20 to-virtual-green/20 rounded-3xl blur-3xl -z-10 transform scale-95"></div>
          
          <div className="glass-panel p-4 relative overflow-hidden rounded-3xl border-white/60">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 relative group">
              {/* Loop video player */}
              <video 
                src="/video.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              ></video>
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none"></div>
            </div>
            
            {/* Trackers */}
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 glass-panel !bg-white/50 p-4 rounded-xl flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="w-5 h-5 text-anchor-blue" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Smart Contracts</p>
                  <p className="text-sm font-bold text-slate-800">ACTIVE & DEPLOYED</p>
                </div>
              </div>
              
              <div className="flex-1 glass-panel !bg-white/50 p-4 rounded-xl flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-virtual-green" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Audit Status</p>
                  <p className="text-sm font-bold text-virtual-green">100% SECURE</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
};

export default Hero;
