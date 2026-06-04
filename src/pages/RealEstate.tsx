import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Star, Key, Calculator, Landmark, ShieldCheck, ArrowRight, DollarSign } from 'lucide-react';
import { PROPERTIES } from '../data';
import { motion } from 'motion/react';

export default function RealEstate() {
  const navigate = useNavigate();

  // Calculator states
  const [purchasePrice, setPurchasePrice] = useState<number>(250000);
  const [downPayment, setDownPayment] = useState<number>(50000); // 20%
  const [interestRate, setInterestRate] = useState<number>(6.5); // 6.5% standard
  const [loanTerm, setLoanTerm] = useState<number>(30); // 30 Years
  const [monthlyEMI, setMonthlyEMI] = useState<number>(1264);

  // EMI Recalculator Engine: EMI = [P x R x (1+R)^N]/[((1+R)^N)-1]
  useEffect(() => {
    const principal = purchasePrice - downPayment;
    if (principal <= 0) {
      setMonthlyEMI(0);
      return;
    }
    const monthlyRate = (interestRate / 100) / 12;
    const totalPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      setMonthlyEMI(Math.round(principal / totalPayments));
      return;
    }

    const emi = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    setMonthlyEMI(isNaN(emi) ? 0 : Math.round(emi));
  }, [purchasePrice, downPayment, interestRate, loanTerm]);

  const handleConsultation = () => {
    // Navigate to contact and pass the service state
    navigate('/contact', { state: { service: 'realestate' } });
  };

  const selectPropertyForCalc = (price: number) => {
    setPurchasePrice(price);
    // Auto-calculate standard 20% down payment
    setDownPayment(Math.round(price * 0.20));
  };

  return (
    <div className="asphalt-blueprint min-h-screen pb-16" id="realestate-page-root">
      
      {/* Real Estate Elegant Page Header */}
      <header className="relative py-16 bg-gradient-to-b from-zinc-950 to-[#1a1a1a] border-b border-zinc-800" id="realestate-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex p-3 bg-[#00b4d8]/10 text-[#00b4d8] rounded-2xl mb-4 border border-[#00b4d8]/20">
            <HomeIcon className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            Master the Blueprints of <span className="text-[#00b4d8]">Architecture</span>
          </h1>
          <p className="text-zinc-400 font-sans text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
            Discover handpicked residential buildings, business blocks, and storage areas backfilled by professional, licensed brokerage guides who are with you from bidding to closing.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#00b4d8]/5 rounded-full blur-3xl pointer-events-none"></div>
      </header>

      {/* Property Listings (3 grid columns -> 2 columns tablet -> 1 column mobile) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="properties-grid">
        <div className="text-center mb-12">
          <span className="text-[#00b4d8] font-mono text-xs uppercase tracking-widest font-extrabold">EXCLUSIVE SELECTIONS</span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mt-1">
            Featured Portfolios & Listings
          </h2>
          <div className="w-16 h-1 bg-[#00b4d8] mx-auto mt-3 rounded-full"></div>
          <p className="text-zinc-500 text-sm max-w-md mx-auto mt-2">
            Click "Run Simulation" on any card below to automatically load its price into our real-time mortgage analyzer.
          </p>
        </div>

        {/* Triple grid layout using responsive prefixes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROPERTIES.map((property) => (
            <motion.div
              key={property.id}
              whileHover={{ y: -6 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:border-[#00b4d8]/40 shadow-xl"
              id={`property-${property.id}`}
            >
              {/* Image box with type badges */}
              <div className="relative h-56 w-full overflow-hidden bg-zinc-950">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                />
                
                {/* Type Badge */}
                <span className="absolute top-4 left-4 bg-zinc-950/90 text-white font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md border border-zinc-850">
                  {property.type}
                </span>

                {/* Price Overlaid Tag */}
                <div className="absolute bottom-4 right-4 bg-zinc-950 text-[#00b4d8] font-heading font-extrabold text-lg px-4 py-1.5 rounded-xl border border-[#00b4d8]/20 shadow-md">
                  ${property.price.toLocaleString()}
                </div>
              </div>

              {/* Text Description Box */}
              <div className="p-6">
                <h3 className="text-lg font-heading font-bold text-white mb-1.5 m-0">{property.title}</h3>
                <p className="text-xs text-zinc-500 font-sans mb-4">{property.address}</p>

                {/* Technical space measurements (bed/bath responsive grids) */}
                <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-zinc-800/80 mb-4 text-center text-xs text-zinc-300 font-mono">
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Beds</span>
                    <strong className="text-white text-sm">{property.beds ?? '—'}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Baths</span>
                    <strong className="text-white text-sm">{property.baths ?? '—'}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Space</span>
                    <strong className="text-white text-sm">{property.sqft} sqft</strong>
                  </div>
                </div>

                {/* Bullet attributes */}
                <ul className="space-y-1.5 mb-6 text-xs text-zinc-400">
                  {property.features.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00b4d8]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action section inside properties */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => selectPropertyForCalc(property.price)}
                  className="w-full py-3 px-4 rounded-xl bg-zinc-805 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-[#00b4d8] hover:border-[#00b4d8] transition-all flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Run Mortgage EMI Simulation</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Real mortgage calculator segment (User inputs data -> outputs live EMI calculations) */}
      <section className="bg-zinc-900/40 border-t border-b border-zinc-900 py-16" id="mortgage-calc-block">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-10">
            <div className="inline-flex p-2.5 bg-[#00b4d8]/10 text-[#00b4d8] rounded-xl mb-3">
              <Calculator className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight m-0">
              Interactive Mortgage Simulator
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              Adjust purchase price and details to see instant estimated monthly investments (EMI) in seconds.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Input fields panel (col-chunky) */}
            <div className="md:col-span-7 space-y-5" id="calculator-inputs">
              
              {/* Purchase Price Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Target Purchase Price ($)
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <DollarSign className="h-4.5 w-4.5" />
                  </div>
                  <input
                    type="number"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Math.max(0, parseInt(e.target.value) || 0))}
                    className="block w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-semibold tracking-wide focus:outline-none focus:border-[#00b4d8] transition-colors"
                    placeholder="Enter price (e.g. 250000)"
                    min="0"
                  />
                </div>
              </div>

              {/* Slider for down payment */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold uppercase tracking-widest text-zinc-400">
                    Down Payment ($)
                  </label>
                  <span className="text-zinc-500 font-bold font-mono">
                    {purchasePrice > 0 ? Math.round((downPayment / purchasePrice) * 100) : 0}% downpayment
                  </span>
                </div>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <DollarSign className="h-4.5 w-4.5" />
                  </div>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Math.max(0, Math.min(purchasePrice, parseInt(e.target.value) || 0)))}
                    className="block w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm font-semibold tracking-wide focus:outline-none focus:border-[#00b4d8] transition-colors"
                    placeholder="50000"
                    min="0"
                    max={purchasePrice}
                  />
                </div>
              </div>

              {/* Rate & Term sliders alongside */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#00b4d8]">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="block w-full px-3 py-2.5 bg-zinc-950 border border-zinc-850 rounded-xl text-white font-mono font-bold text-center text-sm focus:outline-none focus:border-[#00b4d8] transition-colors"
                    min="0"
                    max="30"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    Term Length (Years)
                  </label>
                  <select
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                    className="block w-full px-3 py-2.5 bg-zinc-950 border border-zinc-850 rounded-xl text-white font-mono font-bold text-center text-sm focus:outline-none focus:border-[#00b4d8] transition-colors appearance-none cursor-pointer"
                  >
                    <option value={15}>15 Years</option>
                    <option value={20}>20 Years</option>
                    <option value={30}>30 Years</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Simulated Live Outputs panel (co-chunky) */}
            <div className="md:col-span-5 bg-zinc-950 border border-zinc-800/50 p-6 rounded-2xl flex flex-col justify-center items-center text-center relative" id="calc-emi-outputs-display">
              <div className="absolute top-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[#00b4d8]/40 to-transparent"></div>
              
              <Landmark className="w-10 h-10 text-zinc-500 mb-3" />
              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">
                Estimated Monthly Cost
              </span>
              
              {/* Estimated EMI Outputs requested format */}
              <div className="text-[#00b4d8] font-heading font-extrabold text-2xl lg:text-3xl mt-2 mb-1.5">
                Estimated EMI: ${monthlyEMI.toLocaleString()}/month
              </div>

              <div className="w-full text-[10px] text-zinc-500 font-mono mt-2 border-t border-zinc-900 pt-3 flex flex-col gap-1 items-stretch">
                <div className="flex justify-between">
                  <span>Mortgage Principal:</span>
                  <span className="text-zinc-300 font-bold">${(purchasePrice - downPayment).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Down Payment Allocation:</span>
                  <span className="text-zinc-300 font-bold">${downPayment.toLocaleString()}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Consultation Request container block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="realestate-cta-consult">
        <div className="bg-gradient-to-r from-zinc-950 to-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00b4d8]/5 rounded-bl-full pointer-events-none"></div>
          
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight mb-4 m-0 leading-tight">
            Ready to Discover Off-Market Blueprints?
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            I offer a zero-cost initial consult where we can map out active zoning, neighborhood developments, and customize negotiation models.
          </p>

          <button
            onClick={handleConsultation}
            className="w-full sm:w-auto px-8 py-4 px-10 rounded-xl bg-[#00b4d8] hover:bg-[#009cb8] text-zinc-950 font-extrabold shadow-lg shadow-[#00b4d8]/10 text-base transition-all cursor-pointer min-h-[44px]"
          >
            Schedule a Free Consultation
          </button>
        </div>
      </section>

    </div>
  );
}
