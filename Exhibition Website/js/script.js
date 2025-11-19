// Main JavaScript for animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js if available
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#6366f1" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6366f1",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            }
        });
    }

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Carousel functionality
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    
    let currentSlide = 0;
    const slideCount = carouselSlides.length;
    
    function goToSlide(slideIndex) {
        if (slideIndex < 0) slideIndex = slideCount - 1;
        if (slideIndex >= slideCount) slideIndex = 0;
        
        carouselTrack.style.transform = `translateX(-${slideIndex * 100}%)`;
        currentSlide = slideIndex;
    }
    
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => goToSlide(currentSlide - 1));
        nextButton.addEventListener('click', () => goToSlide(currentSlide + 1));
        
        // Auto-advance carousel
        setInterval(() => goToSlide(currentSlide + 1), 5000);
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-card, .section-title, .section-subtitle');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Smooth scrolling for anchor links
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

    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // Text typing effect
    function typeWriter(element, text, speed = 50) {
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

    // Initialize typing effect on elements with data-type attribute
    const typeElements = document.querySelectorAll('[data-type]');
    typeElements.forEach(el => {
        const text = el.getAttribute('data-type');
        typeWriter(el, text);
    });

    // Parallax effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-speed') || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Cursor effects
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add cursor styles
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease;
            mix-blend-mode: difference;
        }
        
        .custom-cursor.hover {
            transform: scale(1.5);
            background: var(--primary);
        }
    `;
    document.head.appendChild(cursorStyle);
    
    // Change cursor on hover
    const hoverElements = document.querySelectorAll('a, button, .hover-effect');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Easter Egg 1: Secret Game Trigger
    const secretGameTrigger = document.getElementById('secretGame');
    if (secretGameTrigger) {
        secretGameTrigger.addEventListener('click', function() {
            // Create floating particles effect
            for (let i = 0; i < 50; i++) {
                createParticle(this);
            }
            
            // Show secret message
            const message = document.createElement('div');
            message.innerHTML = '🎮 Easter Egg Found! Try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A';
            message.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--gradient-1);
                color: white;
                padding: 2rem;
                border-radius: 15px;
                z-index: 10000;
                font-family: 'Orbitron', sans-serif;
                text-align: center;
                box-shadow: 0 0 30px rgba(0,0,0,0.5);
            `;
            message.classList.add('secret-message');
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.remove();
            }, 5000);
        });
    }

    function createParticle(element) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: var(--accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        document.body.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 2;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = x;
        let posY = y;
        
        function animate() {
            posX += vx;
            posY += vy;
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            
            particle.style.opacity = parseFloat(particle.style.opacity || 1) - 0.02;
            
            if (parseFloat(particle.style.opacity) > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        
        animate();
    }

    // Initialize page-specific functionality
    initPageSpecificFeatures();
});

// Page-specific functionality
function initPageSpecificFeatures() {
    // Cybersecurity Page - Password Game
    const passwordGame = document.getElementById('passwordGame');
    const passwordInput = document.getElementById('passwordInput');
    const checkPassword = document.getElementById('checkPassword');
    const passwordHint = document.getElementById('passwordHint');

    if (checkPassword) {
        checkPassword.addEventListener('click', function() {
            const password = passwordInput.value.trim().toUpperCase();
            if (password === 'ALANTURING') {
                passwordHint.textContent = '✅ Correct! Alan Turing is considered the father of computer science and AI.';
                passwordHint.style.color = '#10b981';
                
                // Reward animation
                createPasswordSuccess();
            } else {
                passwordHint.textContent = '❌ Incorrect. Hint: Think about who started it all...';
                passwordHint.style.color = '#f59e0b';
            }
        });
    }

    function createPasswordSuccess() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.innerHTML = '🎉';
                confetti.style.cssText = `
                    position: fixed;
                    top: -50px;
                    left: ${Math.random() * 100}%;
                    font-size: 20px;
                    z-index: 1000;
                    pointer-events: none;
                `;
                document.body.appendChild(confetti);
                
                const animation = confetti.animate([
                    { top: '-50px', transform: 'rotate(0deg)' },
                    { top: '120vh', transform: 'rotate(360deg)' }
                ], {
                    duration: 2000 + Math.random() * 2000,
                    easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
                });
                
                animation.onfinish = () => confetti.remove();
            }, i * 100);
        }
    }

    // Turing Test Page Functionality
    const startTestBtn = document.getElementById('startTest');
    const humanResponseBtn = document.getElementById('humanResponse');
    const aiResponseBtn = document.getElementById('aiResponse');
    const nextQuestionBtn = document.getElementById('nextQuestion');
    const restartTestBtn = document.getElementById('restartTest');
    const resultsPanel = document.getElementById('resultsPanel');
    const conversationArea = document.getElementById('conversationArea');
    const correctCount = document.getElementById('correctCount');
    const resultMessage = document.getElementById('resultMessage');

    let currentQuestion = 0;
    let userScore = 0;
    let testActive = false;

    const testQuestions = [
        {
            question: "How do you feel about the future of artificial intelligence?",
            humanResponse: "I'm excited but also cautious. The potential benefits are incredible, but we need to be careful about how we develop and use it.",
            aiResponse: "Based on current trends and capabilities, I predict continued exponential growth in AI capabilities with significant impacts across all sectors of society and industry."
        },
        {
            question: "What's your favorite way to spend a weekend?",
            humanResponse: "I love going for hikes in nature, reading books, and catching up with friends over coffee.",
            aiResponse: "I don't experience weekends or have personal preferences, but I can provide information about popular weekend activities based on human behavior patterns."
        },
        {
            question: "How do you handle making difficult decisions?",
            humanResponse: "I usually make a list of pros and cons, talk to people I trust, and sometimes just need to sleep on it before deciding.",
            aiResponse: "I analyze available data, consider probability distributions of outcomes, and optimize for specified objectives using decision theory frameworks."
        },
        {
            question: "What does creativity mean to you?",
            humanResponse: "Creativity is about expressing yourself in unique ways, making connections between seemingly unrelated ideas, and bringing something new into the world.",
            aiResponse: "Creativity involves generating novel combinations of existing concepts or patterns that meet certain criteria of usefulness, novelty, or aesthetic value."
        },
        {
            question: "How do you know when you've learned something new?",
            humanResponse: "I know I've learned something when I can explain it to someone else, apply it in different situations, and it changes how I see the world.",
            aiResponse: "Learning is demonstrated when my model parameters have been updated to improve performance on specific tasks, as measured by accuracy metrics and generalization capability."
        }
    ];

    if (startTestBtn) {
        startTestBtn.addEventListener('click', startTuringTest);
    }

    if (restartTestBtn) {
        restartTestBtn.addEventListener('click', startTuringTest);
    }

    function startTuringTest() {
        currentQuestion = 0;
        userScore = 0;
        testActive = true;
        conversationArea.innerHTML = '';
        resultsPanel.classList.add('hidden');
        startTestBtn.disabled = true;
        humanResponseBtn.disabled = false;
        aiResponseBtn.disabled = false;
        nextQuestionBtn.disabled = true;
        
        displayQuestion();
    }

    function displayQuestion() {
        if (currentQuestion >= testQuestions.length) {
            endTest();
            return;
        }

        const question = testQuestions[currentQuestion];
        const questionElement = document.createElement('div');
        questionElement.className = 'message question';
        questionElement.innerHTML = `<strong>Question ${currentQuestion + 1}:</strong> ${question.question}`;
        conversationArea.appendChild(questionElement);

        // Randomly decide which response is human and which is AI
        const isHumanFirst = Math.random() > 0.5;
        
        humanResponseBtn.onclick = () => makeGuess(isHumanFirst);
        aiResponseBtn.onclick = () => makeGuess(!isHumanFirst);

        // Display responses after a short delay
        setTimeout(() => {
            const response1 = document.createElement('div');
            response1.className = 'message response';
            response1.innerHTML = `<strong>Response A:</strong> ${isHumanFirst ? question.humanResponse : question.aiResponse}`;
            conversationArea.appendChild(response1);

            const response2 = document.createElement('div');
            response2.className = 'message response';
            response2.innerHTML = `<strong>Response B:</strong> ${isHumanFirst ? question.aiResponse : question.humanResponse}`;
            conversationArea.appendChild(response2);

            conversationArea.scrollTop = conversationArea.scrollHeight;
        }, 1000);
    }

    function makeGuess(isHumanCorrect) {
        if (!testActive) return;

        const actualHumanFirst = Math.random() > 0.5; // In a real implementation, this would be stored
        const isCorrect = isHumanCorrect === actualHumanFirst;

        if (isCorrect) {
            userScore++;
        }

        const resultElement = document.createElement('div');
        resultElement.className = `message result ${isCorrect ? 'correct' : 'incorrect'}`;
        resultElement.innerHTML = `<strong>Result:</strong> ${isCorrect ? '✅ Correct!' : '❌ Incorrect'}`;
        conversationArea.appendChild(resultElement);

        humanResponseBtn.disabled = true;
        aiResponseBtn.disabled = true;
        nextQuestionBtn.disabled = false;

        nextQuestionBtn.onclick = nextQuestion;
    }

    function nextQuestion() {
        currentQuestion++;
        nextQuestionBtn.disabled = true;
        humanResponseBtn.disabled = false;
        aiResponseBtn.disabled = false;
        displayQuestion();
    }

    function endTest() {
        testActive = false;
        startTestBtn.disabled = false;
        humanResponseBtn.disabled = true;
        aiResponseBtn.disabled = true;
        nextQuestionBtn.disabled = true;

        correctCount.textContent = userScore;
        
        let message = '';
        if (userScore >= 4) {
            message = "Excellent! You have a keen eye for detecting AI responses.";
        } else if (userScore >= 3) {
            message = "Good job! You can mostly tell the difference between human and AI.";
        } else {
            message = "Interesting! The lines between human and AI are becoming blurry.";
        }
        resultMessage.textContent = message;

        resultsPanel.classList.remove('hidden');
        conversationArea.scrollTop = conversationArea.scrollHeight;
    }

    // Ethics Page - Ethical Dilemma
    const decisionBtns = document.querySelectorAll('.decision-btn');
    const ethicalAnalysis = document.getElementById('ethicalAnalysis');
    const analysisText = document.getElementById('analysisText');
    const nextScenarioBtn = document.getElementById('nextScenario');

    let currentScenario = 0;

    const scenarios = [
        {
            title: "Autonomous Vehicle Dilemma",
            description: "An autonomous vehicle must choose between hitting pedestrians or sacrificing its passenger. How should the AI be programmed to handle this situation?",
            analyses: {
                "protect-passenger": "This approach prioritizes the safety of the vehicle's occupants, which aligns with product liability concerns but raises ethical questions about valuing some lives over others.",
                "minimize-casualties": "Utilitarian approach that aims to save the most lives overall, but raises concerns about the AI 'playing god' with human lives.",
                "random-choice": "Avoids bias by randomizing the decision, but this could be seen as abdicating moral responsibility.",
                "human-control": "Places the ethical burden on humans, but may not be practical in split-second emergency situations."
            }
        },
        {
            title: "AI Hiring System",
            description: "An AI hiring system learns to prefer candidates from certain backgrounds because they've been more successful in the past. Should it continue using this pattern?",
            analyses: {
                "protect-passenger": "Not applicable to this scenario.",
                "minimize-casualties": "Not applicable to this scenario.",
                "random-choice": "Ignoring patterns could mean missing genuine predictors of success, but might reduce bias.",
                "human-control": "Human oversight can identify and correct for unfair biases while still leveraging useful patterns."
            }
        }
    ];

    decisionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const decision = this.getAttribute('data-value');
            showAnalysis(decision);
        });
    });

    if (nextScenarioBtn) {
        nextScenarioBtn.addEventListener('click', nextScenario);
    }

    function showAnalysis(decision) {
        const analysis = scenarios[currentScenario].analyses[decision];
        if (analysis) {
            analysisText.textContent = analysis;
            ethicalAnalysis.classList.remove('hidden');
        }
    }

    function nextScenario() {
        currentScenario = (currentScenario + 1) % scenarios.length;
        const scenario = scenarios[currentScenario];
        
        document.getElementById('scenarioTitle').textContent = scenario.title;
        document.getElementById('scenarioDescription').textContent = scenario.description;
        ethicalAnalysis.classList.add('hidden');
    }

    // Future Page - Prediction Generator
    const generatePredictionBtn = document.getElementById('generatePrediction');
    const predictionResult = document.getElementById('predictionResult');
    const futureScenario = document.getElementById('futureScenario');

    if (generatePredictionBtn) {
        generatePredictionBtn.addEventListener('click', generatePrediction);
    }

    function generatePrediction() {
        const techLevel = parseInt(document.getElementById('techAdvancement').value);
        const regulation = parseInt(document.getElementById('regulationLevel').value);
        const adoption = parseInt(document.getElementById('adoptionSpeed').value);

        let scenario = '';
        
        if (techLevel >= 8 && regulation <= 3 && adoption >= 7) {
            scenario = "Rapid AI advancement with minimal oversight leads to incredible technological breakthroughs but significant social disruption and security risks. AI becomes deeply integrated into daily life, but ethical concerns and job displacement create societal tension.";
        } else if (techLevel >= 6 && regulation >= 6 && adoption >= 6) {
            scenario = "Balanced development with strong ethical frameworks enables steady AI integration. Society adapts gradually, with new job categories emerging alongside automation. AI enhances human capabilities while maintaining human oversight.";
        } else if (techLevel <= 4 && regulation >= 7) {
            scenario = "Cautious approach with heavy regulation slows AI development but ensures safety and public trust. Focus remains on narrow AI applications with clear benefits and minimal risks. Human decision-making remains central.";
        } else if (techLevel >= 7 && regulation >= 5 && adoption <= 4) {
            scenario = "Advanced AI capabilities develop but face public skepticism and slow adoption. Technical potential outpaces social acceptance, leading to debates about the appropriate role of AI in society.";
        } else {
            scenario = "Mixed development path with regional variations in AI adoption and regulation. Some areas embrace AI transformation while others proceed cautiously, creating a patchwork of technological advancement.";
        }

        futureScenario.textContent = scenario;
        predictionResult.classList.remove('hidden');

        // Animate future nodes
        const futureNodes = document.querySelectorAll('.future-node');
        futureNodes.forEach((node, index) => {
            node.style.animation = 'none';
            setTimeout(() => {
                node.style.animation = `futureFloat 3s infinite ease-in-out ${index}s`;
            }, 10);
        });
    }
}