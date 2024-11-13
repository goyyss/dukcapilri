// Fungsi untuk mendapatkan parameter dari URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Fungsi untuk menampilkan data
function displayData(data) {
    const container = document.getElementById('documentData');
    container.innerHTML = `
        <h3>Status Dokumen: <span class="status">${data.status}</span></h3>
        <div>
            <span class="label">Nama Suami:</span>
            <span class="value">${data.namaSuami}</span>
        </div>
        <div>
            <span class="label">Nama Istri:</span>
            <span class="value">${data.namaIstri}</span>
        </div>
        <div>
            <span class="label">Tanggal Kawin:</span>
            <span class="value">${data.tanggalKawin}</span>
        </div>
        <div>
            <span class="label">No. Akta:</span>
            <span class="value">${data.noAkta}</span>
        </div>
        <hr>
        <h4>Info Penandatangan</h4>
        <div>
            <span class="label">Daerah:</span>
            <span class="value">${data.daerah}</span>
        </div>
        <div>
            <span class="label">Lembaga:</span>
            <span class="value">${data.lembaga}</span>
        </div>
        <div>
            <span class="label">Penandatangan:</span>
            <span class="value">${data.penandatangan}</span>
        </div>
        <hr>
        <h4>Informasi</h4>
        <div>
            <span class="label">Tanggal Pindai:</span>
            <span class="value">${new Date().toLocaleString()}</span>
        </div>
        <div>
            <span class="label">Tgl. Penandatanganan:</span>
            <span class="value">${new Date(data.tglPenandatanganan).toLocaleString()}</span>
        </div>
    `;
}

// Fungsi utama untuk memproses data
async function fetchData() {
    const id = getQueryParam('id');
    if (!id) {
        document.getElementById('documentData').innerText = "ID Dokumen tidak ditemukan di URL.";
        return;
    }

    try {
        // Mengambil data dari file JSON
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const documentData = data.find(doc => doc.id === id);

        if (documentData) {
            // Simpan waktu pemindaian di localStorage
            const scanHistory = JSON.parse(localStorage.getItem('scanHistory') || '{}');
            scanHistory[id] = new Date().toISOString();
            localStorage.setItem('scanHistory', JSON.stringify(scanHistory));

            displayData(documentData);
        } else {
            document.getElementById('documentData').innerText = "Data dokumen tidak ditemukan.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('documentData').innerText = "Gagal memuat data.";
    }
}

// Jalankan fetchData saat halaman dimuat
window.onload = fetchData;