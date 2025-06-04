// Floating Hearts Animation
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '-30px';
    heart.style.width = heart.style.height = Math.random() * 20 + 10 + 'px';
    document.querySelector('.hearts').appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

// Initialize hearts animation on pages with hearts container
if (document.querySelector('.hearts')) {
    setInterval(createHeart, 500);
}

// Set audio volume
document.querySelectorAll('audio').forEach(audio => {
    audio.volume = 0.2;
});

// Guestbook functionality
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('guestbook-form');
    const entriesDiv = document.getElementById('guestbook-entries');

    if (form && entriesDiv) {
        // Load existing entries from localStorage
        let entries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
        displayEntries(entries);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('guest-name').value;
            const msg = document.getElementById('guest-msg').value;
            
            const entry = {
                name,
                msg,
                date: new Date().toLocaleDateString()
            };

            entries.unshift(entry);
            localStorage.setItem('guestbookEntries', JSON.stringify(entries));
            displayEntries(entries);
            form.reset();
        });
    }
});

function displayEntries(entries) {
    const entriesDiv = document.getElementById('guestbook-entries');
    if (entriesDiv) {
        entriesDiv.innerHTML = '';
        entries.forEach(entry => {
            const entryElement = document.createElement('div');
            entryElement.classList.add('entry');
            entryElement.innerHTML = `
                <div class="entry-header">
                    <strong>${entry.name}</strong>
                    <span class="entry-date">${entry.date}</span>
                </div>
                <p>${entry.msg}</p>
            `;
            entriesDiv.appendChild(entryElement);
        });
    }
}

// Letter form functionality
document.addEventListener('DOMContentLoaded', () => {
    const letterForm = document.getElementById('letter-form');
    const lettersContainer = document.querySelector('.letters-container');

    if (letterForm && lettersContainer) {
        // Load existing letters from localStorage
        let letters = JSON.parse(localStorage.getItem('loveLetters')) || [];
        displayLetters(letters);

        letterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('letter-title').value;
            const content = document.getElementById('letter-content').value;
            
            const letter = {
                title,
                content
            };

            letters.unshift(letter);
            localStorage.setItem('loveLetters', JSON.stringify(letters));
            displayLetters(letters);
            letterForm.reset();
        });
    }
});

function displayLetters(letters) {
    const lettersContainer = document.querySelector('.letters-container');
    if (lettersContainer) {
        lettersContainer.innerHTML = '';
        letters.forEach(letter => {
            const letterElement = document.createElement('div');
            letterElement.classList.add('letter-card');
            letterElement.innerHTML = `
                <h3>${letter.title}</h3>
                <p>${letter.content}</p>
            `;
            lettersContainer.appendChild(letterElement);
        });
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Background music handling
document.addEventListener('DOMContentLoaded', function() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    // Set volume to a comfortable level
    backgroundMusic.volume = 0.5;
    
    // Function to play music
    function playMusic() {
        if (backgroundMusic.paused) {
            const playPromise = backgroundMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(function(error) {
                    console.log("Auto-play was prevented:", error);
                    // If autoplay is blocked, try again after user interaction
                    document.addEventListener('click', function() {
                        backgroundMusic.play();
                    }, { once: true });
                });
            }
        }
    }
    
    // Try to play music immediately
    playMusic();
    
    // Add event listener for page visibility changes
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            playMusic();
        }
    });
}); 