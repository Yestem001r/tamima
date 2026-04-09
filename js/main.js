/* ═══════════════════════════════════════════
   TAMIMA — JS
═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* GSAP removed — using CSS animations + IntersectionObserver */

  /* ──────────────────────────────────────
     2D BEE — Canvas illustration guide
  ────────────────────────────────────── */
  const canvas = document.getElementById('bee-canvas');
  const ctx    = canvas ? canvas.getContext('2d') : null;

  if (canvas && ctx) {
    function resizeBee() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeBee();
    window.addEventListener('resize', resizeBee);

    /* ── Draw bee (gradient, glow, detailed) ── */
    function drawBee(x, y, angle, wingT, scale) {
      scale = scale || 1;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(scale, scale);

      const s = 42;
      const wFlap = Math.sin(wingT) * 0.48;

      // ── Abdomen with glow ──
      ctx.save();
      ctx.shadowBlur = 22; ctx.shadowColor = 'rgba(255,190,0,.42)';
      const abdGrad = ctx.createRadialGradient(-s * .08, s * .02, s * .04, 0, s * .14, s * .46);
      abdGrad.addColorStop(0,    '#FFD848');
      abdGrad.addColorStop(0.55, '#F5B020');
      abdGrad.addColorStop(1,    '#B87010');
      ctx.beginPath();
      ctx.ellipse(0, s * 0.14, s * 0.43, s * 0.45, 0, 0, Math.PI * 2);
      ctx.fillStyle = abdGrad; ctx.fill();
      ctx.strokeStyle = 'rgba(40,15,0,.22)'; ctx.lineWidth = 1.4; ctx.stroke();
      ctx.restore();

      // ── Stripes ──
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(0, s * 0.14, s * 0.46, s * 0.47, 0, 0, Math.PI * 2);
      ctx.clip();
      [-s * 0.08, s * 0.14, s * 0.37].forEach(sy => {
        const sg = ctx.createLinearGradient(-s * .46, sy, s * .46, sy);
        sg.addColorStop(0,   'rgba(10,2,0,.28)');
        sg.addColorStop(0.5, 'rgba(10,2,0,.76)');
        sg.addColorStop(1,   'rgba(10,2,0,.28)');
        ctx.beginPath();
        ctx.ellipse(0, sy, s * 0.47, s * 0.094, 0, 0, Math.PI * 2);
        ctx.fillStyle = sg; ctx.fill();
      });
      ctx.restore();

      // ── Stinger ──
      ctx.beginPath();
      ctx.ellipse(0, s * 0.59, s * 0.07, s * 0.11, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#1A0600'; ctx.fill();

      // ── Wings ──
      function drawWingPair(side) {
        ctx.save();
        ctx.translate(side * s * 0.06, s * 0.02);
        ctx.rotate(side * (1.14 + wFlap * 0.92));
        const wg1 = ctx.createLinearGradient(0, -s * .3, side * s * .9, -s * .1);
        wg1.addColorStop(0, 'rgba(210,238,255,.82)');
        wg1.addColorStop(1, 'rgba(170,215,255,.20)');
        ctx.beginPath();
        ctx.ellipse(side * s * 0.44, -s * 0.10, s * 0.62, s * 0.22, side * 0.18, 0, Math.PI * 2);
        ctx.fillStyle = wg1;
        ctx.strokeStyle = 'rgba(120,185,245,.55)'; ctx.lineWidth = 0.9;
        ctx.fill(); ctx.stroke();
        ctx.rotate(side * (0.26 + wFlap * 0.60));
        const wg2 = ctx.createLinearGradient(0, 0, side * s * .6, s * .2);
        wg2.addColorStop(0, 'rgba(200,232,255,.55)');
        wg2.addColorStop(1, 'rgba(160,210,255,.12)');
        ctx.beginPath();
        ctx.ellipse(side * s * 0.30, s * 0.04, s * 0.40, s * 0.15, side * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = wg2; ctx.fill();
        ctx.restore();
      }
      drawWingPair(-1);
      drawWingPair(1);

      // ── Head with glow ──
      ctx.save();
      ctx.shadowBlur = 14; ctx.shadowColor = 'rgba(255,200,0,.32)';
      const hdGrad = ctx.createRadialGradient(-s * .1, -s * .56, s * .04, 0, -s * .46, s * .40);
      hdGrad.addColorStop(0,   '#FFE060');
      hdGrad.addColorStop(0.6, '#F8C020');
      hdGrad.addColorStop(1,   '#C08010');
      ctx.beginPath();
      ctx.arc(0, -s * 0.46, s * 0.38, 0, Math.PI * 2);
      ctx.fillStyle = hdGrad; ctx.fill();
      ctx.strokeStyle = 'rgba(40,15,0,.20)'; ctx.lineWidth = 1.4; ctx.stroke();
      ctx.restore();

      // ── Eyes ──
      [[-s * 0.150, -s * 0.505], [s * 0.150, -s * 0.505]].forEach(([ex, ey]) => {
        ctx.beginPath(); ctx.arc(ex, ey, s * 0.152, 0, Math.PI * 2);
        ctx.fillStyle = '#fff'; ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,.12)'; ctx.lineWidth = 0.7; ctx.stroke();
        const iGrad = ctx.createRadialGradient(ex + s * .024, ey + s * .012, 0, ex, ey, s * .088);
        iGrad.addColorStop(0,   '#1A0400');
        iGrad.addColorStop(0.7, '#2E0800');
        iGrad.addColorStop(1,   'rgba(10,2,0,.50)');
        ctx.beginPath(); ctx.arc(ex + s * 0.022, ey + s * 0.012, s * 0.088, 0, Math.PI * 2);
        ctx.fillStyle = iGrad; ctx.fill();
        ctx.beginPath(); ctx.arc(ex + s * 0.064, ey - s * 0.048, s * 0.032, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,.90)'; ctx.fill();
      });

      // ── Blush ──
      ctx.save(); ctx.globalAlpha = 0.32;
      [[-s * 0.30, -s * 0.35], [s * 0.30, -s * 0.35]].forEach(([bx, by]) => {
        const bg = ctx.createRadialGradient(bx, by, 0, bx, by, s * .115);
        bg.addColorStop(0, 'rgba(255,100,130,.72)');
        bg.addColorStop(1, 'rgba(255,80,110,.00)');
        ctx.beginPath();
        ctx.ellipse(bx, by, s * 0.115, s * 0.074, 0, 0, Math.PI * 2);
        ctx.fillStyle = bg; ctx.fill();
      });
      ctx.restore();

      // ── Smile ──
      ctx.beginPath();
      ctx.arc(0, -s * 0.33, s * 0.118, 0.24, Math.PI - 0.24);
      ctx.strokeStyle = '#7A2E00'; ctx.lineWidth = 1.8;
      ctx.lineCap = 'round'; ctx.stroke();

      // ── Antennae ──
      [[-s * 0.14], [s * 0.14]].forEach(([ax]) => {
        ctx.beginPath();
        ctx.moveTo(ax * 0.65, -s * 0.82);
        ctx.quadraticCurveTo(ax * 1.6, -s * 1.06, ax * 2.1, -s * 1.22);
        ctx.strokeStyle = '#1A0600'; ctx.lineWidth = 2.0;
        ctx.lineCap = 'round'; ctx.stroke();
        ctx.save();
        ctx.shadowBlur = 6; ctx.shadowColor = 'rgba(255,180,0,.50)';
        ctx.beginPath(); ctx.arc(ax * 2.1, -s * 1.22, s * 0.076, 0, Math.PI * 2);
        ctx.fillStyle = '#FFD040'; ctx.fill();
        ctx.restore();
      });

      ctx.restore();
    }

    /* ── Movement system ── */
    const tgt = { x: 0.5, y: 0.3 };
    let active    = false;
    let beeVelX   = 0, beeVelY   = 0;
    let beePrevX  = 0, beePrevY  = 0;
    let beeX      = -300, beeY   = -300;
    let beeAngle  = 0, wingPhase = 0;
    let lastTime  = performance.now();

    function moveTo(xn, yn) { tgt.x = xn; tgt.y = yn; }

    /* Entry fly-in */
    setTimeout(() => {
      tgt.x = 1.5; tgt.y = -0.1;
      beeX = window.innerWidth * 1.5;
      beeY = window.innerHeight * -0.1;
      active = true;
      const mob = window.innerWidth < 800;
      moveTo(mob ? 0.72 : 0.74, mob ? 0.22 : 0.30);
    }, 1600);

    /* Scroll-driven: within hero */
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      window.addEventListener('scroll', () => {
        const r = heroEl.getBoundingClientRect();
        if (r.bottom <= 0 || r.top >= window.innerHeight) return;
        const p = Math.max(0, Math.min(1, -r.top / (r.height)));
        const mob = window.innerWidth < 800;
        if (mob) { tgt.x = 0.78 - p * 0.5;  tgt.y = 0.28 + p * 0.40; }
        else     { tgt.x = 0.80 - p * 0.62; tgt.y = 0.36 + p * 0.32; }
      }, { passive: true });
    }

    /* After-hero waypoints — bee stays at edges */
    const wpts = [
      { sel: '#why',        d: [0.06, 0.35], m: [0.92, 0.30] },
      { sel: '#catalog',    d: [0.92, 0.28], m: [0.06, 0.28] },
      { sel: '#reviews',    d: [0.08, 0.25], m: [0.93, 0.22] },
      { sel: '#production', d: [0.93, 0.30], m: [0.07, 0.28] },
      { sel: '#certs',      d: [0.06, 0.32], m: [0.92, 0.30] },
      { sel: '#marketing',  d: [0.94, 0.25], m: [0.06, 0.22] },
      { sel: '#support',    d: [0.07, 0.35], m: [0.93, 0.30] },
      { sel: '#partners',   d: [0.93, 0.28], m: [0.07, 0.28] },
      { sel: '#cta-s',      d: [0.08, 0.40], m: [0.92, 0.38] },
    ];
    wpts.forEach(({ sel, d, m }) => {
      const el = document.querySelector(sel);
      if (!el) return;
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) moveTo(...(window.innerWidth < 800 ? m : d));
        });
      }, { threshold: 0.3 });
      obs.observe(el);
    });

    /* ── Render loop ── */
    (function render() {
      requestAnimationFrame(render);
      const now = performance.now();
      const dt  = (now - lastTime) / 1000;
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!active) return;

      const tx = tgt.x * canvas.width;
      const ty = tgt.y * canvas.height;

      beeX += (tx - beeX) * 0.055;
      beeY += (ty - beeY) * 0.055;
      beeY += Math.sin(now * 0.00185) * 1.9;

      beeVelX = beeX - beePrevX;
      beeVelY = beeY - beePrevY;
      beePrevX = beeX;
      beePrevY = beeY;

      const speed = Math.sqrt(beeVelX * beeVelX + beeVelY * beeVelY);
      if (speed > 0.28) {
        const targetAngle = Math.atan2(beeVelX, -beeVelY);
        let diff = targetAngle - beeAngle;
        while (diff >  Math.PI) diff -= 2 * Math.PI;
        while (diff < -Math.PI) diff += 2 * Math.PI;
        beeAngle += diff * 0.12;
      } else {
        beeAngle += (0 - beeAngle) * 0.06;
      }

      wingPhase += dt * 26;
      const sc = window.innerWidth < 800 ? 0.70 : 1.0;
      drawBee(beeX, beeY, beeAngle, wingPhase, sc);
    })();
  }


  /* ──────────────────────────────────────
     HEADER
  ────────────────────────────────────── */
  window.addEventListener('scroll', () => {
    document.getElementById('hdr').classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* Hero entrance animations are now CSS @keyframes in style.css */

  /* ──────────────────────────────────────
     FLOATING HEX PARTICLES
  ────────────────────────────────────── */
  const pContainer = document.getElementById('hero-particles');
  if (pContainer) {
    const hexSVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="12,2 20,7 20,17 12,22 4,17 4,7" stroke="rgba(255,255,255,0.25)" stroke-width="1" fill="rgba(255,255,255,0.08)"/></svg>`;
    for (let i = 0; i < 14; i++) {
      const div  = document.createElement('div');
      div.className = 'hp';
      const size = 14 + Math.random() * 24;
      div.style.cssText = [
        `left:${(Math.random() * 100).toFixed(1)}%`,
        `bottom:${(-5 + Math.random() * 25).toFixed(1)}%`,
        `width:${size.toFixed(0)}px`,
        `height:${size.toFixed(0)}px`,
        `animation-duration:${(14 + Math.random() * 22).toFixed(1)}s`,
        `animation-delay:-${(Math.random() * 20).toFixed(1)}s`,
      ].join(';');
      div.innerHTML = hexSVG;
      pContainer.appendChild(div);
    }
  }

  /* ──────────────────────────────────────
     HERO VIDEO HONEYCOMB BG
  ────────────────────────────────────── */
  const hvcHoney = document.querySelector('.hvc-honeycomb');
  if (hvcHoney) {
    const ns  = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('width',   '100%');
    svg.setAttribute('height',  '100%');
    svg.setAttribute('viewBox', '0 0 320 640');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    const hw = 38, hh = 44, cols = 7, rows = 14;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const ox  = c * (hw * 1.5) + (r % 2 === 0 ? 0 : hw * 0.75);
        const oy  = r * (hh * 0.866);
        const cx2 = ox + hw / 2;
        const cy2 = oy + hh / 2;
        const pts = [
          [cx2,          cy2 - hh / 2],
          [cx2 + hw / 2, cy2 - hh / 4],
          [cx2 + hw / 2, cy2 + hh / 4],
          [cx2,          cy2 + hh / 2],
          [cx2 - hw / 2, cy2 + hh / 4],
          [cx2 - hw / 2, cy2 - hh / 4],
        ].map(p => p.join(',')).join(' ');
        const poly = document.createElementNS(ns, 'polygon');
        poly.setAttribute('points', pts);
        poly.setAttribute('fill',         'rgba(255,255,255,0.06)');
        poly.setAttribute('stroke',       'rgba(255,255,255,0.20)');
        poly.setAttribute('stroke-width', '1.1');
        svg.appendChild(poly);
      }
    }
    hvcHoney.appendChild(svg);

    // Staggered glow animation — wave ripple from bottom-centre outward
    const polys = svg.querySelectorAll('polygon');
    polys.forEach((poly, i) => {
      const col  = i % cols;
      const row  = Math.floor(i / cols);
      const dist = Math.sqrt(Math.pow(col - cols / 2, 2) + Math.pow(row - rows, 2));
      const delay  = -(dist * 0.22) % 4.5;
      const dur    = 2.6 + (i % 7) * 0.28;
      poly.style.animation = `honeyPulse ${dur}s ease-in-out ${delay}s infinite`;
    });
  }

  /* ──────────────────────────────────────
     SCROLL FADE-INS (staggered per section)
  ────────────────────────────────────── */
  document.querySelectorAll('.section, #hero').forEach(section => {
    const items = section.querySelectorAll('.fi');
    if (!items.length) return;
    ScrollTrigger.create({
      trigger: section, start: 'top 80%', once: true,
      onEnter() {
        gsap.to(items, {
          opacity: 1, y: 0, duration: 0.7,
          stagger: 0.09, ease: 'power3.out'
        });
      }
    });
  });

  gsap.utils.toArray('.fir').forEach(el => {
    ScrollTrigger.create({
      trigger: el, start: 'top 84%', once: true,
      onEnter() { gsap.to(el, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }); }
    });
  });

  /* ── Chat bubble stagger ── */
  const chatBubbles = gsap.utils.toArray('.chat-bubble');
  if (chatBubbles.length) {
    gsap.set(chatBubbles, { opacity: 0, y: 16, scale: 0.94 });
    ScrollTrigger.create({
      trigger: '.support-chat-mockup', start: 'top 78%', once: true,
      onEnter() {
        gsap.to(chatBubbles, {
          opacity: 1, y: 0, scale: 1,
          duration: 0.45, stagger: 0.25, ease: 'back.out(1.4)'
        });
      }
    });
  }

  /* ──────────────────────────────────────
     ACTIVE NAV HIGHLIGHTING
  ────────────────────────────────────── */
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  ['#why','#catalog','#cta-s'].forEach(sel => {
    ScrollTrigger.create({
      trigger: sel, start: 'top 40%', end: 'bottom 40%',
      onEnter()     { navLinks.forEach(a => a.classList.remove('active')); document.querySelector(`nav a[href="${sel}"]`)?.classList.add('active'); },
      onEnterBack() { navLinks.forEach(a => a.classList.remove('active')); document.querySelector(`nav a[href="${sel}"]`)?.classList.add('active'); },
      onLeaveBack() { navLinks.forEach(a => a.classList.remove('active')); }
    });
  });

  /* ──────────────────────────────────────
     WHY-US — fan-in from 3 directions (desktop only)
     Mobile uses CSS sticky stacking instead
  ────────────────────────────────────── */
  const whyCards = gsap.utils.toArray('.wc');
  if (whyCards.length && window.innerWidth > 800) {
    // Card 1 from left with slight CCW tilt, card 3 from right with CW tilt,
    // card 2 from below — they converge like a deck being dealt
    gsap.set(whyCards[0], { opacity: 0, x: -110, rotate: -5, transformOrigin: 'left bottom' });
    gsap.set(whyCards[1], { opacity: 0, y: 90,   scale: 0.86 });
    gsap.set(whyCards[2], { opacity: 0, x: 110,  rotate:  5, transformOrigin: 'right bottom' });

    gsap.timeline({
      scrollTrigger: {
        trigger: '.why-grid',
        start: 'top 78%',
        end: 'center 30%',
        scrub: 1.8,
      },
    })
      .to(whyCards[0], { opacity: 1, x: 0, rotate: 0, ease: 'power2.out', duration: 0.5 }, 0)
      .to(whyCards[1], { opacity: 1, y: 0, scale: 1,  ease: 'power2.out', duration: 0.5 }, 0.20)
      .to(whyCards[2], { opacity: 1, x: 0, rotate: 0, ease: 'power2.out', duration: 0.5 }, 0.40);
  } else if (whyCards.length) {
    // Mobile: cards are visible (sticky handles reveal, no GSAP needed)
    gsap.set(whyCards, { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 });
  }

  /* ──────────────────────────────────────
     LANGUAGE / I18N
  ────────────────────────────────────── */
  // Only products that have a real photo are "visible" in the catalog
  const VISIBLE = PRODUCTS.filter(p => p.img);
  const VISIBLE_COUNT = VISIBLE.length;

  const I18N = {
    ru: {
      'nav-about':'О нас','nav-catalog':'Каталог','nav-coop':'Сотрудничество',
      'hero-tag-supply':'Оптовые поставки','hero-tag-kz':'Казахстан',
      'hero-title':'Природное решение<br><span class="hero-title-accent">для вашего здоровья</span>',
      'hero-sub':`Медовые пасты и сиропы из Казахстана.<br>${VISIBLE_COUNT} позиций · Халяль · ЕАС`,
      'hero-certified':'Сертифицировано',
      'badge-halal':'Халяль','badge-kz':'Сделано в КЗ','badge-eac':'ЕАС','badge-gmo':'Без ГМО',
      'btn-wa':'Написать в WhatsApp','btn-catalog':'Смотреть каталог →',
      'why-label':'Почему Tamima',
      'why-title':'Выбирайте <span style="color:var(--amber)">нас</span>',
      'why-sub':'Мы не просто поставщик. Мы партнёр с продуктом, за которым стоит реальное знание.',
      'why-h1':'Рецепты 250 лет','why-d1':'Составы создаются травниками с практикой более 250 лет. Знания, которые передаются из поколения в поколение.',
      'why-h2':'Зрелый мёд','why-d2':'Мы используем мёд с нужной влажностью и правильной консистенцией. Не расслаивается, сохраняет качество при хранении.',
      'why-h3':'Легальный сбор','why-d3':'Сырьё собирается по лесному билету. Нет рисков с проверками, нет серых поставок, прозрачное происхождение.',
      'cat-label':'Ассортимент',
      'cat-title':`${VISIBLE_COUNT} <span style="color:var(--amber)">позиций</span>`,
      'cat-sub':'Медовые пасты и натуральные сиропы из Казахстана.',
      'cat-price-btn':'Запросить прайс →','cat-download-btn':'Скачать каталог',
      'cat-filter-all':'Все',
      'cat-filter-heart':'Сердце и сосуды','cat-filter-weight':'Вес и обмен','cat-filter-digestion':'ЖКТ',
      'cat-filter-men':'Мужское','cat-filter-women':'Женское','cat-filter-immunity':'Иммунитет','cat-filter-habits':'Вредные привычки',
      'cat-more-btn':'Показать ещё',
      'rev-label':'Отзывы',
      'rev-title':'Что говорят <span style="color:var(--amber)">клиенты</span>',
      'rev-sub':'Реальные отзывы наших покупателей','rev-soon':'Видео скоро',
      'prod-label':'Производство',
      'prod-title':'С нами <span style="color:var(--amber)">стабильность</span>',
      'prod-sub':'Собственное производство в Казахстане. Полный цикл от сырья до упаковки.',
      'prod-vid1':'Видео с производства','prod-h1':'Наш цех','prod-d1':'Современное оборудование и строгий контроль качества',
      'prod-vid2':'Процесс создания','prod-h2':'От сырья до продукта','prod-d2':'Каждый этап под контролем технологов',
      'cert-label':'Качество подтверждено',
      'cert-title':'Наши <span style="color:var(--amber)">сертификаты</span>',
      'cert-sub':'Полный пакет документов. Халяль, ЕАС, ГОСТ — всё прозрачно.',
      'cert-tag-cert':'Сертификат','cert-tag-std':'Стандарт','cert-tag-comp':'Состав',
      'cert-eas-link':'Открыть PDF →','cert-doc-name':'Доверенность',
      'cert-halal-desc':'Соответствие исламским стандартам производства и состава продуктов',
      'cert-gost-desc':'Производство соответствует государственным стандартам качества',
      'cert-gmo-desc':'Натуральный состав без генетически модифицированных компонентов',
      'badge-halal':'Халяль','badge-gmo':'Без ГМО',
      'mkt-label':'Для партнёров',
      'mkt-title':'Мы не просто поставляем — <span style="color:var(--gold)">мы помогаем продавать</span>',
      'mkt-c1-title':'Оформление магазина','mkt-c1-desc':'Брендированные стеллажи и POS-материалы для вашей торговой точки.',
      'mkt-c2-title':'Баннеры','mkt-c2-desc':'Готовые рекламные материалы для офлайн и онлайн продвижения.',
      'mkt-c3-title':'Контент','mkt-c3-desc':'Профессиональные видео и фото для ваших соцсетей и маркетплейсов.',
      'mkt-c4-title':'Работа с блогерами','mkt-c4-desc':'Нативные обзоры в YouTube Shorts — охват тысячи потенциальных покупателей.',
      'sup-label':'Всегда на связи',
      'sup-title':'Поддержка, которая <span style="color:var(--amber)">рядом</span>',
      'sup-sub':'Мы не исчезаем после отгрузки. Помогаем с продажами, отвечаем на вопросы, решаем проблемы — в WhatsApp, по телефону, лично.',
      'sup-li1':'Персональный менеджер','sup-li2':'Ответ в течение 30 минут',
      'sup-li3':'Помощь с возвратами и обменом','sup-li4':'Консультации по ассортименту',
      'par-label':'Партнёры о нас',
      'par-title':'Отзывы <span style="color:var(--amber)">партнёров</span>',
      'par-sub':'Нам доверяют предприниматели по всему Казахстану',
      'par-q1':'"Tamima — лучший поставщик медовых продуктов, с которым мы работали. Стабильное качество и отличный сервис."',
      'par-n1':'Айгуль К.','par-r1':'Владелица магазина, Алматы',
      'par-q2':'"За 2 года ни одной жалобы от клиентов. Продукт продаёт себя сам."',
      'par-n2':'Марат Т.','par-r2':'Сеть аптек, Астана',
      'par-q3':'"Маркетинговая поддержка — это то, что отличает Tamima от других. Готовый контент и обучение."',
      'par-n3':'Даурен С.','par-r3':'Дистрибьютор, Шымкент',
      'chat-1':'Здравствуйте! Какой товар лучше для аптечной сети?',
      'chat-2':'Добрый день! Для аптек рекомендуем пасты с чёрным тмином и прополисом — самые ходовые позиции',
      'chat-3':'Отлично, оформим заказ!',
      'rev-swipe':'Листайте',
      'cta-label':'Остался один шаг','cta-title':'Напишите нам',
      'cta-sub':'Расскажем об условиях сотрудничества с Tamima.',
      'ft-tagline':'Натуральные медовые продукты оптом из Казахстана',
      'ft-nav-title':'Навигация','ft-nav-about':'О нас','ft-nav-catalog':'Каталог',
      'ft-nav-rev':'Отзывы','ft-nav-coop':'Сотрудничество',
      'ft-con-title':'Контакты','ft-con-city':'г. Астана, Казахстан',
      'ft-cta-title':'Начать сотрудничество','ft-copy':'© 2026 Tamima. Все права защищены.',
      'modal-pasta':'Медовая паста','modal-syrup':'Натуральный сироп','modal-cta':'Узнать подробнее',
      'rev-name':'Видео-отзыв','rev-name-nurse':'Отзыв постоянной клиентки (мед. сестра)','rev-name-weight':'Отзыв: набор веса',
    },
    kz: {
      'nav-about':'Біз туралы','nav-catalog':'Өнімдер','nav-coop':'Серіктестік',
      'hero-tag-supply':'Көтерме жеткізу','hero-tag-kz':'Қазақстан',
      'hero-title':'Денсаулығыңызға арналған<br><span class="hero-title-accent">табиғи шешім</span>',
      'hero-sub':`Қазақстандық бал пасталары мен сироптары.<br>${VISIBLE_COUNT} позиция · Халал · ЕАС`,
      'hero-certified':'Сертификатталған',
      'badge-halal':'Халал','badge-kz':'ҚР жасалған','badge-eac':'ЕАС','badge-gmo':'ГМО-сыз',
      'btn-wa':'WhatsApp-қа жазу','btn-catalog':'Каталогты қарау →',
      'why-label':'Неге Tamima',
      'why-title':'Бізді <span style="color:var(--amber)">таңдаңыз</span>',
      'why-sub':'Біз жай ғана жеткізуші емеспіз. Біз — нақты білімі бар өніммен серіктеспіз.',
      'why-h1':'250 жылдық рецепттер','why-d1':'Құрамдарды 250 жылдан астам тәжірибесі бар шөп мамандары жасайды. Ұрпақтан ұрпаққа беріліп келе жатқан білім.',
      'why-h2':'Піскен бал','why-d2':'Біз қажетті ылғалдылығы мен дұрыс консистенциясы бар балды пайдаланамыз. Қабаттаспайды, сақтау кезінде сапасын жоғалтпайды.',
      'why-h3':'Заңды жинау','why-d3':'Шикізат орман билеті бойынша жиналады. Тексерулермен қатер жоқ, сұр жеткізулер жоқ, ашық шығу тегі.',
      'cat-label':'Ассортимент',
      'cat-title':`${VISIBLE_COUNT} <span style="color:var(--amber)">позиция</span>`,
      'cat-sub':'Қазақстандық бал пасталары мен табиғи сироптар.',
      'cat-price-btn':'Бағаны сұрау →','cat-download-btn':'Каталогты жүктеу',
      'cat-filter-all':'Барлығы',
      'cat-filter-heart':'Жүрек және тамырлар','cat-filter-weight':'Салмақ және зат алмасу','cat-filter-digestion':'АІЖ',
      'cat-filter-men':'Ерлерге','cat-filter-women':'Әйелдерге','cat-filter-immunity':'Иммунитет','cat-filter-habits':'Зиянды әдеттер',
      'cat-more-btn':'Тағы көрсету',
      'rev-label':'Пікірлер',
      'rev-title':'Клиенттер <span style="color:var(--amber)">не айтады</span>',
      'rev-sub':'Біздің сатып алушылардың нақты пікірлері','rev-soon':'Бейне жақында',
      'rev-name':'Бейне-пікір','rev-name-nurse':'Тұрақты клиенттің пікірі (медбике)','rev-name-weight':'Пікір: салмақ қосу',
      'prod-label':'Өндіріс',
      'prod-title':'Бізбен бірге <span style="color:var(--amber)">тұрақтылық</span>',
      'prod-sub':'Қазақстандағы меншікті өндіріс. Шикізаттан бастап орауға дейінгі толық цикл.',
      'prod-vid1':'Өндірістен бейне','prod-h1':'Біздің цех','prod-d1':'Заманауи жабдық және сапаны қатаң бақылау',
      'prod-vid2':'Жасау процесі','prod-h2':'Шикізаттан өнімге дейін','prod-d2':'Әрбір кезең технологтардың бақылауында',
      'cert-label':'Сапасы расталған',
      'cert-title':'Біздің <span style="color:var(--amber)">сертификаттарымыз</span>',
      'cert-sub':'Толық құжаттар пакеті. Халал, ЕАС, МЕМСТ — барлығы ашық.',
      'cert-tag-cert':'Сертификат','cert-tag-std':'Стандарт','cert-tag-comp':'Құрамы',
      'cert-eas-link':'PDF ашу →','cert-doc-name':'Сенімхат',
      'cert-halal-desc':'Өндіріс пен өнім құрамының ислам стандарттарына сәйкестігі',
      'cert-gost-desc':'Өндіріс мемлекеттік сапа стандарттарына сәйкес',
      'cert-gmo-desc':'Генетикалық модификацияланған компоненттерсіз табиғи құрам',
      'mkt-label':'Серіктестер үшін',
      'mkt-title':'Біз жай ғана жеткізіп қоймаймыз — <span style="color:var(--gold)">сатуға көмектесеміз</span>',
      'mkt-c1-title':'Дүкенді безендіру','mkt-c1-desc':'Сіздің сауда нүктеңізге брендтік стеллаждар мен POS-материалдар.',
      'mkt-c2-title':'Баннерлер','mkt-c2-desc':'Офлайн және онлайн жарнамаға дайын материалдар.',
      'mkt-c3-title':'Контент','mkt-c3-desc':'Әлеуметтік желілер мен маркетплейстер үшін кәсіби бейнелер мен фотолар.',
      'mkt-c4-title':'Блогерлермен жұмыс','mkt-c4-desc':'YouTube Shorts-тағы нативті шолулар — мыңдаған әлеуетті сатып алушыларға қол жеткізу.',
      'sup-label':'Әрдайым байланыста',
      'sup-title':'Жаныңызда болатын <span style="color:var(--amber)">қолдау</span>',
      'sup-sub':'Біз жүк жөнелтілгеннен кейін жоғалып кетпейміз. Сатуға көмектесеміз, сұрақтарға жауап береміз, мәселелерді шешеміз — WhatsApp арқылы, телефон арқылы, жеке.',
      'sup-li1':'Жеке менеджер','sup-li2':'30 минут ішінде жауап',
      'sup-li3':'Қайтару мен алмастыруға көмек','sup-li4':'Ассортимент бойынша кеңес',
      'par-label':'Серіктестер біз туралы',
      'par-title':'Серіктестердің <span style="color:var(--amber)">пікірлері</span>',
      'par-sub':'Бізге Қазақстан бойынша кәсіпкерлер сенеді',
      'par-q1':'"Tamima — біз жұмыс істеген ең жақсы бал өнімдерін жеткізуші. Тұрақты сапа және тамаша сервис."',
      'par-n1':'Айгүл Қ.','par-r1':'Дүкен иесі, Алматы',
      'par-q2':'"2 жыл ішінде клиенттерден бір де бір шағым болған жоқ. Өнім өзін-өзі сатады."',
      'par-n2':'Марат Т.','par-r2':'Дәріхана желісі, Астана',
      'par-q3':'"Маркетингтік қолдау — міне, Tamima-ны басқалардан ерекшелендіретін нәрсе. Дайын контент және оқыту."',
      'par-n3':'Дәурен С.','par-r3':'Дистрибьютор, Шымкент',
      'chat-1':'Сәлеметсіз бе! Дәріхана желісіне қандай өнім жақсы?',
      'chat-2':'Қайырлы күн! Дәріханаларға қара зире мен прополис қосылған пасталарды ұсынамыз — ең жүрдек позициялар',
      'chat-3':'Тамаша, тапсырыс беремін!',
      'rev-swipe':'Сырғыту',
      'cta-label':'Бір ғана қадам қалды','cta-title':'Бізге жазыңыз',
      'cta-sub':'Tamima-мен серіктестік шарттары туралы айтып береміз.',
      'ft-tagline':'Қазақстандық табиғи көтерме бал өнімдері',
      'ft-nav-title':'Навигация','ft-nav-about':'Біз туралы','ft-nav-catalog':'Каталог',
      'ft-nav-rev':'Пікірлер','ft-nav-coop':'Серіктестік',
      'ft-con-title':'Байланыс','ft-con-city':'Астана қ., Қазақстан',
      'ft-cta-title':'Серіктестікті бастау','ft-copy':'© 2026 Tamima. Барлық құқықтар қорғалған.',
      'modal-pasta':'Бал паста','modal-syrup':'Табиғи сироп','modal-cta':'Толығырақ білу',
    }
  };

  let currentLang = 'ru';

  function applyLang(lang) {
    if (!I18N[lang]) lang = 'ru';
    currentLang = lang;
    const t = I18N[lang];
    document.documentElement.lang = lang === 'kz' ? 'kk' : 'ru';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const val = t[key];
      if (val === undefined) return;
      if ('i18nHtml' in el.dataset) {
        el.innerHTML = val;
      } else {
        const hasIcon = el.querySelector(':scope > svg, :scope > img');
        if (hasIcon) {
          for (let i = el.childNodes.length - 1; i >= 0; i--) {
            const n = el.childNodes[i];
            if (n.nodeType === 3 && n.textContent.trim()) {
              const ws = n.textContent.match(/^\s*/)[0];
              n.textContent = ws + val;
              break;
            }
          }
        } else {
          el.textContent = val;
        }
      }
    });
    // Sync all lang-switch buttons
    document.querySelectorAll('.lang-switch .lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    try { localStorage.setItem('tamimaLang', lang); } catch (e) {}
    // Re-render catalog cards so bilingual product fields update.
    // Guarded: only re-render if cards already exist (initial call happens before first render).
    const catGrid = document.getElementById('cat-grid');
    if (catGrid && catGrid.querySelector('.pc')) {
      renderCatalog(false);
    }
    // Re-render modal content if it's currently open
    const modalEl = document.getElementById('prod-modal');
    if (modalEl && modalEl.classList.contains('open')) {
      const openIdx = modalEl.dataset.openIdx;
      if (openIdx != null && PRODUCTS[+openIdx]) openModal(PRODUCTS[+openIdx]);
    }
  }

  // Restore saved language or default to RU
  let savedLang = 'ru';
  try { savedLang = localStorage.getItem('tamimaLang') || 'ru'; } catch (e) {}
  applyLang(savedLang);

  // Wire up language switch buttons
  document.querySelectorAll('.lang-switch .lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang && lang !== currentLang) applyLang(lang);
    });
  });

  /* ──────────────────────────────────────
     CATALOG
  ────────────────────────────────────── */
  // Update filter counts dynamically (only visible products with photos)
  document.querySelectorAll('.cat-btn[data-filter]').forEach(btn => {
    const f = btn.dataset.filter;
    const cnt = btn.querySelector('.cat-cnt');
    if (!cnt) return;
    if (f === 'all') {
      cnt.textContent = VISIBLE_COUNT;
    } else {
      cnt.textContent = VISIBLE.filter(p => p.healthCat === f).length;
    }
  });

  /* ── Video cover overlays ── */
  document.querySelectorAll('.prod-cover').forEach(cover => {
    const video = cover.parentElement.querySelector('video');
    if (!video) return;
    cover.addEventListener('click', () => {
      cover.classList.add('hidden');
      video.play();
    });
    video.addEventListener('ended', () => cover.classList.remove('hidden'));
    video.addEventListener('pause', () => {
      if (video.currentTime > 0 && video.currentTime < video.duration)
        cover.classList.remove('hidden');
    });
  });


  let catFilter  = 'all';
  let catVisible = 8;
  const CAT_STEP = 8;

  // Honey comb SVG placeholder for cards without a photo
  const placeholderSVG = `<svg class="pc-placeholder" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="24,3 43,13.5 43,34.5 24,45 5,34.5 5,13.5" stroke="#C47A10" stroke-width="2" fill="none"/>
    <polygon points="24,11 36,18 36,32 24,39 12,32 12,18" stroke="#C47A10" stroke-width="1.5" fill="rgba(196,122,16,0.12)"/>
    <circle cx="24" cy="24" r="4" fill="#C47A10" opacity="0.5"/>
  </svg>`;

  // Helper: read a bilingual field ({ru, kz}) with RU fallback
  function pick(field) {
    if (field == null) return '';
    if (typeof field === 'string') return field;
    return field[currentLang] || field.ru || '';
  }

  function renderCatalog(appendMode = false) {
    const grid    = document.getElementById('cat-grid');
    const moreBtn = document.getElementById('cat-more');
    if (!grid) return;

    // Build full filtered index list (only products with photos)
    const indices = PRODUCTS.reduce((acc, p, i) => {
      if (p.img && (catFilter === 'all' || p.healthCat === catFilter)) acc.push(i);
      return acc;
    }, []);

    if (!appendMode) {
      // Filter change or initial load — clear and rebuild everything
      grid.innerHTML = '';
    }

    // Only create cards that aren't in the DOM yet
    const existingCount = grid.querySelectorAll('.pc').length;
    const toRender = indices.slice(existingCount, Math.min(catVisible, indices.length));

    const newEls = toRender.map(idx => {
      const p = PRODUCTS[idx];
      const pName  = pick(p.name);
      const pShort = pick(p.shortDesc);
      const card = document.createElement('div');
      card.className = 'pc';
      card.dataset.idx = String(idx);
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', pName);
      card.innerHTML = `
        <div class="pc-img">${p.img ? `<img src="${p.img}" alt="${pName}" loading="lazy">` : placeholderSVG}</div>
        <div class="pc-body">
          <div class="pc-name">${pName}</div>
          <div class="pc-desc">${pShort}</div>
        </div>`;
      card.addEventListener('click', () => openModal(PRODUCTS[+card.dataset.idx]));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') openModal(PRODUCTS[+card.dataset.idx]);
      });
      return card;
    });

    newEls.forEach(el => grid.appendChild(el));
    if (moreBtn) moreBtn.style.display = catVisible >= indices.length ? 'none' : 'inline-flex';

    if (newEls.length) {
      gsap.fromTo(newEls,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.055, ease: 'power2.out' }
      );
    }
  }

  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Scroll active button into view on mobile
      if (window.innerWidth <= 800) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
      catFilter  = btn.dataset.filter;
      catVisible = 8;
      const grid = document.getElementById('cat-grid');
      const old = Array.from(grid.querySelectorAll('.pc'));
      if (old.length) {
        gsap.to(old, {
          opacity: 0, y: -12, duration: 0.22, stagger: 0.02, ease: 'power2.in',
          onComplete() { renderCatalog(false); }
        });
      } else {
        renderCatalog(false);
      }
    });
  });

  const catMoreBtn = document.getElementById('cat-more');
  if (catMoreBtn) {
    catMoreBtn.addEventListener('click', () => {
      catVisible += CAT_STEP;
      renderCatalog(true); // append-only — existing cards stay, only new ones animate in
    });
  }

  renderCatalog(false);

  /* ──────────────────────────────────────
     PRODUCT MODAL
  ────────────────────────────────────── */
  const modal      = document.getElementById('prod-modal');
  const modalCard  = modal ? modal.querySelector('.prod-modal-card') : null;
  const modalClose = document.getElementById('prod-modal-close');

  function openModal(product) {
    if (!modal) return;

    const imgWrap = document.getElementById('prod-modal-img-wrap');
    const img     = document.getElementById('prod-modal-img');
    const hasImg  = !!product.img;

    const pName  = pick(product.name);
    const pShort = pick(product.shortDesc);
    const pFull  = pick(product.fullDesc);

    if (hasImg) {
      img.src = product.img;
      img.alt = pName;
      imgWrap.style.display = '';
      modalCard.classList.remove('no-img');
    } else {
      img.src = '';
      imgWrap.style.display = 'none';
      modalCard.classList.add('no-img');
    }

    const t = I18N[currentLang];
    document.getElementById('prod-modal-name').textContent  = pName;
    document.getElementById('prod-modal-cat').textContent   = product.cat === 'pasta' ? (t['modal-pasta'] || 'Медовая паста') : (t['modal-syrup'] || 'Натуральный сироп');
    document.getElementById('prod-modal-short').textContent = pShort;
    document.getElementById('prod-modal-full').innerHTML    = pFull;

    // Always use Russian name in WhatsApp message for unambiguous product identification
    const ruName = (product.name && product.name.ru) || pName;
    const waMsg = encodeURIComponent('Здравствуйте! Хочу узнать подробнее о товаре Tamima "' + ruName + '"');
    document.getElementById('prod-modal-cta').href = 'https://wa.me/77076679110?text=' + waMsg;

    // Remember which product is open so applyLang() can refresh modal content on language switch
    modal.dataset.openIdx = String(PRODUCTS.indexOf(product));

    modal.removeAttribute('aria-hidden');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    gsap.fromTo(modalCard,
      { opacity: 0, y: 28, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: 'power3.out' }
    );
  }

  function closeModal() {
    if (!modal) return;
    gsap.to(modalCard, {
      opacity: 0, y: 20, scale: 0.96, duration: 0.26, ease: 'power2.in',
      onComplete() {
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
  }

  /* ──────────────────────────────────────
     HAMBURGER MENU
  ────────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobMenu    = document.getElementById('mob-menu');
  const mobOverlay = document.getElementById('mob-overlay');

  function toggleMenu(open) {
    hamburger.classList.toggle('open', open);
    mobMenu.classList.toggle('open', open);
    mobOverlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (hamburger)   hamburger.addEventListener('click', () => toggleMenu(!hamburger.classList.contains('open')));
  if (mobOverlay)  mobOverlay.addEventListener('click', () => toggleMenu(false));
  document.querySelectorAll('.mob-link').forEach(a => a.addEventListener('click', () => toggleMenu(false)));


  /* ──────────────────────────────────────
     CAROUSEL ENGINE
  ────────────────────────────────────── */
  function initCarousel(trackSel, prevSel, nextSel, dotsSel) {
    const track = document.querySelector(trackSel);
    if (!track) return;
    const prev = document.querySelector(prevSel);
    const next = document.querySelector(nextSel);
    const cards = track.children;
    if (!cards.length) return;

    function getScrollAmount() {
      return cards[0].offsetWidth + parseInt(getComputedStyle(track).gap || '20');
    }

    if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' }));
    if (next) next.addEventListener('click', () => track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' }));

    if (dotsSel) {
      const dotsContainer = document.querySelector(dotsSel);
      if (dotsContainer) {
        const count = cards.length;
        for (let i = 0; i < count; i++) {
          const dot = document.createElement('div');
          dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
          dotsContainer.appendChild(dot);
        }
        track.addEventListener('scroll', () => {
          const idx = Math.round(track.scrollLeft / getScrollAmount());
          dotsContainer.querySelectorAll('.carousel-dot').forEach((d, j) => d.classList.toggle('active', j === idx));
        }, { passive: true });
      }
    }
  }

  initCarousel('#partner-track', '[data-carousel="partner"].carousel-prev', '[data-carousel="partner"].carousel-next', '#partner-dots');

  /* ── Review swipe hint — hide after first scroll ── */
  const revTrack = document.getElementById('review-track');
  const swipeHint = document.getElementById('review-swipe-hint');
  if (revTrack && swipeHint) {
    revTrack.addEventListener('scroll', function() {
      swipeHint.style.opacity = '0';
      swipeHint.style.transition = 'opacity .4s';
      setTimeout(function() { swipeHint.style.display = 'none'; }, 400);
    }, { once: true });
  }

  /* ── Sticky filter bar ── */
  const filterWrap = document.querySelector('.cat-filter-wrap');
  const filterScroll = document.querySelector('.cat-filter');
  const catalogSection = document.getElementById('catalog');

  if (filterWrap && catalogSection) {
    ScrollTrigger.create({
      trigger: filterWrap,
      start: 'top 72px',
      endTrigger: '#catalog',
      end: 'bottom 200px',
      pin: false,
      onUpdate(self) {
        const catalogRect = catalogSection.getBoundingClientRect();
        const inRange = catalogRect.top < 72 && catalogRect.bottom > 300;
        filterWrap.classList.toggle('stuck', inRange);
      }
    });
  }

  /* ── Mobile filter scroll fades ── */
  if (filterWrap && filterScroll) {
    function updateFilterFades() {
      const sl = filterScroll.scrollLeft;
      const maxSl = filterScroll.scrollWidth - filterScroll.clientWidth;
      filterWrap.classList.toggle('fade-left', sl > 4);
      filterWrap.classList.toggle('fade-right', sl < maxSl - 4);
    }
    filterScroll.addEventListener('scroll', updateFilterFades, { passive: true });
    window.addEventListener('resize', updateFilterFades);
    updateFilterFades();
  }


})();
