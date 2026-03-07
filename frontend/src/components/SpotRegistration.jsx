import React, { useState } from 'react';
import { spotRegister } from '../services/api';
import Scanner from './Scanner';

const SpotRegistration = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        rollNo: '',
        branch: '',
        semester: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [showScanner, setShowScanner] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password) {
            setIsAuthenticated(true);
            setError(null);
        } else {
            setError('Please enter the portal password');
        }
    };

    const handleLock = () => {
        setIsAuthenticated(false);
        setPassword('');
        setError(null);
        setMessage(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleQuickScan = (rollNo) => {
        setFormData(prev => ({
            ...prev,
            rollNo: rollNo
        }));
        setShowScanner(false);
        if (navigator.vibrate) try { navigator.vibrate([100, 50, 100]); } catch (e) { }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const result = await spotRegister({
                name: formData.name,
                rollNo: formData.rollNo,
                branch: formData.branch,
                semester: formData.semester,
                password
            });
            setMessage(result.message);
            setFormData({
                name: '',
                rollNo: '',
                branch: '',
                semester: ''
            });
        } catch (err) {
            const errorMessage = err.message;
            setError(errorMessage);
            const isAuthError = err.originalError?.response?.status === 401 ||
                errorMessage.toLowerCase().includes('password');

            if (isAuthError) {
                setIsAuthenticated(false);
                setPassword('');
            }
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="w-full max-w-md mx-auto animate-fade-in-up">
                <div className="glass-card p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Spot Registration Portal</h2>
                    <p className="text-slate-400 text-sm mb-6 text-center">Enter the administration password to access this portal.</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Portal Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        {error && <p className="text-red-400 text-xs italic">{error}</p>}
                        <button
                            type="submit"
                            className="w-full py-4 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-black rounded-xl shadow-lg shadow-yellow-500/10 transition-all active:scale-[0.98]"
                        >
                            Access Portal
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
            <div className="glass-card p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-8 bg-gradient-to-b from-yellow-400 to-orange-600 rounded-full"></span>
                        Spot Registration
                    </h2>
                    <button
                        onClick={handleLock}
                        className="text-xs text-slate-500 hover:text-slate-300 underline"
                    >
                        Lock Portal
                    </button>
                </div>

                {message && (
                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm font-medium flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium">
                        <div className="flex items-center gap-2 mb-1">
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span className="font-bold">Error</span>
                        </div>
                        <p className="ml-7 opacity-90">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Roll Number</label>
                            <div className="relative flex items-center gap-2">
                                <input
                                    type="text"
                                    name="rollNo"
                                    value={formData.rollNo}
                                    onChange={handleInputChange}
                                    className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all font-mono"
                                    placeholder="21BCSXXXX"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowScanner(true)}
                                    className="p-3 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-white/10 rounded-xl transition-all active:scale-95 group relative"
                                    title="Scan ID Card"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Branch</label>
                            <input
                                type="text"
                                name="branch"
                                value={formData.branch}
                                onChange={handleInputChange}
                                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all"
                                placeholder="Computer Science"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Semester</label>
                            <input
                                type="text"
                                name="semester"
                                value={formData.semester}
                                onChange={handleInputChange}
                                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all"
                                placeholder="II Semester"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-black rounded-xl shadow-lg shadow-yellow-500/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Processing...' : 'Register & Mark Present'}
                    </button>
                </form>
            </div>

            {showScanner && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
                    <div className="w-full max-w-sm relative">
                        <button
                            onClick={() => setShowScanner(false)}
                            className="absolute -top-12 right-0 text-white/70 hover:text-white p-2 transition-colors active:scale-95"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <div className="glass-card rounded-3xl overflow-hidden shadow-2xl">
                            <Scanner id="reader-spot-reg" onScan={handleQuickScan} autoStart={true} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpotRegistration;
