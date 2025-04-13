document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const mainTitle = document.getElementById('main-title');
    const contentArea = document.getElementById('content-area');
    const aboutButton = document.getElementById('about-button');
    const nowButton = document.getElementById('now-button');
    const projectsButton = document.getElementById('projects-button');
    const artButton = document.getElementById('art-button');
    const dpadUp = document.querySelector('.dpad-up');
    const dpadDown = document.querySelector('.dpad-down');
    const brightnessSlider = document.getElementById('brightnessSlider');
    const screenContent = document.querySelector('.screen-content');
    const clickSound = document.getElementById('clickSound');
    const buttonSound = document.getElementById('buttonSound');
    const navSound = document.getElementById('navSound');
    const buttonB = document.querySelector('.button-b');

    // Title click effect
    if (mainTitle) {
        mainTitle.addEventListener('click', function () {
            playClickSound();
            this.classList.add('shake');
            setTimeout(() => {
                this.classList.remove('shake');
            }, 500);
        });
    }

    // D-pad scrolling
    if (dpadUp && contentArea) {
        dpadUp.addEventListener('click', () => contentArea.scrollBy(0, -30));
    }

    if (dpadDown && contentArea) {
        dpadDown.addEventListener('click', () => contentArea.scrollBy(0, 30));
    }

    // Brightness control
    if (brightnessSlider && screenContent) {
        // Load saved brightness on page load
        const savedBrightness = localStorage.getItem('brightness');
        if (savedBrightness) {
            screenContent.style.filter = `brightness(${savedBrightness})`;
            brightnessSlider.value = savedBrightness * 100;
        }
    
        // Save new brightness when slider is changed
        brightnessSlider.addEventListener('input', function () {
            const brightness = this.value / 100;
            screenContent.style.filter = `brightness(${brightness})`;
            localStorage.setItem('brightness', brightness);
        });
    }    

    // B button back
    if (buttonB) {
        buttonB.addEventListener('click', () => {
            // Play the regular button sound
            if (buttonSound) {
                buttonSound.currentTime = 0;
                buttonSound.play().catch(e => console.log("Audio play failed:", e));
            }
    
            // Delay navigation
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000); // You can adjust delay time here
        });
    }

    const backSound = new Audio('media/sounds/back-click.mp3');
    const backButton = document.querySelector('.back-button');
    
    if (backButton) {
        backButton.addEventListener('click', () => {
            // Play the BACK button sound
            if (backSound) {
                backSound.currentTime = 0;
                backSound.play().catch(e => console.log("Audio play failed:", e));
            }
    
            // Delay before redirect
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }    

    // Button press effects
    const allButtons = document.querySelectorAll('button');

    allButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Skip sound if it's a no-button-sound button
            if (!this.classList.contains('no-button-sound')) {
                if (this.classList.contains('nav-button')) {
                    if (navSound) {
                        navSound.currentTime = 0;
                        navSound.play().catch(e => console.log("Audio play failed:", e));
                    }

                    const targetUrl = this.dataset.url;
                    // Delay before navigating
                    setTimeout(() => {
                        if (targetUrl) window.location.href = targetUrl;
                    }, 1000); // You can adjust delay time here

                } else {
                    // All other buttons: play normal sound
                    if (buttonSound) {
                        buttonSound.currentTime = 0;
                        buttonSound.play().catch(e => console.log("Audio play failed:", e));
                    }
                }
            }
            // Visual effect for all buttons except .no-press-effect
            if (!this.classList.contains('no-press-effect')) {
                this.classList.add('pressed');
                setTimeout(() => {
                    this.classList.remove('pressed');
                }, 100);
            }
        });
    });    

    // Play click sound
    function playClickSound() {
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(e => console.log("Audio play failed:", e));
        }
    }

    // Navigation with effect
    function navigateWithEffect(url) {
        if (screenContent) {
            screenContent.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = url;
            }, 300);
        } else {
            window.location.href = url;
        }
    }

    // Add animations
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            @keyframes shake {
                0% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                50% { transform: translateX(5px); }
                75% { transform: translateX(-5px); }
                100% { transform: translateX(0); }
            }

            .shake {
                animation: shake 0.5s ease-in-out;
            }

            .pressed {
                transform: translateY(2px);
                opacity: 0.8;
            }

            @keyframes fade-out {
                from { opacity: 1; }
                to { opacity: 0; }
            }

            .fade-out {
                animation: fade-out 0.3s forwards;
            }
        </style>
    `);
});
