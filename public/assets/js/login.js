document.addEventListener('DOMContentLoaded', () => {
    console.log('Login page loaded');
    
    // ایجاد ذرات متحرک
    createParticles();
    
    // عناصر DOM
    const loginForm = document.getElementById('admin-login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const rememberCheckbox = document.getElementById('remember-me');
    
    const AUTH_URL = 'api/auth.php';

    // Only the username is remembered; the password is never written to storage.
    const savedUsername = localStorage.getItem('admin-username');
    if (savedUsername) {
        usernameInput.value = savedUsername;
        rememberCheckbox.checked = true;
        passwordInput.focus();
    }

    // If a valid session already exists, go straight to the dashboard.
    fetch(`${AUTH_URL}?action=status`, { credentials: 'same-origin' })
        .then(r => r.ok ? r.json() : { authenticated: false })
        .then(({ authenticated }) => { if (authenticated) window.location.replace('dashboard.html'); })
        .catch(() => { /* API unreachable — stay on the login page */ });

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const rememberMe = rememberCheckbox.checked;

        if (!username || !password) {
            showError('لطفا تمام فیلدها را پر کنید');
            shakeForm();
            return;
        }

        const submitBtn = loginForm.querySelector('.cyber-button');
        submitBtn.disabled = true;

        try {
            const response = await fetch(`${AUTH_URL}?action=login`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                if (rememberMe) {
                    localStorage.setItem('admin-username', username);
                } else {
                    localStorage.removeItem('admin-username');
                }
                showSuccess();
                setTimeout(() => { window.location.href = 'dashboard.html'; }, 1200);
                return;
            }

            showError(response.status === 401
                ? 'نام کاربری یا رمز عبور اشتباه است'
                : 'خطا در ارتباط با سرور');
        } catch (error) {
            console.error('Login request failed:', error);
            showError('سرور در دسترس نیست');
        }

        submitBtn.disabled = false;
        shakeForm();
        passwordInput.value = '';
        passwordInput.focus();
    });

    // رویداد نمایش/مخفی کردن رمز عبور
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // تغییر آیکون
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
        
        // انیمیشن
        this.style.transform = 'translateY(-50%) scale(1.2)';
        setTimeout(() => {
            this.style.transform = 'translateY(-50%) scale(1)';
        }, 200);
    });
    
    // انیمیشن ورودی هنگام فوکوس
    const inputs = document.querySelectorAll('.input-hologram input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // توابع کمکی
    function showError(message) {
        errorText.textContent = message;
        errorMessage.style.display = 'flex';
        errorMessage.style.background = 'rgba(255, 0, 0, 0.05)';
        errorMessage.style.borderColor = 'rgba(255, 0, 0, 0.2)';
        errorMessage.style.color = '#ff6b6b';
        
        // پنهان کردن پیام بعد از 5 ثانیه
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }
    
    function showSuccess() {
        errorText.textContent = 'ورود موفق! در حال انتقال به داشبورد...';
        errorMessage.style.display = 'flex';
        errorMessage.style.background = 'rgba(16, 185, 129, 0.05)';
        errorMessage.style.borderColor = 'rgba(16, 185, 129, 0.2)';
        errorMessage.style.color = '#10b981';
        
        // تغییر رنگ دکمه
        const submitBtn = loginForm.querySelector('.cyber-button');
        submitBtn.innerHTML = '<i class="fas fa-check"></i><span>ورود موفق</span>';
        submitBtn.style.background = 'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.1))';
        submitBtn.style.borderColor = 'rgba(16, 185, 129, 0.3)';
        submitBtn.disabled = true;
    }
    
    function shakeForm() {
        loginForm.style.transform = 'translateX(10px)';
        setTimeout(() => {
            loginForm.style.transform = 'translateX(-10px)';
        }, 100);
        setTimeout(() => {
            loginForm.style.transform = 'translateX(0)';
        }, 200);
    }
    
    // تابع ایجاد ذرات متحرک
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50; // تعداد کمتر برای عملکرد بهتر
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            
            // اندازه و موقعیت تصادفی
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const color = Math.random() > 0.5 ? 'var(--neon-blue)' : 'var(--neon-purple)';
            const opacity = Math.random() * 0.3 + 0.1;
            const duration = Math.random() * 15 + 10;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                opacity: ${opacity};
                top: ${y}%;
                left: ${x}%;
                pointer-events: none;
                animation: particleFloat ${duration}s ease-in-out infinite;
            `;
            
            particlesContainer.appendChild(particle);
        }
        
        // اضافه کردن keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.1;
                }
                25% {
                    transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.2);
                    opacity: 0.3;
                }
                50% {
                    transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1);
                    opacity: 0.2;
                }
                75% {
                    transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(0.8);
                    opacity: 0.4;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // جلوگیری از اسکرول اضافی
    window.addEventListener('resize', adjustLayout);
    
    function adjustLayout() {
        // اطمینان از مناسب بودن اندازه المان‌ها
        const card = document.querySelector('.cyber-card');
        const container = document.querySelector('.login-container');
        
        if (window.innerHeight < 700) {
            card.style.padding = '25px';
            card.style.marginTop = '20px';
        } else {
            card.style.padding = '40px';
            card.style.marginTop = '0';
        }
    }
    
    // اجرای اولیه
    adjustLayout();
    
    console.log('✅ سیستم ورود آماده است');
});