const express = require('express');
const axios = require('axios'); // <-- Kita pakai axios biar stabil
const app = express();

// SETELAN CORS MANUAL (Tanpa install package luar biar gak error rate 100%)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');
    
    if (req.method === 'OPTIONS') {
        res.status(204).end();
        return;
    }
    next();
});
app.use(express.json());
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GEMINI_API_KEY;

// DATA OTAK AIRIS
const DATA_TUGAS = `
Berikut adalah detail tugas, projek sekolah, dan keahlian Muhammad Aris:
DATASET 1: BRANDING IDENTITY & EVENT FESTIVAL
[PROYEK: BAYUANGGA NIGHT CULTURE FESTIVAL 2026]
A. METADATA & ADMINISTRASI PROYEK
Nama Resmi Entitas: Bayuangga Night Culture Festival

Kategori Proyek: City Branding / Event Marketing Identity / Cultural Festival

Penanggung Jawab Proyek (PIC): M. Aris

Alokasi Anggaran (Budget): Rp125.000.000,-

Tahun Pelaksanaan: 2026

Lokasi Geografis Fokus: Kota Probolinggo, Jawa Timur, Indonesia

B. STRATEGI UTAMA & POSISI MEREK (BRAND STRATEGY)
Tujuan Utama Proyek (Core Objective):
Merancang sebuah identitas visual (logo) yang kuat sebagai simbol utama festival malam di Kota Probolinggo. Logo ini harus mampu merepresentasikan kekayaan budaya lokal, membangkitkan semangat kebersamaan rakyat, serta berfungsi sebagai alat pemasaran yang efektif untuk mendongkrak sektor pariwisata malam daerah.

Pesan Utama (Key Message): Sebuah perayaan budaya malam yang inklusif, meriah, mengakar pada tradisi rakyat, namun dikemas secara adaptif dan modern.

Slogan Resmi (Tagline): "Gemerlap Budaya di Bawah Langit Bayuangga"

Arsitektur Nada Suara (Tone of Voice):

Festive (Meriah & Semarak)

Communal (Dekat dengan rakyat / Merakyat)

Vibrant (Penuh energi & semangat kebudayaan)

C. FILOSOFI SEMIOTIKA & STRUKTUR VISUAL LOGO (VISUAL ANATOMY)
Konsep logo wajib menggabungkan tiga elemen hibrida yang distilir secara harmonis:

Perahu Nelayan Tradisional (Simbol Sosiologis): Merepresentasikan karakter, ketangguhan, dan etos kerja masyarakat pesisir Probolinggo.

Kelabang Songgo (Simbol Kultural): Mengambil bentuk dari struktur pertunjukan tradisi kelabang songo, yang disederhanakan (distilir) menjadi pola geometris untuk menunjukkan harmoni dan struktur budaya yang kokoh.

Nasi Jagung (Simbol Agraris & Kuliner): Representasi dari hasil bumi lokal sekaligus panganan khas yang melambangkan kesederhanaan, kedekatan dengan tanah, dan identitas kuliner rakyat.

D. SISTEM WARNA (COLOR PALETTE SYSTEM)
Sistem warna menggunakan kombinasi kontras tinggi untuk keperluan visual malam hari (night-mode visibility):

Biru Tua (Dark Blue) & Biru Muda (Light Blue): Merepresentasikan elemen pesisir pantai, laut, serta suasana langit malam festival.

Merah (Red): Melambangkan keberanian, energi pertunjukan, dan semangat pelestarian budaya.

Kuning (Yellow): Melambangkan kemakmuran, kehangatan rakyat, dan hasil bumi (nasi jagung).

E. SISTEM TIPOGRAFI (TYPOGRAPHY SPECIFICATION)
Font Utama (Primary Font): Humnst777

Karakteristik: Tegas, berstruktur, memberikan kesan profesional, kokoh, dan memiliki keterbacaan yang tinggi pada media cetak skala besar (baliho/panggung).

Font Sekunder (Secondary Font): Myriad Pro

Karakteristik: Fleksibel, modern, bersih, digunakan untuk teks pendukung, informasi digital, dan dokumentasi.

F. PENGEMBANGAN KARAKTER MASKOT (MASCOT BLUEPRINT)
Konsep Dasar: Karakter berwujud Ikan Cakalang.

Gaya Visual: Kartun (Cartoonish), ramah anak, ekspresif, dan ceria.

Tujuan Maskot: Menjadi personifikasi dari wilayah pesisir Probolinggo yang kaya akan hasil laut, berfungsi sebagai penarik perhatian massa, serta menjadi elemen merchandise festival.

DATASET 2: BRANDING IDENTITY & FMCG PRODUCT
[PROYEK: SIRUP MANGGUR ELING]
A. METADATA & ADMINISTRASI PROYEK
Nama Resmi Produk: Manggur Eling

Kategori Proyek: FMCG / Food & Beverage (F&B) Packaging & Branding

Penanggung Jawab Proyek (PIC): M. Aris

Alokasi Anggaran (Budget): Rp3.000.000,-

Jenis Produk: Sirup Buah Khas Daerah

B. STRATEGI UTAMA & POSISI MEREK (BRAND STRATEGY)
Tujuan Utama Proyek (Core Objective):
Menciptakan identitas visual dan logo komersial untuk produk sirup premium khas Kabupaten Probolinggo yang memanfaatkan kombinasi rasa buah lokal unggulan (Mangga dan Anggur). Logo harus menonjol di rak toko oleh-oleh dan membangun ikatan emosional dengan konsumen.

Etimologi Nama Merek:

"Manggur": Portmanteau (gabungan kata) dari Mangga dan Anggur, menunjukkan dua varian rasa utama.

"Eling": Berasal dari bahasa Jawa yang berarti "ingat" atau "teringat", menciptakan efek psikologis rasa yang membekas dan penuh kenangan.

Pesan Utama (Key Message): Keaslian rasa buah premium lokal Probolinggo yang membawa kesegaran alami sekaligus menghadirkan nostalgia yang manis.

Slogan Resmi (Tagline): "Manisnya kenangan mengalir dalam setiap tegukan."

Arsitektur Nada Suara (Tone of Voice):

Fresh (Segar & Alami)

Warm (Hangat & Ramah)

Nostalgic (Penuh kenangan / Sentimental)

C. FILOSOFI SEMIOTIKA & STRUKTUR VISUAL LOGO (VISUAL ANATOMY)
Bentuk logo menggunakan pendekatan bentuk organik dan fluid dengan elemen kunci:

Siluet Mangga (Bentuk Luar/Outer Shape): Garis luar logo membentuk siluet membulat khas buah mangga, menjadi penanda utama komponen rasa manis alami produk.

Aliran Angin Gending (Garis Dinamis): Elemen grafis berupa garis melengkung/mengalir berwarna hijau. Berfungsi ganda sebagai representasi "Angin Gending" yang berembus sejuk di Probolinggo, sekaligus simbolisasi sirup cair yang sedang dituang ("mengalir").

Butiran Anggur (Elemen Aksentuation): Grafis berbentuk lingkaran/butiran buah anggur diletakkan secara estetis di bagian atas komposisi untuk mempertegas rasa anggur yang unik.

D. SISTEM WARNA (COLOR PALETTE SYSTEM)
Palet warna menggunakan pendekatan psikologi warna makanan (appetite-stimulating colors):

Oranye (Orange): Melambangkan buah mangga yang matang, kehangatan, kebahagiaan, dan rasa manis.

Ungu (Purple): Melambangkan buah anggur, memberikan kesan produk yang unik, premium, dan eksklusif.

Hijau (Green): Representasi kesegaran alam, daun buah, serta simbolisasi kesejukan Angin Gending.

Kuning (Yellow): Memberikan aksen energi, keceriaan, dan kesegaran buah sitrus/tropis.

E. SISTEM TIPOGRAFI (TYPOGRAPHY SPECIFICATION)
Font Utama (Primary Font): Cascadia

Karakteristik: Bersih, fungsional, memberikan kesan modernitas produk era baru, cocok untuk nama varian produk dan label nutrisi.

Font Sekunder (Secondary Font): Futura Md BT

Karakteristik: Geometris, minimalis, namun tetap elegan. Memberikan keseimbangan visual agar nama merek "Manggur Eling" terlihat profesional dan berkelas di kemasan botol.

F. PENGEMBANGAN KARAKTER MASKOT (MASCOT BLUEPRINT)
Nama Karakter Maskot: Bayma

Konsep & Gender: Karakter anak perempuan yang ceria dan lincah.

Personifikasi Elemen:

Nama "Bayma" diambil dari gabungan Bayu (Angin) dan Mangga.

Karakter dirancang untuk merepresentasikan sifat Angin Gending yang bergerak dinamis/bebas (Bayu) dikombinasikan dengan atribut visual atau kostum bertema buah Mangga yang manis dan menyegarkan.
`;

app.post('/api/chat', async (req, res) => {
    try {
      const { message, prompt } = req.body;
const userMessage = message || prompt;

        if (!API_KEY) {
            return res.status(500).json({ error: "API Key Gemini belum disetting di Vercel!" });
        }

        const promptLengkap = `${DATA_TUGAS}\n\nPertanyaan user: ${userMessage}`;

        // Menggunakan Axios untuk menembak Gemini API (Pasti Lolos)
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                contents: [{
                    parts: [{ text: promptLengkap }]
                }]
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        const data = response.data;

        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const reply = data.candidates[0].content.parts[0].text;
            return res.json({ reply });
        } else {
            return res.status(500).json({ error: "Gagal mendapatkan respon dari Gemini." });
        }

    } catch (error) {
        console.error("Error Detail:", error.response ? error.response.data : error.message);
        return res.status(500).json({ error: "Internal Server Error", detail: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});

module.exports = app;