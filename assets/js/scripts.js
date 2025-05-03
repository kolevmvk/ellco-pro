document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Elements
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    let isMenuOpen = false;

    // Toggle mobile menu
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.style.overflow = isMenuOpen ? 'hidden' : '';

        // Animate hamburger to X
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (isMenuOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';

            // Animate menu items
            const navItems = mobileMenu.querySelectorAll('.nav-item');
            navItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 100 * index);
            });
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';

            // Reset menu items
            const navItems = mobileMenu.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
            });
        }
    }

    // Handle window resize
    function handleResize() {
        if (window.innerWidth > 768) {
            if (isMenuOpen) {
                isMenuOpen = false;
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                body.style.overflow = '';

                // Reset hamburger button
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';

                // Reset menu items
                const navItems = mobileMenu.querySelectorAll('.nav-item');
                navItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                });
            }
        }
    }

    // Add event listeners
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            toggleMobileMenu();
        });

        window.addEventListener('resize', handleResize);

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (isMenuOpen &&
                !mobileMenu.contains(e.target) &&
                !mobileMenuToggle.contains(e.target)) {
                toggleMobileMenu();
            }
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function (e) {
                e.stopPropagation();
                if (isMenuOpen) {
                    toggleMobileMenu();
                }
            });
        });

        // Prevent body scroll when menu is open
        mobileMenu.addEventListener('touchmove', function (e) {
            if (isMenuOpen) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    // Header Expansion
    const header = document.querySelector('.main-header');
    const navItems = document.querySelectorAll('.nav-item');
    const headerPanels = document.querySelectorAll('.header-panel');
    let timeout;

    navItems.forEach(item => {
        const link = item.querySelector('a');
        const panelId = link.getAttribute('data-panel');
        const panel = document.getElementById(`panel-${panelId}`);

        item.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                clearTimeout(timeout);
                header.classList.add('expanded');
                headerPanels.forEach(p => p.classList.remove('active'));
                if (panel) panel.classList.add('active');
            }
        });

        item.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                timeout = setTimeout(() => {
                    header.classList.remove('expanded');
                    headerPanels.forEach(p => p.classList.remove('active'));
                }, 100);
            }
        });
    });

    header.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            timeout = setTimeout(() => {
                header.classList.remove('expanded');
                headerPanels.forEach(p => p.classList.remove('active'));
            }, 100);
        }
    });

    headerPanels.forEach(panel => {
        panel.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                clearTimeout(timeout);
            }
        });

        panel.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                timeout = setTimeout(() => {
                    header.classList.remove('expanded');
                    headerPanels.forEach(p => p.classList.remove('active'));
                }, 100);
            }
        });
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header Scroll Effect
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Mega Menu Hover Effect
    const megaMenuTriggers = document.querySelectorAll('.mega-menu-trigger');

    megaMenuTriggers.forEach(trigger => {
        const megaMenu = trigger.querySelector('.mega-menu');
        let timeout;

        trigger.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            megaMenu.style.display = 'block';
            setTimeout(() => {
                megaMenu.style.opacity = '1';
                megaMenu.style.transform = 'translateY(0)';
            }, 10);
        });

        trigger.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                megaMenu.style.opacity = '0';
                megaMenu.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    megaMenu.style.display = 'none';
                }, 300);
            }, 100);
        });

        megaMenu.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
        });

        megaMenu.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                megaMenu.style.opacity = '0';
                megaMenu.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    megaMenu.style.display = 'none';
                }, 300);
            }, 100);
        });
    });

    // Package Cards Animation
    const packageCards = document.querySelectorAll('.package-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    packageCards.forEach(card => {
        observer.observe(card);
    });

    // Industry Cards Animation
    const industryCards = document.querySelectorAll('.industry-card');

    industryCards.forEach(card => {
        const bookNowBtn = document.createElement('a');
        bookNowBtn.href = 'booking.html';
        bookNowBtn.className = 'book-now-btn';
        bookNowBtn.textContent = 'Zakaži odmah';
        
        card.appendChild(bookNowBtn);
        
        card.addEventListener('mouseenter', () => {
            bookNowBtn.style.opacity = '1';
            bookNowBtn.style.transform = 'translateY(0)';
        });
        
        card.addEventListener('mouseleave', () => {
            bookNowBtn.style.opacity = '0';
            bookNowBtn.style.transform = 'translateY(20px)';
        });
    });

    // Social Icons Tooltip
    const socialIcons = document.querySelectorAll('.social-icon');

    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            const tooltip = icon.getAttribute('data-tooltip');
            if (tooltip) {
                const tooltipElement = document.createElement('div');
                tooltipElement.className = 'tooltip';
                tooltipElement.textContent = tooltip;
                icon.appendChild(tooltipElement);

                setTimeout(() => {
                    tooltipElement.classList.add('show');
                }, 10);
            }
        });

        icon.addEventListener('mouseleave', () => {
            const tooltip = icon.querySelector('.tooltip');
            if (tooltip) {
                tooltip.classList.remove('show');
                setTimeout(() => {
                    tooltip.remove();
                }, 300);
            }
        });
    });

    // Form Handling
    const contactForm = document.getElementById('contactForm');
    const bookingForm = document.getElementById('bookingForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                const messageDiv = document.getElementById('formMessage');
                if (result.success) {
                    messageDiv.className = 'form-message success';
                    messageDiv.textContent = 'Poruka je uspešno poslata!';
                    contactForm.reset();
                } else {
                    messageDiv.className = 'form-message error';
                    messageDiv.textContent = 'Došlo je do greške. Molimo pokušajte ponovo.';
                }
            } catch (error) {
                const messageDiv = document.getElementById('formMessage');
                messageDiv.className = 'form-message error';
                messageDiv.textContent = 'Došlo je do greške. Molimo pokušajte ponovo.';
            }
        });
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData.entries());
            
            try {
                const response = await fetch('/api/booking', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                const messageDiv = document.getElementById('formMessage');
                if (result.success) {
                    messageDiv.className = 'form-message success';
                    messageDiv.textContent = 'Sastanak je uspešno zakazan!';
                    bookingForm.reset();
                } else {
                    messageDiv.className = 'form-message error';
                    messageDiv.textContent = 'Došlo je do greške. Molimo pokušajte ponovo.';
                }
            } catch (error) {
                const messageDiv = document.getElementById('formMessage');
                messageDiv.className = 'form-message error';
                messageDiv.textContent = 'Došlo je do greške. Molimo pokušajte ponovo.';
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-toggle')) {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                body.classList.remove('menu-open');
            }
        }
    });

    // Close mega menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item') && !e.target.closest('.header-panel')) {
            headerPanels.forEach(panel => {
                panel.classList.remove('active');
            });
        }
    });

    const closeBtn = document.querySelector('.close-mobile-menu');
    if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    // Stats Counter Animation
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 sekunde
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCount = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCount();
        });
    }

    // Intersection Observer za stats sekciju
    const statsSection = document.querySelector('.stats');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

}); 