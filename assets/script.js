// ===== 暗色模式切换 =====
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// 检查本地存储的主题偏好
const prefersDark = localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

if (prefersDark) {
    document.body.classList.add('dark-theme');
    themeToggle.textContent = '☀️';
} else {
    document.body.classList.remove('dark-theme');
    themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
});

// ===== 联系表单处理 =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // 注意：这里使用的是 Formspree，如果你想要一个更简单的本地解决方案，
        // 可以使用 FormData API 和一个后端服务
        // 为了演示，我们这里添加一些基本的表单验证
        
        const name = this.querySelector('#name').value.trim();
        const email = this.querySelector('#email').value.trim();
        const subject = this.querySelector('#subject').value.trim();
        const message = this.querySelector('#message').value.trim();
        
        if (!name || !email || !subject || !message) {
            e.preventDefault();
            showFormMessage('请填写所有必需的字段', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            e.preventDefault();
            showFormMessage('请输入有效的邮箱地址', 'error');
            return;
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    const messageElement = document.getElementById('form-message');
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = `form-note ${type}`;
        
        if (type === 'success') {
            setTimeout(() => {
                messageElement.textContent = '';
                messageElement.className = 'form-note';
            }, 5000);
        }
    }
}

// ===== 平滑滚动增强 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== 活跃导航链接更新 =====
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// 页面加载时更新活跃链接
updateActiveNav();

// ===== 动画观察器 =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.querySelectorAll('.project-card, .skill-item, .blog-preview, .blog-item, .value-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== 响应式菜单 (可选) =====
// 如果需要移动菜单，可以添加以下代码
const nav = document.querySelector('.navbar');
if (window.innerWidth < 768) {
    // 在小屏幕上的特殊处理
}

// ===== 页面加载完成后的初始化 =====
document.addEventListener('DOMContentLoaded', function() {
    // 所有初始化代码已在上方执行
    console.log('网站加载完成！');
});

// ===== 键盘快捷键 =====
document.addEventListener('keydown', function(e) {
    // Alt + T: 切换主题
    if (e.altKey && e.key === 't') {
        themeToggle.click();
    }
    // Alt + H: 返回首页
    if (e.altKey && e.key === 'h') {
        window.location.href = 'index.html';
    }
});

// ===== 性能监控 (可选) =====
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('页面加载时间：' + pageLoadTime + 'ms');
    });
}