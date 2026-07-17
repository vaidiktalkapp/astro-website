import toast from 'react-hot-toast';

// ── Brand Colors ──
const GOLD: [number, number, number] = [184, 150, 46];
const DARK: [number, number, number] = [28, 21, 9];
const GRAY: [number, number, number] = [107, 114, 128];
const WHITE: [number, number, number] = [255, 255, 255];
const CREAM: [number, number, number] = [253, 246, 227];
const LIGHT_GOLD: [number, number, number] = [249, 245, 235];

interface CelebrityPdfData {
    profile: {
        name: string;
        category: string;
        birthDate: string;
        birthTime: string;
        birthPlace: string;
        summary: string;
        image?: string;
        content?: string;
    };
    kundliData: any;
}

export const downloadCelebrityPDF = async (data: CelebrityPdfData) => {
    if (typeof window === 'undefined') return;

    const toastId = toast.loading('Accessing Celestial Records...', {
        style: {
            background: '#1c1509', color: '#fdf6e3',
            fontFamily: "'Inter', sans-serif", fontWeight: 600,
            fontSize: '14px', borderRadius: '12px', padding: '14px 20px',
            border: '1px solid rgba(184,150,46,0.3)',
        },
        iconTheme: { primary: '#b8962e', secondary: '#fdf6e3' },
    });

    try {
        const { jsPDF } = await import('jspdf');
        const autoTable = (await import('jspdf-autotable')).default;

        const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();
        const margin = 15;
        const contentW = pageW - margin * 2;
        let y = 0;

        const { profile, kundliData } = data;
        const { kundli, dasha, panchang, doshas } = kundliData;

        const clean = (txt: any) => {
            if (!txt) return 'N/A';
            
            // Preserve paragraphs and breaks before stripping tags
            let decoded = String(txt)
                .replace(/<br\s*\/?>/gi, '\n')
                .replace(/<\/p>/gi, '\n\n')
                .replace(/<\/h[1-6]>/gi, '\n\n')
                .replace(/<li>/gi, '\n• ')
                .replace(/<\/li>/gi, '\n');
                
            // Strip remaining HTML tags
            decoded = decoded.replace(/<[^>]*>?/gm, '');
            
            if (typeof document !== 'undefined') {
                const temp = document.createElement('textarea');
                temp.innerHTML = decoded;
                decoded = temp.value;
            } else {
                decoded = decoded.replace(/&nbsp;/g, ' ').replace(/\u00A0/g, ' ');
            }
            
            // Clean whitespace but preserve deliberate newlines
            return decoded
                .replace(/\u00A0/g, ' ')
                .replace(/&nbsp;/g, ' ')
                .replace(/[\r\t]+/g, ' ')
                .replace(/[ ]{2,}/g, ' ')
                .replace(/\n\s*\n/g, '\n\n')
                .trim();
        };

        const drawSectionTitle = (title: string, yPos: number) => {
            pdf.setFillColor(...GOLD);
            pdf.rect(margin, yPos - 3, 2, 5, 'F');
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(10);
            pdf.setTextColor(...DARK);
            pdf.text(title, margin + 5, yPos);
        };

        // ─── 0. Hero Header ───
        pdf.setFillColor(...DARK);
        pdf.rect(0, 0, pageW, 60, 'F');
        
        pdf.setTextColor(255, 255, 255);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(24);
        pdf.text('CELEBRITY DESTINY', margin, 25);
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(...GOLD);
        pdf.text('CELESTIAL LEGACY & BIRTH CHART ANALYSIS', margin, 32);

        // Right side stamp
        pdf.setDrawColor(...GOLD);
        pdf.setLineWidth(0.5);
        pdf.rect(pageW - 45, 15, 30, 30);
        pdf.setFontSize(7);
        pdf.text('VERIFIED', pageW - 30, 25, { align: 'center' });
        pdf.setFontSize(12);
        pdf.text('VAIDIK', pageW - 30, 32, { align: 'center' });
        pdf.setFontSize(7);
        pdf.text('TALK', pageW - 30, 37, { align: 'center' });

        y = 75;

        // ─── 1. Celebrity Identity ───
        pdf.setTextColor(...DARK);
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text(profile.name.toUpperCase(), margin, y);
        
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(...GOLD);
        pdf.text(`${profile.category.toUpperCase()} | CELESTIAL ALIGNMENT`, margin, y + 6);
        
        y += 18;

        // Summary
        pdf.setFontSize(9.5);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(...DARK);
        const summaryText = clean(profile.summary);
        const splitSummary = pdf.splitTextToSize(summaryText, contentW);
        for (let i = 0; i < splitSummary.length; i++) {
            if (y > pageH - 25) {
                pdf.addPage();
                y = 20;
            }
            pdf.text(splitSummary[i], margin, y);
            y += 5;
        }
        y += 10;

        // ─── 2. Astrological Stats ───
        drawSectionTitle('CORE ASTROLOGICAL IDENTITY', y);
        y += 7;

        autoTable(pdf, {
            startY: y,
            margin: { left: margin, right: margin },
            theme: 'grid',
            styles: { font: 'helvetica', fontSize: 10, cellPadding: 4, lineColor: [214, 200, 154], lineWidth: 0.3, halign: 'center' },
            headStyles: { fillColor: LIGHT_GOLD, textColor: DARK, fontStyle: 'bold', fontSize: 8 },
            head: [['Ascendant', 'Moon Sign', 'Sun Sign', 'Nakshatra']],
            body: [[
                clean(kundli.ascendant),
                clean(panchang.moon_sign),
                clean(panchang.sun_sign),
                clean(panchang.nakshatra),
            ]],
            bodyStyles: { fontStyle: 'bold', fontSize: 11 },
        });
        y = (pdf as any).lastAutoTable.finalY + 15;

        const zodiacMap: Record<string, number> = {
            "Aries": 1, "Taurus": 2, "Gemini": 3, "Cancer": 4, "Leo": 5, "Virgo": 6,
            "Libra": 7, "Scorpio": 8, "Sagittarius": 9, "Capricorn": 10, "Aquarius": 11, "Pisces": 12
        };

        const positions: Record<number, { x: number, y: number, sx: number, sy: number }> = {
            1: { x: 150, y: 80, sx: 150, sy: 20 },
            2: { x: 75, y: 45, sx: 65, sy: 18 },
            3: { x: 35, y: 75, sx: 20, sy: 65 },
            4: { x: 80, y: 150, sx: 20, sy: 150 },
            5: { x: 35, y: 225, sx: 20, sy: 235 },
            6: { x: 75, y: 255, sx: 65, sy: 282 },
            7: { x: 150, y: 220, sx: 150, sy: 285 },
            8: { x: 225, y: 255, sx: 235, sy: 282 },
            9: { x: 265, y: 225, sx: 282, sy: 235 },
            10: { x: 220, y: 150, sx: 280, sy: 150 },
            11: { x: 265, y: 75, sx: 282, sy: 65 },
            12: { x: 225, y: 45, sx: 235, sy: 18 },
        };

        const drawNorthIndianChart = (title: string, chartType: 'D1' | 'D9' | 'Bhav') => {
            if (y > pageH - 120) {
                pdf.addPage();
                y = 25;
            }

            drawSectionTitle(title, y);
            y += 7;

            const chartW = 90;
            const chartX = (pageW - chartW) / 2;
            
            pdf.setDrawColor(...GOLD);
            pdf.setLineWidth(0.4);
            pdf.rect(chartX, y, chartW, chartW);
            pdf.line(chartX, y, chartX + chartW, y + chartW);
            pdf.line(chartX + chartW, y, chartX, y + chartW);
            pdf.line(chartX + chartW/2, y, chartX, y + chartW/2);
            pdf.line(chartX, y + chartW/2, chartX + chartW/2, y + chartW);
            pdf.line(chartX + chartW/2, y + chartW, chartX + chartW, y + chartW/2);
            pdf.line(chartX + chartW, y + chartW/2, chartX + chartW/2, y);

            const scale = chartW / 300;
            
            if (kundli.houses && kundli.planets) {
                const d9AscSign = kundli.planets["Ascendant"]?.navamsa_sign || "Aries";
                const d9AscSignIdx = zodiacMap[d9AscSign] || 1;

                const getHouseSign = (houseNum: number) => {
                    if (chartType === 'D1' || chartType === 'Bhav') {
                        return kundli.houses[houseNum]?.sign || "Aries";
                    } else {
                        const signIdx = ((d9AscSignIdx + houseNum - 2) % 12) + 1;
                        return Object.entries(zodiacMap).find(([_, idx]) => idx === signIdx)?.[0] || "Aries";
                    }
                };

                const getPlanetsInHouse = (houseNum: number, houseSign: string) => {
                    if (chartType === 'Bhav') {
                        return Object.entries(kundli.planets)
                            .filter(([name, p]: any) => name !== 'Ascendant' && p.bhav_house === houseNum)
                            .map(([name, p]: any) => name.substring(0, 2) + (p.is_retrograde ? '*' : ''));
                    }
                    
                    return Object.entries(kundli.planets)
                        .filter(([name, p]: any) => {
                            if (name === 'Ascendant') return false;
                            const pSign = chartType === 'D1' ? p.sign : p.navamsa_sign;
                            return pSign === houseSign;
                        })
                        .map(([name, p]: any) => name.substring(0, 2) + (p.is_retrograde ? '*' : ''));
                };

                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(h => {
                    const pos = positions[h];
                    const sign = getHouseSign(h);
                    const signNum = zodiacMap[sign] || 1;
                    
                    pdf.setFontSize(7);
                    pdf.setTextColor(...GOLD);
                    pdf.text(String(signNum), chartX + pos.sx * scale, y + pos.sy * scale, { align: 'center', baseline: 'middle' });

                    const planetsInHouse = getPlanetsInHouse(h, sign);

                    pdf.setFontSize(8);
                    pdf.setTextColor(...DARK);
                    pdf.setFont('helvetica', 'bold');
                    planetsInHouse.forEach((p, idx) => {
                        const py = y + (pos.y * scale) + (idx - (planetsInHouse.length - 1) / 2) * 4;
                        pdf.text(p, chartX + pos.x * scale, py, { align: 'center', baseline: 'middle' });
                    });
                });
            }

            y += chartW + 15;
        };

        // ─── 3. Astrology Charts ───
        drawNorthIndianChart('LAGNA CHART (D1)', 'D1');
        drawNorthIndianChart('NAVAMSA CHART (D9)', 'D9');
        drawNorthIndianChart('BHAV CHALIT CHART', 'Bhav');

        if (y > pageH - 40) {
            pdf.addPage();
            y = 25;
        }

        drawSectionTitle('PLANETARY POSITIONS & DIGNITIES', y);
        y += 7;

        const planetRows: string[][] = [];
        Object.entries(kundli.planets).forEach(([name, p]: any) => {
            planetRows.push([
                name,
                p.sign || '',
                p.degree ? (p.degree % 30).toFixed(2) + '°' : '',
                `House ${p.house || ''}`,
                p.nakshatra || '',
                p.relation || 'Neutral',
            ]);
        });

        autoTable(pdf, {
            startY: y,
            margin: { left: margin, right: margin },
            theme: 'grid',
            styles: { font: 'helvetica', fontSize: 8.5, cellPadding: 3, lineColor: [214, 200, 154], lineWidth: 0.3 },
            headStyles: { fillColor: GOLD, textColor: WHITE, fontStyle: 'bold', fontSize: 7.5 },
            head: [['Planet', 'Sign', 'Degree', 'House', 'Nakshatra', 'Relation']],
            body: planetRows,
            alternateRowStyles: { fillColor: [255, 253, 245] },
        });

        y = (pdf as any).lastAutoTable.finalY + 15;

        // ─── 4. Detailed Legacy Analysis ───
        if (y > pageH - 80) {
            pdf.addPage();
            y = 25;
        }

        drawSectionTitle('CELESTIAL LEGACY ANALYSIS', y);
        y += 7;

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9.5);
        pdf.setTextColor(...DARK);
        
        const legacyText = clean(profile.content);
        const splitLegacy = pdf.splitTextToSize(legacyText, contentW);
        
        // Print text line by line with auto-pagination
        for (let i = 0; i < splitLegacy.length; i++) {
            if (y > pageH - 25) {
                pdf.addPage();
                y = 20; // reset y for new page
            }
            pdf.text(splitLegacy[i], margin, y);
            y += 5; // line height
        }

        // ─── Footer ───
        const totalPages = pdf.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(8);
            pdf.setTextColor(...GRAY);
            pdf.text(`VaidikTalk Premium Celebrity Report | Page ${i} of ${totalPages}`, pageW / 2, pageH - 10, { align: 'center' });
        }

        pdf.save(`Celebrity_Horoscope_${profile.name.replace(/\s+/g, '_')}.pdf`);
        toast.success('Cosmic legacy downloaded!', { id: toastId });

    } catch (error) {
        console.error('PDF error:', error);
        toast.error('Failed to summon cosmic records.', { id: toastId });
    }
};
