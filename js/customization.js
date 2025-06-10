document.addEventListener('DOMContentLoaded', function() {
    // عناصر کنترل
    const primaryColor = document.getElementById('primary-color');
    const secondaryColor = document.getElementById('secondary-color');
    const textColor = document.getElementById('text-color');
    const shadowColor = document.getElementById('shadow-color');
    const shadowBlur = document.getElementById('shadow-blur');
    const shadowSpread = document.getElementById('shadow-spread');
    const fontFamily = document.getElementById('font-family');
    const fontSize = document.getElementById('font-size');
    const resetBtn = document.getElementById('reset-styles');
    
    // عناصر پیش‌نمایش
    const previewCard = document.querySelector('.preview-card');
    const previewButtons = document.querySelectorAll('.preview-buttons button');
    const previewNavLinks = document.querySelectorAll('.preview-nav a');
    
    // تنظیمات پیش‌فرض
    const defaultSettings = {
        primaryColor: '#4e54c8',
        secondaryColor: '#8f94fb',
        textColor: '#333',
        shadowColor: '#333',
        shadowBlur: '10',
        shadowSpread: '0',
        fontFamily: "'Vazir', sans-serif",
        fontSize: '16'
    };
    
    // اعمال تغییرات
    function applyChanges() {
        // به‌روزرسانی متغیرهای CSS
        document.documentElement.style.setProperty('--primary-color', primaryColor.value);
        document.documentElement.style.setProperty('--secondary-color', secondaryColor.value);
        document.documentElement.style.setProperty('--text-color', textColor.value);
        document.documentElement.style.setProperty('--shadow-color', shadowColor.value + '33'); // اضافه کردن شفافیت
        document.documentElement.style.setProperty('--font-family', fontFamily.value);
        document.documentElement.style.setProperty('--font-size', fontSize.value + 'px');
        
        // به‌روزرسانی سایه‌ها
        const boxShadow = `0 5px ${shadowBlur.value}px ${shadowSpread.value}px ${shadowColor.value}33`;
        previewCard.style.boxShadow = boxShadow;
        
        // به‌روزرسانی دکمه‌ها
        previewButtons.forEach(button => {
            if(button.classList.contains('btn-gradient')) {
                button.style.background = `linear-gradient(45deg, ${primaryColor.value}, ${secondaryColor.value})`;
            } else if(button.classList.contains('btn-outline')) {
                button.style.borderColor = primaryColor.value;
                button.style.color = primaryColor.value;
            }
        });
        
        // به‌روزرسانی منو
        previewNavLinks.forEach(link => {
            if(link.classList.contains('active')) {
                link.style.background = `linear-gradient(45deg, ${primaryColor.value}, ${secondaryColor.value})`;
            }
        });
    }
    
    // رویدادهای تغییر
    primaryColor.addEventListener('input', applyChanges);
    secondaryColor.addEventListener('input', applyChanges);
    textColor.addEventListener('input', applyChanges);
    shadowColor.addEventListener('input', applyChanges);
    shadowBlur.addEventListener('input', applyChanges);
    shadowSpread.addEventListener('input', applyChanges);
    fontFamily.addEventListener('change', applyChanges);
    fontSize.addEventListener('input', applyChanges);
    
    // بازنشانی تنظیمات
    resetBtn.addEventListener('click', function() {
        primaryColor.value = defaultSettings.primaryColor;
        secondaryColor.value = defaultSettings.secondaryColor;
        textColor.value = defaultSettings.textColor;
        shadowColor.value = defaultSettings.shadowColor;
        shadowBlur.value = defaultSettings.shadowBlur;
        shadowSpread.value = defaultSettings.shadowSpread;
        fontFamily.value = defaultSettings.fontFamily;
        fontSize.value = defaultSettings.fontSize;
        
        applyChanges();
    });
    
    // شبیه‌سازی کلیک روی لینک‌های منو
    previewNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            previewNavLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            applyChanges();
        });
    });
    
    // اعمال تنظیمات اولیه
    applyChanges();
});
