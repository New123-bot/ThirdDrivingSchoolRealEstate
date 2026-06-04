import React, { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';
import { CloudinaryUpload } from './CloudinaryUpload';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  buttonText: string;
  duration?: string;
}

interface Instructor {
  id: string;
  name: string;
  experience: string;
  specialty: string;
  avatarUrl: string;
  rating: number;
}

interface Testimonial {
  id: string;
  studentName: string;
  reviewText: string;
  rating: number;
  date: string;
}

interface DrivingData {
  pricingPlans: PricingPlan[];
  instructors: Instructor[];
  testimonials: Testimonial[];
  cta: {
    buttonText: string;
    buttonLink: string;
  };
}

export const DrivingManager: React.FC = () => {
  const { fbDB, firebaseReady, addToast, logAction, firebase } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<DrivingData | null>(null);

  // Dialog deletion prompts
  const [deleteModal, setDeleteModal] = useState({ show: false, listName: '' as 'pricingPlans' | 'instructors' | 'testimonials', index: -1 });

  // Item modals state (For Add/Edit of Plans, Instructors, Testimonials)
  const [planModal, setPlanModal] = useState({ 
    show: false, 
    index: -1, 
    payload: { id: '', name: '', price: 0, features: '', buttonText: 'Book This Program', duration: '' } 
  });
  
  const [instModal, setInstModal] = useState({ 
    show: false, 
    index: -1, 
    payload: { id: '', name: '', experience: '5+ Years', specialty: '', avatarUrl: '', rating: 5 } 
  });
  
  const [testiModal, setTestiModal] = useState({ 
    show: false, 
    index: -1, 
    payload: { id: '', studentName: '', reviewText: '', rating: 5, date: 'June 2026' } 
  });

  useEffect(() => {
    if (!firebaseReady || !fbDB) return;
    const fetchDriving = async () => {
      try {
        const snap = await fbDB.collection('drivingContent').doc('main').get();
        if (snap.exists) {
          setData(snap.data() as DrivingData);
        } else {
          addToast("Driving Academy content is blank. Please seed from the Hub first.", "error");
        }
      } catch (e: any) {
        console.error(e);
        addToast("Failed to fetch driving contents: " + e.message, "error");
      } finally {
        setLoading(false);
      }
    };
    fetchDriving();
  }, [firebaseReady, fbDB, addToast]);

  const handleSave = async () => {
    if (!fbDB || !data) return;
    setSaving(true);
    try {
      const payload = { ...data, updatedAt: firebase.firestore.FieldValue.serverTimestamp() };
      await fbDB.collection('drivingContent').doc('main').set(payload);
      await logAction("Updated Driving Academy curriculum, rate listings, or testimonials.");
      addToast("Driving academy metrics synced dynamically!", "success");
    } catch (err: any) {
      addToast(err.message || "Failed to update metrics", "error");
    } finally {
      setSaving(false);
    }
  };

  // CRUD - Plans
  const savePlanItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    
    const nextPlans = [...(data.pricingPlans || [])];
    const featuresArray = planModal.payload.features.split('\n').filter(Boolean);
    const item: PricingPlan = { 
      id: planModal.payload.id || 'pkg-' + Date.now(),
      name: planModal.payload.name,
      price: Number(planModal.payload.price),
      buttonText: planModal.payload.buttonText,
      features: featuresArray,
      duration: planModal.payload.duration || undefined
    };

    if (planModal.index === -1) {
      nextPlans.push(item);
    } else {
      nextPlans[planModal.index] = item;
    }

    setData({ ...data, pricingPlans: nextPlans });
    setPlanModal({ show: false, index: -1, payload: { id: '', name: '', price: 0, features: '', buttonText: 'Book This Program', duration: '' } });
  };

  // CRUD - Instructors
  const saveInstructorItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    
    const nextList = [...(data.instructors || [])];
    const item: Instructor = { 
      id: instModal.payload.id || 'inst-' + Date.now(),
      name: instModal.payload.name,
      experience: instModal.payload.experience,
      specialty: instModal.payload.specialty,
      avatarUrl: instModal.payload.avatarUrl,
      rating: Number(instModal.payload.rating) 
    };

    if (instModal.index === -1) {
      nextList.push(item);
    } else {
      nextList[instModal.index] = item;
    }

    setData({ ...data, instructors: nextList });
    setInstModal({ show: false, index: -1, payload: { id: '', name: '', experience: '5+ Years', specialty: '', avatarUrl: '', rating: 5 } });
  };

  // CRUD - Testimonials
  const saveTestiItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    
    const nextList = [...(data.testimonials || [])];
    const item: Testimonial = { 
      id: testiModal.payload.id || 'test-' + Date.now(),
      studentName: testiModal.payload.studentName,
      reviewText: testiModal.payload.reviewText,
      rating: Number(testiModal.payload.rating),
      date: testiModal.payload.date 
    };

    if (testiModal.index === -1) {
      nextList.push(item);
    } else {
      nextList[testiModal.index] = item;
    }

    setData({ ...data, testimonials: nextList });
    setTestiModal({ show: false, index: -1, payload: { id: '', studentName: '', reviewText: '', rating: 5, date: 'June 2026' } });
  };

  // Delete triggers
  const confirmDeleteElement = () => {
    if (!data) return;
    const { listName, index } = deleteModal;
    const nextList = [...data[listName]];
    nextList.splice(index, 1);
    setData({ ...data, [listName]: nextList });
    setDeleteModal({ show: false, listName: 'pricingPlans', index: -1 });
    addToast("Element deleted. Click Save changes below to update live database.", "success");
  };

  if (loading) {
    return (
      <div className="text-zinc-500 animate-pulse font-mono flex items-center justify-center p-20 py-40 gap-3">
        <i className="fa-solid fa-spinner animate-spin text-[#ff6b35]"></i>
        <span>SYNCING DRIVING DATA STREAM...</span>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8 max-w-5xl text-zinc-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-white">Driving Academy Portfolio</h1>
          <p className="text-xs text-zinc-500 font-heading tracking-wide">Configure tuition plans, instructors databases, and testimonials.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving} 
          className="bg-orange-accent hover:bg-[#e05621] font-bold text-xs tracking-wider uppercase px-6 py-3 rounded-xl text-white text-center flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
        >
          {saving ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-cloud"></i>}
          <span>Save Database Parameters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        
        {/* PRICING PLANS */}
        <div className="bg-zinc-900 border border-zinc-805 p-6 rounded-2xl">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-6">
            <h3 className="font-heading font-bold text-white text-md flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#ff6b35] inline-block rounded"></span>
              Active Tuition Pricing Packages
            </h3>
            <button 
              onClick={() => setPlanModal({ show: true, index: -1, payload: { id: '', name: '', price: 299, features: '', buttonText: 'Book This Program', duration: '' } })} 
              className="p-2 px-3.5 bg-zinc-805 hover:bg-zinc-700 rounded-lg text-[10px] uppercase font-bold text-white tracking-widest flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-plus text-orange-accent"></i> Add Package
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(data.pricingPlans || []).map((pkg, idx) => (
              <div key={pkg.id || idx} className="bg-zinc-950 p-5 rounded-xl border border-zinc-805 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500">Duration Info: {pkg.duration || 'Flexible'}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setPlanModal({ 
                          show: true, 
                          index: idx, 
                          payload: { 
                            id: pkg.id, 
                            name: pkg.name, 
                            price: pkg.price, 
                            features: (pkg.features || []).join('\n'), 
                            buttonText: pkg.buttonText, 
                            duration: pkg.duration || '' 
                          } 
                        })} 
                        className="text-zinc-500 hover:text-white text-xs cursor-pointer"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button 
                        onClick={() => setDeleteModal({ show: true, listName: 'pricingPlans', index: idx })} 
                        className="text-zinc-500 hover:text-red-400 text-xs cursor-pointer"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                  <h4 className="text-md font-heading font-bold text-white mt-1.5 mb-1">{pkg.name}</h4>
                  <strong className="text-orange-accent font-heading text-lg block mb-4">${pkg.price}</strong>
                  <ul className="space-y-1.5 text-xs text-zinc-400">
                    {(pkg.features || []).map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[#ff6b35] rounded-full inline-block"></span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INSTRUCTORS GRID */}
        <div className="bg-zinc-900 border border-zinc-805 p-6 rounded-2xl">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-6">
            <h3 className="font-heading font-bold text-white text-md flex items-center gap-2">
              <span className="w-1.5 h-6 bg-teal-accent inline-block rounded"></span>
              Driving Instructors Database
            </h3>
            <button 
              onClick={() => setInstModal({ show: true, index: -1, payload: { id: '', name: '', experience: '5+ Years', specialty: '', avatarUrl: '', rating: 5 } })} 
              className="p-2 px-3.5 bg-zinc-805 hover:bg-zinc-700 rounded-lg text-[10px] uppercase font-bold text-white tracking-widest flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-plus text-[#00b4d8]"></i> Add Coach
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(data.instructors || []).map((ins, idx) => (
              <div key={ins.id || idx} className="bg-zinc-950 p-5 rounded-xl border border-zinc-805 flex flex-col justify-between items-center text-center">
                <div className="w-full flex justify-end gap-2 mb-2">
                  <button 
                    onClick={() => setInstModal({ show: true, index: idx, payload: ins })} 
                    className="text-zinc-500 hover:text-white text-xs cursor-pointer"
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button 
                    onClick={() => setDeleteModal({ show: true, listName: 'instructors', index: idx })} 
                    className="text-zinc-500 hover:text-red-400 text-xs cursor-pointer"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>

                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-orange-accent/30 mb-3 bg-zinc-900">
                  {ins.avatarUrl ? <img src={ins.avatarUrl} className="w-full h-full object-cover" alt="Avatar" /> : <div className="text-xs text-zinc-700 flex items-center justify-center h-full"><i className="fa-solid fa-user-gear"></i></div>}
                </div>

                <h4 className="font-heading font-bold text-white text-sm leading-tight m-0">{ins.name}</h4>
                <span className="text-[10px] text-zinc-500 mt-1 uppercase font-mono tracking-widest">{ins.experience} Experience</span>
                <p className="text-zinc-400 text-xs my-2.5 leading-relaxed min-h-[36px]">{ins.specialty || 'General Safety Curriculum Coach'}</p>
                
                <div className="flex items-center gap-1 mt-1 text-xs font-mono text-orange-accent font-bold">
                  <i className="fa-solid fa-star"></i>
                  <span>{ins.rating} Rating</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="bg-zinc-900 border border-zinc-805 p-6 rounded-2xl">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-6">
            <h3 className="font-heading font-bold text-white text-md flex items-center gap-2">
              <span className="w-1.5 h-6 bg-zinc-400 inline-block rounded"></span>
              Active Customer Testimonials
            </h3>
            <button 
              onClick={() => setTestiModal({ show: true, index: -1, payload: { id: '', studentName: '', reviewText: '', rating: 5, date: 'June 2026' } })} 
              className="p-2 px-3.5 bg-zinc-805 hover:bg-zinc-700 rounded-lg text-[10px] uppercase font-bold text-white tracking-widest flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-plus text-zinc-400"></i> Add Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(data.testimonials || []).map((t, idx) => (
              <div key={t.id || idx} className="bg-zinc-950 p-5 rounded-xl border border-zinc-850 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex gap-1 text-orange-accent text-[10px]">
                      {Array.from({ length: Math.floor(t.rating) }).map((_, i) => (
                        <i key={i} className="fa-solid fa-star"></i>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setTestiModal({ show: true, index: idx, payload: t })} 
                        className="text-zinc-500 hover:text-white text-xs cursor-pointer"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button 
                        onClick={() => setDeleteModal({ show: true, listName: 'testimonials', index: idx })} 
                        className="text-zinc-500 hover:text-red-400 text-xs cursor-pointer"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                  <blockquote className="text-zinc-300 text-xs leading-relaxed italic mb-4">"{t.reviewText}"</blockquote>
                </div>
                <div className="flex justify-between items-center border-t border-[#111] pt-3 text-[10px] text-zinc-500 uppercase font-mono">
                  <span>{t.studentName}</span>
                  <span>{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="bg-zinc-900 border border-zinc-805 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 text-xs">
            <label className="text-xs uppercase font-bold text-zinc-400">Class Signup CTA Button Caption</label>
            <input 
              type="text" 
              value={data.cta?.buttonText || ""} 
              onChange={e => setData({ ...data, cta: { ...data.cta, buttonText: e.target.value } })} 
              className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white text-sm focus:outline-none" 
            />
          </div>
          <div className="space-y-1 text-xs">
            <label className="text-xs uppercase font-bold text-zinc-400">Target Relative Routing Clickpath</label>
            <input 
              type="text" 
              value={data.cta?.buttonLink || ""} 
              onChange={e => setData({ ...data, cta: { ...data.cta, buttonLink: e.target.value } })} 
              className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white text-sm font-mono focus:outline-none" 
            />
          </div>
        </div>

      </div>

      {/* EDIT PLANS MODAL */}
      {planModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h4 className="font-heading font-bold text-white text-lg">{planModal.index === -1 ? 'Add Tuition Package' : 'Edit Tuition Package'}</h4>
            <form onSubmit={savePlanItem} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-zinc-500 uppercase tracking-widest font-bold">Package Headline Title</label>
                <input type="text" value={planModal.payload.name} onChange={e => setPlanModal({ ...planModal, payload: { ...planModal.payload, name: e.target.value } })} required className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-500 uppercase tracking-widest font-bold">Package Price ($ USD)</label>
                  <input type="number" value={planModal.payload.price} onChange={e => setPlanModal({ ...planModal, payload: { ...planModal.payload, price: Number(e.target.value) } })} required className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-500 uppercase tracking-widest font-bold">Duration Tag (e.g. 10 Hours)</label>
                  <input type="text" value={planModal.payload.duration || ""} onChange={e => setPlanModal({ ...planModal, payload: { ...planModal.payload, duration: e.target.value } })} placeholder="Flexible" className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white focus:outline-none" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-zinc-500 uppercase tracking-widest font-bold">Inclusions Features (One per line)</label>
                <textarea value={planModal.payload.features} onChange={e => setPlanModal({ ...planModal, payload: { ...planModal.payload, features: e.target.value } })} rows={4} placeholder="Parallel parking prep&#10;Highway confidence..." required className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white leading-relaxed resize-none focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-zinc-500 uppercase tracking-widest font-bold">CTA Button Label</label>
                <input type="text" value={planModal.payload.buttonText} onChange={e => setPlanModal({ ...planModal, payload: { ...planModal.payload, buttonText: e.target.value } })} required className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white focus:outline-none" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setPlanModal({ show: false, index: -1, payload: { id: '', name: '', price: 0, features: '', buttonText: '', duration: '' } })} className="px-4 py-2 bg-zinc-800 text-white font-bold rounded-lg hover:bg-zinc-700 cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-orange-accent text-white font-extrabold rounded-lg hover:bg-[#e05621] cursor-pointer">Save Item</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT INSTRUCTOR MODAL */}
      {instModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-805 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h4 className="font-heading font-bold text-white text-lg">{instModal.index === -1 ? 'Add Instructor' : 'Edit Instructor Details'}</h4>
            <form onSubmit={saveInstructorItem} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-zinc-500 uppercase tracking-widest font-bold">Full Name</label>
                <input type="text" value={instModal.payload.name} onChange={e => setInstModal({ ...instModal, payload: { ...instModal.payload, name: e.target.value } })} required className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-500 uppercase tracking-widest font-bold">Experience (e.g. 5+ Years)</label>
                  <input type="text" value={instModal.payload.experience} onChange={e => setInstModal({ ...instModal, payload: { ...instModal.payload, experience: e.target.value } })} required className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-500 uppercase tracking-widest font-bold">Rating Scale (1 - 5)</label>
                  <input type="number" step="0.1" min="1" max="5" value={instModal.payload.rating} onChange={e => setInstModal({ ...instModal, payload: { ...instModal.payload, rating: Number(e.target.value) } })} required className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white focus:outline-none" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-zinc-500 uppercase tracking-widest font-bold">Focus Specialties</label>
                <input type="text" value={instModal.payload.specialty} onChange={e => setInstModal({ ...instModal, payload: { ...instModal.payload, specialty: e.target.value } })} required className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white focus:outline-none font-semibold" placeholder="Highway Merges, Weather drills..." />
              </div>
              <CloudinaryUpload 
                currentUrl={instModal.payload.avatarUrl} 
                onUploadComplete={(url) => setInstModal({ ...instModal, payload: { ...instModal.payload, avatarUrl: url } })} 
                label="Instructor Avatar File" 
              />
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setInstModal({ show: false, index: -1, payload: { id: '', name: '', experience: '', specialty: '', avatarUrl: '', rating: 5 } })} className="px-4 py-2 bg-zinc-800 text-white font-bold rounded-lg hover:bg-zinc-700 cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#ff6b35] text-white font-extrabold rounded-lg hover:bg-[#e05621] cursor-pointer">Save Item</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT TESTIMONIAL MODAL */}
      {testiModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h4 className="font-heading font-bold text-white text-lg">{testiModal.index === -1 ? 'Add Testimonial' : 'Edit Testimonial'}</h4>
            <form onSubmit={saveTestiItem} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-500 uppercase tracking-widest font-bold">Student Full Name</label>
                  <input type="text" value={testiModal.payload.studentName} onChange={e => setTestiModal({ ...testiModal, payload: { ...testiModal.payload, studentName: e.target.value } })} required className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-500 uppercase tracking-widest font-bold">Verification Date</label>
                  <input type="text" value={testiModal.payload.date} onChange={e => setTestiModal({ ...testiModal, payload: { ...testiModal.payload, date: e.target.value } })} placeholder="May 2026" required className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white focus:outline-none" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-zinc-500 uppercase tracking-widest font-bold">Review Description Narrative</label>
                <textarea value={testiModal.payload.reviewText} onChange={e => setTestiModal({ ...testiModal, payload: { ...testiModal.payload, reviewText: e.target.value } })} rows={3} required className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white leading-relaxed resize-none focus:outline-none" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setTestiModal({ show: false, index: -1, payload: { id: '', studentName: '', reviewText: '', rating: 5, date: '' } })} className="px-4 py-2 bg-zinc-800 text-white font-bold rounded-lg hover:bg-zinc-700 cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#ff6b35] text-white font-extrabold rounded-lg hover:bg-[#e05621] cursor-pointer">Save Item</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GENERIC CONFIRM DELETION DIALOG */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-950/40 text-red-400 mx-auto flex items-center justify-center text-lg">
              <i className="fa-solid fa-triangle-exclamation animate-bounce"></i>
            </div>
            <h4 className="font-heading font-bold text-white text-md">Confirm element removal</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">Are you sure you want to delete this element? This action will remove the item from temporary lists until you save the database parameters.</p>
            <div className="flex justify-center gap-3 pt-2">
              <button onClick={() => setDeleteModal({ show: false, listName: 'pricingPlans', index: -1 })} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg text-xs cursor-pointer">Keep Item</button>
              <button onClick={confirmDeleteElement} className="px-5 py-2 bg-red-650 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-lg text-xs cursor-pointer">Confirm Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
