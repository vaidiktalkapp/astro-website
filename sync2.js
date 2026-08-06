const fs = require('fs');

async function sync() {
    const res = await fetch('http://localhost:3001/api/v1/pujas');
    const data = await res.json();
    const pujas = data.data || data;
    
    const gallery = [
        '/pooja/Rudraabhishek.png',
        '/pooja/Rahu Ketu Grah Shanti Puja.png',
        '/pooja/Hanuman Sindoor  Boondi Puja.png',
        '/pooja/Shani Tel Arpan and Aarti.png',
        '/pooja/Mangal Dosh Nivaran Puja.png',
        '/pooja/Ganesh Ji Ko Laddoo Arpan.png'
    ];
    
    const relatedPujas = [
        { title: "Rudrabhishek Puja", slug: "rudrabhishek", price: "₹1,599", img: "/pooja/Rudraabhishek.png", tag: "Health & Peace" },
        { title: "Rahu Ketu Shanti", slug: "rahu-ketu-grah-shanti-puja", price: "₹1,599", img: "/pooja/Rahu Ketu Grah Shanti Puja.png", tag: "Dosh Nivaran" },
        { title: "Hanuman Puja", slug: "hanuman-sindoor-boondi-arpan", price: "₹999", img: "/pooja/Hanuman Sindoor  Boondi Puja.png", tag: "Strength & Protection" },
        { title: "Shani Tel Arpan", slug: "shani-tel-arpan-aarti", price: "₹1,199", img: "/pooja/Shani Tel Arpan and Aarti.png", tag: "Remove Shani Dosh" }
    ];
    
    for (const puja of pujas) {
        try {
            const updateRes = await fetch('http://localhost:3001/api/v1/pujas/' + puja._id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    gallery,
                    relatedPujas
                })
            });
            console.log('Updated ' + puja.slug + ':', updateRes.status);
        } catch (e) {
            console.error('Failed ' + puja.slug + ':', e);
        }
    }
}
sync();
