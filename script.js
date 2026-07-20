/* ==========================================
   MÉTODO ADFIT - INTERACTION SCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animation using IntersectionObserver
    const animatedSections = document.querySelectorAll('.section-animate');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Once revealed, no need to keep observing this section
                observer.unobserve(entry.target);
            }
        });
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null, // Viewport
        threshold: 0.15, // Trigger when 15% of the section is visible
        rootMargin: '0px 0px -50px 0px' // Adjust trigger point slightly above bottom
    });
    
    animatedSections.forEach(section => {
        revealObserver.observe(section);
    });

    // 2. Add subtle interactive 3D effect to ebook mockup (Desktop only)
    const mockupImg = document.querySelector('.mockup-img');
    const mockupWrapper = document.querySelector('.mockup-wrapper');
    
    if (mockupImg && mockupWrapper && window.innerWidth > 768) {
        mockupWrapper.addEventListener('mousemove', (e) => {
            const rect = mockupWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left; // x coordinate within the element
            const y = e.clientY - rect.top;  // y coordinate within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt angles (limit to small degree max 12 deg)
            const rotateY = ((x - centerX) / centerX) * 12;
            const rotateX = -((y - centerY) / centerY) * 12;
            
            mockupImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        mockupWrapper.addEventListener('mouseleave', () => {
            // Smoothly animate back to normal floating state
            mockupImg.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            mockupImg.style.transition = 'transform 0.5s ease';
        });
        
        mockupWrapper.addEventListener('mouseenter', () => {
            mockupImg.style.transition = 'none'; // Disable transition for direct interaction feedback
        });
    }

    // 3. Smooth scrolling anchor links
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    smoothLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });
});

// 4. Checkout Toast Notification
function showCheckoutToast() {
    // Prevent duplicate toasts
    if (document.querySelector('.toast-notification')) return;
    
    // Create a beautiful premium toast notification
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <div class="toast-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <div class="toast-text">
                <strong>Abriendo el checkout seguro...</strong>
                <span>Estás a un paso de empezar tu negocio digital</span>
            </div>
        </div>
    `;
    
    // Styles for the toast to avoid cluttering styles.css unnecessarily
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        background: '#0d1117',
        color: '#fff',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        borderRadius: '12px',
        padding: '1rem 1.5rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(16, 185, 129, 0.1)',
        zIndex: '9999',
        opacity: '0',
        transform: 'translateY(20px)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    });
    
    // Append to body
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 50);
    
    // Animate out and remove
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 3500);
}
