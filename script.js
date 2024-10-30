const supportItems = [
    'Relzhub', 'Nicuse', 'getResponse', 'Socialwolvez.com', 
    'Bit.ly', 'Direct-link.net', 'Loot-link', 'Tiny.cc', 'V.gd', 'Loot-link.com', 'Mboost', 
    'Direct-link',  
    'Pastebin', 'Link-center', 
     'Delta', 'SocialWolvez', 'Controlc', 
    'Mboost.me', 'Ytsubme',
    'Pastedrop', 'Pastehill', 'Linkvertise', 
    'Rentry.co', 'Link-hub.net',
    'Social-unlock', 'bypassedKey', 'Adfoc.us', 
    'Free-leaks.com', 'Unlocknow', 'Codex', 
     'Lootdest.com', 'Link-hub', 
    'Sub2unlock.io', 'Boost.ink', 'Workink.net', 'Justpaste.it', 'Pastefy',
    'Shorter.me',
   'Work.ink', 
    'Cryptic',  'Sub2unlock', 
    'Sub4unlock.io'
];

let currentSupportIndex = 0;

function rotateSupport() {
    const supportElement = document.getElementById('supportElementId'); // Ganti dengan ID yang sesuai
    currentSupportIndex = (currentSupportIndex + 1) % supportItems.length;
    supportElement.innerText = 'Link: ' + supportItems[currentSupportIndex];
}

setInterval(rotateSupport, 2000); // Mengubah dukungan setiap 2 detik

async function bypassLink() {
    console.log('Tombol ditekan!');
    const linkInputValue = document.getElementById('linkInput').value;
    
    // Ambil bagian cc dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const ccEncoded = urlParams.get('cc'); // Mendapatkan parameter cc
    const ccDecoded = ccEncoded ? atob(ccEncoded) : ''; // Dekode dari base64
    
    const apiUrl = 'https://project-skybypass.vercel.app/kingbypass?link=' + encodeURIComponent(linkInputValue) + '&captcha=' + encodeURIComponent(hcaptcha.getResponse()) + '&cc=' + encodeURIComponent(ccDecoded);

    const resultElement = document.getElementById('result');
    const copyButton = document.getElementById('copyButton');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');

    resultElement.innerHTML = '';
    copyButton.style.display = 'none';
    loadingElement.innerText = '';
    errorElement.style.display = 'block';

    if (linkInputValue === '') {
        resultElement.innerHTML = '<p class="error">Please enter a URL.</p>';
        return;
    }

    errorElement.style.display = 'none';
    const hcaptchaResponse = hcaptcha.getResponse();

    if (!hcaptchaResponse) {
        resultElement.innerHTML = '<p class="error">Please complete the hCaptcha.</p>';
        errorElement.style.display = 'none';
        return;
    }

    try {
        console.log('Fetching data from API: ' + apiUrl);
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data.message);
        resultElement.innerHTML = '<p>Key: <span id="bypassedKey">' + data.message + '</span></p>';
        copyButton.style.display = 'block';
    } catch (error) {
        resultElement.innerHTML = '<p class="error">An error occurred: ' + error.message + '</p>';
        console.error(error);
    } finally {
        errorElement.style.display = 'block';
    }
}

function copyKey() {
    const keyValue = document.getElementById('bypassedKey').innerText;
    const copyMessageElement = document.getElementById('copyMessage');
    
    navigator.clipboard.writeText(keyValue)
        .then(function() {
            copyMessageElement.innerText = 'Key copied to clipboard!';
        })
        .catch(function() {
            copyMessageElement.innerText = 'Failed to copy key.';
        });
}

function joinDiscordJoki() {
    window.open('https://discord.gg/joki-link', '_blank');
}

function joinDiscordCommunity() {
    window.open('https://discord.gg/community-link', '_blank');
}
