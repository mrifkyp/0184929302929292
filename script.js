function bypassLink() {
    var link = document.getElementById('linkInput').value;
    var apiUrl = `https://project-skybypass.vercel.app/kingbypass?link=${encodeURIComponent(link)}`;
    var resultDiv = document.getElementById('result');
    var copyButton = document.getElementById('copyButton');
    var copyMessage = document.getElementById('copyMessage');

    // Hapus hasil dan pesan sebelumnya
    resultDiv.innerHTML = '';
    copyButton.style.display = 'none';
    copyMessage.innerHTML = '';

    // Cek apakah input kosong
    if (link === '') {
        resultDiv.innerHTML = '<p class="error">Please enter a URL.</p>';
        return;
    }

    // Menggunakan fetch untuk mengambil bypass link
    fetch(apiUrl)
        .then(response => {
            // Asumsi API selalu memberikan hasil yang benar
            return response.json();
        })
        .then(data => {
            // Tampilkan hasil dari 'result'
            resultDiv.innerHTML = `
                <p><strong>Key:</strong> <span id="bypassedKey">${data.result || 'N/A'}</span></p>
            `;
            copyButton.style.display = 'inline-block'; // Tampilkan tombol copy
        })
        .catch(error => {
            resultDiv.innerHTML = `<p class="error">An error occurred: ${error.message}</p>`;
        });
}

function copyKey() {
    var keyText = document.getElementById('bypassedKey').innerText;
    var copyMessage = document.getElementById('copyMessage');

    // Salin key ke clipboard
    navigator.clipboard.writeText(keyText).then(function() {
        copyMessage.innerHTML = 'Key copied to clipboard!';
    }).catch(function() {
        copyMessage.innerHTML = 'Failed to copy key.';
    });
}
