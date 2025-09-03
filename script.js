// script.js - Controle de slides com transições fluidas
document.addEventListener('DOMContentLoaded', () => {
    const slidesContainer = document.getElementById('slides');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsWrap = document.getElementById('dots');
    const progressBar = document.getElementById('progressBar');
    const TRANSITION_DURATION = 800; // Duração da transição em ms

    let currentSlideIndex = 0;
    let isAnimating = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchMoved = false;
    const SWIPE_THRESHOLD = 40;

    // Selecionar todos os slides
    const slides = Array.from(document.querySelectorAll('.slide'));
    const totalSlides = slides.length;

    // Criar dots de navegação
    slides.forEach((slide, index) => {
        const dot = document.createElement('button');
        dot.className = 'dot';
        dot.dataset.index = index;
        dot.setAttribute('aria-label', `Ir para slide ${index + 1}`);
        if (index === 0) dot.classList.add('active');
        dotsWrap.appendChild(dot);
    });

    const dots = Array.from(document.querySelectorAll('.dot'));

    // Inicializar slides
    function initializeSlides() {
        slides.forEach((slide, index) => {
            if (index === 0) {
                slide.classList.add('active');
                slide.style.transform = 'translateX(0)';
                slide.style.opacity = '1';
                slide.setAttribute('aria-hidden', 'false');
            } else {
                slide.style.transform = 'translateX(100%)';
                slide.style.opacity = '0';
                slide.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // Animar conteúdo do slide quando ele se torna ativo
    function animateSlideContent(slide) {
        // Reiniciar animações
        const textElements = slide.querySelectorAll('.text > *');
        const imageElements = slide.querySelectorAll('.slide-image-container');
        const cards = slide.querySelectorAll('.info-card, .importance-card');
        const notes = slide.querySelectorAll('.note-box');
        const keyPoints = slide.querySelectorAll('.key-point');
        const listItems = slide.querySelectorAll('.feature-list li');

        // Reiniciar opacidade
        textElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
        });
        
        imageElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
        });
        
        cards.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
        });
        
        notes.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateX(-20px)';
        });
        
        keyPoints.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateX(-20px)';
        });
        
        listItems.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateX(-10px)';
        });

        // Aplicar animações com delays
        setTimeout(() => {
            textElements.forEach((el, i) => {
                setTimeout(() => {
                    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, i * 100);
            });

            imageElements.forEach((el, i) => {
                setTimeout(() => {
                    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 300 + i * 100);
            });

            cards.forEach((el, i) => {
                setTimeout(() => {
                    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 400 + i * 100);
            });

            notes.forEach((el, i) => {
                setTimeout(() => {
                    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateX(0)';
                }, 600 + i * 100);
            });

            keyPoints.forEach((el, i) => {
                setTimeout(() => {
                    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateX(0)';
                }, 500 + i * 100);
            });

            listItems.forEach((el, i) => {
                setTimeout(() => {
                    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateX(0)';
                }, 300 + i * 100);
            });
        }, 100);
    }

    // Atualizar barra de progresso
    function updateProgressBar(index) {
        const progress = ((index + 1) / totalSlides) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Atualizar dots de navegação
    function updateDots(index) {
        dots.forEach(dot => {
            dot.classList.toggle('active', Number(dot.dataset.index) === index);
        });
    }

    // Navegar para um slide específico
    function goToSlide(nextIndex) {
        if (isAnimating || nextIndex === currentSlideIndex) return;
        if (nextIndex < 0) nextIndex = totalSlides - 1;
        if (nextIndex >= totalSlides) nextIndex = 0;

        isAnimating = true;
        
        const currentSlide = slides[currentSlideIndex];
        const nextSlide = slides[nextIndex];
        
        // Atualizar estados de acessibilidade
        currentSlide.setAttribute('aria-hidden', 'true');
        nextSlide.setAttribute('aria-hidden', 'false');
        
        // Animar transição
        currentSlide.style.transition = `transform ${TRANSITION_DURATION}ms ease, opacity ${TRANSITION_DURATION}ms ease`;
        nextSlide.style.transition = `transform ${TRANSITION_DURATION}ms ease, opacity ${TRANSITION_DURATION}ms ease`;
        
        // Mover slides
        currentSlide.style.transform = 'translateX(-100%)';
        currentSlide.style.opacity = '0';
        
        nextSlide.style.transform = 'translateX(0)';
        nextSlide.style.opacity = '1';
        
        // Atualizar classes ativas
        currentSlide.classList.remove('active');
        nextSlide.classList.add('active');
        
        // Atualizar controles
        updateDots(nextIndex);
        updateProgressBar(nextIndex);
        
        // Animar conteúdo do novo slide após a transição
        setTimeout(() => {
            animateSlideContent(nextSlide);
            currentSlideIndex = nextIndex;
            isAnimating = false;
        }, TRANSITION_DURATION);
    }

    // Navegar para o slide anterior
    function goToPrevSlide() {
        goToSlide(currentSlideIndex - 1);
    }

    // Navegar para o próximo slide
    function goToNextSlide() {
        goToSlide(currentSlideIndex + 1);
    }

    // Configurar eventos de clique nos controles
    prevBtn.addEventListener('click', goToPrevSlide);
    nextBtn.addEventListener('click', goToNextSlide);

    // Configurar eventos de clique nos dots
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            goToSlide(Number(e.currentTarget.dataset.index));
        });
    });

    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            goToNextSlide();
        }
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            goToPrevSlide();
        }
        if (e.key === 'Home') {
            e.preventDefault();
            goToSlide(0);
        }
        if (e.key === 'End') {
            e.preventDefault();
            goToSlide(totalSlides - 1);
        }
    });

    // Suporte a gestos de toque (swipe)
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchMoved = false;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!touchMoved && e.touches.length === 1) {
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            
            const diffX = touchX - touchStartX;
            const diffY = touchY - touchStartY;
            
            // Verificar se é um movimento horizontal predominante
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > SWIPE_THRESHOLD) {
                touchMoved = true;
                if (diffX > 0) {
                    goToPrevSlide();
                } else {
                    goToNextSlide();
                }
            }
        }
    }, { passive: true });

    document.addEventListener('touchend', () => {
        touchMoved = false;
    }, { passive: true });

    // Inicializar
    initializeSlides();
    updateProgressBar(currentSlideIndex);
    
    // Animar conteúdo do primeiro slide
    setTimeout(() => {
        animateSlideContent(slides[currentSlideIndex]);
    }, 500);

    // Auto-rotação de slides (opcional)
    let autoRotateInterval = setInterval(() => {
        if (!isAnimating && !touchMoved) {
            goToNextSlide();
        }
    }, 10000); // Mudar slide a cada 10 segundos

    // Pausar auto-rotação quando o usuário interagir
    function stopAutoRotation() {
        clearInterval(autoRotateInterval);
    }

    document.addEventListener('keydown', stopAutoRotation);
    document.addEventListener('click', stopAutoRotation);
    document.addEventListener('touchstart', stopAutoRotation);
});