
import React, { useState } from 'react';
import { User } from '../types';

interface SettingsProps {
  currentUser: User;
  vaultPassword: string;
  onVaultPassUpdate: (pass: string) => void;
  onBack: () => void;
}

const Settings: React.FC<SettingsProps> = ({ currentUser, vaultPassword, onVaultPassUpdate, onBack }) => {
  const [loginPass, setLoginPass] = useState('');
  const [newVaultPass, setNewVaultPass] = useState('');
  const [success, setSuccess] = useState('');

  const handleUpdateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPass.length < 8) return alert("Password must be at least 8 characters.");
    localStorage.setItem(`custom_pass_${currentUser.email}`, loginPass);
    setLoginPass('');
    setSuccess('Login password updated locally.');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleUpdateVault = (e: React.FormEvent) => {
    e.preventDefault();
    if (newVaultPass.length < 8) return alert("Vault password must be at least 8 characters.");
    onVaultPassUpdate(newVaultPass);
    setNewVaultPass('');
    setSuccess('Vault password updated & synced.');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] animate-in slide-in-from-right duration-300">
      <header className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 text-slate-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h2 className="font-semibold text-slate-200">Security Settings</h2>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {success && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-500 text-xs rounded-2xl text-center font-bold animate-bounce">
            {success}
          </div>
        )}

        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">My Login Security</h3>
          </div>
          <form onSubmit={handleUpdateLogin} className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 space-y-4">
            <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-tighter">Enter a new password for your personal login. This is stored only on this device.</p>
            <input 
              type="password" 
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
              placeholder="New Login Password" 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-500/50"
            />
            <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold uppercase tracking-widest transition-all active:scale-95">Update Login Key</button>
          </form>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Shared Vault Key</h3>
          </div>
          <form onSubmit={handleUpdateVault} className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 space-y-4">
            <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-tighter">Updating this will sync the new password to your partner's device automatically if they are online.</p>
            <input 
              type="password" 
              value={newVaultPass}
              onChange={(e) => setNewVaultPass(e.target.value)}
              placeholder="New Shared Vault Password" 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50"
            />
            <button className="w-full py-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-500/30 rounded-xl text-xs font-bold uppercase tracking-widest transition-all active:scale-95">Sync New Vault Key</button>
          </form>
        </section>

        <div className="pt-8 text-center space-y-2 opacity-40">
           <div className="h-[1px] w-8 bg-slate-800 mx-auto"></div>
           <p className="text-[9px] text-slate-500 uppercase tracking-widest leading-loose">P2P Encryption Active<br/>No database storage utilized</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
