// WebGIS Kabupaten Bandung Barat
// Dibuat oleh: Salsa Hasna Nabila

// Inisialisasi variabel global
let map;
let layerGroups = {};
let currentBasemap = 'osm';
let basemaps = {};

// Koordinat pusat Kabupaten Bandung Barat
const BANDUNG_BARAT_CENTER = [-6.8295, 107.4977];
const BANDUNG_BARAT_ZOOM = 11;


// Data lokasi untuk berbagai kategori
const locationData = {
    sekolah: [
        {
            name: "SMAN 1 Lembang",
            lat: -6.8128,
            lng: 107.6177,
            type: "SMA Negeri",
            address: "Jl. Raya Lembang No. 357, Lembang",
            description: "Sekolah Menengah Atas Negeri terbaik di Lembang dengan berbagai prestasi akademik dan non-akademik.",
            phone: "(022) 2786234",
            website: "https://sman1lembang.sch.id"
        },
        {
            name: "SMPN 1 Padalarang",
            lat: -6.8387,
            lng: 107.4742,
            type: "SMP Negeri",
            address: "Jl. Raya Padalarang No. 252, Padalarang",
            description: "Sekolah Menengah Pertama Negeri dengan fasilitas lengkap dan tenaga pengajar berpengalaman.",
            phone: "(022) 6866141"
        },
        {
            name: "SDN Cipongkor 1",
            lat: -6.7856,
            lng: 107.2504,
            type: "SD Negeri",
            address: "Jl. Raya Cipongkor, Cipongkor",
            description: "Sekolah Dasar Negeri yang melayani pendidikan dasar untuk wilayah Cipongkor.",
            phone: "(022) 6867234"
        },
        {
            name: "SMAN 1 Ngamprah",
            lat: -6.7845,
            lng: 107.6029,
            type: "SMA Negeri",
            address: "Jl. Raya Ngamprah No. 45, Ngamprah",
            description: "Sekolah Menengah Atas Negeri dengan program unggulan IPA dan IPS.",
            phone: "(022) 6654321"
        },
        {
            name: "SMAN 1 Cipeundeuy",
            lat: -6.9234,
            lng: 107.4567,
            type: "SMA Negeri",
            address: "Jl. Raya Cipeundeuy, Cipeundeuy",
            description: "Sekolah Menengah Atas Negeri yang melayani wilayah Cipeundeuy dan sekitarnya.",
            phone: "(022) 6887123"
        },
        {
            name: "SMPN 1 Batujajar",
            lat: -6.8567,
            lng: 107.4891,
            type: "SMP Negeri",
            address: "Jl. Raya Batujajar No. 89, Batujajar",
            description: "Sekolah Menengah Pertama Negeri unggulan di wilayah Batujajar.",
            phone: "(022) 6866789"
        },
        {
            name: "SDN Cihampelas 1",
            lat: -6.7923,
            lng: 107.4234,
            type: "SD Negeri",
            address: "Jl. Cihampelas, Cihampelas",
            description: "Sekolah Dasar Negeri dengan program pendidikan karakter yang kuat.",
            phone: "(022) 6854321"
        },
        {
            name: "SMAN 1 Cikalong Wetan",
            lat: -6.7156,
            lng: 107.4589,
            type: "SMA Negeri",
            address: "Jl. Raya Cikalong Wetan, Cikalong Wetan",
            description: "Sekolah Menengah Atas Negeri di wilayah utara Kabupaten Bandung Barat.",
            phone: "(022) 6876543"
        },
        {
            name: "SMPN 1 Cisarua",
            lat: -6.7789,
            lng: 107.6234,
            type: "SMP Negeri",
            address: "Jl. Raya Cisarua, Cisarua",
            description: "Sekolah Menengah Pertama Negeri dengan lokasi strategis di Cisarua.",
            phone: "(022) 2787456"
        },
        {
            name: "SDN Sindangkerta 1",
            lat: -6.8445,
            lng: 107.3789,
            type: "SD Negeri",
            address: "Jl. Sindangkerta, Sindangkerta",
            description: "Sekolah Dasar Negeri yang melayani pendidikan dasar di wilayah Sindangkerta.",
            phone: "(022) 6843210"
        }
    ],
    rumahsakit: [
        {
            name: "RSUD Saguling",
            lat: -6.8742,
            lng: 107.5234,
            type: "Rumah Sakit Umum Daerah",
            address: "Jl. Raya Saguling, Saguling",
            description: "Rumah Sakit Umum Daerah yang melayani masyarakat Bandung Barat dengan fasilitas medis lengkap.",
            phone: "(022) 6867890",
            facilities: ["IGD 24 Jam", "Rawat Inap", "Rawat Jalan", "Laboratorium", "Radiologi"]
        },
        {
            name: "Puskesmas Padalarang",
            lat: -6.8387,
            lng: 107.4742,
            type: "Puskesmas",
            address: "Jl. Raya Padalarang No. 128, Padalarang",
            description: "Pusat Kesehatan Masyarakat yang memberikan pelayanan kesehatan dasar.",
            phone: "(022) 6866555",
            facilities: ["Poli Umum", "KIA", "Gigi", "Laboratorium Sederhana"]
        },
        {
            name: "Puskesmas Lembang",
            lat: -6.8128,
            lng: 107.6177,
            type: "Puskesmas",
            address: "Jl. Raya Lembang No. 145, Lembang",
            description: "Pusat Kesehatan Masyarakat yang melayani wilayah Lembang dan sekitarnya.",
            phone: "(022) 2786777",
            facilities: ["Poli Umum", "KIA", "Gigi", "Imunisasi", "Laboratorium"]
        },
        {
            name: "RSUD Cikalong Wetan",
            lat: -6.7156,
            lng: 107.4589,
            type: "Rumah Sakit Umum Daerah",
            address: "Jl. Raya Cikalong Wetan, Cikalong Wetan",
            description: "Rumah Sakit Umum Daerah yang melayani wilayah utara Kabupaten Bandung Barat.",
            phone: "(022) 6876890",
            facilities: ["IGD 24 Jam", "Rawat Inap", "Rawat Jalan", "Bedah", "Kandungan"]
        },
        {
            name: "Puskesmas Ngamprah",
            lat: -6.7845,
            lng: 107.6029,
            type: "Puskesmas",
            address: "Jl. Raya Ngamprah No. 67, Ngamprah",
            description: "Pusat Kesehatan Masyarakat dengan pelayanan kesehatan terpadu.",
            phone: "(022) 6654888",
            facilities: ["Poli Umum", "Gigi", "KIA", "TB Paru", "Gizi"]
        },
        {
            name: "Puskesmas Batujajar",
            lat: -6.8567,
            lng: 107.4891,
            type: "Puskesmas",
            address: "Jl. Raya Batujajar No. 234, Batujajar",
            description: "Pusat Kesehatan Masyarakat yang melayani wilayah Batujajar.",
            phone: "(022) 6866999",
            facilities: ["Poli Umum", "KIA", "Gigi", "Imunisasi"]
        },
        {
            name: "Puskesmas Cipongkor",
            lat: -6.7856,
            lng: 107.2504,
            type: "Puskesmas",
            address: "Jl. Raya Cipongkor, Cipongkor",
            description: "Pusat Kesehatan Masyarakat yang melayani wilayah Cipongkor dan sekitarnya.",
            phone: "(022) 6867111",
            facilities: ["Poli Umum", "Gigi", "KIA", "Laboratorium Sederhana"]
        },
        {
            name: "RS Hermina Padalarang",
            lat: -6.8456,
            lng: 107.4823,
            type: "Rumah Sakit Swasta",
            address: "Jl. Raya Padalarang No. 567, Padalarang",
            description: "Rumah Sakit swasta dengan fasilitas medis modern dan pelayanan berkualitas.",
            phone: "(022) 6866000",
            facilities: ["IGD 24 Jam", "ICU", "Bedah", "Kandungan", "Anak", "Hemodialisa"]
        }
    ],
    wisata: [
        {
            name: "Tangkuban Perahu",
            lat: -6.7597,
            lng: 107.6098,
            type: "Wisata Alam",
            address: "Cikole, Lembang",
            description: "Gunung berapi aktif dengan kawah yang menawan dan pemandangan alam yang spektakuler.",
            phone: "(022) 2786001",
            tiket: "Rp 30.000 (Dewasa), Rp 25.000 (Anak)",
            jamBuka: "08:00 - 17:00 WIB"
        },
        {
            name: "Floating Market Lembang",
            lat: -6.8098,
            lng: 107.6234,
            type: "Wisata Kuliner",
            address: "Jl. Grand Hotel No. 33E, Lembang",
            description: "Pasar terapung dengan berbagai kuliner khas Bandung dan wahana rekreasi keluarga.",
            phone: "(022) 2785818",
            tiket: "Rp 15.000 (Dewasa), Rp 12.000 (Anak)",
            jamBuka: "09:00 - 18:00 WIB"
        },
        {
            name: "Kampung Gajah Wonderland",
            lat: -6.8156,
            lng: 107.6089,
            type: "Wisata Keluarga",
            address: "Jl. Sersan Bajuri Km 3.8, Cihideung, Lembang",
            description: "Taman wisata keluarga dengan berbagai wahana permainan dan atraksi menarik.",
            phone: "(022) 2786316",
            tiket: "Rp 25.000 - Rp 35.000",
            jamBuka: "08:00 - 18:00 WIB"
        },
        {
            name: "Curug Dago",
            lat: -6.8445,
            lng: 107.6123,
            type: "Wisata Alam",
            address: "Dago Atas, Coblong",
            description: "Air terjun alami dengan suasana sejuk dan pemandangan yang indah.",
            tiket: "Rp 5.000",
            jamBuka: "07:00 - 17:00 WIB"
        },
        {
            name: "Maribaya Hot Spring Resort",
            lat: -6.7934,
            lng: 107.6445,
            type: "Wisata Relaksasi",
            address: "Jl. Maribaya No. 124, Lembang",
            description: "Resort pemandian air panas alami dengan fasilitas spa dan kolam renang.",
            phone: "(022) 2786444",
            tiket: "Rp 40.000 - Rp 60.000",
            jamBuka: "08:00 - 22:00 WIB"
        },
        {
            name: "Curug Cimahi",
            lat: -6.8234,
            lng: 107.5567,
            type: "Wisata Alam",
            address: "Kertawangi, Cisarua",
            description: "Air terjun yang indah dengan ketinggian sekitar 87 meter, terkenal sebagai 'Rainbow Falls'.",
            tiket: "Rp 15.000",
            jamBuka: "08:00 - 17:00 WIB"
        },
        {
            name: "Sari Ater Hot Spring",
            lat: -6.7456,
            lng: 107.6123,
            type: "Wisata Relaksasi",
            address: "Jl. Raya Ciater, Subang",
            description: "Pemandian air panas alami dengan berbagai kolam renang dan fasilitas spa.",
            phone: "(022) 2789012",
            tiket: "Rp 35.000 - Rp 50.000",
            jamBuka: "06:00 - 18:00 WIB"
        },
        {
            name: "Gunung Putri Lembang",
            lat: -6.7823,
            lng: 107.6234,
            type: "Wisata Alam",
            address: "Wangunharja, Lembang",
            description: "Destinasi wisata alam dengan pemandangan pegunungan dan udara sejuk.",
            tiket: "Rp 10.000",
            jamBuka: "07:00 - 17:00 WIB"
        },
        {
            name: "De'Ranch Lembang",
            lat: -6.8167,
            lng: 107.6178,
            type: "Wisata Keluarga",
            address: "Jl. Maribaya No. 17, Lembang",
            description: "Wisata berkuda dengan nuansa koboi dan berbagai aktivitas outdoor.",
            phone: "(022) 2786200",
            tiket: "Rp 20.000 + biaya aktivitas",
            jamBuka: "09:00 - 17:00 WIB"
        },
        {
            name: "Kawah Putih Ciwidey",
            lat: -7.1661,
            lng: 107.4023,
            type: "Wisata Alam",
            address: "Alam Endah, Ciwidey",
            description: "Danau kawah vulkanik dengan air berwarna putih kehijauan yang menawan.",
            phone: "(022) 5940970",
            tiket: "Rp 18.000 (Dewasa), Rp 8.000 (Anak)",
            jamBuka: "07:00 - 17:00 WIB"
        },
        {
            name: "Taman Hutan Raya Ir. H. Djuanda",
            lat: -6.7945,
            lng: 107.6234,
            type: "Wisata Alam",
            address: "Kompleks Tahura, Dago Pakar",
            description: "Taman hutan dengan gua Belanda, gua Jepang, dan jalur trekking yang menantang.",
            phone: "(022) 2503664",
            tiket: "Rp 18.000 (Dewasa), Rp 9.000 (Anak)",
            jamBuka: "08:00 - 16:00 WIB"
        },
        {
            name: "Jendela Alam",
            lat: -6.8089,
            lng: 107.6156,
            type: "Wisata Edukasi",
            address: "Jl. Sersan Bajuri Km 4.5, Cihideung, Lembang",
            description: "Wisata edukasi dengan konsep back to nature, outbound, dan pembelajaran alam.",
            phone: "(022) 2786204",
            tiket: "Rp 25.000 - Rp 40.000",
            jamBuka: "09:00 - 17:00 WIB"
        }
    ],
    pemerintahan: [
        {
            name: "Kantor Bupati Bandung Barat",
            lat: -6.8387,
            lng: 107.4742,
            type: "Kantor Pemerintahan",
            address: "Jl. Raya Batujajar No. 1, Batujajar",
            description: "Kantor pusat pemerintahan Kabupaten Bandung Barat.",
            phone: "(022) 6866001",
            layanan: ["Pelayanan Administrasi", "Perizinan", "Informasi Publik"]
        },
        {
            name: "Kantor Camat Lembang",
            lat: -6.8128,
            lng: 107.6177,
            type: "Kantor Kecamatan",
            address: "Jl. Raya Lembang No. 223, Lembang",
            description: "Kantor kecamatan yang melayani administrasi wilayah Lembang.",
            phone: "(022) 2786111",
            layanan: ["KTP", "KK", "Akta Kelahiran", "Surat Keterangan"]
        },
        {
            name: "Kantor Camat Padalarang",
            lat: -6.8387,
            lng: 107.4742,
            type: "Kantor Kecamatan",
            address: "Jl. Raya Padalarang No. 156, Padalarang",
            description: "Kantor kecamatan yang melayani administrasi wilayah Padalarang.",
            phone: "(022) 6866222",
            layanan: ["Administrasi Kependudukan", "Perizinan Usaha", "Surat Menyurat"]
        },
        {
            name: "Kantor Camat Ngamprah",
            lat: -6.7845,
            lng: 107.6029,
            type: "Kantor Kecamatan",
            address: "Jl. Raya Ngamprah No. 78, Ngamprah",
            description: "Kantor kecamatan yang melayani administrasi wilayah Ngamprah.",
            phone: "(022) 6654444",
            layanan: ["Pelayanan Publik", "Administrasi Desa", "Perizinan"]
        },
        {
            name: "Kantor Camat Batujajar",
            lat: -6.8567,
            lng: 107.4891,
            type: "Kantor Kecamatan",
            address: "Jl. Raya Batujajar No. 112, Batujajar",
            description: "Kantor kecamatan yang melayani administrasi wilayah Batujajar.",
            phone: "(022) 6866333",
            layanan: ["KTP", "KK", "Surat Domisili", "Perizinan"]
        },
        {
            name: "Kantor Camat Cipeundeuy",
            lat: -6.9234,
            lng: 107.4567,
            type: "Kantor Kecamatan",
            address: "Jl. Raya Cipeundeuy, Cipeundeuy",
            description: "Kantor kecamatan yang melayani administrasi wilayah Cipeundeuy.",
            phone: "(022) 6887111",
            layanan: ["Administrasi Kependudukan", "Surat Keterangan", "Perizinan"]
        },
        {
            name: "Kantor Camat Cikalong Wetan",
            lat: -6.7156,
            lng: 107.4589,
            type: "Kantor Kecamatan",
            address: "Jl. Raya Cikalong Wetan, Cikalong Wetan",
            description: "Kantor kecamatan yang melayani administrasi wilayah Cikalong Wetan.",
            phone: "(022) 6876111",
            layanan: ["KTP", "KK", "Akta Kelahiran", "Surat Domisili"]
        },
        {
            name: "Kantor Camat Cisarua",
            lat: -6.7789,
            lng: 107.6234,
            type: "Kantor Kecamatan",
            address: "Jl. Raya Cisarua, Cisarua",
            description: "Kantor kecamatan yang melayani administrasi wilayah Cisarua.",
            phone: "(022) 2787111",
            layanan: ["Pelayanan Publik", "Administrasi Desa", "Perizinan Usaha"]
        },
        {
            name: "Kantor Camat Cipongkor",
            lat: -6.7856,
            lng: 107.2504,
            type: "Kantor Kecamatan",
            address: "Jl. Raya Cipongkor, Cipongkor",
            description: "Kantor kecamatan yang melayani administrasi wilayah Cipongkor.",
            phone: "(022) 6867111",
            layanan: ["KTP", "KK", "Surat Keterangan", "Perizinan"]
        },
        {
            name: "Kantor Camat Cihampelas",
            lat: -6.7923,
            lng: 107.4234,
            type: "Kantor Kecamatan",
            address: "Jl. Cihampelas, Cihampelas",
            description: "Kantor kecamatan yang melayani administrasi wilayah Cihampelas.",
            phone: "(022) 6854111",
            layanan: ["Administrasi Kependudukan", "Surat Domisili", "Perizinan"]
        },
        {
            name: "Kantor Camat Sindangkerta",
            lat: -6.8445,
            lng: 107.3789,
            type: "Kantor Kecamatan",
            address: "Jl. Sindangkerta, Sindangkerta",
            description: "Kantor kecamatan yang melayani administrasi wilayah Sindangkerta.",
            phone: "(022) 6843111",
            layanan: ["KTP", "KK", "Akta Kelahiran", "Surat Keterangan"]
        },
        {
            name: "DPRD Kabupaten Bandung Barat",
            lat: -6.8356,
            lng: 107.4723,
            type: "Lembaga Legislatif",
            address: "Jl. Raya Batujajar No. 25, Batujajar",
            description: "Dewan Perwakilan Rakyat Daerah Kabupaten Bandung Barat.",
            phone: "(022) 6866002",
            layanan: ["Aspirasi Masyarakat", "Pengaduan", "Informasi Legislasi"]
        },
        {
            name: "Kantor Dinas Pendidikan KBB",
            lat: -6.8378,
            lng: 107.4756,
            type: "Dinas Pemerintahan",
            address: "Jl. Raya Batujajar No. 15, Batujajar",
            description: "Dinas Pendidikan Kabupaten Bandung Barat.",
            phone: "(022) 6866003",
            layanan: ["Data Sekolah", "Beasiswa", "Sertifikasi Guru"]
        },
        {
            name: "Kantor Dinas Kesehatan KBB",
            lat: -6.8365,
            lng: 107.4734,
            type: "Dinas Pemerintahan",
            address: "Jl. Raya Batujajar No. 18, Batujajar",
            description: "Dinas Kesehatan Kabupaten Bandung Barat.",
            phone: "(022) 6866004",
            layanan: ["Data Kesehatan", "Imunisasi", "Sertifikat Sehat"]
        }
    ]
};

// Fungsi untuk membuat ikon custom berdasarkan kategori
function createCustomIcon(category) {
    const iconConfig = {
        sekolah: { icon: 'fa-school', color: '#3498db' },
        rumahsakit: { icon: 'fa-hospital', color: '#e74c3c' },
        wisata: { icon: 'fa-mountain', color: '#27ae60' },
        pemerintahan: { icon: 'fa-building', color: '#9b59b6' }
    };
    
    const config = iconConfig[category] || { icon: 'fa-map-marker', color: '#95a5a6' };
    
    return L.divIcon({
        className: 'custom-marker',
        html: `<i class="fas ${config.icon}" style="color: ${config.color}"></i>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
    });
}

// Fungsi untuk membuat konten popup
function createPopupContent(item, category) {
    let content = `
        <div class="custom-popup">
            <div class="popup-header">
                <strong>${item.name}</strong>
            </div>
            <div class="popup-content">
                <div class="popup-info">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${item.address}</span>
                </div>
    `;
    
    if (item.type) {
        content += `
            <div class="popup-info">
                <i class="fas fa-tag"></i>
                <span>${item.type}</span>
            </div>
        `;
    }
    
    if (item.phone) {
        content += `
            <div class="popup-info">
                <i class="fas fa-phone"></i>
                <span>${item.phone}</span>
            </div>
        `;
    }
    
    if (item.description) {
        content += `
            <div class="popup-info">
                <i class="fas fa-info-circle"></i>
                <span>${item.description}</span>
            </div>
        `;
    }
    
    // Tambahan khusus untuk wisata
    if (category === 'wisata') {
        if (item.tiket) {
            content += `
                <div class="popup-info">
                    <i class="fas fa-ticket-alt"></i>
                    <span>Tiket: ${item.tiket}</span>
                </div>
            `;
        }
        if (item.jamBuka) {
            content += `
                <div class="popup-info">
                    <i class="fas fa-clock"></i>
                    <span>Jam Buka: ${item.jamBuka}</span>
                </div>
            `;
        }
    }
    
    // Tambahan khusus untuk rumah sakit
    if (category === 'rumahsakit' && item.facilities) {
        content += `
            <div class="popup-info">
                <i class="fas fa-stethoscope"></i>
                <span>Fasilitas: ${item.facilities.join(', ')}</span>
            </div>
        `;
    }
    
    // Tambahan khusus untuk pemerintahan
    if (category === 'pemerintahan' && item.layanan) {
        content += `
            <div class="popup-info">
                <i class="fas fa-clipboard-list"></i>
                <span>Layanan: ${item.layanan.join(', ')}</span>
            </div>
        `;
    }
    
    content += `
            </div>
        </div>
    `;
    
    return content;
}

// Inisialisasi peta
function initMap() {
    // Sembunyikan loading indicator
    document.getElementById('loading').style.display = 'none';
    
    // Buat peta dengan pusat di Kabupaten Bandung Barat
    map = L.map('map', {
        center: BANDUNG_BARAT_CENTER,
        zoom: BANDUNG_BARAT_ZOOM,
        zoomControl: false
    });
    
    // Inisialisasi peta
function initMap() {
    document.getElementById('loading').style.display = 'none';

    map = L.map('map', {
        center: BANDUNG_BARAT_CENTER,
        zoom: BANDUNG_BARAT_ZOOM,
        zoomControl: false
    });

    L.control.zoom({ position: 'bottomleft' }).addTo(map);

    basemaps = {
        osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }),
        satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'
        }),
        terrain: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: © OpenStreetMap contributors, © OpenTopoMap (CC-BY-SA)'
        })
    };

    basemaps.osm.addTo(map);

    // Tambahkan layer GeoJSON batas administratif
    fetch('Kabupaten Bandung Barat-KECAMATAN.geojson')
        .then(response => response.json())
        .then(data => {
            const batasAdmin = L.geoJSON(data, {
                style: {
                    color: '#0033cc',
                    weight: 2,
                    fillOpacity: 0
                }
            }).addTo(map);
        })
        .catch(error => {
            console.error('Gagal memuat GeoJSON batas administratif:', error);
        });

    // Inisialisasi layer groups
    Object.keys(locationData).forEach(category => {
        layerGroups[category] = L.layerGroup().addTo(map);
    });

    addMarkers();
    updateStats();
    setupEventListeners();
}

// Pastikan initMap dipanggil saat DOM siap
document.addEventListener('DOMContentLoaded', function() {
    initMap();
});

    // Tambahkan kontrol zoom di pojok kiri bawah
    L.control.zoom({
        position: 'bottomleft'
    }).addTo(map);
    
    // Definisikan layer peta dasar
    basemaps = {
        osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }),
        satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'
        }),
        terrain: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: © OpenStreetMap contributors, © OpenTopoMap (CC-BY-SA)'
        })
    };
    
    // Tambahkan layer default
    basemaps.osm.addTo(map);
    
    // Inisialisasi layer groups untuk setiap kategori
    Object.keys(locationData).forEach(category => {
        layerGroups[category] = L.layerGroup().addTo(map);
    });
    
    // Tambahkan marker untuk setiap kategori
    addMarkers();
    
    // Update statistik
    updateStats();
    
    // Setup event listeners
    setupEventListeners();
}

// Fungsi untuk menambahkan marker
function addMarkers() {
    Object.keys(locationData).forEach(category => {
        locationData[category].forEach(item => {
            const marker = L.marker([item.lat, item.lng], {
                icon: createCustomIcon(category)
            });
            
            marker.bindPopup(createPopupContent(item, category), {
                maxWidth: 300,
                className: 'custom-popup-container'
            });
            
            marker.addTo(layerGroups[category]);
        });
    });
}

// Fungsi untuk setup event listeners
function setupEventListeners() {
    // Basemap controls
    document.querySelectorAll('input[name="basemap"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                // Hapus layer sebelumnya
                map.eachLayer(layer => {
                    if (layer instanceof L.TileLayer) {
                        map.removeLayer(layer);
                    }
                });
                
                // Tambahkan layer baru
                basemaps[this.value].addTo(map);
                currentBasemap = this.value;
            }
        });
    });
    
    // Layer controls
    Object.keys(locationData).forEach(category => {
        const checkbox = document.getElementById(category);
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    map.addLayer(layerGroups[category]);
                } else {
                    map.removeLayer(layerGroups[category]);
                }
                updateStats();
            });
        }
    });
    
    // Map controls
    document.getElementById('reset-view').addEventListener('click', () => {
        map.setView(BANDUNG_BARAT_CENTER, BANDUNG_BARAT_ZOOM);
    });
    
    document.getElementById('fullscreen').addEventListener('click', () => {
        const mapContainer = document.querySelector('.map-container');
        if (!document.fullscreenElement) {
            mapContainer.requestFullscreen().then(() => {
                setTimeout(() => {
                    map.invalidateSize();
                }, 100);
            });
        } else {
            document.exitFullscreen().then(() => {
                setTimeout(() => {
                    map.invalidateSize();
                }, 100);
            });
        }
    });
    
    document.getElementById('locate').addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    
                    map.setView([lat, lng], 15);
                    
                    L.marker([lat, lng], {
                        icon: L.divIcon({
                            className: 'custom-marker',
                            html: '<i class="fas fa-location-arrow" style="color: #e74c3c;"></i>',
                            iconSize: [30, 30],
                            iconAnchor: [15, 15]
                        })
                    }).addTo(map)
                    .bindPopup('Lokasi Anda')
                    .openPopup();
                },
                error => {
                    alert('Gagal mendapatkan lokasi: ' + error.message);
                }
            );
        } else {
            alert('Geolocation tidak didukung oleh browser ini.');
        }
    });
    
    // Navigation links
    document.addEventListener('DOMContentLoaded', function() {
    // Untuk navigasi dengan data-target
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', function() {
            const target = this.dataset.target;
            showSection(target);
        });
    });
});

function showSection(section) {
    // Sembunyikan semua section
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.style.display = 'none';
    });
    
    // Tampilkan section yang dipilih
    document.getElementById(section).style.display = 'block';
    
    // Update active state
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}
    
    // Modal functionality
    const modal = document.getElementById('detail-modal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Handle fullscreen changes
    document.addEventListener('fullscreenchange', () => {
        const fullscreenBtn = document.getElementById('fullscreen');
        const icon = fullscreenBtn.querySelector('i');
        
        if (document.fullscreenElement) {
            icon.className = 'fas fa-compress';
            fullscreenBtn.title = 'Keluar Layar Penuh';
        } else {
            icon.className = 'fas fa-expand';
            fullscreenBtn.title = 'Layar Penuh';
        }
    });
}

// Fungsi untuk update statistik
function updateStats() {
    let totalPoints = 0;
    
    Object.keys(locationData).forEach(category => {
        const checkbox = document.getElementById(category);
        if (checkbox && checkbox.checked) {
            totalPoints += locationData[category].length;
        }
    });
    
    document.getElementById('total-points').textContent = totalPoints;
}

// Fungsi untuk menampilkan detail dalam modal
function showDetailModal(title, content) {
    const modal = document.getElementById('detail-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    modalTitle.textContent = title;
    modalContent.innerHTML = content;
    modal.style.display = 'block';
}

// Fungsi untuk format nomor telepon
function formatPhoneNumber(phone) {
    // Menghapus karakter non-digit
    const cleaned = phone.replace(/\D/g, '');
    
    // Format nomor telepon Indonesia
    if (cleaned.startsWith('62')) {
        return '+' + cleaned;
    } else if (cleaned.startsWith('0')) {
        return '+62' + cleaned.substring(1);
    } else {
        return phone;
    }
}

// Fungsi untuk animasi loading
function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Event listener untuk ketika DOM sudah siap
document.addEventListener('DOMContentLoaded', function() {
    // Tampilkan loading
    showLoading();
    
    // Delay untuk simulasi loading
    setTimeout(() => {
        initMap();
    }, 1000);
    
    // Tambahkan event listener untuk responsive sidebar
    const toggleSidebar = () => {
        const sidebar = document.querySelector('.sidebar');
        const mapContainer = document.querySelector('.map-container');
        
        if (window.innerWidth <= 1024) {
            sidebar.style.position = 'static';
            sidebar.style.width = '100%';
        } else {
            sidebar.style.position = 'sticky';
            sidebar.style.width = '320px';
        }
    };
    
    // Jalankan saat load dan resize
    toggleSidebar();
    window.addEventListener('resize', toggleSidebar);
    
    // Smooth scroll untuk navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Fungsi utility untuk mendapatkan jarak antara dua koordinat
function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radius bumi dalam km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
}

// Fungsi untuk mencari lokasi terdekat
function findNearestLocation(userLat, userLng, category) {
    let nearest = null;
    let minDistance = Infinity;
    
    if (locationData[category]) {
        locationData[category].forEach(location => {
            const distance = getDistance(userLat, userLng, location.lat, location.lng);
            if (distance < minDistance) {
                minDistance = distance;
                nearest = { ...location, distance: distance };
            }
        });
    }
    
    return nearest;
}

// Export fungsi untuk penggunaan global
window.WebGIS = {
    map,
    layerGroups,
    locationData,
    showDetailModal,
    findNearestLocation,
    getDistance
};

console.log('WebGIS Kabupaten Bandung Barat berhasil dimuat!');
console.log('Dibuat oleh: Salsa Hasna Nabila - Program Studi Sains Informasi Geografi');
console.log('Total lokasi yang dimuat:');
console.log('- Sekolah:', locationData.sekolah.length, 'lokasi');
console.log('- Rumah Sakit & Puskesmas:', locationData.rumahsakit.length, 'lokasi');
console.log('- Tempat Wisata:', locationData.wisata.length, 'lokasi');
console.log('- Kantor Pemerintahan:', locationData.pemerintahan.length, 'lokasi');