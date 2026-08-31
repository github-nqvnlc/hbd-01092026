/* ==========================================================================
   INTERACTIVE LOGIC - HAPPY BIRTHDAY (OPTIMIZED FOR MOBILE SAFARI)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // 1. TYPEWRITER EFFECT (WELCOME SCREEN)
    // --------------------------------------------------------------------------
    const typewriterEl = document.getElementById('typewriter-text');
    const welcomeMessage = "Hôm nay là ngày 01 tháng 09 — ngày thiên thần nhỏ đáng yêu nhất bước đến thế giới này... ✨";
    let typeIndex = 0;

    function typeWriter() {
        if (typewriterEl && typeIndex < welcomeMessage.length) {
            typewriterEl.innerHTML += welcomeMessage.charAt(typeIndex);
            typeIndex++;
            setTimeout(typeWriter, 55);
        }
    }
    setTimeout(typeWriter, 400);

    // --------------------------------------------------------------------------
    // 2. ROMANTIC MUSIC SYNTHESIZER & SAFARI AUDIO UNLOCK
    // --------------------------------------------------------------------------
    // Web Audio API provides zero-delay, 100% reliable background music playback
    // on iOS Safari without external network audio asset dependencies.
    let audioCtx = null;
    let isPlaying = false;
    let musicInterval = null;

    const vinylDisc = document.getElementById('vinyl-disc');
    const musicStatus = document.getElementById('music-status');
    const musicIcon = document.getElementById('music-icon');
    const musicPlayerPill = document.getElementById('music-player');
    const toggleMusicBtn = document.getElementById('toggle-music-btn');

    // Melody: Happy Birthday romantic chime sequence (frequencies in Hz)
    const melody = [
        { f: 261.63, d: 0.4 }, // C4
        { f: 261.63, d: 0.4 }, // C4
        { f: 293.66, d: 0.8 }, // D4
        { f: 261.63, d: 0.8 }, // C4
        { f: 349.23, d: 0.8 }, // F4
        { f: 329.63, d: 1.4 }, // E4
        { f: 261.63, d: 0.4 }, // C4
        { f: 261.63, d: 0.4 }, // C4
        { f: 293.66, d: 0.8 }, // D4
        { f: 261.63, d: 0.8 }, // C4
        { f: 392.00, d: 0.8 }, // G4
        { f: 349.23, d: 1.4 }, // F4
        { f: 261.63, d: 0.4 }, // C4
        { f: 261.63, d: 0.4 }, // C4
        { f: 523.25, d: 0.8 }, // C5
        { f: 440.00, d: 0.8 }, // A4
        { f: 349.23, d: 0.8 }, // F4
        { f: 329.63, d: 0.8 }, // E4
        { f: 293.66, d: 1.2 }, // D4
        { f: 466.16, d: 0.4 }, // Bb4
        { f: 466.16, d: 0.4 }, // Bb4
        { f: 440.00, d: 0.8 }, // A4
        { f: 349.23, d: 0.8 }, // F4
        { f: 392.00, d: 0.8 }, // G4
        { f: 349.23, d: 1.6 }  // F4
    ];

    function playNote(freq, duration) {
        if (!audioCtx || audioCtx.state === 'suspended') return;
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            // Warm acoustic bell tone
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

            // Smooth envelope (Attack & Decay)
            gain.gain.setValueAtTime(0, audioCtx.currentTime);
            gain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            console.error("Audio note error:", e);
        }
    }

    let noteIndex = 0;
    function startMelodyLoop() {
        if (musicInterval) clearInterval(musicInterval);
        noteIndex = 0;

        function step() {
            if (!isPlaying) return;
            const current = melody[noteIndex];
            playNote(current.f, current.d * 0.9);
            noteIndex = (noteIndex + 1) % melody.length;
            const delay = (current.d * 550) + (noteIndex === 0 ? 1200 : 0);
            musicInterval = setTimeout(step, delay);
        }
        step();
    }

    function initAndPlayMusic() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        isPlaying = true;
        vinylDisc.classList.remove('paused');
        vinylDisc.classList.add('spinning');
        musicStatus.textContent = "Đang phát nhạc 🎶";
        musicIcon.textContent = "⏸️";
        startMelodyLoop();
    }

    function toggleMusic() {
        if (isPlaying) {
            isPlaying = false;
            if (musicInterval) clearTimeout(musicInterval);
            vinylDisc.classList.add('paused');
            musicStatus.textContent = "Đã tạm dừng 💤";
            musicIcon.textContent = "▶️";
        } else {
            initAndPlayMusic();
        }
    }

    toggleMusicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMusic();
    });

    // Minimize / Expand Music Player Handlers
    const collapseMusicBtn = document.getElementById('collapse-music-btn');
    const musicDiscToggle = document.getElementById('music-disc-toggle');

    if (collapseMusicBtn) {
        collapseMusicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            musicPlayerPill.classList.add('minimized');
        });
    }

    if (musicPlayerPill) {
        musicPlayerPill.addEventListener('click', (e) => {
            if (musicPlayerPill.classList.contains('minimized')) {
                musicPlayerPill.classList.remove('minimized');
            }
        });
    }

    if (musicDiscToggle) {
        musicDiscToggle.addEventListener('click', (e) => {
            if (musicPlayerPill.classList.contains('minimized')) {
                musicPlayerPill.classList.remove('minimized');
            } else {
                musicPlayerPill.classList.add('minimized');
            }
        });
    }

    // --------------------------------------------------------------------------
    // 3. WELCOME BUTTON CLICK (UNLOCK AUDIO & ENTER SITE)
    // --------------------------------------------------------------------------
    const startBtn = document.getElementById('start-btn');
    const welcomeOverlay = document.getElementById('welcome-overlay');

    startBtn.addEventListener('click', () => {
        // Unlock Safari Audio Context on first tap
        initAndPlayMusic();

        // Reveal Floating Music Player & Page Navigation Bar
        musicPlayerPill.classList.remove('hidden-init');
        musicPlayerPill.classList.add('show-player');

        if (pageNavEl) {
            pageNavEl.classList.remove('hidden-init');
            pageNavEl.classList.add('show-player');
        }

        // Confetti burst on start
        launchConfetti(0.5, 0.6, 60);

        // Fade out overlay
        welcomeOverlay.classList.add('fade-out');

        // Start floating ambient particles
        startAmbientParticles();
    });

    // --------------------------------------------------------------------------
    // 4. FLOATING HEARTS & BUBBLES GENERATOR
    // --------------------------------------------------------------------------
    const heartsContainer = document.getElementById('hearts-container');
    const bubblesContainer = document.getElementById('bubbles-container');
    const emojis = ['💖', '🌸', '✨', '💕', '🎀', '🌷', '🍓', '🍰'];

    function startAmbientParticles() {
        // Generate floating hearts
        setInterval(() => {
            if (document.hidden) return;
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            heart.style.left = `${Math.random() * 95}vw`;
            heart.style.fontSize = `${Math.random() * 1.2 + 0.9}rem`;
            const duration = Math.random() * 4 + 6;
            heart.style.animationDuration = `${duration}s`;
            heartsContainer.appendChild(heart);

            setTimeout(() => heart.remove(), duration * 1000);
        }, 1200);

        // Generate translucent bubbles
        setInterval(() => {
            if (document.hidden) return;
            const bubble = document.createElement('div');
            bubble.classList.add('floating-bubble');
            const size = Math.random() * 25 + 15;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.borderRadius = '50%';
            bubble.style.background = 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,182,193,0.3) 60%, rgba(186,225,255,0.2) 100%)';
            bubble.style.border = '1px solid rgba(255,255,255,0.6)';
            bubble.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.4)';
            bubble.style.left = `${Math.random() * 90}vw`;
            const duration = Math.random() * 5 + 7;
            bubble.style.animationDuration = `${duration}s`;
            bubblesContainer.appendChild(bubble);

            setTimeout(() => bubble.remove(), duration * 1000);
        }, 1600);
    }

    // --------------------------------------------------------------------------
    // 5. BIRTHDAY CAKE & CANDLE INTERACTION
    // --------------------------------------------------------------------------
    const candle = document.getElementById('candle');
    const flame = document.getElementById('flame');
    const smoke = document.getElementById('smoke');
    const blowBtn = document.getElementById('blow-candle-btn');
    const blowBtnText = document.getElementById('blow-btn-text');
    const wishBanner = document.getElementById('wish-banner');
    let candleBlown = false;

    function blowOutCandle() {
        if (candleBlown) return;
        candleBlown = true;

        // Extinguish flame and spawn smoke
        flame.classList.add('extinguished');
        smoke.classList.add('active');

        // Update button
        blowBtn.classList.add('blown');
        blowBtnText.textContent = "Nến đã được thổi! 🌟";
        blowBtn.disabled = true;

        // Grand Celebration Confetti
        celebrationBurst();

        // Show Wish Banner
        setTimeout(() => {
            wishBanner.classList.remove('hidden');
        }, 400);
    }

    candle.addEventListener('click', blowOutCandle);
    blowBtn.addEventListener('click', blowOutCandle);

    // --------------------------------------------------------------------------
    // 6. 15-PHOTO POLAROID CAROUSEL & LIGHTBOX CONTROLLER
    // --------------------------------------------------------------------------
    const carouselTrack = document.getElementById('carousel-track');
    const carouselContainer = document.getElementById('carousel-container');
    const galleryPrev = document.getElementById('gallery-prev');
    const galleryNext = document.getElementById('gallery-next');
    const currentNumEl = document.getElementById('gallery-current-num');
    const progressFill = document.getElementById('gallery-progress-fill');
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length || 15;
    let currentSlide = 0;
    let startX = 0;
    let currentX = 0;
    let isSwiping = false;

    function updateCarousel() {
        if (!carouselTrack) return;
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

        if (currentNumEl) {
            currentNumEl.textContent = (currentSlide + 1).toString().padStart(2, '0');
        }
        if (progressFill) {
            progressFill.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;
        }
    }

    if (galleryPrev) {
        galleryPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });
    }

    if (galleryNext) {
        galleryNext.addEventListener('click', (e) => {
            e.stopPropagation();
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        });
    }

    // Touch events for Mobile Safari
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isSwiping = true;
        }, { passive: true });

        carouselContainer.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            currentX = e.touches[0].clientX;
        }, { passive: true });

        carouselContainer.addEventListener('touchend', () => {
            if (!isSwiping) return;
            isSwiping = false;
            const diffX = startX - currentX;

            if (diffX > 35) {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateCarousel();
            } else if (diffX < -35) {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateCarousel();
            }
        });
    }

    // Lightbox & Tap to Heart Effects
    const lightbox = document.getElementById('photo-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxBackdrop = document.getElementById('lightbox-backdrop');

    slides.forEach((slide) => {
        const card = slide.querySelector('.polaroid-card');
        const img = slide.querySelector('.polaroid-img');
        const caption = slide.querySelector('.polaroid-caption');

        if (card) {
            card.addEventListener('click', (e) => {
                // Spawn floating mini heart at tap position
                createTapHeart(e.clientX, e.clientY);

                // Open Lightbox
                if (lightbox && img && lightboxImg) {
                    lightboxImg.src = img.src;
                    if (lightboxCaption && caption) {
                        lightboxCaption.textContent = caption.textContent;
                    }
                    lightbox.classList.remove('hidden');
                }
            });
        }
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.add('hidden');
        });
    }
    if (lightboxBackdrop) {
        lightboxBackdrop.addEventListener('click', () => {
            lightbox.classList.add('hidden');
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightboxImg) {
                createTapHeart(e.clientX, e.clientY);
                launchConfetti(e.clientX / window.innerWidth, e.clientY / window.innerHeight, 20);
            }
        });
    }

    function createTapHeart(x, y) {
        const heart = document.createElement('div');
        heart.innerText = ['💖', '💕', '🌸', '✨', '🎀'][Math.floor(Math.random() * 5)];
        heart.style.position = 'fixed';
        heart.style.left = `${x - 12}px`;
        heart.style.top = `${y - 12}px`;
        heart.style.fontSize = '1.6rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '3000';
        heart.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        document.body.appendChild(heart);

        requestAnimationFrame(() => {
            heart.style.transform = `translateY(-60px) scale(1.4) rotate(${Math.random() * 40 - 20}deg)`;
            heart.style.opacity = '0';
        });

        setTimeout(() => heart.remove(), 800);
    }

    // --------------------------------------------------------------------------
    // 7. MINI-GAME VÒNG QUAY TÌNH YÊU (LUCKY WHEEL)
    // --------------------------------------------------------------------------
    const wheelCanvas = document.getElementById('wheel-canvas');
    const wheelContainer = document.getElementById('wheel-container');
    const spinBtn = document.getElementById('spin-btn');
    const spinAgainBtn = document.getElementById('spin-again-btn');
    const wheelResultBanner = document.getElementById('wheel-result-banner');
    const wheelResultTitle = document.getElementById('wheel-result-title');

    const wheelPrizes = [
        { text: "1 Ly trà sữa 🧋", icon: "🧋", color: "#ff85a2" },
        { text: "Massage toàn thân cho em 💆‍♀️", icon: "💆‍♀️", color: "#ffe0e9" },
        { text: "Anh hun em 10 cái 😘", icon: "😘", color: "#ff6b8b" },
        { text: "Cho em cắn một cái 👑", icon: "👑", color: "#ffd4df" },
        { text: "Ăn món em thích 🍕", icon: "🍕", color: "#ff9ebb" },
        { text: "Hít đất cho em xem 😂", icon: "😂", color: "#ffeef2" },
        { text: "Đấm anh một cái đi 👊", icon: "👊", color: "#ff5277" },
        { text: "Chúc em may mắn lần sau ✨", icon: "✨", color: "#fff0f5" }
    ];

    let currentRotation = 0;
    let isSpinning = false;

    function drawLuckyWheel() {
        if (!wheelCanvas) return;
        // High DPI resolution for super crisp emojis
        wheelCanvas.width = 600;
        wheelCanvas.height = 600;

        const ctx = wheelCanvas.getContext('2d');
        const numSlices = wheelPrizes.length;
        const arc = (2 * Math.PI) / numSlices;
        const width = wheelCanvas.width;
        const height = wheelCanvas.height;
        const center = width / 2;
        const radius = center - 14;

        ctx.clearRect(0, 0, width, height);

        wheelPrizes.forEach((prize, i) => {
            const angle = i * arc;
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = prize.color;
            ctx.moveTo(center, center);
            ctx.arc(center, center, radius, angle, angle + arc, false);
            ctx.lineTo(center, center);
            ctx.fill();

            // Slice separator line
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.lineWidth = 4;
            ctx.stroke();

            // Draw Icon ONLY, situated at the outer rim of the slice
            ctx.translate(center, center);
            ctx.rotate(angle + arc / 2);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '38px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
            ctx.fillText(prize.icon, radius - 44, 0);
            ctx.restore();
        });

        // Center decorative circle
        ctx.beginPath();
        ctx.arc(center, center, 72, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(220, 150, 170, 0.4)';
        ctx.shadowBlur = 16;
        ctx.fill();
    }

    function spinWheel() {
        if (isSpinning) return;
        isSpinning = true;
        spinBtn.disabled = true;
        if (wheelResultBanner) wheelResultBanner.classList.add('hidden');

        // Select random prize (0 to 7)
        const prizeIndex = Math.floor(Math.random() * wheelPrizes.length);
        const sliceAngle = 360 / wheelPrizes.length;

        // Pointer is at the top (270 deg / -90 deg). Calculate target rotation
        // Slices start from 0 deg (3 o'clock). Slice i center is i * sliceAngle + sliceAngle / 2
        // To bring slice i to 270 deg (top): 270 - (i * sliceAngle + sliceAngle / 2)
        const targetSliceAngle = 270 - (prizeIndex * sliceAngle + sliceAngle / 2);

        // 5 to 7 full extra rounds
        const extraRounds = (5 + Math.floor(Math.random() * 3)) * 360;
        const totalDegrees = currentRotation + extraRounds + ((targetSliceAngle - (currentRotation % 360) + 360) % 360);

        currentRotation = totalDegrees;
        wheelContainer.style.transform = `rotate(${currentRotation}deg)`;

        // Play spinning ticks
        let tickCount = 0;
        const tickInterval = setInterval(() => {
            if (!isSpinning) {
                clearInterval(tickInterval);
                return;
            }
            // playNote(440 + (tickCount % 5) * 60, 0.08); // Assumes playNote is defined globally
            tickCount++;
            if (tickCount > 20) clearInterval(tickInterval);
        }, 180);

        setTimeout(() => {
            isSpinning = false;
            spinBtn.disabled = false;
            const wonPrize = wheelPrizes[prizeIndex];

            if (wheelResultTitle) {
                wheelResultTitle.textContent = wonPrize.text;
            }
            if (wheelResultBanner) {
                wheelResultBanner.classList.remove('hidden');
            }

            // Victory celebration
            celebrationBurst();
            launchConfetti(0.5, 0.5, 90);
        }, 4600);
    }

    if (wheelCanvas) {
        drawLuckyWheel();
    }

    if (spinBtn) {
        spinBtn.addEventListener('click', spinWheel);
    }

    if (spinAgainBtn) {
        spinAgainBtn.addEventListener('click', spinWheel);
    }

    // --------------------------------------------------------------------------
    // 7.1 (TẠM ẨN) SCRATCH CARD MINI-GAME BACKUP
    // --------------------------------------------------------------------------
    const scratchCanvas = document.getElementById('scratch-canvas');
    if (scratchCanvas) {
        // (Scratch logic can be re-enabled here if needed)
    }

    // --------------------------------------------------------------------------
    // 8. FINAL FIREWORKS ACTION
    // --------------------------------------------------------------------------
    const finalFireworksBtn = document.getElementById('final-fireworks-btn');
    if (finalFireworksBtn) {
        finalFireworksBtn.addEventListener('click', () => {
            celebrationBurst();
            launchConfetti(0.5, 0.4, 100);
        });
    }

    // --------------------------------------------------------------------------
    // 9. SCROLL REVEAL (INTERSECTION OBSERVER)
    // --------------------------------------------------------------------------
    const fadeElements = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    fadeElements.forEach(el => observer.observe(el));

    // --------------------------------------------------------------------------
    // 10. CONFETTI HELPER FUNCTIONS
    // --------------------------------------------------------------------------
    function launchConfetti(x, y, count = 50) {
        if (typeof confetti !== 'function') return;
        confetti({
            particleCount: count,
            spread: 70,
            origin: { x, y },
            colors: ['#ff758c', '#ff7eb3', '#ffd1dc', '#e5b95e', '#ffffff', '#e0c3fc']
        });
    }

    function celebrationBurst() {
        if (typeof confetti !== 'function') return;

        // Multi-stage side cannons
        const end = Date.now() + 2500;
        const colors = ['#ff758c', '#ffd1dc', '#e5b95e', '#ff4081', '#ffffff'];

        (function frame() {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.7 },
                colors: colors
            });
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.7 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    // --------------------------------------------------------------------------
    // 11. STRICT ONE-PAGE-AT-A-TIME SECTION SCROLLER
    // --------------------------------------------------------------------------
    const sections = Array.from(document.querySelectorAll('.section'));
    const pageNavEl = document.getElementById('page-nav');
    const pageDots = document.querySelectorAll('#page-nav .page-dot');
    let currentSectionIndex = 0;
    let isTransitioning = false;
    let touchStartY = 0;
    let touchStartX = 0;
    function goToSection(index) {
        if (index < 0 || index >= sections.length) return;

        isTransitioning = true;
        currentSectionIndex = index;

        // Smooth scroll to target section
        sections[currentSectionIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Update navigation dots
        pageDots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSectionIndex);
        });

        // Trigger animations
        const currentElements = sections[currentSectionIndex].querySelectorAll('.fade-up');
        currentElements.forEach(el => el.classList.add('visible'));

        // Lock to ensure exactly 1 section movement per gesture
        setTimeout(() => {
            isTransitioning = false;
        }, 700);
    }

    // Dot click jump
    pageDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetIdx = parseInt(dot.getAttribute('data-index'), 10);
            goToSection(targetIdx);
        });
    });

    // Desktop Mouse Wheel / Trackpad Gesture
    window.addEventListener('wheel', (e) => {
        if (welcomeOverlay && !welcomeOverlay.classList.contains('fade-out')) return;

        if (isTransitioning) {
            e.preventDefault();
            return;
        }

        if (Math.abs(e.deltaY) > 20) {
            e.preventDefault();
            if (e.deltaY > 0) {
                goToSection(currentSectionIndex + 1);
            } else {
                goToSection(currentSectionIndex - 1);
            }
        }
    }, { passive: false });

    // Touch Gestures on Mobile Safari & Chrome
    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
        if (welcomeOverlay && !welcomeOverlay.classList.contains('fade-out')) return;
        if (isTransitioning) return;

        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;
        const diffY = touchStartY - touchEndY;
        const diffX = touchStartX - touchEndX;

        // If swiping horizontally on carousel, let carousel handle it
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
            return;
        }

        // If scratching on canvas, do not change section
        if (e.target && (e.target.id === 'scratch-canvas' || e.target.closest('#scratch-section'))) {
            if (Math.abs(diffY) < 70) return; // Allow strong swipe to leave scratch section
        }

        // Strict swipe threshold
        if (diffY > 40) {
            goToSection(currentSectionIndex + 1);
        } else if (diffY < -40) {
            goToSection(currentSectionIndex - 1);
        }
    }, { passive: true });

    // Keyboard Arrow Keys
    window.addEventListener('keydown', (e) => {
        if (welcomeOverlay && !welcomeOverlay.classList.contains('fade-out')) return;
        if (isTransitioning) return;

        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
            e.preventDefault();
            goToSection(currentSectionIndex + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            goToSection(currentSectionIndex - 1);
        }
    });

    // Sync active dot on scroll
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isTransitioning) {
                const idx = sections.indexOf(entry.target);
                if (idx !== -1) {
                    currentSectionIndex = idx;
                    pageDots.forEach((dot, dIdx) => {
                        dot.classList.toggle('active', dIdx === currentSectionIndex);
                    });
                }
            }
        });
    }, { threshold: 0.55 });

    sections.forEach(sec => sectionObserver.observe(sec));
});
