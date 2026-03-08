import React from 'react';

const RoleSelection = ({ onSelectRole }) => {
    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col items-center justify-center p-4 relative w-full overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10 pointer-events-none"></div>

            <div className="flex flex-col items-center w-full max-w-2xl animate-fade-in-up z-10">

                <div className="w-28 h-28 sm:w-36 sm:h-36 mb-8 rounded-full overflow-hidden bg-slate-900/80 border-[4px] border-primary/50 p-1.5 shadow-[0_0_40px_rgba(139,92,246,0.4)] flex items-center justify-center glow-border backdrop-blur-3xl">
                    <img src="/logo.png" alt="Smart Attendance Logo" className="w-full h-full rounded-full object-cover drop-shadow-2xl" />
                </div>

                <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-cyan-400 mb-4 drop-shadow-[0_0_15px_rgba(139,92,246,0.4)] text-center">
                    Select Your Portal
                </h1>

                <p className="text-slate-400 mb-12 text-center text-sm sm:text-base max-w-md">
                    Please select your role to access the corresponding workspace and tools.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4">

                    {/* Coordinator Card */}
                    <button
                        onClick={() => onSelectRole('coordinator')}
                        className="group relative flex flex-col items-center p-8 bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 rounded-3xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:-translate-y-2 cursor-pointer text-left overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>

                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                            <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Event Coordinator</h3>
                        <p className="text-slate-400 text-sm text-center">Scan QR codes, mark manual attendance, and view real-time entry lists.</p>
                    </button>

                    {/* HOD Card */}
                    <button
                        onClick={() => onSelectRole('hod')}
                        className="group relative flex flex-col items-center p-8 bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 rounded-3xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:-translate-y-2 cursor-pointer text-left overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all"></div>

                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">HOD Dashboard</h3>
                        <p className="text-slate-400 text-sm text-center">View overall statistics, filter records, export PDFs, and manage full system resets.</p>
                    </button>

                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 text-slate-500 text-sm">
                &copy; {new Date().getFullYear()} CSE Department
            </div>
        </div>
    );
};

export default RoleSelection;
