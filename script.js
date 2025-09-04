// script.js - Controle de slides com animações avançadas
document.addEventListener('DOMContentLoaded', () => {
    const slidesContainer = document.getElementById('slides');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsWrap = document.getElementById('dots');
    const progressBar = document.getElementById('progressBar');
    const TRANSITION_DURATION = 800;

    let currentSlideIndex = 0;
    let isAnimating = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchMoved = false;
    const SWIPE_THRESHOLD = 40;

    // Selecionar todos os slides
    const slides = Array.from(document.querySelectorAll('.slide'));
    const totalSlides = slides.length;

    // Criar elementos de fundo animados para cada slide
    function createSlideBackgrounds() {
        slides.forEach((slide, index) => {
            if (index === 0) return; // Pular o slide de título
            
            const backgroundElements = document.createElement('div');
            backgroundElements.className = 'slide-background-elements';
            
            // Adicionar diferentes elementos de fundo
            for (let i = 0; i < 8; i++) {
                const element = document.createElement('div');
                element.className = `bg-element bg-element-${i % 4}`;
                
                // Posicionamento aleatório
                const top = Math.random() * 80 + 10;
                const left = Math.random() * 80 + 10;
                const size = Math.random() * 30 + 10;
                
                element.style.top = `${top}%`;
                element.style.left = `${left}%`;
                element.style.width = `${size}px`;
                element.style.height = `${size}px`;
                
                // Animação personalizada
                const duration = Math.random() * 15 + 10;
                const delay = Math.random() * 5;
                element.style.animationDuration = `${duration}s`;
                element.style.animationDelay = `${delay}s`;
                
                backgroundElements.appendChild(element);
            }
            
            slide.appendChild(backgroundElements);
        });
    }

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
        // Elementos para animar
        const textElements = slide.querySelectorAll('.text > *');
        const imageElements = slide.querySelectorAll('.slide-image-container');
        const cards = slide.querySelectorAll('.info-card, .importance-card');
        const notes = slide.querySelectorAll('.note-box');
        const keyPoints = slide.querySelectorAll('.key-point');
        const listItems = slide.querySelectorAll('.feature-list li');
        const backgroundElements = slide.querySelectorAll('.bg-element');

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
        
        backgroundElements.forEach(el => {
            el.style.opacity = '0';
        });

        // Aplicar animações com delays
        setTimeout(() => {
            // Animar elementos de fundo primeiro
            backgroundElements.forEach((el, i) => {
                setTimeout(() => {
                    el.style.transition = 'opacity 1.2s ease';
                    el.style.opacity = '0.15';
                }, i * 100);
            });

            // Animar elementos de conteúdo
            textElements.forEach((el, i) => {
                setTimeout(() => {
                    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 300 + i * 100);
            });

            imageElements.forEach((el, i) => {
                setTimeout(() => {
                    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 500 + i * 100);
            });

            cards.forEach((el, i) => {
                setTimeout(() => {
                    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 600 + i * 100);
            });

            notes.forEach((el, i) => {
                setTimeout(() => {
                    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateX(0)';
                }, 800 + i * 100);
            });

            keyPoints.forEach((el, i) => {
                setTimeout(() => {
                    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateX(0)';
                }, 700 + i * 100);
            });

            listItems.forEach((el, i) => {
                setTimeout(() => {
                    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateX(0)';
                }, 400 + i * 100);
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
        if (nextIndex > currentSlideIndex) {
            // Próximo slide
            currentSlide.style.transform = 'translateX(-100%)';
            nextSlide.style.transform = 'translateX(0)';
        } else {
            // Slide anterior
            currentSlide.style.transform = 'translateX(100%)';
            nextSlide.style.transform = 'translateX(0)';
        }
        
        currentSlide.style.opacity = '0';
        nextSlide.style.opacity = '1';
        
        // Atualizar classes ativas
        currentSlide.classList.remove('active');
        nextSlide.classList.add('active');
        
        // Atualizar controles
        updateDots(nextIndex);
        updateProgressBar(nextIndex);
        
        // Animar conteúdo del novo slide após a transição
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
    createSlideBackgrounds();
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
    }, 10000);

    // Pausar auto-rotação quando o usuário interagir
    function stopAutoRotation() {
        clearInterval(autoRotateInterval);
    }

    document.addEventListener('keydown', stopAutoRotation);
    document.addEventListener('click', stopAutoRotation);
    document.addEventListener('touchstart', stopAutoRotation);

    // Adicionar estilos dinâmicos para elementos de fundo
    const style = document.createElement('style');
    style.textContent = `
        .slide-background-elements {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }
        
        .bg-element {
            position: absolute;
            opacity: 0;
            border-radius: 50%;
            animation: floatBackgroundElement 15s infinite linear;
        }
        
        .bg-element-0 {
            background: rgba(66, 153, 225, 0.2);
            box-shadow: 0 0 15px rgba(66, 153, 225, 0.3);
        }
        
        .bg-element-1 {
            background: rgba(49, 130, 206, 0.2);
            box-shadow: 0 0 15px rgba(49, 130, 206, 0.3);
            border-radius: 10% !important;
        }
        
        .bg-element-2 {
            background: rgba(255, 255, 255, 0.3);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70% !important;
        }
        
        .bg-element-3 {
            background: rgba(26, 58, 95, 0.15);
            box-shadow: 0 0 10px rgba(26, 58, 95, 0.2);
            border-radius: 5px !important;
        }
        
        @keyframes floatBackgroundElement {
            0% {
                transform: translate(0, 0) rotate(0deg) scale(1);
            }
            25% {
                transform: translate(20px, 30px) rotate(90deg) scale(1.1);
            }
            50% {
                transform: translate(0, 60px) rotate(180deg) scale(1);
            }
            75% {
                transform: translate(-20px, 30px) rotate(270deg) scale(0.9);
            }
            100% {
                transform: translate(0, 0) rotate(360deg) scale(1);
            }
        }
        
        .slide--title .scroll-indicator {
            animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateX(-50%) translateY(0);
            }
            40% {
                transform: translateX(-50%) translateY(-10px);
            }
            60% {
                transform: translateX(-50%) translateY(-5px);
            }
        }
    `;
    document.head.appendChild(style);
});