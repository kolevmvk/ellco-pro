document.addEventListener('DOMContentLoaded', function () {
    const scrollTopButton = document.querySelector('.floating-button.scroll-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });

    if (scrollTopButton) {
        scrollTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 🔥 MOBILE MENU TOGGLE
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    let isMenuOpen = false;

    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.style.overflow = isMenuOpen ? 'hidden' : '';
    }

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });

        // Close on outside click
        document.addEventListener('click', function (e) {
            if (isMenuOpen &&
                !mobileMenu.contains(e.target) &&
                !mobileMenuToggle.contains(e.target)) {
                toggleMobileMenu();
            }
        });
    }
});
