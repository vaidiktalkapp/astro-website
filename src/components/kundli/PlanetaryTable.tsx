'use client';

import React from 'react';

interface PlanetaryTableProps {
    planets: any;
}

const PLANET_SYMBOLS: { [key: string]: string } = {
    "Sun": "☉", "Moon": "☽", "Mars": "♂", "Mercury": "☿",
    "Jupiter": "♃", "Venus": "♀", "Saturn": "♄", "Rahu": "☊", "Ketu": "☋",
    "Uranus": "⛢", "Neptune": "♆", "Pluto": "♇", "Ascendant": "ASC"
};

const PlanetaryTable = ({ planets }: PlanetaryTableProps) => {
    return (
        <div className="overflow-x-auto rounded-2xl border border-orange-100 shadow-sm bg-white">
            <table className="w-full text-left border-collapse">
                <thead className="bg-orange-50/50">
                    <tr>
                        <th className="px-4 py-4 text-[11px] font-black uppercase tracking-widest text-orange-950">Planet</th>
                        <th className="px-4 py-4 text-[11px] font-black uppercase tracking-widest text-orange-950">D1 Sign</th>
                        <th className="px-4 py-4 text-[11px] font-black uppercase tracking-widest text-orange-950">D9 Navamsa</th>
                        <th className="px-4 py-4 text-[11px] font-black uppercase tracking-widest text-orange-950 text-center">Longitude</th>
                        <th className="px-4 py-4 text-[11px] font-black uppercase tracking-widest text-orange-950 text-center">House</th>
                        <th className="px-4 py-4 text-[11px] font-black uppercase tracking-widest text-orange-950">Nakshatra</th>
                        <th className="px-4 py-4 text-[11px] font-black uppercase tracking-widest text-orange-950">Relation</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-orange-50">
                    {planets && Object.entries(planets)
                        .map(([name, data]: any) => (
                        <tr key={name} className="hover:bg-orange-50/30 transition-colors border-b border-orange-50/50">
                            <td className="px-4 py-3 font-bold text-gray-900 text-sm flex flex-wrap items-center gap-1.5">
                                <span className="text-orange-500 font-normal">{PLANET_SYMBOLS[name] || ''}</span>
                                {name}
                                {data.is_retrograde && <span title="Planet is in Retrograde motion" className="bg-red-50 text-red-600 border border-red-100 font-bold text-[10px] px-1.5 py-0.5 rounded-md ml-1 leading-none shadow-sm">(R)</span>}
                                {data.is_combust && <span title="Planet is Combust (Asta - too close to Sun)" className="bg-gray-100 text-gray-500 border border-gray-200 font-bold text-[10px] px-1.5 py-0.5 rounded-md ml-1 leading-none shadow-sm">(C)</span>}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900 font-semibold">{data.sign}</td>
                            <td className="px-4 py-3 text-sm text-indigo-800 font-bold">{data.navamsa_sign}</td>
                            <td className="px-4 py-3 text-sm font-mono text-gray-900 font-medium text-center whitespace-nowrap">{data.longitude_dms || (data.degree % 30).toFixed(2) + '°'}</td>
                            <td className="px-4 py-3 text-sm text-center font-bold text-orange-700">H{data.house}</td>
                            <td className="px-4 py-3 text-[12px] font-semibold text-gray-900">{data.navamsa_sign ? `${data.nakshatra}` : data.nakshatra}</td>
                            <td className="px-4 py-3">
                                <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                                    data.relation === 'Exalted' ? 'bg-green-50 text-green-800 border border-green-100' :
                                    data.relation === 'Debilitated' ? 'bg-red-50 text-red-700 border border-red-100' :
                                    data.relation === 'Own Sign' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                                    data.relation === 'Mooltrikona' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                    data.relation === 'Friendly' ? 'bg-blue-50 text-blue-800 border border-blue-100' :
                                    data.relation === 'Enemy' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                                    'bg-gray-50 text-gray-700 border border-gray-200'
                                }`}>
                                    {data.relation || 'Neutral'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlanetaryTable;