const DOWNLOAD_CONFIG = {
    telegram: {
        url: "https://t.me/chillow/"
    },

    android: {
        enabled: true,
        googleDrive: {
            url: "",
            enabled: false,
            isVisible: false
        },
        mediafire: {
            url: "",
            enabled: false,
            isVisible: true
        }
    },
    windows: {
        enabled: true,
        googleDrive: {
            url: "",
            enabled: false,
            isVisible: false
        },
        mediafire: {
            url: "",
            enabled: false,
            isVisible: true
        }
    }
};

const translations = {
    ru: {
        update_text: "ДОСТУПНО ОБНОВЛЕНИЕ 2.05",
        telegram_channel: "Скачать в Telegram",
        android_btn: "Android",
        windows_btn: "ПК (Windows)",
        android_title: "Скачать на Android",
        windows_title: "Скачать на ПК (Windows)",
        google_drive: "Google Диск",
        mediafire: "MediaFire",
        changelog_title: "ИЗМЕНЕНИЯ В 2.05",
        platform_coming_soon: "ПК версия будет скоро доступна",
        link_coming_soon: "Ссылка будет скоро доступна",
        changelog_items: [
            "Новый контент из 9 Years (интерфейс, скины, кейс)",
            "Новый контент из Breakout (скины, карты)",
            "Новый тип предметов в инвентаре - Темы. Они меняют оформление и саундтрек, приходят на замену смены через настройки",
            "Агенты. Есть возможность применить несколько одновременно",
            "Вернуто отображение цен предметов в свободном режиме инвентаря",
            "Добавлен ESP в админ панель - возможность видеть противников сквозь стену",
            "Добавлена возможность применять соотношение сторон в меню",
            "Добавлен режим \"Союзники: альтернатива\"",
            "Добавлена возможность удалить или изменить сложность у всех ботов одной команды в меню паузы",
            "Боты теперь могут играть за агентов и со скинами",
            "Добавлены настройки матча - \"Разрешить ботам играть со скинами\" и \"Разрешать ботам использовать агентов\"",
            "Добавлена настройка вида полной карты (в окне/на радаре)",
            "Обновлены стандартные аватарки",
            "Возвращена поддержка 32 бит Android устройств",
            "Карты Training Sector, Zone 7 и Lakeside удалены",
            "Fable кейс убран из магазина",
            "Возможность сделать скриншот на F2 (ПК версия)",
            "Исправления багов",
        ]
    },
    en: {
        update_text: "UPDATE 2.05 AVAILABLE",
        telegram_channel: "Download in Telegram",
        android_btn: "Android",
        windows_btn: "PC (Windows)",
        android_title: "Download for Android",
        windows_title: "Download for PC (Windows)",
        google_drive: "Google Drive",
        mediafire: "MediaFire",
        changelog_title: "CHANGELOG 2.05",
        platform_coming_soon: "PC version will be avaliable soon",
        link_coming_soon: "Link will be avaliable soon",
        changelog_items: [
            "New content from 9 Years (interface, skins, case)",
            "New content from Breakout (skins, maps)",
            "New inventory item type - Themes. They change the design and soundtrack, replacing the changeable ones in the settings.",
            "Agents. Multiple themes can be applied simultaneously.",
            "Item prices are now displayed again in free inventory mode.",
            "Added ESP to the admin panel - ability to see enemies through walls.",
            "Added the ability to apply aspect ratio in the menu.",
            "Added \"Alternative Allies\" mode.",
            "Added the ability to remove or change the difficulty for all bots on a team in the pause menu.",
            "Bots can now play as agents and with skins.",
            "Added match settings - \"Allow bots to play with skins\" and \"Allow bots to use agents\"",
            "Added full map view setting (window/radar)",
            "Updated default avatars",
            "Restored support for 32-bit Android devices",
            "Training Sector, Zone 7, and Lakeside maps",
            "Removed the Fable case from the store",
            "Ability to take a screenshot with F2 (PC version)",
            "Bug fixes",
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
                const isVisible = typeof serviceConfig === 'object' ? serviceConfig.isVisible !== false : true;
                const isEnabled = typeof serviceConfig === 'object' ? serviceConfig.enabled !== false : true;            
                if (!isVisible) {
                    element.style.display = 'none';
                }
                
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
