/* ── PARTICLES ─────────────────────────────────────────── */
(function () {
    const cvs = document.getElementById('particles-canvas');
    const ctx = cvs.getContext('2d');
    let W, H, pts = [];

    function resize() { W = cvs.width = innerWidth; H = cvs.height = innerHeight; }
    resize();
    addEventListener('resize', resize);

  function rnd(a, b) { return a + Math.random() * (b - a); }

    function mkPt() {
    return {
        x: rnd(0, W), y: rnd(0, H),
        r: rnd(.5, 7.8),
        vx: rnd(-.18, .18), vy: rnd(-.45, -.08),
        a: rnd(.06, .45), da: rnd(.001, .004), aDir: 1
    };
    }

    for (let i = 0; i < 90; i++) pts.push(mkPt());

    function tick() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#00e676';
    pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
      p.a += p.da * p.aDir;
      if (p.a > .45 || p.a < .04) p.aDir *= -1;
        if (p.y < -4) { p.y = H + 4; p.x = rnd(0, W); }
        ctx.globalAlpha = p.a;
        ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
    }
    tick();
})();

/* ── HEADER SCROLL ─────────────────────────────────────── */
const hdr  = document.getElementById('hdr');
const bTop = document.getElementById('backTop');
addEventListener('scroll', () => {
    hdr.classList.toggle('scrolled', scrollY > 60);
    bTop.classList.toggle('show', scrollY > 450);
});

/* ── FILTER + SEARCH ───────────────────────────────────── */
const tabs        = document.querySelectorAll('.tab-btn');
const cards       = document.querySelectorAll('.product-card');
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const noResults   = document.getElementById('noResults');
let   activeFilter = 'all';

function applyAll() {
    const q = searchInput.value.trim().toLowerCase();
    searchClear.style.opacity       = q ? '1' : '0';
    searchClear.style.pointerEvents = q ? 'auto' : 'none';

    let visible = 0;
    cards.forEach(c => {
    const name   = c.querySelector('.card-name').textContent.toLowerCase();
    const brand  = c.dataset.brand;
    const matchB = activeFilter === 'all' || brand === activeFilter;
    const matchQ = !q || name.includes(q);
    if (matchB && matchQ) {
        c.classList.remove('hidden');
        visible++;
    } else {
        c.classList.add('hidden');
    }
    });

    noResults.style.display = visible === 0 ? 'block' : 'none';
    currentPage = 1;
    renderPage();
}

tabs.forEach(t => {
    t.addEventListener('click', () => {
    tabs.forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    activeFilter = t.dataset.filter;
    applyAll();
    });
});

searchInput.addEventListener('input', applyAll);

searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
    applyAll();
});

/* ── SCROLL REVEAL ─────────────────────────────────────── */
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
    if (e.isIntersecting) {
        const col = [...e.target.parentElement.children]
        .filter(c => !c.classList.contains('hidden'))
        .indexOf(e.target);
      setTimeout(() => e.target.classList.add('visible'), (col % 4) * 75);
        io.unobserve(e.target);
    }
    });
}, { threshold: 0.08 });

/* ── PAGINATION ────────────────────────────────────────── */
const ITEMS_PER_PAGE = 10;
let currentPage = 1;

function getFiltered() {
    return [...cards].filter(c => !c.classList.contains('hidden'));
}

function renderPage() {
    const filtered = getFiltered();
    const totalPgs = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start    = (currentPage - 1) * ITEMS_PER_PAGE;
    const end      = start + ITEMS_PER_PAGE;

    io.disconnect();
    filtered.forEach((c, i) => {
    if (i >= start && i < end) {
        c.classList.remove('paged-out');
        if (!c.classList.contains('visible')) io.observe(c);
    } else {
        c.classList.add('paged-out');
    }
    });

    buildPagination(totalPgs);
}

function buildPagination(total) {
    const pag = document.getElementById('pagination');
    if (total <= 1) { pag.innerHTML = ''; return; }

    const nums = pageNumbers(currentPage, total);
    let html = `<button class="pag-btn pag-arrow" onclick="goPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>&#8249;</button>`;
    nums.forEach(n => {
    if (n === '…') {
        html += `<span class="pag-ellipsis">…</span>`;
    } else {
        html += `<button class="pag-btn${n === currentPage ? ' active' : ''}" onclick="goPage(${n})">${n}</button>`;
    }
    });
    html += `<button class="pag-btn pag-arrow" onclick="goPage(${currentPage + 1})" ${currentPage === total ? 'disabled' : ''}>&#8250;</button>`;
  pag.innerHTML = html;
}

function pageNumbers(cur, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const p = [1];
    if (cur > 3) p.push('…');
    for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) p.push(i);
    if (cur < total - 2) p.push('…');
    p.push(total);
    return p;
}

function goPage(page) {
    const total = Math.ceil(getFiltered().length / ITEMS_PER_PAGE);
    if (page < 1 || page > total) return;
    currentPage = page;
    renderPage();
    document.getElementById('coleccion').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

renderPage();

/* ── WHATSAPP CARD BUTTONS ─────────────────────────────── */
const WA_NUM = '50687086834';
const WA_SVG = `<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.486 2 2 6.486 2 12c0 1.89.528 3.653 1.438 5.162L2.046 22l4.95-1.374A9.935 9.935 0 0012 22c5.514 0 10-4.486 10-10S17.514 2 12 2zm0 18a7.952 7.952 0 01-4.054-1.112l-.291-.173-3.018.839.843-3.019-.19-.308A7.954 7.954 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/></svg>`;

document.querySelectorAll('.product-card').forEach(card => {
    const name  = card.querySelector('.card-name').textContent.trim();
    const brand = card.querySelector('.card-brand').textContent.trim();
    const msg   = encodeURIComponent(`Hola! Me interesa el perfume *${name}* de *${brand}*. ¿Me podés dar más información?`);
    const btn   = document.createElement('a');
    btn.className = 'card-wa';
    btn.href      = `https://wa.me/${WA_NUM}?text=${msg}`;
    btn.target    = '_blank';
    btn.rel       = 'noopener noreferrer';
    btn.innerHTML = WA_SVG + 'Pedir por WhatsApp';
    card.querySelector('.card-info').appendChild(btn);
    const arrow = card.querySelector('.card-arrow');
    if (arrow) arrow.remove();
});

/* ── FRAGRANCE MODAL ───────────────────────────────────── */
const WHEN_META = [
    { key: 'invierno', label: 'Invierno', icon: '❄️', color: '#6ab0f5', type: 'seasons' },
    { key: 'primavera', label: 'Primavera', icon: '🌸', color: '#69f0ae', type: 'seasons' },
    { key: 'verano',   label: 'Verano',   icon: '☀️', color: '#ff6e40', type: 'seasons' },
    { key: 'otono',    label: 'Otoño',    icon: '🍂', color: '#ffab40', type: 'seasons' },
    { key: 'dia',      label: 'Día',      icon: '🔆', color: '#ffd740', type: 'times'   },
    { key: 'noche',    label: 'Noche',    icon: '🌙', color: '#7986cb', type: 'times'   },
];

const fragOverlay    = document.getElementById('fragOverlay');
const fragModal      = document.getElementById('fragModal');
const fragModalImg   = document.getElementById('fragModalImg');
const fragModalBrand = document.getElementById('fragModalBrand');
const fragModalName  = document.getElementById('fragModalName');
const fragTopEl      = document.getElementById('fragTop');
const fragHeartEl    = document.getElementById('fragHeart');
const fragBaseEl     = document.getElementById('fragBase');
const fragWhenGrid   = document.getElementById('fragWhenGrid');

let PERFUME_DATA = {};

fetch('data/perfumes.json')
    .then(r => r.json())
    .then(data => { PERFUME_DATA = data; });

function openFragModal(card) {
    const name   = card.querySelector('.card-name').textContent.trim();
    const brand  = card.querySelector('.card-brand').textContent.trim();
    const imgSrc = card.querySelector('.card-img-wrap img').src;
    const data   = PERFUME_DATA[name];

    fragModalImg.src           = imgSrc;
    fragModalImg.alt           = name;
    fragModalBrand.textContent = brand;
    fragModalName.textContent  = name;

    if (data) {
    fragTopEl.textContent   = data.notes.top;
    fragHeartEl.textContent = data.notes.heart;
    fragBaseEl.textContent  = data.notes.base;
    fragWhenGrid.innerHTML  = WHEN_META.map(m => {
        const val = data[m.type][m.key];
        return `<div class="when-item">
        <span class="when-icon">${m.icon}</span>
        <span class="when-label">${m.label}</span>
        <div class="when-bar-wrap"><div class="when-bar" data-w="${val}" style="background:${m.color}"></div></div>
        <span class="when-val">${val}</span>
        </div>`;
    }).join('');
    } else {
    fragTopEl.textContent = fragHeartEl.textContent = fragBaseEl.textContent = 'Información no disponible';
    fragWhenGrid.innerHTML = '';
    }

    fragOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    fragModal.scrollTop = 0;
    requestAnimationFrame(() => requestAnimationFrame(() => {
    fragWhenGrid.querySelectorAll('.when-bar').forEach(b => { b.style.width = b.dataset.w + '%'; });
    }));
}

function closeFragModal() {
    fragOverlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
    fragWhenGrid.querySelectorAll('.when-bar').forEach(b => { b.style.width = '0'; });
    }, 360);
}

document.getElementById('fragClose').addEventListener('click', closeFragModal);
fragOverlay.addEventListener('click', e => { if (e.target === fragOverlay) closeFragModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && fragOverlay.classList.contains('open')) closeFragModal(); });

document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', e => { if (!e.target.closest('.card-wa')) openFragModal(card); });
});
