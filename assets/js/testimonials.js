// Testimonials Data
const testimonials = [
    {
        name: "Marko Petrović",
        image: "assets/img/profpicy/compressed/profpic1.png",
        rating: 5,
        text: "Odlična saradnja sa ellko.pro timom. Profesionalni pristup i brzi odgovori."
    },
    {
        name: "Ana Jovanović",
        image: "assets/img/profpicy/compressed/fprofp7.jpeg",
        rating: 5,
        text: "Sajt je napravljen prema svim mojim zahtevima. Preporučujem!"
    },
    {
        name: "Stefan Nikolić",
        image: "assets/img/profpicy/compressed/fprof41.jpeg",
        rating: 4,
        text: "Dobro iskustvo, brzi i efikasni. Visegodisenje iskusstvo sa njima"
    },
    {
        name: "Jovana Đorđević",
        image: "assets/img/profpicy/compressed/fprofp2.png",
        rating: 5,
        text: "Profesionalni tim, odličan dizajn. Dobra komunikacija i podrška."
    },
    {
        name: "Nikola Stojanović",
        image: "assets/img/profpicy/compressed/mprof5.png",
        rating: 5,
        text: "Najbolja digitalna agencija sa kojom sam radio."
    },
    {
        name: "Marija Popović",
        image: "assets/img/profpicy/compressed/fprof4.png",
        rating: 4,
        text: "Odlična komunikacija i brzi odgovori."
    },
    {
        name: "Aleksandar Miljković",
        image: "assets/img/profpicy/compressed/profpic2.png",
        rating: 5,
        text: "Profesionalni pristup i kvalitetan rad."
    },
    {
        name: "Teodora Simić",
        image: "assets/img/profpicy/compressed/teodora.png",
        rating: 5,
        text: "Preporučujem svima koji žele kvalitetan sajt."
    },
    {
        name: "Luka Ristić",
        image: "assets/img/profpicy/compressed/mprofp4.jpeg",
        rating: 4,
        text: "Dobro iskustvo, zadovoljan sam rezultatom."
    },
    {
        name: "Sofija Pavlović",
        image: "assets/img/profpicy/compressed/sofija.png",
        rating: 5,
        text: "Odlična saradnja, preporučujem!"
    },
    {
        name: "Filip Đorđević",
        image: "assets/img/profpicy/compressed/filip.jpg",
        rating: 5,
        text: "Profesionalni tim, kvalitetan rad."
    },
    {
        name: "Jelena Stanković",
        image: "assets/img/profpicy/compressed/jelena.png",
        rating: 4,
        text: "Dobro iskustvo, brzi i efikasni."
    },
    {
        name: "Milan Jovanović",
        image: "assets/img/profpicy/compressed/milan.png",
        rating: 5,
        text: "Najbolja digitalna agencija sa kojom sam radio."
    },
    {
        name: "Nina Petrović",
        image: "assets/img/profpicy/compressed/nina.png",
        rating: 5,
        text: "Odlična komunikacija i brzi odgovori."
    },
    {
        name: "Stefan Simić",
        image: "assets/img/profpicy/compressed/stefan.png",
        rating: 4,
        text: "Profesionalni pristup i kvalitetan rad."
    },
    {
        name: "Maja Ristić",
        image: "assets/img/profpicy/compressed/maja.png",
        rating: 5,
        text: "Preporučujem svima koji žele kvalitetan sajt."
    }
];

// Initialize Swiper
document.addEventListener('DOMContentLoaded', function() {
    // Populate testimonials
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    testimonials.forEach(testimonial => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <div class="testimonial-card">
                <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-image">
                <div class="testimonial-content">
                    <h3>${testimonial.name}</h3>
                    <div class="rating">
                        ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5-testimonial.rating)}
                    </div>
                    <p>${testimonial.text}</p>
                </div>
            </div>
        `;
        swiperWrapper.appendChild(slide);
    });

    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        centeredSlides: false,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });
}); 