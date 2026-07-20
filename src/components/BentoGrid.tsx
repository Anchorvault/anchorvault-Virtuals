import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';

const curveData = Array.from({ length: 21 }, (_, i) => {
  const util = i * 5; // 0 to 100
  let rate;
  if (util <= 80) {
    rate = (util / 80) * 10; // Gentle slope to 10%
  } else {
    rate = 10 + ((util - 80) / 20) * 40; // Steep slope to 50%
  }
  return { utilization: util, rate };
});

const BentoGrid = () => {
  return (
    <section id="architecture" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-50/50 rounded-[3rem] my-12 shadow-inner border border-slate-200/50">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-anchor-blue mb-4">Technical Architecture</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          The inner mechanics of our smart contract suite powering the next generation of cross-border settlements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
        
        {/* Card 1: 3-Step Lifecycle */}
        <div className="glass-panel p-8 md:col-span-1 flex flex-col group relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-anchor-blue/5 rounded-full blur-3xl"></div>
          <h3 className="text-2xl font-bold text-anchor-blue mb-6">Capital Flow</h3>
          <div className="flex-1 flex flex-col justify-between relative z-10">
            {[
              { step: '1', title: 'LP Provisioning', desc: 'Liquidity Providers supply USDC.' },
              { step: '2', title: 'Anchor Whitelisting', desc: 'Verified local anchors connect.' },
              { step: '3', title: 'Liquidity Routing', desc: 'Zero-friction settlement occurs.' }
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/60 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                <div className="w-8 h-8 rounded-full bg-anchor-blue text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {s.step}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">{s.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Two-Slope Curve */}
        <div className="glass-panel p-8 md:col-span-2 flex flex-col relative">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-anchor-blue">Mathematical Security</h3>
              <p className="text-sm text-slate-500 mt-1">Two-Slope Pool Utilization Curve</p>
            </div>
            <div className="px-3 py-1 bg-virtual-green/10 text-virtual-green rounded-full text-xs font-bold border border-virtual-green/20">
              Optimal: 80%
            </div>
          </div>
          
          <div className="flex-1 w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={curveData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="utilization" stroke="#94a3b8" fontSize={12} tickFormatter={(val) => `${val}%`} />
                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(val) => `${val}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  formatter={(value: any) => [`${Number(value).toFixed(1)}%`, 'Borrow Rate']}
                  labelFormatter={(label) => `Utilization: ${label}%`}
                />
                <ReferenceLine x={80} stroke="#10B981" strokeDasharray="3 3" />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="url(#colorRate)" 
                  strokeWidth={4} 
                  dot={false}
                  activeDot={{ r: 6, fill: '#10B981', stroke: '#fff', strokeWidth: 2 }}
                />
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1E3A8A" />
                    <stop offset="80%" stopColor="#1E3A8A" />
                    <stop offset="81%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 3: The Anchor Registry */}
        <div className="glass-panel p-8 md:col-span-1 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-virtual-green to-transparent opacity-50"></div>
          <h3 className="text-xl font-bold text-anchor-blue mb-2 text-center">Anchor Registry</h3>
          <p className="text-xs text-slate-500 mb-8 text-center">Dynamic Reputation Score</p>
          
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Mock Gauge using SVG */}
            <svg viewBox="0 0 100 50" className="w-full absolute top-0 overflow-visible">
              <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round" />
              <motion.path 
                d="M 10 50 A 40 40 0 0 1 90 50" 
                fill="none" 
                stroke="#10B981" 
                strokeWidth="8" 
                strokeLinecap="round"
                strokeDasharray="125"
                initial={{ strokeDashoffset: 125 }}
                animate={{ strokeDashoffset: 125 - (125 * 0.98) }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </svg>
            <div className="mt-12 text-center">
              <div className="text-4xl font-extrabold text-slate-800">980</div>
              <div className="text-sm font-medium text-slate-400">/ 1000</div>
            </div>
            
            <div className="absolute bottom-0 w-full flex justify-between px-2 text-[10px] font-bold text-slate-400">
              <span>RISK</span>
              <span>PRIME</span>
            </div>
          </div>
        </div>

        {/* Card 4: Ecosystem Synergies */}
        <div className="glass-panel p-8 md:col-span-2 flex flex-col relative overflow-hidden bg-gradient-to-br from-white/60 to-slate-100/60">
          <div className="z-10 relative">
            <h3 className="text-2xl font-bold text-anchor-blue">Ecosystem Synergies</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm">Solving the RWA Oracle Problem with @virtuals_io autonomous validation agents.</p>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-end pr-12 opacity-80 pointer-events-none">
            {/* Network Visualization Mock */}
            <div className="relative w-64 h-64">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-anchor-blue rounded-full shadow-[0_0_30px_rgba(30,58,138,0.5)] z-20 flex items-center justify-center">
                <img src="/logo.png" className="w-8 h-8" alt="AnchorVault" />
              </div>
              
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <motion.div 
                  key={i}
                  className="absolute top-1/2 left-1/2 w-full h-px origin-left"
                  style={{ rotate: angle }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                >
                  <div className="absolute right-0 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white border-2 border-virtual-green rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)] z-30 flex items-center justify-center">
                    <img src="/virtual-logo.png" className="w-5 h-5 opacity-80" alt="Agent" />
                  </div>
                  {/* Flowing particles */}
                  <motion.div 
                    className="absolute left-0 -translate-y-1/2 w-2 h-2 bg-virtual-green rounded-full shadow-[0_0_10px_#10B981]"
                    animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                </motion.div>
              ))}
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-slate-300 rounded-full border-dashed animate-[spin_20s_linear_infinite]"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BentoGrid;
