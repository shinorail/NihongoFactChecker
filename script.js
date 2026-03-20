document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('js-menu-trigger');
    const body = document.body;

    // Menu Toggle
    trigger.addEventListener('click', () => {
        body.classList.toggle('menu-open');
    });

    // Scroll Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            body.classList.remove('menu-open');
            const target = document.querySelector(this.getAttribute('href'));
            if(target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
