import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export interface SystemConfig {
  firebase: FirebaseConfig;
  cloudinaryCloudName: string;
  cloudinaryUploadPreset: string;
}

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error';
}

interface AdminContextType {
  config: SystemConfig;
  updateSystemConfig: (newConfig: SystemConfig) => void;
  firebaseReady: boolean;
  user: firebase.User | null;
  loadingUser: boolean;
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'error') => void;
  removeToast: (id: number) => void;
  logAction: (actionText: string) => Promise<void>;
  fbAuth: firebase.auth.Auth | null;
  fbDB: firebase.firestore.Firestore | null;
  firebase: typeof firebase;
}

const DEFAULT_FIREBASE_CONFIG: FirebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const getSavedConfig = (): SystemConfig => {
  const saved = localStorage.getItem('dualdrive_admin_config');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Error parsing saved admin config", e);
    }
  }
  return {
    firebase: DEFAULT_FIREBASE_CONFIG,
    cloudinaryCloudName: "YOUR_CLOUD_NAME",
    cloudinaryUploadPreset: "YOUR_UPLOAD_PRESET"
  };
};

let fbAuthInstance: firebase.auth.Auth | null = null;
let fbDBInstance: firebase.firestore.Firestore | null = null;

const initFirebaseInstance = (config: FirebaseConfig): boolean => {
  if (config.apiKey && config.apiKey !== "YOUR_API_KEY") {
    try {
      if (firebase.apps.length > 0) {
        firebase.apps.forEach(app => app.delete());
      }
      const app = firebase.initializeApp(config);
      fbAuthInstance = app.auth();
      fbDBInstance = app.firestore();
      return true;
    } catch (err) {
      console.error("Firebase init error:", err);
    }
  }
  return false;
};

const AdminContext = createContext<AdminContextType | null>(null);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SystemConfig>(getSavedConfig);
  const [firebaseReady, setFirebaseReady] = useState(false);
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Sync initial configuration state
  useEffect(() => {
    const isConfigured = initFirebaseInstance(config.firebase);
    setFirebaseReady(isConfigured);
  }, []);

  // Set up authentication observer when Firebase is ready
  useEffect(() => {
    if (firebaseReady && fbAuthInstance) {
      const unsubscribe = fbAuthInstance.onAuthStateChanged(usr => {
        setUser(usr);
        setLoadingUser(false);
      });
      return unsubscribe;
    } else {
      setLoadingUser(false);
    }
  }, [firebaseReady]);

  // Update dynamic connections
  const updateSystemConfig = (newConfig: SystemConfig) => {
    localStorage.setItem('dualdrive_admin_config', JSON.stringify(newConfig));
    setConfig(newConfig);
    const initiated = initFirebaseInstance(newConfig.firebase);
    setFirebaseReady(initiated);
    if (initiated) {
      addToast("Firebase configuration applied successfully!", "success");
    } else {
      addToast("Failed to initialize Firebase metadata parameters. Please review credentials.", "error");
    }
  };

  // Log system actions auditing
  const logAction = async (actionText: string) => {
    if (!firebaseReady || !fbDBInstance || !user) return;
    try {
      await fbDBInstance.collection('adminLogs').add({
        action: actionText,
        adminEmail: user.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (e) {
      console.error("Failed to log audit activity:", e);
    }
  };

  return (
    <AdminContext.Provider value={{
      config,
      updateSystemConfig,
      firebaseReady,
      user,
      loadingUser,
      toasts,
      addToast,
      removeToast,
      logAction,
      fbAuth: fbAuthInstance,
      fbDB: fbDBInstance,
      firebase
    }}>
      {children}
    </AdminContext.Provider>
  );
};
