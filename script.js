function bypassLink() {
    var link = document.getElementById('linkInput').value; // Ambil nilai dari input
    var apiUrl = `https://project-skybypass.vercel.app/kingbypass?link=${encodeURIComponent(link)}`; // URL API
    var resultDiv = document.getElementById('key'); // Elemen untuk menampilkan hasil
    var copyButton = document.getElementById('copyButton'); // Tombol untuk menyalin kunci
    var copyMessage = document.getElementById('copyMessage'); // Pesan untuk menampilkan hasil salinan

    // Bersihkan hasil sebelumnya dan pesan
    resultDiv.innerHTML = '';
    copyButton.style.display = 'none'; // Sembunyikan tombol salin
    copyMessage.innerHTML = '';

    // Cek apakah input kosong
    if (link === '') {
        resultDiv.innerHTML = '<p class="error">Please enter a URL.</p>'; // Pesan jika input kosong
        return;
    }

    // Ambil tautan bypass
    fetch(apiUrl)
        .then(response => {
            // Cek apakah respons berhasil (status 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Kembalikan respons dalam format JSON
        })
        .then(data => {
            // Periksa struktur respons API
            if (data.status === 'success') {
                // Tampilkan hasil di resultDiv dengan mengambil nilai dari result
                resultDiv.innerHTML = `
                    <p><strong>Key:</strong> <span id="bypassedKey">${data.result || 'N/A'}</span></p>
                `;
                copyButton.style.display = 'inline-block'; // Tampilkan tombol salin
            } else {
                resultDiv.innerHTML = `<p class="error">Error: ${data.error || 'Unknown error'}</p>`; // Tampilkan error jika ada
            }
        })
        .catch(error => {
            resultDiv.innerHTML = `<p class="error">An error occurred: ${error.message}</p>`; // Tampilkan error jika fetch gagal
        });
}
