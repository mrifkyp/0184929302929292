function bypassLink() {
    var link = document.getElementById('linkInput').value;
    var apiUrl = `https://project-skybypass.vercel.app/kingbypass?link=${encodeURIComponent(link)}`;
    var resultDiv = document.getElementById('result');
    var copyButton = document.getElementById('copyButton');
    var copyMessage = document.getElementById('copyMessage');

    // Clear previous results and messages
    resultDiv.innerHTML = '';
    copyButton.style.display = 'none';
    copyMessage.innerHTML = '';

    // Check if the input is empty
    if (link === '') {
        resultDiv.innerHTML = '<p class="error">Please enter a URL.</p>';
        return;
    }

    // Use Axios to fetch the bypass link
    axios.get(apiUrl)
        .then(response => {
            // Check the API response structure
            if (response.data.status === 'success') {
                resultDiv.innerHTML = `
                    <p><strong>Key:</strong> <span id="bypassedKey">${response.data.result || 'N/A'}</span></p>
                `;
                copyButton.style.display = 'inline-block'; // Show copy button
            } else {
                resultDiv.innerHTML = `<p class="error">Error: ${response.data.error || 'Unknown error'}</p>`;
            }
        })
        .catch(error => {
            resultDiv.innerHTML = `<p class="error">An error occurred: ${error.message}</p>`;
        });
}
