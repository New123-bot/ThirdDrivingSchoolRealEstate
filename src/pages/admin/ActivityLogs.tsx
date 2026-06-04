import React, { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';

interface ActivityLogItem {
  id: string;
  action: string;
  adminEmail: string;
  timestamp: any;
}

export const ActivityLogs: React.FC = () => {
  const { fbDB, firebaseReady, addToast } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<ActivityLogItem[]>([]);

  useEffect(() => {
    if (!firebaseReady || !fbDB) return;
    
    const unsubscribe = fbDB.collection('adminLogs')
      .orderBy('timestamp', 'desc')
      .limit(100)
      .onSnapshot(
        (snap) => {
          const list: ActivityLogItem[] = [];
          snap.forEach(doc => {
            const data = doc.data();
            list.push({
              id: doc.id,
              action: data.action,
              adminEmail: data.adminEmail,
              timestamp: data.timestamp
            });
          });
          setLogs(list);
          setLoading(false);
        },
        (err) => {
          console.error("Logs firestore listener err", err);
          setLoading(false);
        }
      );

    return unsubscribe;
  }, [firebaseReady, fbDB]);

  const clearAllAuditLogs = async () => {
    if (!fbDB) return;
    if (!window.confirm("Are you sure you want to completely erase the audit log database? (This action is irreversible)")) {
      return;
    }
    
    try {
      const snap = await fbDB.collection('adminLogs').get();
      const batch = fbDB.batch();
      snap.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      addToast("Administrative security logs cleared successfully!", "success");
    } catch (e: any) {
      addToast("Failed to clean database: " + e.message, "error");
    }
  };

  if (loading) {
    return (
      <div className="text-zinc-500 animate-pulse font-mono flex items-center justify-center p-20 py-40 gap-3">
        <i className="fa-solid fa-spinner animate-spin text-zinc-400"></i>
        <span>PULLING ENCRYPTED SECURITY LOG EVENTS...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl animate-fadeIn text-zinc-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-white">Security Audit Log Journal</h1>
          <p className="text-xs text-zinc-500 font-heading">Monitors chronological updates across directories and configurations.</p>
        </div>
        {logs.length > 0 && (
          <button 
            onClick={clearAllAuditLogs} 
            className="p-2.5 px-4 bg-zinc-850 hover:bg-red-950/30 hover:text-red-400 hover:border-red-900 border border-zinc-800 rounded-xl text-xs font-semibold text-zinc-450 tracking-wider flex items-center gap-2 transition-all cursor-pointer"
          >
            <i className="fa-solid fa-rectangle-xmark"></i> Clear All Log Records
          </button>
        )}
      </div>

      {logs.length === 0 ? (
        <div className="bg-zinc-950/40 border border-dashed border-zinc-850 rounded-2xl p-16 text-center text-zinc-500 space-y-2">
          <i className="fa-solid fa-clipboard-check text-4xl text-zinc-700"></i>
          <h3 className="font-heading font-bold text-white text-md">Clean audit ledger slate</h3>
          <p className="text-xs text-zinc-500 max-w-xs mx-auto">No events have been recorded. Dynamic changes on the Home, Driving Academy, or Real Estate catalog will log details automatically.</p>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-805 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-950/80 text-zinc-400 uppercase font-mono tracking-wider border-b border-zinc-850 text-[10px]">
                  <th className="p-4 pl-6">Recorded Timestamp</th>
                  <th className="p-4">Staff Email Address</th>
                  <th className="p-4 pr-6">Operational Event Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-850">
                {logs.map(log => {
                  let formattedDate = 'Awaiting stamp...';
                  if (log.timestamp) {
                    if (log.timestamp.seconds) {
                      formattedDate = new Date(log.timestamp.seconds * 1000).toLocaleString();
                    } else if (log.timestamp.toDate) {
                      formattedDate = log.timestamp.toDate().toLocaleString();
                    } else {
                      formattedDate = new Date(log.timestamp).toLocaleString();
                    }
                  }
                  return (
                    <tr key={log.id} className="hover:bg-zinc-950/30 transition-colors">
                      <td className="p-4 pl-6 font-mono text-zinc-500 font-semibold">{formattedDate}</td>
                      <td className="p-4 font-semibold text-white">{log.adminEmail}</td>
                      <td className="p-4 pr-6 text-zinc-400 font-medium">
                        <span className="inline-flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#ff6b35] rounded-full"></span>
                          <span>{log.action}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
