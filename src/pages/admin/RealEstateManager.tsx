import React, { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';
import { CloudinaryUpload } from './CloudinaryUpload';

interface PropertyList {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  description: string;
  featured: boolean;
}

interface RealEstateData {
  properties: PropertyList[];
  mortgageSettings: {
    interestRate: number;
    loanTermYears: number;
    helpText: string;
  };
  cta: {
    buttonText: string;
    buttonLink: string;
  };
}

export const RealEstateManager: React.FC = () => {
  const { fbDB, firebaseReady, addToast, logAction, firebase } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<RealEstateData | null>(null);

  const [deleteModal, setDeleteModal] = useState({ show: false, index: -1 });
  const [propertyModal, setPropertyModal] = useState<{
    show: boolean;
    index: number;
    payload: Partial<PropertyList>;
  }>({ 
    show: false, 
    index: -1, 
    payload: {} 
  });

  useEffect(() => {
    if (!firebaseReady || !fbDB) return;
    const fetchProperties = async () => {
      try {
        const snap = await fbDB.collection('realEstateContent').doc('main').get();
        if (snap.exists) {
          setData(snap.data() as RealEstateData);
        } else {
          addToast("Real Estate documents are missing. Please seed from the Hub.", "error");
        }
      } catch (e: any) {
        console.error(e);
        addToast("Failed to fetch real estate listings: " + e.message, "error");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [firebaseReady, fbDB, addToast]);

  const handleSave = async () => {
    if (!fbDB || !data) return;
    setSaving(true);
    try {
      const payload = { ...data, updatedAt: firebase.firestore.FieldValue.serverTimestamp() };
      await fbDB.collection('realEstateContent').doc('main').set(payload);
      await logAction("Updated Real Estate property selections, interest scales, or help directives.");
      addToast("Properties portfolio catalog synced live!", "success");
    } catch (err: any) {
      addToast(err.message || "Failed to update catalog", "error");
    } finally {
      setSaving(false);
    }
  };

  // CRUD - Save property
  const savePropertyItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    const nextProps = [...(data.properties || [])];
    const item: PropertyList = {
      id: propertyModal.payload.id || 'prop-' + Date.now(),
      title: propertyModal.payload.title || 'Untitled Listing',
      price: Number(propertyModal.payload.price || 0),
      bedrooms: Number(propertyModal.payload.bedrooms || 0),
      bathrooms: Number(propertyModal.payload.bathrooms || 0),
      area: Number(propertyModal.payload.area || 0),
      imageUrl: propertyModal.payload.imageUrl || '',
      description: propertyModal.payload.description || '',
      featured: !!propertyModal.payload.featured
    };

    if (propertyModal.index === -1) {
      nextProps.push(item);
    } else {
      nextProps[propertyModal.index] = item;
    }

    setData({ ...data, properties: nextProps });
    setPropertyModal({ show: false, index: -1, payload: {} });
  };

  // CRUD - Delete property
  const confirmDelete = () => {
    if (!data) return;
    const nextList = [...data.properties];
    nextList.splice(deleteModal.index, 1);
    setData({ ...data, properties: nextList });
    setDeleteModal({ show: false, index: -1 });
    addToast("Listing removed from pending updates list. Save to finalize.", "success");
  };

  if (loading) {
    return (
      <div className="text-zinc-500 animate-pulse font-mono flex items-center justify-center p-20 py-40 gap-3">
        <i className="fa-solid fa-spinner animate-spin text-[#00b4d8]"></i>
        <span>FETCHING METROPOLITAN MLS RECORDS...</span>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8 max-w-5xl animate-fadeIn text-zinc-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-white">Properties & Portfolios</h1>
          <p className="text-xs text-zinc-500 font-heading">Manage active home listings, featured catalogs, and interactive calculator rates.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving} 
          className="bg-[#00b4d8] hover:bg-[#009cb8] font-bold text-xs tracking-wider uppercase px-6 py-3 rounded-xl text-zinc-950 text-center flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
        >
          {saving ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-cloud-arrow-up"></i>}
          <span>Save Portfolio Config</span>
        </button>
      </div>

      <div className="space-y-8">
        {/* PROPERTIES SECTION */}
        <div className="bg-zinc-900 border border-zinc-805 p-6 rounded-2xl">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-6">
            <h3 className="font-heading font-bold text-white text-md flex items-center gap-2">
              <span className="w-1.5 h-6 bg-teal-accent inline-block rounded"></span>
              Active Real Estate Listings
            </h3>
            <button 
              onClick={() => setPropertyModal({ 
                show: true, 
                index: -1, 
                payload: { id: '', title: '', price: 250000, bedrooms: 3, bathrooms: 2, area: 1800, imageUrl: '', description: '', featured: false } 
              })} 
              className="p-2 px-3.5 bg-zinc-805 hover:bg-zinc-700 rounded-lg text-[10px] uppercase font-bold text-white tracking-widest flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-plus text-[#00b4d8]"></i> Add Property
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(data.properties || []).map((prop, idx) => (
              <div key={prop.id || idx} className="bg-zinc-950 border border-zinc-805 rounded-xl overflow-hidden flex flex-col justify-between">
                <div className="relative h-44 w-full bg-zinc-900 select-none">
                  {prop.imageUrl ? <img src={prop.imageUrl} className="w-full h-full object-cover" alt="Property thumbnail" /> : <div className="text-xs text-zinc-800 h-full flex items-center justify-center"><i className="fa-solid fa-building-user text-2xl"></i></div>}
                  
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button 
                      onClick={() => setPropertyModal({ show: true, index: idx, payload: prop })} 
                      className="p-1 px-2 bg-black/70 text-white rounded-md text-xs hover:bg-[#ff6b35] cursor-pointer"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button 
                      onClick={() => setDeleteModal({ show: true, index: idx })} 
                      className="p-1 px-2 bg-black/70 text-red-400 rounded-md text-xs hover:bg-red-600 hover:text-white cursor-pointer"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>

                  {prop.featured && (
                    <span className="absolute bottom-3 left-3 bg-teal-accent text-zinc-950 text-[8px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-md border border-teal-accent/20">Featured Unit</span>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="mb-3">
                    <h4 className="font-heading font-extrabold text-[#00b4d8] text-sm m-0">${(prop.price || 0).toLocaleString()}</h4>
                    <h5 className="font-bold text-white text-xs mt-1 leading-tight">{prop.title}</h5>
                    <p className="text-zinc-500 text-[10px] uppercase font-mono mt-1 leading-none">{prop.area} SQFT • {prop.bedrooms} BEDS • {prop.bathrooms} BATHS</p>
                  </div>
                  <p className="text-zinc-400 text-xs leading-relaxed border-t border-[#111] pt-2.5 mt-2.5 truncate">{prop.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MORTGAGE SETTINGS */}
        <div className="bg-zinc-900 border border-[#222] p-6 rounded-2xl">
          <h3 className="font-heading font-bold text-white text-md border-b border-zinc-800 pb-3 mb-5 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-zinc-400 inline-block rounded"></span>
            Calculator Settings
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-zinc-500 uppercase tracking-widest font-bold">Standard Interest Rate (%)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={data.mortgageSettings?.interestRate || 0} 
                    onChange={e => setData({ ...data, mortgageSettings : { ...data.mortgageSettings, interestRate: Number(e.target.value) } })} 
                    className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white font-semibold focus:outline-none" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-500 uppercase tracking-widest font-bold">Term Duration (Years)</label>
                  <input 
                    type="number" 
                    value={data.mortgageSettings?.loanTermYears || 0} 
                    onChange={e => setData({ ...data, mortgageSettings : { ...data.mortgageSettings, loanTermYears: Number(e.target.value) } })} 
                    className="w-full bg-zinc-950 border border-zinc-805 p-2.5 rounded-lg text-white font-semibold focus:outline-none" 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-zinc-500 uppercase tracking-widest font-bold">Incentives Help Text</label>
                <textarea 
                  value={data.mortgageSettings?.helpText || ""} 
                  onChange={e => setData({ ...data, mortgageSettings : { ...data.mortgageSettings, helpText: e.target.value } })} 
                  rows={2} 
                  className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white leading-relaxed resize-none focus:outline-none" 
                />
              </div>
            </div>

            <div className="bg-zinc-950/80 p-5 rounded-xl border border-zinc-800 flex flex-col justify-center items-center text-center text-zinc-500 space-y-1 font-mono text-xs">
              <i className="fa-solid fa-calculator text-2xl text-teal-accent mb-2"></i>
              <span>Calculated values use Standard Compound formulas:</span>
              <p className="font-bold text-white">EMI = [P x R x (1+R)^N]/[((1+R)^N)-1]</p>
              <span>Ensuring standard, offline matching calculations.</span>
            </div>
          </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="bg-zinc-900 border border-zinc-805 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 text-xs">
            <label className="text-xs uppercase font-bold text-zinc-400">Real Estate Consultation Button Text</label>
            <input 
              type="text" 
              value={data.cta?.buttonText || ""} 
              onChange={e => setData({ ...data, cta: { ...data.cta, buttonText: e.target.value } })} 
              className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white text-sm focus:outline-none" 
            />
          </div>
          <div className="space-y-1 text-xs">
            <label className="text-xs uppercase font-bold text-zinc-400">Target Clickpath Routing</label>
            <input 
              type="text" 
              value={data.cta?.buttonLink || ""} 
              onChange={e => setData({ ...data, cta: { ...data.cta, buttonLink: e.target.value } })} 
              className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl text-white text-sm font-mono focus:outline-none" 
            />
          </div>
        </div>

      </div>

      {/* EDIT PROPERTY MODAL */}
      {propertyModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h4 className="font-heading font-bold text-white text-lg">
              {propertyModal.index === -1 ? 'Add Property Listing' : 'Edit Listing Profile'}
            </h4>
            <form onSubmit={savePropertyItem} className="space-y-3.5 text-xs text-zinc-300">
              <div className="space-y-1">
                <label className="text-zinc-500 uppercase tracking-widest font-bold">MLS Title Banner</label>
                <input 
                  type="text" 
                  value={propertyModal.payload.title || ""} 
                  onChange={e => setPropertyModal({ ...propertyModal, payload: { ...propertyModal.payload, title: e.target.value } })} 
                  required 
                  className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white focus:outline-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-500 uppercase tracking-widest font-bold">Ask Price ($ USD)</label>
                  <input 
                    type="number" 
                    value={propertyModal.payload.price || ""} 
                    onChange={e => setPropertyModal({ ...propertyModal, payload: { ...propertyModal.payload, price: Number(e.target.value) } })} 
                    required 
                    className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white focus:outline-none" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-500 uppercase tracking-widest font-bold">Sq Footage (SQFT)</label>
                  <input 
                    type="number" 
                    value={propertyModal.payload.area || ""} 
                    onChange={e => setPropertyModal({ ...propertyModal, payload: { ...propertyModal.payload, area: Number(e.target.value) } })} 
                    required 
                    className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white focus:outline-none" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-500 uppercase tracking-widest font-bold">Bedrooms Count</label>
                  <input 
                    type="number" 
                    value={propertyModal.payload.bedrooms || ""} 
                    onChange={e => setPropertyModal({ ...propertyModal, payload: { ...propertyModal.payload, bedrooms: Number(e.target.value) } })} 
                    required 
                    className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white focus:outline-none" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-zinc-500 uppercase tracking-widest font-bold">Bathrooms Count</label>
                  <input 
                    type="number" 
                    value={propertyModal.payload.bathrooms || ""} 
                    onChange={e => setPropertyModal({ ...propertyModal, payload: { ...propertyModal.payload, bathrooms: Number(e.target.value) } })} 
                    required 
                    className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white focus:outline-none" 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-500 uppercase tracking-widest font-bold">Description copy</label>
                <textarea 
                  value={propertyModal.payload.description || ""} 
                  onChange={e => setPropertyModal({ ...propertyModal, payload: { ...propertyModal.payload, description: e.target.value } })} 
                  rows={3} 
                  required 
                  className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white leading-relaxed resize-none focus:outline-none" 
                />
              </div>

              <CloudinaryUpload 
                currentUrl={propertyModal.payload.imageUrl || ""} 
                onUploadComplete={(url) => setPropertyModal({ ...propertyModal, payload: { ...propertyModal.payload, imageUrl: url } })} 
                label="Exterior Home Snapshot" 
              />

              <label className="flex items-center gap-2 py-1 select-none cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={!!propertyModal.payload.featured} 
                  onChange={e => setPropertyModal({ ...propertyModal, payload: { ...propertyModal.payload, featured: e.target.checked } })} 
                  className="w-4 h-4 text-[#00b4d8] bg-zinc-900 border-zinc-800 rounded focus:ring-0" 
                />
                <span className="font-semibold text-xs text-white">Promote to Featured Ribbon List</span>
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setPropertyModal({ show: false, index: -1, payload: {} })} 
                  className="px-4 py-2 bg-zinc-800 text-white font-bold rounded-lg hover:bg-zinc-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-teal-accent text-zinc-950 font-extrabold rounded-lg hover:bg-[#009cb8] cursor-pointer"
                >
                  Save Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM REMOVAL */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-950/40 text-red-400 mx-auto flex items-center justify-center text-lg animate-pulse">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h4 className="font-heading font-bold text-white text-md">Confirm elements removal</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">Are you sure you want to delete this property? This action is pending until you save the portfolio configuration parameters.</p>
            <div className="flex justify-center gap-3 pt-2">
              <button onClick={() => setDeleteModal({ show: false, index: -1 })} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg text-xs cursor-pointer">Keep Item</button>
              <button onClick={confirmDelete} className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-lg text-xs cursor-pointer">Confirm Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
