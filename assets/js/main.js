/* ==========================================================================
   Sai Nikhil Mattapalli — Portfolio JS
   ==========================================================================*/

(() => {
    'use strict';

    // ---- Year
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // ---- Nav: scrolled state + mobile toggle
    const nav = document.getElementById('nav');
    const burger = document.getElementById('navBurger');

    const onScroll = () => {
        if (!nav) return;
        nav.classList.toggle('is-scrolled', window.scrollY > 24);
        const toTop = document.getElementById('toTop');
        if (toTop) toTop.classList.toggle('is-visible', window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (burger && nav) {
        burger.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('is-open');
            burger.setAttribute('aria-expanded', String(isOpen));
        });
        nav.querySelectorAll('.nav__menu a').forEach(a => {
            a.addEventListener('click', () => {
                nav.classList.remove('is-open');
                burger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ---- Back to top
    const toTop = document.getElementById('toTop');
    if (toTop) {
        toTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- Console: animated RAG care-insights inference log
    const log = document.getElementById('log');
    const tpsEl = document.getElementById('tps');

    if (log) {
        const MAX_LINES = 9;
        const lines = [];

        const pad2 = n => String(n).padStart(2, '0');
        const now = () => {
            const d = new Date();
            return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
        };
        const hex = (n) => Math.floor(Math.random() * 16 ** n)
            .toString(16).padStart(n, '0');
        const memberId = () => `mbr_${hex(4)}_${hex(3)}`;

        // Outcome distribution: most queries answer cleanly, some refer to a clinician, few escalate.
        const nextOutcome = () => {
            const r = Math.random();
            if (r < 0.78) return ['ANSWER', 'allow'];
            if (r < 0.95) return ['REFER', 'score'];
            return ['ESCALATE', 'block'];
        };

        const addLine = () => {
            const [v, cls] = nextOutcome();
            // Retrieval depth k=5 with one or two below threshold occasionally
            const hits = Math.random() < 0.92 ? 5 : 4;
            const lat = 280 + Math.floor(Math.random() * 180); // ms
            const line = `<span class="ts">[${now()}]</span> <span class="id">${memberId()}</span>  retrieve k=<span class="score">${hits}</span>  gen=<span class="score">${lat}ms</span>  <span class="${cls}">${v}</span>`;
            lines.push(line);
            if (lines.length > MAX_LINES) lines.shift();
            const caret = '<span class="caret"></span>';
            log.innerHTML = lines.join('\n') + caret;
        };

        // Prime with a few lines, then tick
        for (let i = 0; i < MAX_LINES; i++) addLine();

        const scheduleNext = () => {
            const delay = 700 + Math.random() * 1100;
            setTimeout(() => { addLine(); scheduleNext(); }, delay);
        };
        scheduleNext();

        // Throughput flicker — queries per minute
        if (tpsEl) {
            setInterval(() => {
                const base = 180;
                const jitter = Math.floor((Math.random() - 0.5) * 18);
                tpsEl.textContent = (base + jitter).toLocaleString() + ' QPM';
            }, 1800);
        }
    }

    // ---- Reveal on scroll
    const revealTargets = document.querySelectorAll(
        '.section__head, .role, .project, .stack__col, .creds__block, .contact__card, .impact__cell, .repo'
    );
    revealTargets.forEach(el => el.classList.add('reveal'));

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        revealTargets.forEach(el => io.observe(el));
    } else {
        revealTargets.forEach(el => el.classList.add('is-in'));
    }

    // ---- Smooth anchor scroll with nav offset
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (!id || id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const offset = 72;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

})();
