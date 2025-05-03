// Testimonials Data
const testimonials = [
    {
        name: "Marko Petrović",
        image: "https://i.pravatar.cc/150?img=1",
        rating: 5,
        text: "Odlična saradnja sa ellko.pro timom. Profesionalni pristup i brzi odgovori."
    },
    {
        name: "Ana Jovanović",
        image: "https://i.pravatar.cc/150?img=2",
        rating: 5,
        text: "Sajt je napravljen prema svim mojim zahtevima. Preporučujem!"
    },
    {
        name: "Stefan Nikolić",
        image: "https://i.pravatar.cc/150?img=3",
        rating: 4,
        text: "Dobro iskustvo, brzi i efikasni."
    },
    {
        name: "Jovana Đorđević",
        image: "https://i.pravatar.cc/150?img=4",
        rating: 5,
        text: "Profesionalni tim, odličan dizajn."
    },
    {
        name: "Nikola Stojanović",
        image: "https://i.pravatar.cc/150?img=5",
        rating: 5,
        text: "Najbolja digitalna agencija sa kojom sam radio."
    },
    {
        name: "Marija Popović",
        image: "https://i.pravatar.cc/150?img=6",
        rating: 4,
        text: "Odlična komunikacija i brzi odgovori."
    },
    {
        name: "Aleksandar Miljković",
        image: "https://i.pravatar.cc/150?img=7",
        rating: 5,
        text: "Profesionalni pristup i kvalitetan rad."
    },
    {
        name: "Teodora Simić",
        image: "https://i.pravatar.cc/150?img=8",
        rating: 5,
        text: "Preporučujem svima koji žele kvalitetan sajt."
    },
    {
        name: "Luka Ristić",
        image: "https://i.pravatar.cc/150?img=9",
        rating: 4,
        text: "Dobro iskustvo, zadovoljan sam rezultatom."
    },
    {
        name: "Sofija Pavlović",
        image: "https://i.pravatar.cc/150?img=10",
        rating: 5,
        text: "Odlična saradnja, preporučujem!"
    },
    {
        name: "Filip Đorđević",
        image: "https://i.pravatar.cc/150?img=11",
        rating: 5,
        text: "Profesionalni tim, kvalitetan rad."
    },
    {
        name: "Jelena Stanković",
        image: "https://i.pravatar.cc/150?img=12",
        rating: 4,
        text: "Dobro iskustvo, brzi i efikasni."
    },
    {
        name: "Milan Jovanović",
        image: "https://i.pravatar.cc/150?img=13",
        rating: 5,
        text: "Najbolja digitalna agencija sa kojom sam radio."
    },
    {
        name: "Nina Petrović",
        image: "https://i.pravatar.cc/150?img=14",
        rating: 5,
        text: "Odlična komunikacija i brzi odgovori."
    },
    {
        name: "Stefan Simić",
        image: "https://i.pravatar.cc/150?img=15",
        rating: 4,
        text: "Profesionalni pristup i kvalitetan rad."
    },
    {
        name: "Maja Ristić",
        image: "https://i.pravatar.cc/150?img=16",
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