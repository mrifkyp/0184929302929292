async function bypassLink() {
    console.log("Tombol ditekan!"); // Memastikan fungsi dijalankan
    
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

    try {
        console.log("Fetching data from API: " + apiUrl); // Log API URL
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Log API response data

        if (data.status === 'success') {
            resultDiv.innerHTML = `
                <p><strong>Key:</strong> <span id="bypassedKey">${data.result || 'N/A'}</span></p>
            `;
            copyButton.style.display = 'inline-block'; // Show copy button
        } else {
            resultDiv.innerHTML = `<p class="error">Error: ${data.error || 'Unknown error'}</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p class="error">An error occurred: ${error.message}</p>`;
        console.error(error); // Log error to the console
    }
}

function copyKey() {
    var keyText = document.getElementById('bypassedKey').innerText;
    var copyMessage = document.getElementById('copyMessage');

    // Copy the key to clipboard
    navigator.clipboard.writeText(keyText).then(function() {
        copyMessage.innerHTML = 'Key copied to clipboard!';
    }).catch(function() {
        copyMessage.innerHTML = 'Failed to copy key.';
    });
}
