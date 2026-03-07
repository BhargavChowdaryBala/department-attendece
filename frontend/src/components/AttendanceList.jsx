import React, { useEffect, useState } from 'react';
import { getAttendance } from '../services/api';

const AttendanceList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getAttendance();
            setStudents(data.students);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        if (!students.length) return;

        // Create CSV Header
        const headers = ['Name', 'Roll Number', 'Branch', 'Semester', 'Status'];

        // Map data to CSV rows
        const csvRows = [
            headers.join(','), // Header row
            ...students.map(student => {
                const row = [
                    `"${student.name}"`, // Quote strings to handle commas
                    `"${student.rollNo}"`,
                    `"${student.branch}"`,
                    `"${student.semester || 'N/A'}"`,
                    student.isPresent ? 'Present' : 'Absent'
                ];
                return row.join(',');
            })
        ];

        // Create Blob and download
        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', `attendance_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    if (loading) return (
        <div className="w-full text-center py-12">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400 animate-pulse">Loading attendance records...</p>
        </div>
    );

    if (error) return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-red-900/10 border border-red-500/20 rounded-xl text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button onClick={fetchData} className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700">Retry</button>
        </div>
    );

    return (
        <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-purple-600 rounded-full"></span>
                    Current Attendance List
                </h2>
                <button
                    onClick={handleExport}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg shadow-lg hover:shadow-green-500/30 transition-all active:scale-95"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    Export CSV
                </button>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
                                <th className="p-4 font-semibold border-b border-white/10">Name</th>
                                <th className="p-4 font-semibold border-b border-white/10">Roll Number</th>
                                <th className="p-4 font-semibold border-b border-white/10">Branch</th>
                                <th className="p-4 font-semibold border-b border-white/10">Semester</th>
                                <th className="p-4 font-semibold border-b border-white/10">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {students.map((student, idx) => (
                                <tr
                                    key={idx}
                                    className={`hover:bg-white/5 transition-colors animate-fade-in-up stagger-${(idx % 4) + 1}`}
                                >
                                    <td className="p-4 text-white font-medium">{student.name}</td>
                                    <td className="p-4 text-slate-300 font-mono">{student.rollNo}</td>
                                    <td className="p-4 text-slate-400 uppercase text-xs font-bold">{student.branch}</td>
                                    <td className="p-4 text-slate-400 text-xs">{student.semester}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all ${student.isPresent
                                            ? 'bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.2)]'
                                            : 'bg-slate-800/50 text-slate-500 border border-white/5'
                                            }`}>
                                            <div className={`w-1 h-1 rounded-full mr-1.5 ${student.isPresent ? 'bg-green-400 animate-pulse' : 'bg-slate-600'}`}></div>
                                            {student.isPresent ? 'Present' : 'Absent'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {students.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        No students found.
                    </div>
                )}
            </div>

            <div className="mt-4 text-center text-xs text-slate-600">
                Total Records: {students.length}
            </div>
        </div>
    );
};

export default AttendanceList;
