function bypassLink() {
    var link = document.getElementById('linkInput').value;
    var apiUrl = `https://project-skybypass.vercel.app/kingbypass?link=${encodeURIComponent(link)}`;
    var resultDiv = document.getElementById('result');
    var copyButton = document.getElementById('copyButton');
    var copyMessage = document.getElementById('copyMessage');

    resultDiv.innerHTML = '';
    copyButton.style.display = 'none';
    copyMessage.innerHTML = '';

    if (link === '') {
        resultDiv.innerHTML = '<p class="error">Please enter a URL.</p>';
        return;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                resultDiv.innerHTML = `
                    <p><strong>Key:</strong> <span id="bypassedKey">${data.key || 'N/A'}</span></p>
                `;
                copyButton.style.display = 'inline-block';
            } else {
                resultDiv.innerHTML = `<p class="error">Error: ${data.error}</p>`;
            }
        })
        .catch(error => {
            resultDiv.innerHTML = `<p class="error">An error occurred: ${error.message}</p>`;
        });
}

function copyKey() {
    var keyText = document.getElementById('bypassedKey').innerText;
    var copyMessage = document.getElementById('copyMessage');

    navigator.clipboard.writeText(keyText).then(function() {
        copyMessage.innerHTML = 'Key copied to clipboard!';
    }, function() {
        copyMessage.innerHTML = 'Failed to copy key.';
    });
}
