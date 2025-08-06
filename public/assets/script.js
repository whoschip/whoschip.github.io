let currentPage = 'home';
const toggleBBtn = document.getElementById('toggle-style-btn');

function showPage(pageId) {
    // Remove show class first
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('show');
    });
    
    // After a brief delay, remove active and add to new page
    setTimeout(() => {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        const newPage = document.getElementById(pageId);
        if (newPage) {
            newPage.classList.add('active');
            // Force a reflow
            newPage.offsetHeight;
            // Add show class for animation
            requestAnimationFrame(() => {
                newPage.classList.add('show');
            });
        }
    }, 400);

    // Update navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') === `showPage('${pageId}')`) {
            link.classList.add('active');
        }
    });

    currentPage = pageId;

    // Move footer to the active page
    const footer = document.getElementById('footer');
    const activePage = document.getElementById(pageId);
    if (footer && activePage) activePage.appendChild(footer);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize footer position
window.addEventListener('DOMContentLoaded', () => {
    const footer = document.getElementById('footer');
    const homePage = document.getElementById('home');
    if (footer && homePage) homePage.appendChild(footer);

    // --- Music Player Fix ---
    const music = document.getElementById("bg-music");
    const toggleBtn = document.getElementById("toggle-sound");
    const volumeSlider = document.getElementById("volume-slider");
    const volumeLabel = document.getElementById("volume-label");

    let isMuted = false;
    let lastVolume = 0.05; 

    if (music && volumeSlider && volumeLabel) {
        music.volume = 0.05;
        volumeSlider.value = 0.05;
        volumeLabel.textContent = "5%";
    }

    const updateVolumeDisplay = (val) => {
        if (volumeLabel) {
            const percent = Math.round(val * 100);
            volumeLabel.textContent = `${percent}%`;
        }
    };

    if (music && volumeSlider && toggleBtn) {
        volumeSlider.addEventListener("input", () => {
            const vol = parseFloat(volumeSlider.value);
            music.volume = vol;
            updateVolumeDisplay(vol);

            if (vol === 0) {
                isMuted = true;
                toggleBtn.firstChild.textContent = "🔇";
            } else {
                isMuted = false;
                lastVolume = vol;
                toggleBtn.firstChild.textContent = "🔊";
            }
        });

        toggleBtn.addEventListener("click", (event) => {
            if (event.target.closest("#sound-control")) return;

            if (isMuted) {
                music.muted = false;
                music.volume = lastVolume;
                volumeSlider.value = lastVolume;
                updateVolumeDisplay(lastVolume);
                toggleBtn.firstChild.textContent = "🔊";
                isMuted = false;
            } else {
                music.muted = true;
                lastVolume = music.volume;
                music.volume = 0;
                volumeSlider.value = 0;
                updateVolumeDisplay(0);
                toggleBtn.firstChild.textContent = "🔇";
                isMuted = true;
            }
        });
    }

    if (music) {
        // Try to play after any user interaction
        const tryPlay = () => {
            music.play().catch(() => {});
            document.removeEventListener('click', tryPlay);
        };
        document.addEventListener('click', tryPlay);
    }
});
