"use client";
import { useState, useEffect } from 'react';

interface BasoProps {
  tikus: string;
}

interface RowData {
  nis: string;
  nama: string;
  kelas?: string;
}

const Baso = ({ tikus }: BasoProps) => {
    const [nama, setNama] = useState<string>("belajar nextjs");
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [selectedRow, setSelectedRow] = useState<string | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [rows, setRows] = useState<RowData[]>([
        { nis: "544231146", nama: "neng nara", kelas: "XII RPL 2" },
        { nis: "544231147", nama: "syarifah alya", kelas: "XII RPL 2" },
        { nis: "544231148", nama: "muhammad khiyarul ghulam", kelas: "XII RPL 2" },
        { nis: "544231149", nama: "muhammad nabil athaillah", kelas: "XII RPL 2" },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsHovered(prev => !prev);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const baseStyles = theme === 'light' 
        ? 'from-purple-100 to-pink-100 text-gray-900' 
        : 'from-gray-900 to-purple-900 text-white';

    const filteredRows = rows.filter(row => {
        const searchLower = searchTerm.toLowerCase();
        return (
            row.nis.toLowerCase().includes(searchLower) ||
            row.nama.toLowerCase().includes(searchLower) ||
            (row.kelas?.toLowerCase() || '').includes(searchLower)
        );
    });

    return (
        <div className={`min-h-screen bg-gradient-to-br ${baseStyles} p-8 transition-all duration-500`}>
            <button
                onClick={toggleTheme}
                className={`fixed top-4 right-4 p-3 rounded-full
                ${theme === 'light' ? 'bg-purple-600 text-white' : 'bg-yellow-400 text-gray-900'}
                transform hover:scale-110 transition-all duration-300 shadow-lg`}
            >
                {theme === 'light' ? '🌙' : '☀'}
            </button>

            <div className={`bg-opacity-90 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} 
                shadow-2xl rounded-2xl my-5 p-8 backdrop-blur-lg
                transform hover:scale-[1.01] transition-all duration-500 ease-in-out`}>
                <h1 
                    className={`pb-2 text-7xl font-bold mb-6 bg-gradient-to-r 
                    ${theme === 'light' ? 'from-purple-600 to-pink-600' : 'from-purple-400 to-pink-400'} 
                    bg-clip-text text-transparent
                    ${isHovered ? 'animate-pulse' : ''} cursor-pointer
                    transform hover:scale-105 transition-all duration-300`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    ayo {tikus}
                </h1>
                <div 
                    className={`${nama === "besse" ? "bg-red-500" : theme === 'light' ? "bg-green-500" : "bg-green-600"} 
                    p-6 rounded-xl text-white font-semibold shadow-lg
                    transform hover:-translate-y-2 hover:rotate-1 transition-all duration-300 ease-in-out
                    animate-fade-in-down backdrop-blur-lg`}
                >
                    {nama}
                </div>
            </div>
            
            <div className="text-center mb-8 animate-fade-in-up space-y-4">
                {/* Search input */}
                <div className="relative">
                    <input 
                        className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} 
                        border-2 border-purple-300 p-4 rounded-full w-96
                        focus:outline-none focus:ring-4 focus:ring-purple-500 focus:border-transparent
                        transform hover:scale-105 transition-all duration-300 ease-in-out
                        shadow-lg text-lg placeholder-purple-300
                        pl-12`}
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="🔍 Cari berdasarkan NIS, Nama, atau Kelas"
                    />
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400">
                        🔍
                    </span>
                </div>
            </div>

            <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} 
                rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up backdrop-blur-lg`}>
                <table className="w-full divide-y divide-gray-200">
                    <thead className={`bg-gradient-to-r 
                        ${theme === 'light' ? 'from-purple-500 to-pink-500' : 'from-purple-900 to-pink-900'}`}>
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">NIS</th>
                            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">NAMA</th>
                            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">KELAS</th>
                        </tr>
                    </thead>
                    <tbody className={`divide-y ${theme === 'light' ? 'divide-gray-200' : 'divide-gray-700'}`}>
                        {filteredRows.map((row, index) => (
                            <tr 
                                key={row.nis}
                                className={`${theme === 'light' ? 'hover:bg-purple-50' : 'hover:bg-purple-900'} 
                                transition-colors duration-200 ease-in-out cursor-pointer
                                ${selectedRow === row.nis ? (theme === 'light' ? 'bg-purple-100' : 'bg-purple-800') : ''}`}
                                onClick={() => setSelectedRow(row.nis)}
                                style={{
                                    animation: `fade-in-up 0.5s ease-out forwards`,
                                    animationDelay: `${index * 100}ms`
                                }}
                            >
                                <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>{row.nis}</td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>{row.nama}</td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'light' ? 'text-gray-900' : 'text-gray-100'}`}>{row.kelas}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Baso;