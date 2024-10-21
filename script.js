const sitekey = "01e8354c-f6ea-44fe-aada-4c9893a0f7a6"; // Sitekey disembunyikan di sini
const supportItems = ["relzhub", "Fluxus", "Linkvertise", "sub2unlock", "Mboost", "Pastebin", "Pastedrop", "Mediafire", "Cryptic", "Codex", "Delta", "Boost.ink", "Link-center", "Link-target", "Social-unlock", "Loot-link"];
let currentSupportIndex = 0;

function rotateSupport() {
    const supportMessageDiv = document.getElementById('support-message');
    currentSupportIndex = (currentSupportIndex + 1) % supportItems.length;
    supportMessageDiv.textContent = 'Support: ' + supportItems[currentSupportIndex];
}

// Panggil fungsi rotasi setiap 2 detik
setInterval(rotateSupport, 2000);

// Fungsi untuk memuat hCaptcha
function loadHCaptcha() {
    const hcaptchaContainer = document.getElementById('hcaptcha-container');
    hcaptchaContainer.innerHTML = `<div class="h-captcha" data-sitekey="${sitekey}"></div>`;
}

// Fungsi bypass link
async function bypassLink() {
    console.log("Tombol ditekan!"); // Memastikan fungsi dijalankan
    
    var link = document.getElementById('linkInput').value;
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

    // Check if hCaptcha is verified
    const hcaptchaResponse = hcaptcha.getResponse();
    if (!hcaptchaResponse) {
        resultDiv.innerHTML = '<p class="error">Please complete the hCaptcha.</p>';
        return;
    }

    // Buat URL API setelah mendapatkan hcaptchaResponse
    var apiUrl = `https://project-skybypass.vercel.app/kingbypass?link=${encodeURIComponent(link)}&captcha=${encodeURIComponent(hcaptchaResponse)}`;

    try {
        console.log("Fetching data from API: " + apiUrl); // Log API URL
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                link: link,
                'h-captcha-response': hcaptchaResponse
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.result); // Log API response data

        resultDiv.innerHTML = `
            <p><strong>Key:</strong> <span id="bypassedKey">${data.result}</span></p>
        `;
        copyButton.style.display = 'inline-block'; // Show copy button
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

// Panggil fungsi loadHCaptcha saat halaman dimuat
document.addEventListener('DOMContentLoaded', loadHCaptcha);
