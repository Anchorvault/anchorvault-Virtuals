import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { sendWaitlistEmail } from '../lib/emailService';

type Status = 'idle' | 'loading' | 'success' | 'error';

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 3, hours: 23, minutes: 59, seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) { seconds--; }
        else {
          seconds = 59;
          if (minutes > 0) { minutes--; }
          else {
            minutes = 59;
            if (hours > 0) { hours--; }
            else {
              hours = 23;
              if (days > 0) { days--; }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      await sendWaitlistEmail(email);

      setStatus('success');
      localStorage.setItem('anchorvault_waitlist', email);

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#10B981', '#1E3A8A', '#ffffff']
      });
    } catch (err) {
      console.error('EmailJS error:', err);
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section id="waitlist-section" className="py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="glass-panel p-10 md:p-16 relative overflow-hidden">
        {/* Decorative background blurs */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-anchor-blue via-virtual-green to-anchor-blue"></div>
        <div className="absolute -left-32 -top-32 w-64 h-64 bg-anchor-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute -right-32 -bottom-32 w-64 h-64 bg-virtual-green/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-center">
          <h2 className="text-5xl font-extrabold text-anchor-blue mb-4 tracking-tight">Countdown to Genesis</h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium">
            While traditional RWA protocols lock you out with $100K minimum buy-ins,
            <strong className="text-anchor-blue"> AnchorVault opens the gate. </strong>
            Start micro-investing from just $10.
          </p>

          {/* Countdown Timer */}
          <div className="flex justify-center gap-4 sm:gap-8 mb-16">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="flex flex-col items-center">
                <div className="w-20 h-24 sm:w-24 sm:h-28 glass-panel !bg-white flex items-center justify-center rounded-2xl border-slate-200/60 shadow-lg mb-3">
                  <span className="text-4xl sm:text-5xl font-black text-slate-800 font-mono">
                    {value.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest">{unit}</span>
              </div>
            ))}
          </div>

          {/* Registration Form / States */}
          <div className="max-w-xl mx-auto">

            {/* ── IDLE / ERROR state: show form ── */}
            {(status === 'idle' || status === 'error') && (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your best email address..."
                  className="flex-1 px-6 py-4 rounded-xl border border-slate-300 focus:border-virtual-green focus:ring-2 focus:ring-virtual-green/20 outline-none text-lg shadow-inner bg-white/80"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-xl font-bold text-white bg-anchor-blue hover:bg-anchor-blueAccent transition-all shadow-xl hover:shadow-2xl border border-transparent hover:border-virtual-green/50 flex-shrink-0"
                >
                  Join the Waitlist
                </button>
              </form>
            )}

            {/* ── LOADING state: spinning circle ── */}
            {status === 'loading' && (
              <div className="flex flex-col items-center justify-center gap-4 py-6">
                <svg
                  className="animate-spin h-12 w-12 text-anchor-blue"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12" cy="12" r="10"
                    stroke="currentColor" strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <p className="text-slate-500 font-medium text-lg">Securing your spot…</p>
              </div>
            )}

            {/* ── SUCCESS state: Access Secured card ── */}
            {status === 'success' && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-6 max-w-md mx-auto">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-[3px] border-[#0eb076] flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#0eb076]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-[#0f172a] mb-1">Access Secured!</h3>
                  <p className="text-[#64748b] text-base font-medium">
                    You are #102 in line for the protocol launch. Check your inbox — a welcome email is on its way! 🎉
                  </p>
                </div>
              </div>
            )}

            {/* ── ERROR message ── */}
            {status === 'error' && errorMsg && (
              <p className="mt-3 text-red-500 text-sm font-medium text-center">{errorMsg}</p>
            )}

            <p className="mt-6 text-sm text-slate-500 flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-virtual-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Your data is secured by zero-knowledge encrypted vaults.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Waitlist;
