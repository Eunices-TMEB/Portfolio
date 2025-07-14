// Navegación móvil
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navegación suave
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

// Cambiar estilo de la navbar al hacer scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animación de las barras de habilidades al hacer scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    });
}, observerOptions);

// Observar las secciones de habilidades
document.querySelectorAll('.skill-category').forEach(category => {
    observer.observe(category);
});

// Animación de aparición de elementos
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Aplicar animación a elementos
document.querySelectorAll('.project-card, .stat, .tech-item, .contact-item').forEach(el => {
    fadeObserver.observe(el);
});

// Formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Validación básica
        if (!name || !email || !subject || !message) {
            showNotification('Por favor, completa todos los campos', 'error');
            return;
        }
        
        // Simular envío (aquí puedes integrar con un servicio real)
        showNotification('Mensaje enviado correctamente. ¡Te contactaré pronto!', 'success');
        
        // Limpiar formulario
        this.reset();
    });
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Colores según el tipo
    if (type === 'success') {
        notification.style.background = '#10b981';
    } else if (type === 'error') {
        notification.style.background = '#ef4444';
    } else {
        notification.style.background = '#6366f1';
    }
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Contador animado para las estadísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Animar contadores cuando sean visibles
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('h3');
            const target = parseInt(counter.textContent);
            animateCounter(counter, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observar elementos con contadores
document.querySelectorAll('.stat').forEach(stat => {
    counterObserver.observe(stat);
});

// Efecto de escritura para el título principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efecto de escritura al título principal cuando se carga la página
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Función para cambiar el tema (modo oscuro/claro)
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Cargar tema guardado
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
}

// Botón de cambio de tema (opcional)
// Puedes agregar un botón en el HTML para cambiar el tema
// document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// Función para descargar CV (ejemplo)
function downloadCV() {
    // Aquí puedes agregar la lógica para descargar tu CV
    showNotification('Función de descarga de CV en desarrollo', 'info');
}

// Función para copiar email al portapapeles
function copyEmail() {
    const email = 'eunice.belen17@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        showNotification('Email copiado al portapapeles', 'success');
    }).catch(() => {
        showNotification('No se pudo copiar el email', 'error');
    });
}

// Agregar eventos a los enlaces de contacto
document.addEventListener('DOMContentLoaded', () => {
    // Copiar email al hacer clic
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            copyEmail();
        });
    });
});

// Función para mostrar/ocultar información adicional de proyectos
function toggleProjectDetails(projectId) {
    const projectCard = document.getElementById(projectId);
    const details = projectCard.querySelector('.project-details');
    
    if (details) {
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
    }
}

// Función para filtrar proyectos por tecnología
function filterProjects(technology) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        const techTags = project.querySelectorAll('.project-tech span');
        const hasTechnology = Array.from(techTags).some(tag => 
            tag.textContent.toLowerCase().includes(technology.toLowerCase())
        );
        
        if (technology === 'all' || hasTechnology) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

// Función para validar formulario en tiempo real
function validateForm() {
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.style.borderColor = '#ef4444';
                showFieldError(input, 'Este campo es requerido');
            } else {
                input.style.borderColor = '';
                removeFieldError(input);
            }
        });
        
        input.addEventListener('input', () => {
            if (input.value.trim()) {
                input.style.borderColor = '';
                removeFieldError(input);
            }
        });
    });
}

// Función para mostrar error de campo
function showFieldError(input, message) {
    removeFieldError(input);
    
    const error = document.createElement('div');
    error.className = 'field-error';
    error.textContent = message;
    error.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    `;
    
    input.parentNode.appendChild(error);
}

// Función para remover error de campo
function removeFieldError(input) {
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Inicializar validación de formulario
document.addEventListener('DOMContentLoaded', () => {
    validateForm();
});

// Función para scroll suave al hacer clic en enlaces internos
function smoothScrollTo(element) {
    const target = document.querySelector(element);
    if (target) {
        const offsetTop = target.offsetTop - 80; // Ajustar para la navbar fija
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Función para mostrar/ocultar información de contacto
function toggleContactInfo() {
    const contactDetails = document.querySelector('.contact-details');
    if (contactDetails) {
        contactDetails.style.display = contactDetails.style.display === 'none' ? 'flex' : 'none';
    }
}

// Función para generar PDF del portafolio (ejemplo)
function generatePDF() {
    showNotification('Función de generación de PDF en desarrollo', 'info');
}

// Función para compartir portafolio
function sharePortfolio() {
    if (navigator.share) {
        navigator.share({
            title: 'Eunice Trujillo - Front-End Developer',
            text: 'Mira mi portafolio de desarrollo front-end',
            url: window.location.href
        });
    } else {
        // Fallback para navegadores que no soportan Web Share API
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Enlace copiado al portapapeles', 'success');
        });
    }
}

// Función para mostrar información de proyecto en modal
function showProjectModal(projectId) {
    // Aquí puedes implementar un modal para mostrar más detalles del proyecto
    showNotification('Función de modal de proyecto en desarrollo', 'info');
}

// Función para animar elementos al hacer scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        scrollObserver.observe(element);
    });
}

// Inicializar animaciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
});

// Función para actualizar año en el footer
function updateFooterYear() {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
}

// Actualizar año al cargar la página
document.addEventListener('DOMContentLoaded', updateFooterYear);

// Función para mostrar/ocultar menú de navegación en móvil
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (navMenu && hamburger) {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

// Función para cerrar menú móvil al hacer clic fuera
document.addEventListener('click', (e) => {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (navMenu && hamburger && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Función para mostrar progreso de carga
function showLoadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'loading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #4f46e5);
        z-index: 10001;
        transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    // Simular progreso de carga
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                document.body.removeChild(progressBar);
            }, 500);
        }
        progressBar.style.width = progress + '%';
    }, 100);
}

// Mostrar progreso de carga al cargar la página
window.addEventListener('load', () => {
    // showLoadingProgress(); // Descomenta si quieres mostrar el progreso de carga
});

// Función para agregar efecto de parallax (opcional)
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Inicializar parallax si hay elementos con la clase
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.parallax')) {
        initParallax();
    }
}); 

// Funciones del carrusel de proyectos
let currentSlideIndex = 0;
const slideIndices = [0, 0, 0, 0, 0, 0, 0]; // Para múltiples carruseles (actualizado para 7 slides)

function changeSlide(direction, carouselIndex) {
    const carousel = document.querySelectorAll('.carousel-container')[carouselIndex];
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dots')[carouselIndex].querySelectorAll('.dot');
    
    // Ocultar slide actual
    slides[slideIndices[carouselIndex]].classList.remove('active');
    dots[slideIndices[carouselIndex]].classList.remove('active');
    
    // Calcular nuevo índice
    slideIndices[carouselIndex] += direction;
    
    // Manejar límites
    if (slideIndices[carouselIndex] >= slides.length) {
        slideIndices[carouselIndex] = 0;
    } else if (slideIndices[carouselIndex] < 0) {
        slideIndices[carouselIndex] = slides.length - 1;
    }
    
    // Mostrar nuevo slide
    slides[slideIndices[carouselIndex]].classList.add('active');
    dots[slideIndices[carouselIndex]].classList.add('active');
}

function currentSlide(slideNumber, carouselIndex) {
    const carousel = document.querySelectorAll('.carousel-container')[carouselIndex];
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dots')[carouselIndex].querySelectorAll('.dot');
    
    // Ocultar slide actual
    slides[slideIndices[carouselIndex]].classList.remove('active');
    dots[slideIndices[carouselIndex]].classList.remove('active');
    
    // Actualizar índice
    slideIndices[carouselIndex] = slideNumber - 1;
    
    // Mostrar nuevo slide
    slides[slideIndices[carouselIndex]].classList.add('active');
    dots[slideIndices[carouselIndex]].classList.add('active');
}

// Auto-play para el carrusel (opcional)
function startCarouselAutoPlay(carouselIndex, interval = 5000) {
    setInterval(() => {
        changeSlide(1, carouselIndex);
    }, interval);
}

// Iniciar auto-play cuando se carga la página
window.addEventListener('load', () => {
    // Solo auto-play para el primer carrusel (puedes cambiar el índice)
    // startCarouselAutoPlay(0, 4000);
});

// Función para expandir información del proyecto
function showProjectDetails(projectId) {
    const projectCard = document.querySelector(`[data-project-id="${projectId}"]`);
    const detailsSection = projectCard.querySelector('.project-details');
    
    if (detailsSection) {
        detailsSection.classList.toggle('expanded');
    }
}

// Función para abrir modal con más información del proyecto
function openProjectModal(projectId) {
    // Aquí puedes implementar un modal con información detallada
    showNotification('Función de modal en desarrollo', 'info');
}

// Función para navegar a la página detallada del proyecto
function goToProjectPage(projectId) {
    // Aquí puedes implementar la navegación a una página específica del proyecto
    showNotification('Página del proyecto en desarrollo', 'info');
} 

// Funciones de control del video
function toggleVideo() {
    const video = document.querySelector('.carousel-slide video');
    const playPauseBtn = document.querySelector('.play-pause-btn i');
    
    if (video.paused) {
        video.play();
        playPauseBtn.className = 'fas fa-pause';
    } else {
        video.pause();
        playPauseBtn.className = 'fas fa-play';
    }
}

function toggleMute() {
    const video = document.querySelector('.carousel-slide video');
    const muteBtn = document.querySelector('.mute-btn i');
    
    if (video.muted) {
        video.muted = false;
        muteBtn.className = 'fas fa-volume-up';
    } else {
        video.muted = true;
        muteBtn.className = 'fas fa-volume-mute';
    }
}

// Inicializar controles del video cuando se carga la página
window.addEventListener('load', () => {
    const video = document.querySelector('.carousel-slide video');
    if (video) {
        // Asegurar que el video esté muteado por defecto
        video.muted = true;
        
        // Actualizar icono de mute
        const muteBtn = document.querySelector('.mute-btn i');
        if (muteBtn) {
            muteBtn.className = 'fas fa-volume-mute';
        }
        
        // Manejar eventos del video
        video.addEventListener('play', () => {
            const playPauseBtn = document.querySelector('.play-pause-btn i');
            if (playPauseBtn) {
                playPauseBtn.className = 'fas fa-pause';
            }
        });
        
        video.addEventListener('pause', () => {
            const playPauseBtn = document.querySelector('.play-pause-btn i');
            if (playPauseBtn) {
                playPauseBtn.className = 'fas fa-play';
            }
        });
        
        video.addEventListener('ended', () => {
            // El video se repite automáticamente debido a loop
        });
    }
}); 

// Funciones para los logos de tecnologías
function showTechInfo(techName) {
    const techInfo = {
        'React 18': {
            description: 'Biblioteca de JavaScript para construir interfaces de usuario',
            features: ['Componentes reutilizables', 'Virtual DOM', 'Hooks avanzados'],
            version: '18.x'
        },
        'TypeScript': {
            description: 'Superset de JavaScript con tipado estático',
            features: ['Tipado estático', 'IntelliSense', 'Detección de errores'],
            version: '5.x'
        },
        'Material UI': {
            description: 'Biblioteca de componentes React siguiendo Material Design',
            features: ['Componentes predefinidos', 'Tema personalizable', 'Responsive'],
            version: '5.x'
        },
        'JWT': {
            description: 'JSON Web Tokens para autenticación segura',
            features: ['Autenticación stateless', 'Tokens seguros', 'Sesiones persistentes'],
            version: 'N/A'
        },
        'Recharts': {
            description: 'Biblioteca de gráficos para React',
            features: ['Gráficos interactivos', 'Múltiples tipos', 'Responsive'],
            version: '2.x'
        },
        'React Router': {
            description: 'Enrutamiento declarativo para React',
            features: ['Navegación SPA', 'Rutas anidadas', 'Historial del navegador'],
            version: '6.x'
        }
    };
    
    const info = techInfo[techName];
    if (info) {
        const message = `
${techName} (v${info.version})

${info.description}

Características:
${info.features.map(f => `• ${f}`).join('\n')}
        `;
        
        showNotification(message, 'info');
    }
}

// Agregar event listeners a los logos de tecnologías
document.addEventListener('DOMContentLoaded', () => {
    const techLogos = document.querySelectorAll('.tech-logo');
    techLogos.forEach(logo => {
        logo.addEventListener('click', () => {
            const techName = logo.getAttribute('title');
            showTechInfo(techName);
        });
    });
}); 