import React, { useState } from 'react';
import { useAdmin } from './AdminContext';

interface CloudinaryUploadProps {
  currentUrl: string;
  onUploadComplete: (url: string) => void;
  label: string;
}

export const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({ currentUrl, onUploadComplete, label }) => {
  const { config, addToast } = useAdmin();
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (config.cloudinaryCloudName === "YOUR_CLOUD_NAME" || config.cloudinaryUploadPreset === "YOUR_UPLOAD_PRESET") {
      addToast("Cloudinary credentials are not configured! Please configure in administrative settings first.", "error");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", config.cloudinaryUploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudinaryCloudName}/image/upload`, {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Upload request rejected");
      const data = await res.json();
      onUploadComplete(data.secure_url);
      addToast("Image uploaded successfully!", "success");
    } catch (err) {
      console.error(err);
      addToast("Failed to upload image. Verify Cloudinary preset & cloud credentials.", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">{label}</label>
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-zinc-90 w bg-zinc-900 border border-zinc-800 p-3.5 rounded-xl">
        {currentUrl ? (
          <div className="relative group w-20 h-20 rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0">
            <img src={currentUrl} className="w-full h-full object-cover" alt="Preview" />
            <button 
              type="button" 
              onClick={() => onUploadComplete("")}
              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
            >
              <i className="fa-solid fa-trash text-sm"></i>
            </button>
          </div>
        ) : (
          <div className="w-20 h-20 rounded-lg border-2 border-dashed border-zinc-805 flex items-center justify-center text-zinc-600 shrink-0">
            <i className="fa-solid fa-image text-xl"></i>
          </div>
        )}
        
        <div className="flex-1 w-full">
          <label className="relative flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white tracking-wide cursor-pointer transition-colors min-h-[44px] text-center">
            {uploading ? (
              <>
                <i className="fa-solid fa-spinner animate-spin"></i>
                <span>Uploading directly to Cloudinary...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-cloud-arrow-up"></i>
                <span>Select File & Upload</span>
              </>
            )}
            <input type="file" onChange={handleFileChange} accept="image/*" disabled={uploading} className="hidden" />
          </label>
          <p className="text-[10px] text-zinc-500 mt-1.5 text-center sm:text-left">Supports PNG, JPG, JPEG under 10MB</p>
        </div>
      </div>
    </div>
  );
};
