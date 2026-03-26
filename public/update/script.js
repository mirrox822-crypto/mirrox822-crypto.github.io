const DOWNLOAD_CONFIG = {
    telegram: {
        url: "https://t.me/chillow/"
    },

    android: {
        enabled: true,
        googleDrive: {
            url: "https://t.me/chillow/",
            enabled: true
        },
        mediafire: {
            url: "",
            enabled: false
        }
    },
    windows: {
        enabled: false,
        googleDrive: {
            url: "",
            enabled: false
        },
        mediafire: {
            url: "",
            enabled: false
        }
    }
};

const translations = {
    ru: {
        update_text: "ДОСТУПНО ОБНОВЛЕНИЕ 2.04",
        telegram_channel: "Пост в Telegram",
        android_btn: "Android",
        windows_btn: "ПК (Windows)",
        android_title: "Скачать на Android",
        windows_title: "Скачать на ПК (Windows)",
        google_drive: "Google Диск",
        mediafire: "MediaFire",
        changelog_title: "ИЗМЕНЕНИЯ В 2.04",
        platform_coming_soon: "ПК версия будет скоро доступна",
        link_coming_soon: "Ссылка будет скоро доступна",
        changelog_items: [
            "Новые режимы: Обезвреживание, Соревновательный, Союзники, Дуэль (до 4-х игроков)",
            "LAN Мультиплеер (игра вместе по точке доступа или через общую сеть Wi-Fi)",
            "Новая кастом. карта - Training Sector. Также изменено освещение на AWM Lego",
            "Новый контент из 0.37.1 (скины и интерфейс). Также добавлен скин P90 \"Tester\" из ремастера",
            "Новые функции в админ панеле: \"Неуязвимость\", \"Невидимость\" и \"Заставить бота играть вместо вас\"",
            "Новые настройки матча для раундовых режимов",
            "Сброшена статистика. Теперь она не засчитывается при игре с чит функциями из настроек матча и ещё при кое-каких условиях",
            "Возможность выбрать сложность отдельно для каждой команды в настройках матча",
            "Возможность менять сложность ботов прямо в матче",
            "Улучшение ИИ ботов - теперь они могут занимать выгодные позиции",
            "Новая сложность ботов - читерная. Моментальная реакция и почти всегда попадание в голову",
            "Механика управления ботом после смерти в раундовых режимах",
            "Механика возвращения купленного оружия",
            "Возвращение кастомной коллекции скинов (где-то 20 скинов)",
            "Обновлён интерфейс наблюдения за игроками",
            "Обновлён Killcam (анимация при смерти)",
            "Добавлен Ragdoll манекенам",
            "Гильзы от пуль при стрельбе",
            "Добавлены недостающие звуки поверхностей",
            "Изменение музыки и оформления в меню",
            "Обновлена схема управления по умолчанию. Теперь кнопки расположены в более удобном виде",
            "Отображение названий позиций на миникарте",
            "Откорректировать размеры иконок оружий в худе",
            "Изменены названия команд на CT (Оборона) и T (Атака)",
            "Облегчена механика прыжка",
            "Возможность сбросить инвентарь в настройках",
            "Улучшен Ragdoll - теперь он более стабильный",
            "Переход на более современную версию движка Unity",
            "Исправлено некорректное отображение текста языков Хинди, Тайский, Китайский, Китайский (традиционный), Корейский, Японский"
        ]
    },
    en: {
        update_text: "UPDATE 2.04 AVAILABLE",
        telegram_channel: "Telegram post",
        android_btn: "Android",
        windows_btn: "PC (Windows)",
        android_title: "Download for Android",
        windows_title: "Download for PC (Windows)",
        google_drive: "Google Drive",
        mediafire: "MediaFire",
        changelog_title: "CHANGELOG 2.04",
        platform_coming_soon: "PC version will be avaliable soon",
        link_coming_soon: "Link will be avaliable soon",
        changelog_items: [
            "New modes: Defuse, Competitive, Allies, Duel (up to 4 players)",
            "LAN Multiplayer (play together via an mobile hotspot or a shared Wi-Fi network)",
            "New custom map - Training Sector. Also updated lighting on the AWM Lego",
            "New content from 0.37.1 (skins and ui). Also added is the P90 \"Tester\" skin from the remastered",
            "New features in the admin panel: \"Invulnerability,\" \"Invisibility\" and \"Make a bot play for you\"",
            "New match settings for round-based modes",
            "Stats have been reset. They no longer count when playing with cheat functions from the match settings and under certain other conditions",
            "Ability to select a separate difficulty for each team in the match settings",
            "Ability to change bot difficulty directly in the match",
            "Improved bot AI - they can now take advantageous positions",
            "New bot difficulty - cheat. Instant reaction and almost always headshots",
            "Bot control mechanic after death in round-based modes",
            "Mechanic for returning purchased weapons",
            "Custom skin collection (approximately 20 skins)",
            "Updated player spectate interface",
            "Updated Killcam (death animation)",
            "Added Ragdoll to mannequins",
            "Bullet casings when firing",
            "Added missing surface sounds",
            "Changed music and menu design",
            "Updated default control scheme. Buttons are now more conveniently located",
            "Display of position names on the minimap",
            "Adjusted weapon icon sizes in the HUD",
            "Changed command names to CT (Defense) and T (Attack)",
            "Simplified jump mechanics",
            "Ability to reset inventory in the settings",
            "Improved Ragdoll - now more stable",
            "Upgrade to a more modern version of the Unity engine",
            "Fixed incorrect text display in Hindi, Thai, Chinese, Chinese (Traditional), Korean, and Japanese"
        ]
    }
};

let currentLang = 'ru';
let currentPlatform = 'android';

function showToast(message) {
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

function handleDownloadClick(platform, service, event) {
    event.preventDefault();
    event.stopPropagation();
    
    const config = DOWNLOAD_CONFIG[platform];
    if (!config) return;
    
    let serviceConfig;
    let url;
    
    if (service === 'gdrive') {
        serviceConfig = config.googleDrive;
        url = typeof serviceConfig === 'object' ? serviceConfig.url : serviceConfig;
    } else {
        serviceConfig = config.mediafire;
        url = typeof serviceConfig === 'object' ? serviceConfig.url : serviceConfig;
    }
    
    const isEnabled = typeof serviceConfig === 'object' ? serviceConfig.enabled !== false : true;
    
    if (!isEnabled) {
        const message = translations[currentLang].link_coming_soon || "LINK COMING SOON";
        showToast(message);
        return;
    }
    
    if (url && url !== "#") {
        window.open(url, '_blank', 'noopener noreferrer');
    }
}

function handlePlatformClick(platform, event) {
    event.preventDefault();
    event.stopPropagation();
    
    const config = DOWNLOAD_CONFIG[platform];
    if (!config || config.enabled === false) {
        const message = translations[currentLang].platform_coming_soon || "PLATFORM COMING SOON";
        showToast(message);
        return;
    }
    
    switchPlatform(platform);
}

function setupDownloadButtons() {
    const buttons = [
        { element: document.getElementById('android-gdrive'), platform: 'android', service: 'gdrive' },
        { element: document.getElementById('android-mediafire'), platform: 'android', service: 'mediafire' },
        { element: document.getElementById('windows-gdrive'), platform: 'windows', service: 'gdrive' },
        { element: document.getElementById('windows-mediafire'), platform: 'windows', service: 'mediafire' }
    ];
    
    buttons.forEach(({ element, platform, service }) => {
        if (element) {
            const config = DOWNLOAD_CONFIG[platform];
            if (config) {
                let serviceConfig = service === 'gdrive' ? config.googleDrive : config.mediafire;
                const isEnabled = typeof serviceConfig === 'object' ? serviceConfig.enabled !== false : true;
                
                if (!isEnabled) {
                    element.classList.add('btn-disabled');
                }
            }
            
            const newElement = element.cloneNode(true);
            element.parentNode.replaceChild(newElement, element);
            
            newElement.addEventListener('click', (e) => handleDownloadClick(platform, service, e));
        }
    });
}

function setupPlatformTabs() {
    const tabs = document.querySelectorAll('.platform-tab');
    
    tabs.forEach(tab => {
        const platform = tab.dataset.platform;
        const config = DOWNLOAD_CONFIG[platform];
        const isEnabled = config && config.enabled !== false;
        
        if (!isEnabled) {
            tab.classList.add('platform-disabled');
        }
        
        const newTab = tab.cloneNode(true);
        tab.parentNode.replaceChild(newTab, tab);
        
        newTab.addEventListener('click', (e) => handlePlatformClick(platform, e));
    });
}

function switchPlatform(platform) {
    currentPlatform = platform;
    
    const androidSection = document.getElementById('android-downloads');
    const windowsSection = document.getElementById('windows-downloads');
    const platformTabs = document.querySelectorAll('.platform-tab');
    
    const isAndroidEnabled = DOWNLOAD_CONFIG.android.enabled !== false;
    const isWindowsEnabled = DOWNLOAD_CONFIG.windows.enabled !== false;
    
    if (platform === 'android' && isAndroidEnabled) {
        androidSection.classList.remove('hidden');
        windowsSection.classList.add('hidden');
    } else if (platform === 'windows' && isWindowsEnabled) {
        androidSection.classList.add('hidden');
        windowsSection.classList.remove('hidden');
    } else if (platform === 'android' && !isAndroidEnabled && isWindowsEnabled) {
        androidSection.classList.add('hidden');
        windowsSection.classList.remove('hidden');
        currentPlatform = 'windows';
    } else if (platform === 'windows' && !isWindowsEnabled && isAndroidEnabled) {
        androidSection.classList.add('hidden');
        windowsSection.classList.remove('hidden');
        currentPlatform = 'android';
    } else {
        if (isAndroidEnabled) {
            androidSection.classList.remove('hidden');
            windowsSection.classList.add('hidden');
            currentPlatform = 'android';
        } else if (isWindowsEnabled) {
            androidSection.classList.add('hidden');
            windowsSection.classList.remove('hidden');
            currentPlatform = 'windows';
        }
    }
    
    platformTabs.forEach(tab => {
        const tabPlatform = tab.dataset.platform;
        const isEnabled = DOWNLOAD_CONFIG[tabPlatform]?.enabled !== false;
        
        if (isEnabled && tabPlatform === currentPlatform) {
            tab.classList.add('active');
        } else if (isEnabled && tabPlatform !== currentPlatform) {
            tab.classList.remove('active');
        } else if (!isEnabled) {
            tab.classList.remove('active');
        }
    });
}

function switchLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.value = t[key];
            } else {
                el.textContent = t[key];
            }
        }
    });
    
    const changelogList = document.getElementById('changelog-list');
    if (changelogList && t.changelog_items) {
        changelogList.innerHTML = t.changelog_items.map(item => {                    
            const parsedItem = parseMarkdown(item);
            return `<li>${parsedItem}</li>`;
        }).join('');
    }
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function parseMarkdown(text) {
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');        
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');            
    return text;
}

function detectUserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('ru')) {
        return 'ru';
    }
    return 'en';
}

function saveLanguagePreference(lang) {
    localStorage.setItem('standchillow_lang', lang);
}

function loadLanguagePreference() {
    return localStorage.getItem('standchillow_lang');
}

function setTelegramLink() {
    const tgLink = document.querySelector('.tg-channel-btn');
    if (tgLink && DOWNLOAD_CONFIG.telegram) {
        tgLink.href = DOWNLOAD_CONFIG.telegram.url;
    }
}

function init() {
    setTelegramLink();
    setupPlatformTabs();
    setupDownloadButtons();

    const savedLang = loadLanguagePreference();
    const initialLang = savedLang || detectUserLanguage();
    
    switchLanguage(initialLang);
    
    const isAndroidEnabled = DOWNLOAD_CONFIG.android.enabled !== false;
    const isWindowsEnabled = DOWNLOAD_CONFIG.windows.enabled !== false;
    
    let defaultPlatform = 'android';
    if (!isAndroidEnabled && isWindowsEnabled) {
        defaultPlatform = 'windows';
    } else if (!isAndroidEnabled && !isWindowsEnabled) {
        defaultPlatform = 'android';
    }
    
    switchPlatform(defaultPlatform);
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = btn.dataset.lang;
            switchLanguage(lang);
            saveLanguagePreference(lang);
        });
    });
}

document.addEventListener('DOMContentLoaded', init);
