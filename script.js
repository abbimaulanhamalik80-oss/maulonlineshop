// Inisialisasi AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true, // Animasi hanya berjalan sekali saat di-scroll
    offset: 50 // Trigger animasi sedikit lebih awal
});

// Hamburger Menu Toggle untuk Mobile
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        
        // Ganti icon hamburger jadi silang saat terbuka
        const icon = hamburger.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu if clicked outside
    document.addEventListener('click', (event) => {
        if (!hamburger.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon && icon.classList.contains('fa-xmark')) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Close mobile menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon && icon.classList.contains('fa-xmark')) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// Dynamic Copyright Year
const currentYear = new Date().getFullYear();
const copyrightElement = document.getElementById('copyright-text');
if (copyrightElement) {
    copyrightElement.innerHTML = `&copy; ${currentYear} Maul Online Shop. All Rights Reserved.`;
}

// Smooth scrolling untuk anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Hanya untuk link yang ada di halaman ini
        if(this.getAttribute('href') !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if(targetElement) {
                // Offset untuk fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        }
    });
});

// Preloader Logic
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            document.body.classList.remove('loading');
        }, 800); // Tahan loader 0.8 detik agar animasinya terlihat
    }
});

// ==========================================
// KEAMANAN: Anti Klik Kanan & Anti Inspect
// ==========================================

// Disable Klik Kanan (Context Menu)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Disable Keyboard Shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S, dll)
document.addEventListener('keydown', function(e) {
    // F12
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+I (Inspect)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+C (Inspect Element)
    if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
        e.preventDefault();
        return false;
    }

    // Ctrl+S (Save Page)
    if (e.ctrlKey && (e.key === 'S' || e.key === 's' || e.keyCode === 83)) {
        e.preventDefault();
        document.body.innerHTML = '<div style="display:flex; justify-content:center; align-items:center; height:100vh; background:#fff; color:red; font-family:sans-serif; font-size:2rem; font-weight:bold; text-align:center;">Akses Ditolak: Hak Cipta Dilindungi!</div>';
        return false;
    }

    // Ctrl+P (Print Page)
    if (e.ctrlKey && (e.key === 'P' || e.key === 'p' || e.keyCode === 80)) {
        e.preventDefault();
        return false;
    }

    // Ctrl+A (Select All)
    if (e.ctrlKey && (e.key === 'A' || e.key === 'a' || e.keyCode === 65)) {
        e.preventDefault();
        return false;
    }

    // Ctrl+C (Copy)
    if (e.ctrlKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
        e.preventDefault();
        return false;
    }
});

// ==========================================
// TEMA: Dark Mode Only
// ==========================================
// Theme toggle dihilangkan karena menggunakan tema gelap secara permanen.

// Disable Drag & Drop gambar/teks
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
});

// Disable Seleksi Teks via JS (Tambahan selain CSS)
document.onselectstart = function() {
    return false;
};

// ==========================================
// POSTER CAROUSEL LOGIC (INFINITE MARQUEE)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.poster-track');
    if (track) {
        const slides = Array.from(track.children);
        if (slides.length > 0) {
            // Duplikat semua poster agar animasi seamless / infinity
            slides.forEach(slide => {
                const clone = slide.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                track.appendChild(clone);
            });
            
            // Set durasi berdasarkan jumlah poster asli agar kecepatan selalu pas (10 detik per gambar)
            const duration = slides.length * 10;
            track.style.animation = `marquee ${duration}s linear infinite`;
        }
    }
});
