import React, { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';
import { CloudinaryUpload } from './CloudinaryUpload';

export const HomeContentManager: React.FC = () => {
  const { fbDB, firebaseReady, addToast, logAction, firebase } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!firebaseReady || !fbDB) return;
    const fetchHome = async () => {
      try {
        const snap = await fbDB.collection('homeContent').doc('main').get();
        if (snap.exists) {
          setData(snap.data());
        } else {
          addToast("Home configuration file not seeded yet. Navigate back to Seed.", "error");
        }
      } catch (e: any) {
        console.error(e);
        addToast("Failed to fetch home contents: " + e.message, "error");
      } finally {
        setLoading(false);
      }
    };
    fetchHome();
  }, [firebaseReady, fbDB, addToast]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fbDB) return;
    setSaving(true);
    try {
      const payload = { ...data, updatedAt: firebase.firestore.FieldValue.serverTimestamp() };
      await fbDB.collection('homeContent').doc('main').set(payload);
      await logAction("Updated homepage hero and owner spotlight bio sections.");
      addToast("Homepage layout updated live!", "success");
    } catch (err: any) {
      addToast(err.message || "Failed to save contents", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-zinc-500 animate-pulse font-mono flex items-center justify-center p-20 py-40 gap-3">
        <i className="fa-solid fa-spinner animate-spin text-[#ff6b35]"></i>
        <span>SYNCING HOMEPAGE CONFIGURATION...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-500">No homepage content template found. Please seed the database first.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-5xl text-zinc-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-white">Home Page Content Manager</h1>
          <p className="text-xs text-zinc-500 font-heading">Instantly customize headers, carousels, and landing layouts.</p>
        </div>
        <button 
          type="submit" 
          disabled={saving} 
          className="bg-[#ff6b35] hover:bg-[#e05621] font-bold text-xs tracking-wider uppercase px-6 py-3 rounded-xl text-white text-center flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
        >
          {saving ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-cloud"></i>}
          <span>Save Changes Live</span>
        </button>
      </div>

      <div className="space-y-8">
        {/* HERO SECTION CONFIG */}
        <div className="bg-zinc-900 border border-zinc-805 p-6 rounded-2xl space-y-6">
          <h3 className="font-heading font-bold text-white text-md border-b border-zinc-800 pb-3 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#ff6b35] rounded-full inline-block"></span>
            Hero Header Copy & Directives
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-zinc-400 uppercase font-bold">Main Headline Title</label>
              <input 
                type="text" 
                value={data.hero?.headline || ""} 
                onChange={e => setData({ ...data, hero: { ...data.hero, headline: e.target.value } })} 
                className="w-full bg-[#1e1e1e] border border-zinc-805 p-3 rounded-xl text-white font-heading font-semibold text-sm focus:outline-none focus:border-orange-accent" 
                required 
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-zinc-400 uppercase font-bold">Subheading description copy</label>
              <textarea 
                value={data.hero?.subheading || ""} 
                onChange={e => setData({ ...data, hero: { ...data.hero, subheading: e.target.value } })} 
                rows={3} 
                className="w-full bg-[#1e1e1e] border border-zinc-805 p-3 rounded-xl text-white leading-relaxed resize-none focus:outline-none focus:border-orange-accent" 
                required 
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-500 uppercase font-bold font-semibold tracking-wider">Driving Course Button text</label>
              <input 
                type="text" 
                value={data.hero?.ctaDrivingText || ""} 
                onChange={e => setData({ ...data, hero: { ...data.hero, ctaDrivingText: e.target.value } })} 
                className="w-full bg-[#1e1e1e] border border-zinc-805 p-3 rounded-xl text-white font-semibold focus:outline-none" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-zinc-500 uppercase font-bold font-semibold tracking-wider">Driving Clickpath routing</label>
              <input 
                type="text" 
                value={data.hero?.ctaDrivingLink || ""} 
                onChange={e => setData({ ...data, hero: { ...data.hero, ctaDrivingLink: e.target.value } })} 
                className="w-full bg-[#1e1e1e] border border-zinc-805 p-3 rounded-xl text-white font-mono focus:outline-none" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-zinc-500 uppercase font-bold font-semibold tracking-wider">Real Estate Button text</label>
              <input 
                type="text" 
                value={data.hero?.ctaRealEstateText || ""} 
                onChange={e => setData({ ...data, hero: { ...data.hero, ctaRealEstateText: e.target.value } })} 
                className="w-full bg-[#1e1e1e] border border-zinc-805 p-3 rounded-xl text-white font-semibold focus:outline-none" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-zinc-500 uppercase font-bold font-semibold tracking-wider">Real Estate Clickpath routing</label>
              <input 
                type="text" 
                value={data.hero?.ctaRealEstateLink || ""} 
                onChange={e => setData({ ...data, hero: { ...data.hero, ctaRealEstateLink: e.target.value } })} 
                className="w-full bg-[#1e1e1e] border border-zinc-805 p-3 rounded-xl text-white font-mono focus:outline-none" 
              />
            </div>

            {/* HERO CAROUSEL BANNERS */}
            <div className="md:col-span-2 pt-4 border-t border-zinc-850 space-y-4">
              <h4 className="font-heading font-bold text-white text-xs uppercase tracking-widest text-[#00b4d8]">Landing Billboard Carousels</h4>
              <p className="text-[11px] text-zinc-500 leading-none">Choose up to 3 background sliding banners. Upload sizes around 1600x900px are ideal.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[0, 1, 2].map(idx => (
                  <CloudinaryUpload 
                    key={idx} 
                    currentUrl={data.hero?.images?.[idx] || ""} 
                    onUploadComplete={(url) => {
                      const list = [...(data.hero?.images || [])];
                      list[idx] = url;
                      setData({ ...data, hero: { ...data.hero, images: list } });
                    }} 
                    label={`Background Slide #${idx + 1}`} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DUAL CARDS PREVIEW */}
        <div className="bg-zinc-900 border border-zinc-805 p-6 rounded-2xl space-y-6">
          <h3 className="font-heading font-bold text-white text-md border-b border-zinc-800 pb-3 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-teal-accent rounded-full inline-block"></span>
            Split Track Directives Overview
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DRIVING SECTION CARD */}
            <div className="space-y-4 bg-zinc-950/60 p-4 rounded-xl border border-zinc-800">
              <h4 className="font-heading font-bold text-orange-accent text-sm border-b border-zinc-900 pb-2">🚗 Driving Track Summary</h4>
              <div className="space-y-2 text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono font-bold text-zinc-500">Card Title</label>
                  <input 
                    type="text" 
                    value={data.dualCards?.driving?.title || ""} 
                    onChange={e => {
                      const next = { ...data.dualCards };
                      next.driving = { ...next.driving, title: e.target.value };
                      setData({ ...data, dualCards: next });
                    }} 
                    className="w-full bg-[#1e1e1e] border border-zinc-805 p-2.5 rounded-lg text-white" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono font-bold text-zinc-500">Base Price Unit ($ USD)</label>
                  <input 
                    type="number" 
                    value={data.dualCards?.driving?.price || ""} 
                    onChange={e => {
                      const next = { ...data.dualCards };
                      next.driving = { ...next.driving, price: e.target.value };
                      setData({ ...data, dualCards: next });
                    }} 
                    className="w-full bg-[#1e1e1e] border border-zinc-805 p-2.5 rounded-lg text-white" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono font-bold text-zinc-500">Description text</label>
                  <textarea 
                    value={data.dualCards?.driving?.description || ""} 
                    onChange={e => {
                      const next = { ...data.dualCards };
                      next.driving = { ...next.driving, description: e.target.value };
                      setData({ ...data, dualCards: next });
                    }} 
                    rows={3} 
                    className="w-full bg-[#1e1e1e] border border-zinc-805 p-2.5 rounded-lg text-white resize-none" 
                  />
                </div>
                <CloudinaryUpload 
                  currentUrl={data.dualCards?.driving?.imageUrl || ""} 
                  onUploadComplete={(url) => {
                    const next = { ...data.dualCards };
                    next.driving = { ...next.driving, imageUrl: url };
                    setData({ ...data, dualCards: next });
                  }} 
                  label="Promo Header Photo" 
                />
              </div>
            </div>

            {/* REAL ESTATE SECTION CARD */}
            <div className="space-y-4 bg-zinc-950/60 p-4 rounded-xl border border-zinc-800">
              <h4 className="font-heading font-bold text-teal-accent text-sm border-b border-zinc-900 pb-2">🏠 Real Estate Overview</h4>
              <div className="space-y-2 text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono font-bold text-zinc-500">Card Title</label>
                  <input 
                    type="text" 
                    value={data.dualCards?.realEstate?.title || ""} 
                    onChange={e => {
                      const next = { ...data.dualCards };
                      next.realEstate = { ...next.realEstate, title: e.target.value };
                      setData({ ...data, dualCards: next });
                    }} 
                    className="w-full bg-[#1e1e1e] border border-zinc-805 p-2.5 rounded-lg text-white" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono font-bold text-zinc-500">Consult Price limit ($ USD)</label>
                  <input 
                    type="number" 
                    value={data.dualCards?.realEstate?.price || ""} 
                    onChange={e => {
                      const next = { ...data.dualCards };
                      next.realEstate = { ...next.realEstate, price: e.target.value };
                      setData({ ...data, dualCards: next });
                    }} 
                    className="w-full bg-[#1e1e1e] border border-zinc-805 p-2.5 rounded-lg text-white" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono font-bold text-zinc-500">Description text</label>
                  <textarea 
                    value={data.dualCards?.realEstate?.description || ""} 
                    onChange={e => {
                      const next = { ...data.dualCards };
                      next.realEstate = { ...next.realEstate, description: e.target.value };
                      setData({ ...data, dualCards: next });
                    }} 
                    rows={3} 
                    className="w-full bg-[#1e1e1e] border border-zinc-805 p-2.5 rounded-lg text-white resize-none" 
                  />
                </div>
                <CloudinaryUpload 
                  currentUrl={data.dualCards?.realEstate?.imageUrl || ""} 
                  onUploadComplete={(url) => {
                    const next = { ...data.dualCards };
                    next.realEstate = { ...next.realEstate, imageUrl: url };
                    setData({ ...data, dualCards: next });
                  }} 
                  label="Promo Header Photo" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* OWNER SPOTLIGHT BIOGRAPHY */}
        <div className="bg-zinc-900 border border-zinc-805 p-6 rounded-2xl space-y-6">
          <h3 className="font-heading font-bold text-white text-md border-b border-zinc-800 pb-3 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-zinc-400 rounded-full inline-block"></span>
            Managing Principal Bio & Spotlight
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-bold text-zinc-400">Principal Professional name</label>
                <input 
                  type="text" 
                  value={data.ownerSpotlight?.name || ""} 
                  onChange={e => setData({ ...data, ownerSpotlight: { ...data.ownerSpotlight, name: e.target.value } })} 
                  className="w-full bg-[#1e1e1e] border border-zinc-805 p-3 rounded-xl text-white text-sm" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-bold text-zinc-400">Statement Quote Bio</label>
                <textarea 
                  value={data.ownerSpotlight?.bio || ""} 
                  onChange={e => setData({ ...data, ownerSpotlight: { ...data.ownerSpotlight, bio: e.target.value } })} 
                  rows={4} 
                  className="w-full bg-[#1e1e1e] border border-zinc-805 p-3 rounded-xl text-white text-xs leading-relaxed resize-none" 
                />
              </div>
            </div>
            <div>
              <CloudinaryUpload 
                currentUrl={data.ownerSpotlight?.photoUrl || ""} 
                onUploadComplete={(url) => {
                  setData({ ...data, ownerSpotlight: { ...data.ownerSpotlight, photoUrl: url } });
                }} 
                label="Portrait Headshot Image" 
              />
            </div>
          </div>
        </div>

        {/* "Last saved" timestamp display */}
        <p className="text-[10px] font-mono text-zinc-650 uppercase text-center sm:text-left text-zinc-550">
          Last saved configuration: {data.updatedAt ? (data.updatedAt.seconds ? new Date(data.updatedAt.seconds * 1000).toLocaleString() : new Date(data.updatedAt).toLocaleString()) : "Not saved yet in this session"}
        </p>
      </div>
    </form>
  );
};
