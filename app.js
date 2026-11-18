/* Honey Honey — catalogue labels, weekly order slip, motion. Data from their Catálogo 2026. */
(() => {
  'use strict';
  const doc = document.documentElement;
  doc.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const WA = '573156487690';
  const peso = (n) => '$' + n.toLocaleString('es-CO').replace(/,/g, '.');
  const dec = (n) => String(n).replace('.', ',');

  /* ---------- product data (Catálogo Honey Honey 2026) ---------- */
  // rows: [name, value, unit, % valor diario]; thick = rule after fibre
  const P = {
    artesano: { name: 'Pan Artesano', short: 'Artesano', price: 25000, img: 'p-artesano', alt: 'Pan Artesano en tajadas sobre fondo verde', field: '#85c44b', label: '#f6cde0',
      pack: '15–17 porciones por empaque', por: '1 tajada (30 g)', kcal: 51,
      n: [['Proteínas', 1.1, 'g', '2%'], ['Grasa', 0.7, 'g', '1%'], ['Carbohidratos', 10.4, 'g', '4%'], ['Fibra', 1.2, 'g', '5%'], ['Calcio', 2.7, 'mg', '–'], ['Hierro', 0.4, 'mg', '2%'], ['Fósforo', 18.5, 'mg', '2%'], ['Potasio', 32.3, 'mg', '1%']],
      ing: 'agua, harina de arroz integral, masa madre de arroz integral, almidón de yuca, psyllium husk (fibra natural), aceite de coco, sirope de yacón, sal' },
    amaranto: { name: 'Pan Amaranto', short: 'Amaranto', price: 25000, img: 'p-amaranto', alt: 'Pan Amaranto en tajadas sobre fondo cian', field: '#3cc6ee', label: '#f4ab44',
      pack: '15–17 porciones por empaque', por: '1 tajada (30 g)', kcal: 75,
      n: [['Proteínas', 1.7, 'g', '3%'], ['Grasa', 1.1, 'g', '2%'], ['Carbohidratos', 15, 'g', '5%'], ['Fibra', 1.5, 'g', '6%'], ['Calcio', 17.6, 'mg', '2%'], ['Hierro', 0.8, 'mg', '4%'], ['Potasio', 28.1, 'mg', '1%']],
      ing: 'agua, harina de amaranto, harina de arroz integral, masa madre de arroz integral, almidón de yuca, psyllium husk (fibra natural), aceite de coco, sirope de yacón, sal' },
    chocoamor: { name: 'Pan Chocoamor', short: 'Chocoamor', price: 27000, img: 'p-chocoamor', alt: 'Pan Chocoamor en tajadas sobre fondo lila', field: '#dbbedc', label: '#c8a27a',
      pack: '15–17 porciones por empaque', por: '1 tajada (30 g)', kcal: 58,
      n: [['Proteínas', 1.3, 'g', '2%'], ['Grasa', 1.3, 'g', '2%'], ['Carbohidratos', 11, 'g', '4%'], ['Fibra', 1.2, 'g', '5%'], ['Calcio', 4.6, 'mg', '1%'], ['Hierro', 0.6, 'mg', '3%'], ['Fósforo', 25.4, 'mg', '3%'], ['Potasio', 45.3, 'mg', '1%']],
      ing: 'agua, harina de arroz integral, masa madre de arroz integral, almidón de yuca, cacao en polvo (100 %), chocolate al 85 %, psyllium husk (fibra natural), aceite de coco, sirope de yacón, sal' },
    integral: { name: 'Pan Artesano Integral', short: 'Artesano Integral', price: 29000, img: 'p-integral', alt: 'Pan Artesano Integral en tajadas sobre fondo naranja', field: '#f7931d', label: '#a497d4',
      pack: '15–17 porciones por empaque', por: '1 tajada (30 g)', kcal: 64,
      n: [['Proteínas', 1, 'g', '2%'], ['Grasa', 1, 'g', '1%'], ['Carbohidratos', 13, 'g', '4%'], ['Fibra', 1.5, 'g', '6%'], ['Calcio', 4, 'mg', '0,4%'], ['Hierro', 0.5, 'mg', '3%'], ['Fósforo', 16, 'mg', '2%'], ['Potasio', 28, 'mg', '1%']],
      ing: 'agua, harina de trigo sarraceno, harina de arroz integral, masa madre de arroz integral, almidón de yuca, psyllium husk (fibra natural), aceite de coco, sirope de yacón, sal' },
    semillas: { name: 'Pan Semillas', short: 'Semillas', price: 32000, img: 'p-semillas', alt: 'Pan Semillas en tajadas sobre fondo crema', field: '#e6d6a6', label: '#c5bc97',
      pack: '15–17 porciones por empaque', por: '1 tajada (30 g)', kcal: 66,
      n: [['Proteínas', 1.8, 'g', '4%'], ['Grasa', 2.2, 'g', '3%'], ['Carbohidratos', 10, 'g', '3%'], ['Fibra', 1.5, 'g', '6%'], ['Calcio', 17, 'mg', '2%'], ['Hierro', 0.6, 'mg', '3%'], ['Fósforo', 30, 'mg', '3%'], ['Potasio', 38, 'mg', '1%'], ['Vitamina C', 8, 'mg', '13%']],
      ing: 'agua, masa madre de arroz integral, harina de arroz integral, harina de avena integral, harina de quinua, harina de amaranto, semillas de chía, linaza, aceite de ajonjolí, semillas de calabaza, semillas de girasol, ajonjolí, psyllium husk (fibra natural), sal, sirope de yacón, amaranto entero' },
    focaccia: { name: 'Focaccia', short: 'Focaccia', price: 20000, img: 'p-focaccia', alt: 'Focaccia con romero junto a baldosas verdes', field: '#2f8f57', label: '#31ab6f',
      pack: '7–8 porciones por empaque', por: '1 tajada (55 g)', kcal: 99,
      n: [['Proteínas', 1.6, 'g', '3%'], ['Grasa', 2.4, 'g', '4%'], ['Carbohidratos', 18, 'g', '6%'], ['Fibra', 1.5, 'g', '6%'], ['Calcio', 7, 'mg', '1%'], ['Hierro', 0.6, 'mg', '3%'], ['Fósforo', 21.3, 'mg', '2%'], ['Potasio', 42.4, 'mg', '1%']],
      ing: 'agua, masa madre de arroz integral, harina de arroz integral, almidón de yuca, harina de quinua, aceite de aguacate o ajonjolí, harina de coco, psyllium husk (fibra natural), linaza, sal, romero o ajo negro' },
    coketo: { name: 'Pan Co-Keto', short: 'Co-Keto', price: 36000, img: 'p-coketo', alt: 'Pan Co-Keto en tajadas sobre fondo verde salvia', field: '#bbc7af', label: '#b1ded9',
      pack: '15–17 porciones por empaque', por: '2 tajadas (50 g)', kcal: 155,
      n: [['Proteínas', 5, 'g', '10%'], ['Grasa', 10, 'g', '15%'], ['Carbohidratos', 13, 'g', '4%'], ['Fibra', 4, 'g', '16%'], ['Calcio', 34, 'mg', '3%'], ['Hierro', 1.1, 'mg', '6%'], ['Fósforo', 16, 'mg', '1%'], ['Potasio', 63, 'mg', '2%']],
      ing: 'agua, harina de almendras, masa madre de arroz integral, harina de marañón, harina de arroz integral, harina de coco, almendra, psyllium husk, semillas de girasol, semillas de calabaza, semillas de chía, macadamia, aceite de coco, sal' },
    cinnamon: { name: 'Cinnamon Roll', short: 'Cinnamon Roll', price: 12000, img: 'p-cinnamon', alt: 'Cinnamon rolls recién horneados', field: '#d9b48a', label: '#bd9975',
      pack: null, por: '1 unidad (150 g)', kcal: 440,
      n: [['Proteínas', 6, 'g', '12%'], ['Grasa', 18, 'g', '28%'], ['Carbohidratos', 67, 'g', '22%'], ['Fibra', 8, 'g', '32%'], ['Calcio', 46, 'mg', '5%'], ['Hierro', 2.8, 'mg', '16%'], ['Fósforo', 78, 'mg', '8%'], ['Potasio', 148, 'mg', '4%']],
      ing: 'agua, harina de arroz integral, harina de avena, masa madre de arroz integral, almidón de papa, panela orgánica, base de almendras, aceite de coco, psyllium husk (fibra vegetal), harina de coco, sal. <b>Relleno:</b> azúcar morena, aceite de coco, canela, aceite de oliva' },
    galleta: { name: 'Galleta Choco-Miso', short: 'Galleta Choco-Miso', price: 18000, img: 'p-galleta', alt: 'Galletas Choco-Miso sobre fondo celeste', field: '#bfe1f3', label: '#86c6e9',
      pack: null, por: '1 unidad (75 g)', kcal: 209,
      n: [['Proteínas', 3, 'g', '6%'], ['Grasa', 13, 'g', '20%'], ['Carbohidratos', 33, 'g', '11%'], ['Fibra', 2, 'g', '8%'], ['Calcio', 14, 'mg', '1%'], ['Hierro', 1.1, 'mg', '6%'], ['Fósforo', 11, 'mg', '1%'], ['Potasio', 77, 'mg', '2%']],
      ing: 'allumonk (alulosa + fruto del monje), masa madre de arroz integral, mantequilla vegana, chocolate al 85 %, harina de arroz integral, almidón de yuca, harina de almendras, aceite de coco, harina de marañón, harina de avena, miso shiro, azúcar de coco, sal' },
  };

  const labelHTML = (p, id) => `
    <div class="nlabel" data-ui style="--label:${p.label}" ${id ? `id="${id}"` : ''}>
      <div class="nlabel-in">
        <h4>Información Nutricional</h4>
        <table>
          <caption class="sr">Información nutricional de ${p.name}</caption>
          <tbody>
            ${p.pack ? `<tr><td colspan="2">${p.pack}</td></tr>` : ''}
            <tr class="thick"><td><b>Tamaño porción</b></td><td><b>${p.por}</b></td></tr>
            <tr class="kcal thick"><td>Calorías</td><td data-kcal>${p.kcal}</td></tr>
            ${p.n.map((r, i) => `<tr${i === 3 ? ' class="thick"' : ''}><td><b>${r[0]}</b> ${dec(r[1])} ${r[2]}</td><td>${r[3]}</td></tr>`).join('')}
          </tbody>
        </table>
        <p class="ing"><b>Ingredientes:</b> ${p.ing}</p>
      </div>
    </div>`;

  /* ---------- order state (per-viewer convenience) ---------- */
  let qty = {};
  try { qty = JSON.parse(localStorage.getItem('hh-pedido') || '{}') || {}; } catch (e) { qty = {}; }
  const save = () => { try { localStorage.setItem('hh-pedido', JSON.stringify(qty)); } catch (e) {} };

  /* ---------- catalogue ---------- */
  const rows = $$('.row');
  const photo = $('[data-cat-photo]');
  const labelWrap = $('[data-label-wrap]');
  let active = null;

  rows.forEach((row) => {
    const id = row.dataset.id, p = P[id];
    const body = $('.row-body', row);
    const fibra = p.n.find((r) => r[0] === 'Fibra');
    const meta = document.createElement('p');
    meta.className = 'row-meta';
    meta.textContent = `${p.por} · ${p.kcal} kcal · ${dec(fibra[1])} g de fibra`;
    body.appendChild(meta);
    const add = document.createElement('div');
    add.className = 'row-add';
    add.innerHTML = `<div class="step" role="group" aria-label="Cantidad de ${p.name}">
        <button type="button" data-minus aria-label="Quitar un ${p.short}">−</button>
        <output aria-live="polite">${qty[id] || 0}</output>
        <button type="button" data-plus aria-label="Agregar un ${p.short}">+</button>
      </div><span class="row-added" aria-hidden="true"></span>`;
    body.appendChild(add);
    const mini = document.createElement('div');
    mini.className = 'mini-label';
    mini.innerHTML = labelHTML(p);
    body.appendChild(mini);

    const head = $('.row-head', row);
    head.setAttribute('aria-controls', 'rb-' + id);
    body.id = 'rb-' + id;
    head.addEventListener('click', () => activate(id, true));
    head.addEventListener('mouseenter', () => { if (matchMedia('(hover:hover)').matches) activate(id); });
    head.addEventListener('focus', () => activate(id));
    $('[data-plus]', add).addEventListener('click', () => change(id, 1));
    $('[data-minus]', add).addEventListener('click', () => change(id, -1));
  });

  // preload product photos into the stage
  Object.entries(P).forEach(([id, p]) => {
    if (id === 'artesano') { photo.querySelector('img').dataset.pid = id; return; }
    const im = new Image();
    im.src = `assets/img/${p.img}.webp`; im.alt = p.alt; im.width = 760; im.height = 950;
    im.loading = 'lazy'; im.decoding = 'async'; im.dataset.pid = id;
    photo.appendChild(im);
  });
  photo.querySelector('img').dataset.pid = 'artesano';

  function activate(id, fromClick) {
    if (active === id) return;
    active = id;
    const p = P[id];
    rows.forEach((r) => {
      const on = r.dataset.id === id;
      r.classList.toggle('is-on', on);
      $('.row-head', r).setAttribute('aria-expanded', on);
    });
    $$('img', photo).forEach((im) => im.classList.toggle('on', im.dataset.pid === id));
    photo.style.setProperty('--field', p.field);
    const old = $('.nlabel', labelWrap);
    const prevK = old ? +$('[data-kcal]', old).textContent : p.kcal;
    labelWrap.innerHTML = labelHTML(p);
    if (!reduce && prevK !== p.kcal) tween($('[data-kcal]', labelWrap), prevK, p.kcal);
    if (!reduce) labelWrap.animate([{ transform: 'rotate(-2.5deg) translateY(10px) scale(.97)', opacity: .4 }, { transform: 'rotate(-2.5deg)', opacity: 1 }], { duration: 420, easing: 'cubic-bezier(.16,1,.3,1)' });
    if (fromClick && innerWidth <= 860) {
      const r = rows.find((x) => x.dataset.id === id);
      setTimeout(() => r.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }), 60);
    }
  }
  function tween(el, a, b) {
    const t0 = performance.now(), d = 520;
    const step = (t) => { const k = Math.min(1, (t - t0) / d); el.textContent = Math.round(a + (b - a) * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
  activate('artesano');

  // scrolling a row to the middle of the screen makes it active
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) activate(e.target.dataset.id); });
  }, { rootMargin: '-46% 0px -46% 0px' });
  rows.forEach((r) => io.observe(r));

  /* ---------- the order ---------- */
  const countEl = $('[data-count]');
  function change(id, d) {
    const n = Math.max(0, Math.min(20, (qty[id] || 0) + d));
    if (n === (qty[id] || 0)) return;
    if (n) qty[id] = n; else delete qty[id];
    save();
    const row = rows.find((r) => r.dataset.id === id);
    $('output', row).textContent = n;
    $('.row-added', row).textContent = n ? `${n} en tu pedido` : '';
    renderOrder(d > 0);
  }

  /* next order window: lunes → miércoles, jueves → sábado */
  const DAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const fmt = (d) => `${DAYS[d.getDay()]} ${d.getDate()} de ${MONTHS[d.getMonth()]}`;
  function windowFor(now) {
    const d = now.getDay();
    // days until the next Monday (1) or Thursday (4), today included
    const toMon = (1 - d + 7) % 7, toThu = (4 - d + 7) % 7;
    const add = Math.min(toMon, toThu);
    const order = new Date(now); order.setDate(now.getDate() + add);
    const arrive = new Date(order); arrive.setDate(order.getDate() + 2);
    return { order, arrive, turn: order.getDay() === 1 ? 'lunes' : 'jueves', today: add === 0 };
  }
  const now = new Date();
  const W = windowFor(now);

  $('[data-today]').textContent = 'Hoy es ' + fmt(now);
  const turnEl = $(`[data-turn="${W.turn}"]`);
  if (turnEl) {
    turnEl.classList.add('is-next');
    const tag = document.createElement('span');
    tag.className = 'tag'; tag.textContent = W.today ? 'hoy' : 'el próximo';
    $('h4', turnEl).appendChild(tag);
  }
  const nowEl = $('[data-now]');
  if (nowEl) {
    nowEl.innerHTML = W.today
      ? `Hoy es ${DAYS[now.getDay()]}: si escribes hoy, tu pan llega el <mark>${fmt(W.arrive)}</mark>.`
      : `Hoy es ${DAYS[now.getDay()]}. Si escribes el ${fmt(W.order)}, tu pan llega el <mark>${fmt(W.arrive)}</mark>.`;
  }

  const itemsEl = $('[data-items]');
  const totalEl = $('[data-total]');
  const sendEl = $('[data-send]');
  const clearEl = $('[data-clear]');
  const ctas = $$('[data-cta]');
  function renderOrder(bump) {
    const ids = Object.keys(qty).filter((k) => P[k] && qty[k] > 0);
    let total = 0, units = 0;
    const lines = ids.map((id) => {
      const p = P[id], n = qty[id];
      total += p.price * n; units += n;
      return { id, p, n };
    });
    if (lines.length) {
      itemsEl.innerHTML = lines.map(({ p, n }) => `<p class="leader item-row"><span>${n} × ${p.short}</span><i></i><span>${peso(p.price * n)}</span></p>`).join('');
    } else {
      itemsEl.innerHTML = '<p class="leader empty"><span>Aún no eliges panes</span><i></i><a href="#catalogo">ir al catálogo</a></p>';
    }
    totalEl.innerHTML = `<span>${units ? 'Total · llega el ' + DAYS[W.arrive.getDay()] + ' ' + W.arrive.getDate() : 'Total'}</span><span>${peso(total)}</span>`;
    countEl.textContent = units;
    if (bump && !reduce) { countEl.classList.remove('bump'); void countEl.offsetWidth; countEl.classList.add('bump'); }
    clearEl.hidden = !units;
    const msg = units
      ? `Hola, Honey Honey. Quiero hacer este pedido para el turno del ${W.turn} (${W.today ? 'hoy' : fmt(W.order)}), para recibir el ${fmt(W.arrive)}:\n` +
        lines.map(({ p, n }) => `- ${n} × ${p.name} (${peso(p.price * n)})`).join('\n') +
        `\nTotal: ${peso(total)} + domicilio\nNombre:\nDirección:`
      : 'Hola, Honey Honey. Quiero hacer un pedido.';
    sendEl.href = `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
    sendEl.textContent = units ? `Enviar pedido de ${peso(total)} por WhatsApp` : 'Escribir por WhatsApp';
  }
  clearEl.addEventListener('click', () => {
    qty = {}; save();
    rows.forEach((r) => { $('output', r).textContent = 0; $('.row-added', r).textContent = ''; });
    renderOrder();
  });
  rows.forEach((r) => { const n = qty[r.dataset.id]; if (n) $('.row-added', r).textContent = `${n} en tu pedido`; });
  renderOrder();

  /* ---------- hero: slow crossfade of the fixed photograph ---------- */
  const fade = $('[data-fade]');
  if (fade && !reduce) {
    const imgs = $$('img', fade);
    let i = 0, timer = null;
    const next = () => {
      imgs[i].classList.remove('on');
      i = (i + 1) % imgs.length;
      const im = imgs[i];
      if (im.loading === 'lazy') im.loading = 'eager';
      im.classList.add('on');
    };
    const start = () => { if (!timer) timer = setInterval(next, 5600); };
    const stop = () => { clearInterval(timer); timer = null; };
    // warm the next pictures after load
    addEventListener('load', () => imgs.forEach((im) => { im.loading = 'eager'; }));
    start();
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  }

  /* ---------- headline words ---------- */
  const h1 = $('[data-words]');
  if (h1 && !reduce) {
    const words = h1.textContent.trim().split(/\s+/);
    h1.setAttribute('aria-label', h1.textContent.trim());
    h1.innerHTML = words.map((w, k) => `<span class="w" aria-hidden="true" style="--i:${k}">${w}</span>`).join(' ');
  }

  /* ---------- entrances ---------- */
  const groups = new Map();
  $$('[data-rise]').forEach((el) => {
    const sec = el.closest('section') || document.body;
    const k = groups.get(sec) || 0;
    el.style.setProperty('--d', Math.min(k, 6) * 80 + 'ms');
    groups.set(sec, k + 1);
  });
  const rio = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  $$('[data-rise]').forEach((el) => rio.observe(el));

  /* ---------- top bar + section marker ---------- */
  const bar = $('#bar');
  const heroCard = $('.hero-card');
  const links = $$('.bar-links a');
  const secs = links.map((a) => $(a.getAttribute('href')));
  let ticking = false;
  const logo = $('[data-spin]');
  function onScroll() {
    ticking = false;
    const y = scrollY;
    bar.classList.toggle('show', y > heroCard.offsetHeight * 0.75);
    const mid = innerHeight * 0.4;
    let cur = -1;
    secs.forEach((s, k) => { if (s && s.getBoundingClientRect().top < mid) cur = k; });
    links.forEach((a, k) => a.setAttribute('aria-current', k === cur ? 'true' : 'false'));
    if (logo && !reduce && y < innerHeight * 1.2) logo.style.rotate = (y * 0.12).toFixed(1) + 'deg';
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------- the name at the close rises letter-row with the scroll ---------- */
  const name = $('[data-name]');
  if (name && !reduce) {
    name.style.transformOrigin = '50% 100%';
    const nio = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) name.animate([{ transform: 'translateY(40%) scaleY(.6)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 1100, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' });
      });
    }, { threshold: 0.3 });
    nio.observe(name);
  }

  /* ---------- gallery: drag to scroll, play the clip when seen ---------- */
  const row = $('[data-drag]');
  if (row) {
    let down = false, sx = 0, sl = 0, moved = 0;
    row.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = 0; sx = e.clientX; sl = row.scrollLeft;
      row.classList.add('dragging');
    });
    addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - sx; moved = Math.abs(dx);
      row.scrollLeft = sl - dx;
    });
    addEventListener('pointerup', () => { if (down) { down = false; row.classList.remove('dragging'); } });
    row.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { row.scrollBy({ left: row.clientWidth * 0.6, behavior: reduce ? 'auto' : 'smooth' }); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { row.scrollBy({ left: -row.clientWidth * 0.6, behavior: reduce ? 'auto' : 'smooth' }); e.preventDefault(); }
    });
  }
  const vid = $('[data-video]');
  if (vid) {
    if (reduce) { vid.removeAttribute('loop'); }
    const vio = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting && !reduce) { vid.preload = 'auto'; vid.play().catch(() => {}); }
        else vid.pause();
      });
    }, { threshold: 0.25 });
    vio.observe(vid);
  }
})();
