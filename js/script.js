window.App = window.App || {};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const languageStorageKey = 'the-person-behind-language';
let languageTransitionTimer;
let languageTransitionFrame;
const defaultContent = new WeakMap();
const translations = {
    en: {
        'page.home': 'The Person Behind.',
        'page.journey': 'My Journey & Milestones — The Person Behind.',
        'page.works': 'Works & Achievements — The Person Behind.',
        'description.home': 'I explore, I learn, and I build things.',
        'description.journey': 'The messy and beautiful process of lifelong learning, milestones, and growth.',
        'description.works': 'A selection of experiments in AI workflows, frontend engineering, and thoughtful backend architecture.',
        'aria.home': 'The Person Behind — home',
        'aria.mainNav': 'Main navigation',
        'aria.mobileNav': 'Mobile navigation',
        'aria.openMenu': 'Open navigation menu',
        'aria.closeMenu': 'Close navigation menu',
        'aria.switchToEnglish': 'Switch language to English',
        'aria.switchToIndonesian': 'Switch language to Indonesian',
        'aria.collectionDetails': 'Collection details',
        'aria.worksSection': 'Selected works',
        'aria.achievementsSection': 'Achievements',
        'aria.socialLinks': 'Social links',
        'nav.home': 'The Hub',
        'nav.journey': 'My Journey',
        'nav.works': 'Selected Works',
        'footer.copyright': '© 2026 Adnan Sya’ban Mubarok. The Person Behind.',
        'home.heroTag': 'The person behind it all',
        'home.heroLine1': 'Hi, I’m',
        'home.heroName': 'Adnan.',
        'home.heroLine2': 'I like to understand,',
        'home.heroAccent': 'explore,',
        'home.heroLine3': 'and create.',
        'home.portraitAlt': 'Portrait of Adnan Sya’ban Mubarok',
        'home.introLead': 'I have always been curious about how things work. I enjoy unpacking ideas, learning something new, and understanding the process behind things that often seem simple.',
        'home.introBody': 'That curiosity has led me to explore technology, programming, design, and many other fields. To me, learning is not only about finding answers—it is also about discovering new questions worth exploring.',
        'home.nowEyebrow': 'In progress',
        'home.nowTitle': 'What I’m Exploring',
        'home.nowText': 'I’m deepening my programming skills, exploring web development, learning how technology works, and developing my visual design skills. I’m also preparing for the academic path and the field of Informatics I hope to pursue.',
        'home.curiosityTitle': 'What I’m Exploring',
        'home.programmingTitle': 'Programming & Technology',
        'home.programmingText': 'Understanding how logic, algorithms, and technology work. I’m curious about how systems are built and how code can turn an idea into something real.',
        'home.webTitle': 'Web Development',
        'home.webText': 'Building a website is more than arranging elements on a screen. I enjoy shaping its structure, developing interactions, and creating a digital experience with character.',
        'home.visualTitle': 'Visual Creativity',
        'home.visualText': 'Exploring illustration, composition, typography, and visual design. I enjoy seeing how an idea can become something with its own visual identity.',
        'home.problemSolvingTitle': 'Problem Solving',
        'home.problemSolvingText': 'I enjoy challenges that call for logical thinking, care, and a creative approach. From algorithms to everyday problems, there is always something to learn in the search for a solution.',
        'home.contactTitle': 'There is still so much I want to explore.',
        'home.contactText': 'Every learning process opens up new possibilities. There are still ideas to bring to life, skills to develop, and experiences to discover. If there is something interesting to talk about or work on together, I would be happy to connect.',
        'home.contactButton': 'Let’s Connect',
        'journey.heroTag': 'The Process',
        'journey.title': 'My Journey & Milestones',
        'journey.intro': 'Growth isn’t a straight line. It’s a collection of experiments, pivots, unexpected failures, and quiet breakthroughs that shaped how I see the world today.',
        'journey.date2022': '2022',
        'journey.title2022': 'First Encounter with AI',
        'journey.text2022': 'It all began with a curiosity about artificial intelligence. At first, I was simply trying out a new technology, but gradually I became drawn to the many possibilities it could bring to life.',
        'journey.date2023': '2023',
        'journey.title2023': 'Exploring the Digital World',
        'journey.text2023': 'I began exploring the digital world more deeply—from design and visual creativity to programming. By trying new things, I discovered a love for creating through ideas and technology.',
        'journey.date2024': '2024',
        'journey.title2024': 'Learning Through Experimentation',
        'journey.text2024': 'This was a time to experiment more and grow my skills. I started building projects, exploring design, and understanding how technology can turn ideas into something real.',
        'journey.date2025': '2025',
        'journey.title2025': 'Beyond My Curiosity',
        'journey.text2025': 'My interests expanded into computer technology, operating systems, Linux, and digital illustration. I began to realize there is always something new and exciting to learn beyond what I already know.',
        'journey.date2026': '2026',
        'journey.title2026': 'Finding My Direction',
        'journey.text2026': 'I’m now more interested in studying informatics and preparing for higher education. Competing in the Informatics Olympiad (OSN) through the provincial level became an important part of my journey. There is still so much I want to learn and develop.',
        'journey.dateBeyond': 'Beyond',
        'journey.titleBeyond': 'Still Growing',
        'journey.textBeyond': 'There is still a long way to go. I want to keep exploring different fields, trying new things, and developing my skills without limiting myself to a single interest. Curiosity is one of the reasons I keep growing.',
        'works.heroTag': 'Notes on process and achievement',
        'works.titleFirst': 'Works &',
        'works.titleSecond': 'achievements',
        'works.subtitle': 'Things I’ve Made, Explored, and Achieved',
        'works.intro': 'A collection of projects, experiments, and achievements from things I’ve worked on. From building websites and contributing to organizations to trying simple ideas and taking part in competitions, each experience has become part of how I keep learning and growing.',
        'works.collectionLabel': 'Works & achievements',
        'works.collectionNote': 'Growing through every step',
        'works.scrollCue': 'Scroll to explore',
        'works.projectsKicker': 'A selection of projects',
        'works.projectsTitle': 'Selected Works',
        'works.projectsNote': 'Personal and organizational projects that turn ideas into something useful and memorable.',
        'works.projectTypePersonal': 'Personal project',
        'works.projectTypeOrganization': 'Organization',
        'works.projectTypeExperiment': 'Small experiment',
        'works.viewProject': 'View project',
        'works.projectTitle1': 'Farewell Tribute Website for Ms. Desty',
        'works.projectText1': 'A website celebrating and remembering Ms. Desty, filled with messages from her students on a digital page. A way to combine technology with something personal.',
        'works.projectTitle2': 'SMAN 3 Banjar Journalism Website',
        'works.projectText2': 'Developing and managing the SMAN 3 Banjar Journalism organization’s website as a platform for its information and publications.',
        'works.projectTitle3': 'Journalism New Member Registration Website',
        'works.projectText3': 'A website supporting new member registration for the Journalism organization, making the process more practical and accessible.',
        'works.projectTitle4': 'Love Calculator',
        'works.projectText4': 'A small project made just for fun: enter two names to get an interactive compatibility result. A spontaneous idea turned into a playful experiment.',
        'works.achievementsKicker': 'Moments that matter',
        'works.achievementsTitle': 'Achievements',
        'works.achievementsNote': 'A few achievements from academic and creative activities and competitions.',
        'works.achievementCategoryInformatics': 'Informatics Olympiad',
        'works.achievementCategoryCreative': 'Creative competition',
        'works.achievementTitle1': '2026 Provincial-Level Informatics Olympiad Finalist',
        'works.achievementText1': 'Reached the finalist stage of the provincial National Science Olympiad in Informatics—an important experience in my journey into the field.',
        'works.achievementTitle2': '2025 City-Level Informatics Olympiad Finalist',
        'works.achievementText2': 'Became a city-level National Science Olympiad finalist in Informatics, marking one of my first steps into competition.',
        'works.achievementTitle3': 'Top 10 — Banjar City Literacy Video Competition',
        'works.achievementText3': 'Placed in the top ten in Banjar City’s literacy video competition, exploring creativity through visual storytelling and video.',
        'works.outroTag': 'More than just results',
        'works.outroHeadlineStart': 'The most meaningful part is often the',
        'works.outroHeadlineAccent': 'process.',
        'works.outroText': 'Every project and achievement holds more than what you see.',
        'works.outroContinue': 'There is trying, learning, making mistakes, and discovering something new along the way. There is still so much I want to explore—and this story will keep growing.'
    }
};

const getDefaultContent = (element) => {
    let content = defaultContent.get(element);
    if (!content) {
        content = { text: element.textContent, html: element.innerHTML, attributes: new Map() };
        defaultContent.set(element, content);
    }
    return content;
};

const applyLocalizedText = (element, key, dictionary) => {
    const sourceContent = getDefaultContent(element);
    const translatedText = dictionary?.[key];
    if (translatedText !== undefined) {
        element.textContent = translatedText;
    } else {
        element.innerHTML = sourceContent.html;
    }
};

const applyLocalizedAttribute = (element, attribute, key, dictionary, defaultValueOverride) => {
    const content = getDefaultContent(element);
    if (!content.attributes.has(attribute)) {
        content.attributes.set(attribute, element.getAttribute(attribute));
    }

    const translatedValue = dictionary?.[key];
    if (translatedValue !== undefined) {
        element.setAttribute(attribute, translatedValue);
        return;
    }

    const defaultValue = defaultValueOverride ?? content.attributes.get(attribute);
    if (defaultValue !== null) element.setAttribute(attribute, defaultValue);
};

const applyLanguage = (language, animate = false) => {
    if (language !== 'id' && language !== 'en') return;
    const dictionary = language === 'en' ? translations.en : null;

    window.clearTimeout(languageTransitionTimer);
    if (languageTransitionFrame) window.cancelAnimationFrame(languageTransitionFrame);

    window.App.language = language;
    document.documentElement.lang = language;

    const translatedElements = [...document.querySelectorAll('[data-i18n]')];
    const updateTranslatedText = () => {
        translatedElements.forEach((element) => {
            applyLocalizedText(element, element.dataset.i18n, dictionary);
        });
    };

    if (animate && !prefersReducedMotion && translatedElements.length) {
        translatedElements.forEach((element) => {
            element.classList.add('language-transition', 'is-changing');
        });

        languageTransitionTimer = window.setTimeout(() => {
            updateTranslatedText();
            languageTransitionFrame = window.requestAnimationFrame(() => {
                translatedElements.forEach((element) => element.classList.remove('is-changing'));
                languageTransitionTimer = window.setTimeout(() => {
                    translatedElements.forEach((element) => element.classList.remove('language-transition'));
                }, 250);
            });
        }, 140);
    } else {
        updateTranslatedText();
        translatedElements.forEach((element) => {
            element.classList.remove('is-changing', 'language-transition');
        });
    }

    document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
        const isMobileMenuOpen = element.id === 'mobile-toggle' && element.getAttribute('aria-expanded') === 'true';
        const key = isMobileMenuOpen ? element.dataset.i18nCloseAria : element.dataset.i18nAria;
        const defaultValue = isMobileMenuOpen ? element.dataset.closeLabel : undefined;
        applyLocalizedAttribute(element, 'aria-label', key, dictionary, defaultValue);
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((element) => {
        element.dataset.i18nAttr.split(',').forEach((mapping) => {
            const [attribute, key] = mapping.split(':');
            if (attribute) applyLocalizedAttribute(element, attribute, key, dictionary);
        });
    });

    document.querySelectorAll('[data-i18n-meta]').forEach((element) => {
        applyLocalizedAttribute(element, 'content', element.dataset.i18nMeta, dictionary);
    });

    const title = document.querySelector('[data-i18n-title]');
    if (title) {
        const defaultTitle = getDefaultContent(title).text;
        const translatedTitle = dictionary?.[title.dataset.i18nTitle];
        document.title = translatedTitle ?? defaultTitle;
    }

    document.querySelectorAll('[data-language-toggle]').forEach((button) => {
        const nextLanguage = language === 'id' ? 'en' : 'id';
        const key = nextLanguage === 'id' ? 'aria.switchToIndonesian' : 'aria.switchToEnglish';
        applyLocalizedAttribute(button, 'aria-label', key, dictionary);

        button.querySelectorAll('[data-language-option]').forEach((option) => {
            option.classList.toggle('active', option.dataset.languageOption === language);
        });
    });

    const mobileToggle = document.getElementById('mobile-toggle');
    if (mobileToggle) {
        const isMenuOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
        const key = isMenuOpen ? mobileToggle.dataset.i18nCloseAria : mobileToggle.dataset.i18nAria;
        const defaultValue = isMenuOpen ? mobileToggle.dataset.closeLabel : undefined;
        applyLocalizedAttribute(mobileToggle, 'aria-label', key, dictionary, defaultValue);
    }

};

const getSavedLanguage = () => {
    try {
        const storedLanguage = window.localStorage.getItem(languageStorageKey);
        return storedLanguage === 'en' || storedLanguage === 'id' ? storedLanguage : 'id';
    } catch (error) {
        console.warn('Language preference could not be loaded from browser storage.', error);
        return 'id';
    }
};

const initGlobal = () => {
    applyLanguage(window.App.language);

    document.querySelectorAll('[data-language-toggle]').forEach((button) => {
        button.addEventListener('click', () => {
            const nextLanguage = window.App.language === 'id' ? 'en' : 'id';
            try {
                window.localStorage.setItem(languageStorageKey, nextLanguage);
            } catch (error) {
                console.warn('Language preference could not be saved to browser storage.', error);
            }
            applyLanguage(nextLanguage, true);
        });
    });

    if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
            smoothWheel: true
        });

        window.App.lenis = lenis;

        const raf = (time) => {
            lenis.raf(time);
            window.requestAnimationFrame(raf);
        };

        window.requestAnimationFrame(raf);
    }

    const header = document.getElementById('site-header');
    const updateHeader = () => {
        if (header) header.classList.toggle('scrolled', window.scrollY > 24);
    };

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (mobileToggle && mobileNav) {
        const menuLinks = mobileNav.querySelectorAll('a');

        const setMenuOpen = (isOpen, returnFocus = false) => {
            mobileToggle.setAttribute('aria-expanded', String(isOpen));
            const dictionary = window.App.language === 'en' ? translations.en : null;
            const key = isOpen ? mobileToggle.dataset.i18nCloseAria : mobileToggle.dataset.i18nAria;
            const defaultValue = isOpen ? mobileToggle.dataset.closeLabel : undefined;
            applyLocalizedAttribute(mobileToggle, 'aria-label', key, dictionary, defaultValue);
            mobileNav.classList.toggle('is-open', isOpen);
            mobileNav.setAttribute('aria-hidden', String(!isOpen));
            mobileNav.toggleAttribute('inert', !isOpen);
            document.body.classList.toggle('menu-open', isOpen);

            if (window.App.lenis) {
                if (isOpen) window.App.lenis.stop();
                else window.App.lenis.start();
            }

            if (isOpen && menuLinks.length) menuLinks[0].focus();
            if (!isOpen && returnFocus) mobileToggle.focus();
        };

        mobileToggle.addEventListener('click', () => {
            const isOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
            setMenuOpen(!isOpen);
        });

        mobileNav.addEventListener('click', (event) => {
            if (event.target.closest('a')) setMenuOpen(false);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && mobileToggle.getAttribute('aria-expanded') === 'true') {
                setMenuOpen(false, true);
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mobileToggle.getAttribute('aria-expanded') === 'true') {
                setMenuOpen(false);
            }
        });
    }

    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    }, { once: true });

    document.addEventListener('click', (event) => {
        const link = event.target.closest('a[href]');

        if (
            !link ||
            prefersReducedMotion ||
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            link.target === '_blank' ||
            link.hasAttribute('download')
        ) return;

        const destination = new URL(link.href, window.location.href);
        const isPageNavigation = destination.origin === window.location.origin &&
            destination.pathname !== window.location.pathname &&
            !destination.hash;

        if (!isPageNavigation) return;

        const overlay = document.getElementById('page-transition');
        if (!overlay) return;

        event.preventDefault();
        document.body.classList.add('is-leaving');
        window.setTimeout(() => {
            window.location.assign(destination.href);
        }, 400);
    });
};

const initHero = () => {
    const animateHero = () => {
        const staggers = document.querySelectorAll('.hero-section .stagger-element, .works-hero .stagger-element, .journey-hero .stagger-element');
        const blurElement = document.querySelector('.hero-section .blur-element');

        staggers.forEach((element, index) => {
            window.setTimeout(() => element.classList.add('is-visible'), index * 120);
        });

        if (blurElement) {
            window.setTimeout(() => blurElement.classList.add('is-visible'), 200);
        }
    };

    const portrait = document.querySelector('.hero-photo');
    const showPortraitFallback = () => {
        const wrapper = portrait && portrait.closest('.photo-wrapper');
        if (wrapper) wrapper.classList.add('has-fallback');
    };

    if (portrait) {
        portrait.addEventListener('error', showPortraitFallback, { once: true });
        if (portrait.complete && portrait.naturalWidth === 0) showPortraitFallback();
    }

    if (document.readyState === 'complete') animateHero();
    else window.addEventListener('load', animateHero, { once: true });
};

const initScrollReveal = () => {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealElements.forEach((element) => element.classList.add('is-visible'));
        return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, {
        rootMargin: '0px 0px -5% 0px',
        threshold: 0.1
    });

    revealElements.forEach((element) => revealObserver.observe(element));
};

window.App.language = getSavedLanguage();
applyLanguage(window.App.language);

document.addEventListener('DOMContentLoaded', () => {
    initGlobal();
    initHero();
    initScrollReveal();
});
