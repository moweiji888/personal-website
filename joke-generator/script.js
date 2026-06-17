// API Endpoints with your API key
const APIS = {
    general: {
        url: 'https://api.api-ninjas.com/v1/jokes',
        headers: { 'X-Api-Key': 'iTDeYyvzBU6RULgvtltW58vj31AAaQ4kXpIR0MvW' }
    },
    programming: {
        url: 'https://official-joke-api.appspot.com/jokes/programming/random'
    },
    'knock-knock': {
        url: 'https://official-joke-api.appspot.com/jokes/knock-knock/random'
    },
    fallback: {
        url: 'https://official-joke-api.appspot.com/random_joke'
    }
};

// State management
let currentJoke = null;
let jokeHistory = [];
const MAX_HISTORY = 10;

// DOM Elements
const getJokeBtn = document.getElementById('getJokeBtn');
const shareBtn = document.getElementById('shareBtn');
const copyBtn = document.getElementById('copyBtn');
const jokeContent = document.getElementById('jokeContent');
const loading = document.getElementById('loading');
const message = document.getElementById('message');
const jokeList = document.getElementById('jokeList');
const jokeTypeRadios = document.querySelectorAll('input[name="jokeType"]');

// Event Listeners
getJokeBtn.addEventListener('click', fetchJoke);
copyBtn.addEventListener('click', copyToClipboard);
if (shareBtn) shareBtn.addEventListener('click', shareJoke);
jokeTypeRadios.forEach(radio => radio.addEventListener('change', resetJoke));

// Fetch joke from API
async function fetchJoke() {
    try {
        getJokeBtn.disabled = true;
        loading.style.display = 'block';
        message.textContent = '';
        message.className = '';

        const jokeType = document.querySelector('input[name="jokeType"]:checked').value;
        const joke = await getJokeByType(jokeType);

        if (joke) {
            currentJoke = joke;
            displayJoke(joke);
            addToHistory(joke);
            showMessage('Got a new joke! 😂', 'success');
        } else {
            showMessage('Failed to fetch joke. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error fetching joke: ' + error.message, 'error');
    } finally {
        getJokeBtn.disabled = false;
        loading.style.display = 'none';
    }
}

// Get joke based on type
async function getJokeByType(type) {
    try {
        let url;
        let headers = {};

        switch (type) {
            case 'programming':
                url = APIS.programming.url;
                return await fetchFromAPI(url);

            case 'knock-knock':
                url = APIS['knock-knock'].url;
                return await fetchFromAPI(url);

            case 'general':
            default:
                // Try API Ninjas first (with your API key)
                try {
                    return await fetchFromAPI(APIS.general.url, APIS.general.headers);
                } catch (error) {
                    console.log('API Ninjas failed, trying fallback...');
                    return await fetchFromAPI(APIS.fallback.url);
                }
        }
    } catch (error) {
        console.error('Failed to get joke:', error);
        return null;
    }
}

// Fetch from API
async function fetchFromAPI(url, headers = {}) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Handle array response
    if (Array.isArray(data)) {
        return formatJoke(data[0]);
    }
    
    return formatJoke(data);
}

// Format joke to standard structure
function formatJoke(jokeData) {
    // Handle different API response formats
    if (jokeData.joke) {
        // api-ninjas format
        return { text: jokeData.joke };
    } else if (jokeData.setup && jokeData.delivery) {
        // official-joke-api format
        return {
            setup: jokeData.setup,
            delivery: jokeData.delivery,
            text: `${jokeData.setup}\n${jokeData.delivery}`
        };
    } else if (jokeData.content) {
        // Alternative format
        return { text: jokeData.content };
    }
    
    return jokeData;
}

// Display joke
function displayJoke(joke) {
    let html = '<div class="joke-content">';
    
    if (joke.setup && joke.delivery) {
        html += `<p class="setup">${escapeHtml(joke.setup)}</p>`;
        html += `<p class="delivery">${escapeHtml(joke.delivery)}</p>`;
    } else {
        html += `<p>${escapeHtml(joke.text)}</p>`;
    }
    
    html += '</div>';
    jokeContent.innerHTML = html;
    shareBtn.style.display = 'inline-block';
}

// Add joke to history
function addToHistory(joke) {
    const jokeText = joke.text || `${joke.setup}\n${joke.delivery}`;
    jokeHistory.unshift(jokeText);
    
    if (jokeHistory.length > MAX_HISTORY) {
        jokeHistory.pop();
    }
    
    updateHistoryUI();
    localStorage.setItem('jokeHistory', JSON.stringify(jokeHistory));
}

// Update history UI
function updateHistoryUI() {
    jokeList.innerHTML = '';
    
    if (jokeHistory.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No jokes yet. Get started!';
        li.style.pointerEvents = 'none';
        li.style.color = '#999';
        li.style.fontStyle = 'italic';
        jokeList.appendChild(li);
        return;
    }
    
    jokeHistory.forEach((joke, index) => {
        const li = document.createElement('li');
        const preview = joke.substring(0, 50) + (joke.length > 50 ? '...' : '');
        li.textContent = preview;
        li.title = joke;
        li.addEventListener('click', () => displayHistoryJoke(joke));
        jokeList.appendChild(li);
    });
}

// Display history joke
function displayHistoryJoke(jokeText) {
    jokeContent.innerHTML = `<div class="joke-content"><p>${escapeHtml(jokeText)}</p></div>`;
    currentJoke = { text: jokeText };
    shareBtn.style.display = 'inline-block';
    showMessage('Loaded from history! 🕐', 'success');
}

// Copy to clipboard
function copyToClipboard() {
    if (!currentJoke) {
        showMessage('No joke to copy!', 'error');
        return;
    }
    
    const jokeText = currentJoke.text || `${currentJoke.setup}\n${currentJoke.delivery}`;
    
    navigator.clipboard.writeText(jokeText)
        .then(() => {
            showMessage('Joke copied to clipboard! 📋', 'success');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✓ Copied';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        })
        .catch(err => {
            showMessage('Failed to copy: ' + err.message, 'error');
        });
}

// Share joke
function shareJoke() {
    if (!currentJoke) return;
    
    const jokeText = currentJoke.text || `${currentJoke.setup}\n${currentJoke.delivery}`;
    const shareText = `😂 Check out this joke: ${jokeText}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Random Joke',
            text: shareText,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy to clipboard and show message
        navigator.clipboard.writeText(shareText);
        showMessage('Share text copied to clipboard! 📱', 'success');
    }
}

// Show message
function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
    
    setTimeout(() => {
        message.textContent = '';
        message.className = '';
    }, 4000);
}

// Reset joke display
function resetJoke() {
    jokeContent.innerHTML = '<p>Click "Get Joke" to start laughing!</p>';
    currentJoke = null;
    shareBtn.style.display = 'none';
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load history from localStorage
function loadHistory() {
    const saved = localStorage.getItem('jokeHistory');
    if (saved) {
        try {
            jokeHistory = JSON.parse(saved);
            updateHistoryUI();
        } catch (error) {
            console.error('Failed to load history:', error);
        }
    }
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    loadHistory();
    console.log('🎉 Joke Generator initialized with API Ninjas!');
    console.log('Ready to fetch jokes...');
});

// Keyboard shortcut: Enter to get joke
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !getJokeBtn.disabled) {
        fetchJoke();
    }
});