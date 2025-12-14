// Мобільна навігація
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Закриття меню при кліку на посилання
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Фільтрація портфоліо
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Видаляємо active клас з усіх кнопок
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Додаємо active клас до натиснутої кнопки
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Анімація навичок при скролі
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkills = () => {
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        const barHeight = bar.getBoundingClientRect().height;
        
        if (barTop < window.innerHeight && barTop + barHeight > 0) {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }
    });
};

// Запуск анімації при скролі
window.addEventListener('scroll', () => {
    animateSkills();
});

// Запуск анімації при завантаженні
window.addEventListener('load', () => {
    animateSkills();
});

// Плавний скрол для якірних посилань
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

// Зміна стилю навігації при скролі
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Валідація форми
const contactForm = document.querySelector('.contact-form form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Проста валідація
    if (!name || !email || !message) {
        alert('Будь ласка, заповніть всі обов\'язкові поля');
        return;
    }
    
    // Тут можна додати логіку відправки форми
    alert('Дякую за повідомлення! Я зв\'яжусь з вами найближчим часом.');
    contactForm.reset();
});

// Додаткові функції для великих екранів (1440px+)

// Перевірка розміру екрана
const isLargeScreen = () => window.innerWidth >= 1440;

// Паралакс ефект для hero секції на великих екранах
if (isLargeScreen()) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

// Анімація появи елементів при скролі для великих екранів
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Спостерігаємо за елементами тільки на великих екранах
if (isLargeScreen()) {
    document.querySelectorAll('.portfolio-item, .skill-category, .stat').forEach(el => {
        observer.observe(el);
    });
}

// Покращена анімація навігації при скролі
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    if (!isLargeScreen()) return;
    
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Приховування/показ навігації при скролі вниз/вверх
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Покращена анімація навичок з затримкою
const animateSkillsDelayed = () => {
    if (!isLargeScreen()) return;
    
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const barTop = bar.getBoundingClientRect().top;
        
        if (barTop < window.innerHeight - 100) {
            setTimeout(() => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }, index * 200); // Затримка для кожного бару
        }
    });
};

// Додаткова функція для smooth ресайзу
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Перевіряємо чи змінився тип екрану
        const wasLarge = document.body.classList.contains('large-screen');
        const isNowLarge = isLargeScreen();
        
        if (wasLarge !== isNowLarge) {
            if (isNowLarge) {
                document.body.classList.add('large-screen');
                // Ініціалізуємо функції для великих екранів
                initLargeScreenFeatures();
            } else {
                document.body.classList.remove('large-screen');
                // Вимикаємо функції для великих екранів
                disableLargeScreenFeatures();
            }
        }
    }, 250);
});

// Ініціалізація функцій для великих екранів
const initLargeScreenFeatures = () => {
    // Додаємо спостерігачів
    document.querySelectorAll('.portfolio-item, .skill-category, .stat').forEach(el => {
        observer.observe(el);
    });
    
    // Ініціалізуємо паралакс
    document.querySelector('.hero')?.style.setProperty('background-attachment', 'fixed');
};

// Вимкнення функцій для великих екранів
const disableLargeScreenFeatures = () => {
    // Відключаємо спостерігачів
    observer.disconnect();
    
    // Вимикаємо паралакс
    document.querySelector('.hero')?.style.setProperty('background-attachment', 'scroll');
    
    // Скидаємо трансформи
    document.querySelector('.hero')?.style.setProperty('transform', 'none');
};

// Ініціалізація при завантаженні
document.addEventListener('DOMContentLoaded', () => {
    if (isLargeScreen()) {
        document.body.classList.add('large-screen');
        initLargeScreenFeatures();
    }
});