import React, { useState } from 'react';
import { useAdmin } from './AdminContext';

export const SetupGuideSection: React.FC = () => {
  const { config, updateSystemConfig } = useAdmin();
  const [apiKey, setApiKey] = useState(config.firebase.apiKey === "YOUR_API_KEY" ? "" : config.firebase.apiKey);
  const [authDomain, setAuthDomain] = useState(config.firebase.authDomain === "YOUR_AUTH_DOMAIN" ? "" : config.firebase.authDomain);
  const [projectId, setProjectId] = useState(config.firebase.projectId === "YOUR_PROJECT_ID" ? "" : config.firebase.projectId);
  const [storageBucket, setStorageBucket] = useState(config.firebase.storageBucket === "YOUR_STORAGE_BUCKET" ? "" : config.firebase.storageBucket);
  const [messagingSenderId, setMessagingSenderId] = useState(config.firebase.messagingSenderId === "YOUR_MESSAGING_SENDER_ID" ? "" : config.firebase.messagingSenderId);
  const [appId, setAppId] = useState(config.firebase.appId === "YOUR_APP_ID" ? "" : config.firebase.appId);
  const [cloudName, setCloudName] = useState(config.cloudinaryCloudName === "YOUR_CLOUD_NAME" ? "" : config.cloudinaryCloudName);
  const [uploadPreset, setUploadPreset] = useState(config.cloudinaryUploadPreset === "YOUR_UPLOAD_PRESET" ? "" : config.cloudinaryUploadPreset);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      firebase: {
        apiKey: apiKey || "YOUR_API_KEY",
        authDomain: authDomain || "YOUR_AUTH_DOMAIN",
        projectId: projectId || "YOUR_PROJECT_ID",
        storageBucket: storageBucket || "YOUR_STORAGE_BUCKET",
        messagingSenderId: messagingSenderId || "YOUR_MESSAGING_SENDER_ID",
        appId: appId || "YOUR_APP_ID"
      },
      cloudinaryCloudName: cloudName || "YOUR_CLOUD_NAME",
      cloudinaryUploadPreset: uploadPreset || "YOUR_UPLOAD_PRESET"
    };
    updateSystemConfig(payload);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-6">
      <div className="border-b border-zinc-800 pb-4">
        <h3 className="text-white font-heading font-bold text-lg flex items-center gap-2">
          <i className="fa-solid fa-screwdriver-wrench text-orange-accent"></i>
          System Credentials Configurator
        </h3>
        <p className="text-xs text-zinc-500 mt-1">Connect your database and asset pipelines instantly. Values are securely cached in your local browser storage.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-zinc-400 border-b border-zinc-850 pb-1 uppercase tracking-widest text-[10px]">1. Firebase Integration</h4>
            <div className="space-y-1">
              <label className="text-zinc-500 uppercase tracking-widest font-bold">API Key</label>
              <input type="text" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="AIzaSy..." className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white" required />
            </div>
            <div className="space-y-1">
              <label className="text-zinc-500 uppercase tracking-widest font-bold">Auth Domain</label>
              <input type="text" value={authDomain} onChange={e => setAuthDomain(e.target.value)} placeholder="project.firebaseapp.com" className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white" required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-zinc-500 uppercase tracking-widest font-bold">Project ID</label>
                <input type="text" value={projectId} onChange={e => setProjectId(e.target.value)} placeholder="project-id" className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white" required />
              </div>
              <div className="space-y-1">
                <label className="text-zinc-500 uppercase tracking-widest font-bold">Storage Bucket</label>
                <input type="text" value={storageBucket} onChange={e => setStorageBucket(e.target.value)} placeholder="project.appspot.com" className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-zinc-500 uppercase tracking-widest font-bold">Sender ID</label>
                <input type="text" value={messagingSenderId} onChange={e => setMessagingSenderId(e.target.value)} placeholder="38420108..." className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white" required />
              </div>
              <div className="space-y-1">
                <label className="text-zinc-500 uppercase tracking-widest font-bold">App ID</label>
                <input type="text" value={appId} onChange={e => setAppId(e.target.value)} placeholder="1:384201..." className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white" required />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-zinc-400 border-b border-zinc-850 pb-1 uppercase tracking-widest text-[10px]">2. Cloudinary Asset pipeline</h4>
            <div className="space-y-1">
              <label className="text-zinc-500 uppercase tracking-widest font-bold">Cloud Name</label>
              <input type="text" value={cloudName} onChange={e => setCloudName(e.target.value)} placeholder="e.g. dxyz882" className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white" required />
            </div>
            <div className="space-y-1">
              <label className="text-zinc-500 uppercase tracking-widest font-bold">Upload Preset (Unsigned)</label>
              <input type="text" value={uploadPreset} onChange={e => setUploadPreset(e.target.value)} placeholder="e.g. duallimit" className="w-full bg-zinc-950 border border-zinc-800 p-2.5 rounded-lg text-white" required />
            </div>

            <div className="bg-[#141414] border border-zinc-805 p-4 rounded-xl text-zinc-500 space-y-1 text-[11px] leading-relaxed">
              <p className="font-semibold text-zinc-400 uppercase text-[10px] tracking-wider">Quick Setup steps:</p>
              <p>1. Open Console at <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-orange-accent underline">firebase.com</a></p>
              <p>2. Enable Email/Password Auth & start Firestore Database.</p>
              <p>3. Create Free Cloudinary account and set up Unsigned Upload Preset in Upload settings.</p>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full py-3 rounded-lg bg-[#ff6b35] hover:bg-[#e05621] text-white font-extrabold text-sm tracking-wider transition-colors min-h-[44px]">
          Apply Credentials & Connect Systems
        </button>
      </form>
    </div>
  );
};
