const DAFTAR_PROVINSI = [
    "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Kepulauan Riau",
    "Jambi", "Sumatera Selatan", "Kepulauan Bangka Belitung", "Bengkulu", "Lampung",
    "DKI Jakarta", "Jawa Barat", "Banten", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur",
    "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur",
    "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara",
    "Sulawesi Utara", "Gorontalo", "Sulawesi Tengah", "Sulawesi Barat", "Sulawesi Selatan", "Sulawesi Tenggara",
    "Maluku", "Maluku Utara",
    "Papua", "Papua Barat", "Papua Selatan", "Papua Tengah", "Papua Pegunungan", "Papua Barat Daya"
];

const DATA_AWAL = [];
/* Legacy sample data:

    {
        id: "asp-101",
        nama: "Rina Kartika",
        anonim: false,
        provinsi: "Jawa Timur",
        kategori: "Infrastruktur",
        jenis: "Keluhan",
        judul: "Perbaikan Penerangan Jalan Umum (PJU) di Jalur Penghubung Antar Kecamatan",
        isi: "Beberapa titik lampu jalan di jalur utama penghubung Kediri–Pare padam sejak dua bulan lalu sehingga rawan kecelakaan pada malam hari. Mohon dinas terkait melakukan pengecekan berkala dan mengganti lampu yang rusak dengan tenaga surya agar lebih hemat energi.",
        dukungan: 142,
        didukung: false,
        status: "Sedang Dibahas",
        waktu: "2 jam yang lalu",
        timestamp: Date.now() - 7200000
    },
    {
        id: "asp-102",
        nama: "Warga Anonim",
        anonim: true,
        provinsi: "DKI Jakarta",
        kategori: "Layanan Publik",
        jenis: "Apresiasi",
        judul: "Apresiasi Digitalisasi Antrean Puskesmas yang Semakin Cepat dan Tertib",
        isi: "Terima kasih atas pembaruan sistem pendaftaran daring di fasilitas kesehatan tingkat pertama. Orang tua saya kini tidak perlu mengantre sejak subuh karena estimasi jam pelayanan sudah tertera jelas di aplikasi.",
        dukungan: 198,
        didukung: false,
        status: "Selesai",
        waktu: "5 jam yang lalu",
        timestamp: Date.now() - 18000000
    },
    {
        id: "asp-103",
        nama: "Ahmad Fauzi",
        anonim: false,
        provinsi: "Sulawesi Selatan",
        kategori: "Ekonomi",
        jenis: "Saran",
        judul: "Pelatihan Pemasaran Digital & Sertifikasi Halal Gratis bagi Pelaku UMKM Pesisir",
        isi: "Banyak pelaku usaha olahan hasil laut di daerah kami memiliki produk berkualitas tetapi terkendala izin edar dan pemasaran daring. Kami mengusulkan program pendampingan terpadu di tingkat kelurahan agar UMKM lokal dapat naik kelas.",
        dukungan: 115,
        didukung: false,
        status: "Sedang Dibahas",
        waktu: "1 hari yang lalu",
        timestamp: Date.now() - 86400000
    },
    {
        id: "asp-104",
        nama: "Ni Luh Putu Sari",
        anonim: false,
        provinsi: "Bali",
        kategori: "Lingkungan",
        jenis: "Saran",
        judul: "Penambahan Tempat Pemilahan Sampah Organik dan Anorganik di Area Pasar Tradisional",
        isi: "Untuk mengurangi beban tempat pembuangan akhir, pengelola pasar tradisional sebaiknya difasilitasi tempat sampah terpilah serta bank sampah keliling setiap akhir pekan agar pedagang terbiasa memilah limbah dari sumbernya.",
        dukungan: 89,
        didukung: false,
        status: "Menunggu Tinjauan",
        waktu: "2 hari yang lalu",
        timestamp: Date.now() - 172800000
    },
    {
        id: "asp-105",
        nama: "Hendrikus L.",
        anonim: false,
        provinsi: "Nusa Tenggara Timur",
        kategori: "Pendidikan",
        jenis: "Keluhan",
        judul: "Pemerataan Akses Internet Sekolah untuk Mendukung Asesmen Berbasis Komputer",
        isi: "Beberapa sekolah menengah di wilayah kepulauan masih mengalami kendala sinyal saat pelaksanaan ujian berbasis digital. Diharapkan ada dukungan penguat sinyal atau VSAT khusus pendidikan agar siswa mendapatkan kesempatan belajar yang setara.",
        dukungan: 176,
        didukung: false,
        status: "Sedang Dibahas",
        waktu: "3 hari yang lalu",
        timestamp: Date.now() - 259200000
    },
    {
        id: "asp-106",
        nama: "dr. Ratna Dewi",
        anonim: false,
        provinsi: "Jawa Barat",
        kategori: "Kesehatan",
        jenis: "Saran",
        judul: "Integrasi Rekam Medis Elektronik Antar Rumah Sakit Rujukan Daerah",
        isi: "Pasien rujukan sering kali harus mengulang pemeriksaan laboratorium dasar karena data dari faskes sebelumnya belum terhubung. Percepatan integrasi satu data kesehatan akan sangat menghemat biaya dan waktu penanganan pasien.",
        dukungan: 134,
        didukung: false,
        status: "Selesai",
        waktu: "4 hari yang lalu",
        timestamp: Date.now() - 345600000
    }
];
*/

let daftarAspirasi = [];

async function muatData() {
    try {
        daftarAspirasi = await AspirasDB.all();
    } catch (error) {
        console.error('Gagal memuat database:', error);
        daftarAspirasi = [];
    }
}

async function simpanData() {
    try {
        await AspirasDB.saveAll(daftarAspirasi);
    } catch (error) {
        console.error('Gagal menyimpan database:', error);
    }
}

function isiDropdownProvinsi() {
    const selects = ['input-provinsi', 'filter-provinsi'].map(id => document.getElementById(id));
    DAFTAR_PROVINSI.forEach(provinsi => {
        selects.forEach(select => select.add(new Option(provinsi, provinsi)));
    });
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function getStatusBadge(status) {
    switch (status) {
        case 'Selesai':
            return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Selesai
                    </span>`;
        case 'Sedang Dibahas':
            return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Sedang Dibahas
                    </span>`;
        default:
            return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                        <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Menunggu Tinjauan
                    </span>`;
    }
}

function getJenisBadge(jenis) {
    if (jenis === 'Apresiasi') {
        return `<span class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-100/70 text-emerald-800">Apresiasi</span>`;
    }
    if (jenis === 'Saran') {
        return `<span class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-100/70 text-blue-800">Saran</span>`;
    }
    return `<span class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-merah-100/70 text-merah-800">Keluhan</span>`;
}

function renderFeed() {
    const container = document.getElementById('aspirasi-list');
    const keyword = document.getElementById('filter-search').value.toLowerCase().trim();
    const kategori = document.getElementById('filter-kategori').value;
    const provinsi = document.getElementById('filter-provinsi').value;
    const sortBy = document.getElementById('filter-sort').value;

    const hasil = daftarAspirasi.filter(item => {
        const cocokKategori = kategori === 'Semua' || item.kategori === kategori;
        const cocokProvinsi = provinsi === 'Semua' || item.provinsi === provinsi;
        const cocokKeyword = !keyword || [item.judul, item.isi, item.provinsi, item.kategori]
            .some(teks => teks.toLowerCase().includes(keyword));
        return cocokKategori && cocokProvinsi && cocokKeyword;
    });

    hasil.sort((a, b) => sortBy === 'terbanyak'
        ? b.dukungan - a.dukungan
        : b.timestamp - a.timestamp);

    document.getElementById('feed-count-badge').textContent = `Menampilkan ${hasil.length} aspirasi`;

    if (!hasil.length) {
        container.innerHTML = `
            <div class="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
                <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <i class="ph ph-magnifying-glass text-2xl"></i>
                </div>
                <h3 class="font-display font-bold text-slate-800">Tidak ada aspirasi yang sesuai</h3>
                <p class="text-xs text-slate-500 max-w-md mx-auto">Coba ubah kata kunci pencarian atau atur ulang filter kategori dan provinsi untuk melihat aspirasi lainnya.</p>
                <button onclick="resetFilter()" class="mt-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors">
                    Atur Ulang Filter
                </button>
            </div>
        `;
        return;
    }

    container.innerHTML = hasil.map(item => `
        <article class="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all animate-fade-in">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div class="flex flex-wrap items-center gap-2">
                    ${getJenisBadge(item.jenis)}
                    <span class="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                        ${escapeHTML(item.kategori)}
                    </span>
                    <span class="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                        <i class="ph-fill ph-map-pin text-merah-600"></i>
                        ${escapeHTML(item.provinsi)}
                    </span>
                </div>
                ${getStatusBadge(item.status)}
            </div>

            <h3 class="font-display font-bold text-base sm:text-lg text-slate-900 leading-snug mb-2">
                ${escapeHTML(item.judul)}
            </h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">
                ${escapeHTML(item.isi)}
            </p>

            <div class="pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-full ${item.anonim ? 'bg-slate-200 text-slate-600' : 'bg-merah-100 text-merah-700'} flex items-center justify-center font-bold text-xs">
                        ${item.anonim ? '<i class="ph-fill ph-user-circle text-base"></i>' : escapeHTML(item.nama.charAt(0).toUpperCase())}
                    </div>
                    <div>
                        <div class="text-xs font-semibold text-slate-800">${escapeHTML(item.nama)}</div>
                        <div class="text-[11px] text-slate-400">${escapeHTML(item.waktu)}</div>
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    <button onclick="salinTautanAspirasi('${item.id}')" title="Salin ringkasan aspirasi"
                        class="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors">
                        <i class="ph ph-share-network text-base"></i>
                    </button>
                    <button onclick="toggleDukungan('${item.id}')"
                        class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                            item.didukung
                                ? 'bg-merah-600 text-white shadow-sm shadow-merah-600/25'
                                : 'bg-slate-50 hover:bg-merah-50 text-slate-700 hover:text-merah-700 border border-slate-200 hover:border-merah-200'
                        }">
                        <i class="${item.didukung ? 'ph-fill' : 'ph-bold'} ph-thumbs-up text-sm"></i>
                        <span>Dukung</span>
                        <span class="px-1.5 py-0.5 rounded-md text-[11px] ${item.didukung ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-700'}">
                            ${item.dukungan}
                        </span>
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

function renderStatistik() {
    const totalAspirasi = daftarAspirasi.length;
    const totalDukungan = daftarAspirasi.reduce((total, item) => total + item.dukungan, 0);
    const sedangDibahas = daftarAspirasi.filter(item => item.status === 'Sedang Dibahas').length;
    const selesai = daftarAspirasi.filter(item => item.status === 'Selesai').length;

    document.getElementById('stat-total-aspirasi').textContent = totalAspirasi;
    document.getElementById('stat-total-dukungan').textContent = totalDukungan.toLocaleString('id-ID');
    document.getElementById('stat-sedang-dibahas').textContent = sedangDibahas;
    document.getElementById('stat-selesai').textContent = selesai;

    const daftarKategori = ["Layanan Publik", "Infrastruktur", "Ekonomi", "Pendidikan", "Kesehatan", "Lingkungan"];
    document.getElementById('chart-kategori').innerHTML = daftarKategori.map(kategori => {
        const jumlah = daftarAspirasi.filter(item => item.kategori === kategori).length;
        const persen = totalAspirasi ? Math.round((jumlah / totalAspirasi) * 100) : 0;
        return `
            <div>
                <div class="flex justify-between text-xs font-semibold mb-1.5">
                    <span class="text-slate-700">${kategori}</span>
                    <span class="text-slate-500">${jumlah} aspirasi (${persen}%)</span>
                </div>
                <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-merah-600 to-merah-500 rounded-full transition-all duration-500" style="width: ${persen}%"></div>
                </div>
            </div>
        `;
    }).join('');

    const hitungDaerah = {};
    daftarAspirasi.forEach(item => {
        hitungDaerah[item.provinsi] = (hitungDaerah[item.provinsi] || 0) + 1;
    });
    const topDaerah = Object.entries(hitungDaerah)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    const maxDaerah = topDaerah[0]?.[1] || 1;

    document.getElementById('chart-daerah').innerHTML = topDaerah.map(([provinsi, jumlah]) => {
        const lebar = Math.round((jumlah / maxDaerah) * 100);
        return `
            <div>
                <div class="flex justify-between text-xs font-semibold mb-1.5">
                    <span class="text-slate-700 flex items-center gap-1.5">
                        <i class="ph-fill ph-map-pin text-merah-600"></i> ${escapeHTML(provinsi)}
                    </span>
                    <span class="text-slate-600">${jumlah} laporan</span>
                </div>
                <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div class="h-full bg-slate-800 rounded-full transition-all duration-500" style="width: ${lebar}%"></div>
                </div>
            </div>
        `;
    }).join('');
}

function toggleDukungan(id) {
    const item = daftarAspirasi.find(item => item.id === id);
    if (!item) return;

    item.dukungan += item.didukung ? -1 : 1;
    item.didukung = !item.didukung;

    if (item.didukung) {
        tampilkanNotifikasi('Terima kasih! Dukungan Anda telah ditambahkan.', 'success');
    }

    simpanData();
    renderFeed();
    renderStatistik();
}

function salinTautanAspirasi(id) {
    const item = daftarAspirasi.find(item => item.id === id);
    if (!item) return;

    const textarea = document.createElement('textarea');
    textarea.value = `[Suara Rakyat - ${item.provinsi}] ${item.judul} — "${item.isi}"`;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        tampilkanNotifikasi('Ringkasan aspirasi berhasil disalin ke papan klip.', 'info');
    } catch (error) {
        tampilkanNotifikasi('Tidak dapat menyalin teks pada peramban ini.', 'error');
    } finally {
        textarea.remove();
    }
}

function resetFilter() {
    document.getElementById('filter-search').value = '';
    document.getElementById('filter-kategori').value = 'Semua';
    document.getElementById('filter-provinsi').value = 'Semua';
    document.getElementById('filter-sort').value = 'terbanyak';
    renderFeed();
}

function toggleModal(modalId, show) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.toggle('hidden', !show);
    modal.classList.toggle('flex', show);
}

function tampilkanNotifikasi(pesan, tipe = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    const gaya = {
        success: ['bg-slate-900 text-white border-emerald-500', '<i class="ph-fill ph-check-circle text-emerald-400 text-xl shrink-0"></i>'],
        error: ['bg-merah-700 text-white border-merah-400', '<i class="ph-fill ph-warning-circle text-white text-xl shrink-0"></i>'],
        info: ['bg-slate-800 text-white border-slate-600', '<i class="ph-fill ph-info text-blue-400 text-xl shrink-0"></i>']
    }[tipe] || ['bg-slate-800 text-white border-slate-600', '<i class="ph-fill ph-info text-blue-400 text-xl shrink-0"></i>'];

    toast.className = `pointer-events-auto flex items-center gap-3 px-4 py-3.5 rounded-xl shadow-xl border-l-4 ${gaya[0]} text-xs font-medium animate-fade-in`;
    toast.innerHTML = `${gaya[1]}<span>${escapeHTML(pesan)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

document.addEventListener('DOMContentLoaded', async () => {
    await muatData();
    isiDropdownProvinsi();
    renderFeed();
    renderStatistik();

    const checkAnonim = document.getElementById('check-anonim');
    const inputNama = document.getElementById('input-nama');
    checkAnonim.addEventListener('change', event => {
        inputNama.value = event.target.checked ? 'Warga Anonim' : '';
        inputNama.disabled = event.target.checked;
        if (!event.target.checked) inputNama.focus();
    });

    const inputIsi = document.getElementById('input-isi');
    const charCounter = document.getElementById('char-counter');
    inputIsi.addEventListener('input', () => {
        charCounter.textContent = `${inputIsi.value.length} / 600`;
    });

    const form = document.getElementById('aspirasi-form');
    form.addEventListener('submit', event => {
        event.preventDefault();

        const isAnonim = checkAnonim.checked;
        const nama = isAnonim ? 'Warga Anonim' : inputNama.value.trim();
        const provinsi = document.getElementById('input-provinsi').value;
        const kategori = document.getElementById('input-kategori').value;
        const jenis = document.querySelector('input[name="jenis"]:checked').value;
        const judul = document.getElementById('input-judul').value.trim();
        const isi = inputIsi.value.trim();

        if (!nama || !provinsi || !kategori || !judul || !isi) {
            tampilkanNotifikasi('Mohon lengkapi seluruh kolom aspirasi terlebih dahulu.', 'error');
            return;
        }

        const timestamp = Date.now();
        daftarAspirasi.unshift({
            id: `asp-${timestamp}`,
            nama,
            anonim: isAnonim,
            provinsi,
            kategori,
            jenis,
            judul,
            isi,
            dukungan: 1,
            didukung: true,
            status: 'Menunggu Tinjauan',
            waktu: 'Baru saja',
            timestamp
        });
        simpanData();

        form.reset();
        inputNama.disabled = false;
        charCounter.textContent = '0 / 600';
        document.getElementById('filter-sort').value = 'terbaru';

        renderFeed();
        renderStatistik();
        tampilkanNotifikasi('Aspirasi Anda berhasil dipublikasikan ke ruang publik!', 'success');
        document.getElementById('feed-section').scrollIntoView({ behavior: 'smooth' });
    });

    ['filter-search', 'filter-kategori', 'filter-provinsi', 'filter-sort'].forEach(id => {
        const eventName = id === 'filter-search' ? 'input' : 'change';
        document.getElementById(id).addEventListener(eventName, renderFeed);
    });

    document.getElementById('modal-pedoman').addEventListener('click', event => {
        if (event.target.id === 'modal-pedoman') {
            toggleModal('modal-pedoman', false);
        }
    });
});
