function bypassLink() {
    var link = document.getElementById('linkInput').value;
    var apiUrl = `https://project-skybypass.vercel.app/kingbypass?link=${encodeURIComponent(link)}`;
    var resultDiv = document.getElementById('result');
    var copyButton = document.getElementById('copyButton');
    var copyMessage = document.getElementById('copyMessage');

    // Bersihkan hasil dan pesan sebelumnya
    resultDiv.innerHTML = '';
    copyButton.style.display = 'none';
    copyMessage.innerHTML = '';

    // Periksa apakah input kosong
    if (link === '') {
        resultDiv.innerHTML = '<p class="error">Please enter a URL.</p>';
        return;
    }

    // Ambil link bypass
    fetch(apiUrl)
        .then(response => {
            // Periksa apakah respons ok (status dalam rentang 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Periksa struktur respons API
            if (data.result) {
                resultDiv.innerHTML = `
                    <p><strong>Key:</strong> <span id="bypassedKey">${data.result || 'N/A'}</span></p>
                `;
                copyButton.style.display = 'inline-block'; // Tampilkan tombol salin
            } else {
                resultDiv.innerHTML = `<p class="error">Error: ${data.error || 'Unknown error'}</p>`;
            }
        })
        .catch(error => {
            resultDiv.innerHTML = `<p class="error">An error occurred: ${error.message}</p>`;
        });
}
