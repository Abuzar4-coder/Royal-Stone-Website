/* ============================================================
   THE ROYAL STONE & WALL FACING — script.js
============================================================ */
gsap.registerPlugin(ScrollTrigger);

/* ---------- hero entrance ---------- */
window.addEventListener('DOMContentLoaded', () => {
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
  tl.to('#h-eyebrow', { opacity: 1, duration: .8 }, 0.1)
    .fromTo('#h-title', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .9 }, 0.25)
    .to('#h-sub', { opacity: 1, duration: .8 }, 0.5)
    .to('#h-btns', { opacity: 1, duration: .8 }, 0.68)
    .to('#h-scroll', { opacity: 1, duration: .8 }, 0.9);

  const heroImg = document.querySelector('.hero-bg img');
  if (heroImg) requestAnimationFrame(() => heroImg.style.transform = 'scale(1)');
});

/* ---------- header state on scroll ---------- */
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---------- mobile nav ---------- */
const burger = document.getElementById('burger');
const mnav = document.getElementById('mobile-nav');
burger.addEventListener('click', () => mnav.classList.toggle('open'));
mnav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mnav.classList.remove('open')));

/* ---------- reveal on scroll ---------- */
function initReveal(el) {
  ScrollTrigger.create({ trigger: el, start: 'top 90%', onEnter: () => el.classList.add('in') });
}
document.querySelectorAll('.reveal').forEach(initReveal);

/* ---------- animated counters ---------- */
document.querySelectorAll('.cnum').forEach(el => {
  ScrollTrigger.create({
    trigger: el, start: 'top 90%', once: true,
    onEnter: () => {
      const target = +el.dataset.target;
      gsap.fromTo(el, { innerText: 0 }, {
        innerText: target, duration: 1.8, ease: 'power1.out', snap: { innerText: 1 },
        onUpdate() { el.innerText = Math.floor(el.innerText); }
      });
    }
  });
});

/* ---------- universal broken-image fallback ---------- */
const FALLBACK_IMG = 'https://images.pexels.com/photos/2341290/pexels-photo-2341290.jpeg?auto=compress&cs=tinysrgb&w=800';
function attachImgFallback(root) {
  (root || document).querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function () {
      if (this.dataset.fallbackApplied) return;
      this.dataset.fallbackApplied = '1';
      this.src = FALLBACK_IMG;
    });
  });
}
attachImgFallback();

/* ---------- content loaded from /content/*.json (editable via the /admin panel) ---------- */
let products = {}; // grouped by category once loaded: { Flooring: [{name,description,image}, ...], ... }

const productGrid = document.getElementById('productGrid');
function renderProducts(cat) {
  productGrid.innerHTML = '';
  (products[cat] || []).forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'pcard reveal';
    card.innerHTML = `
      <div class="pcard-img"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
      <div class="pcard-body">
        <div><h4>${p.name}</h4><p>${p.description}</p></div>
        <div class="pcard-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" stroke-width="2"><path d="M5 19L19 5M19 5H8M19 5v11"/></svg></div>
      </div>`;
    productGrid.appendChild(card);
    attachImgFallback(card);
    initReveal(card);
    ScrollTrigger.create({ trigger: card, start: 'top 92%', onEnter: () => gsap.to(card, { opacity: 1, y: 0, duration: .6, delay: i * 0.06, ease: 'power2.out' }) });
  });
}
document.querySelectorAll('#tabs .tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#tabs .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.cat);
  });
});

/* ---------- swatch rail (reuses the same product photos) ---------- */
const swatchRail = document.getElementById('swatchRail');
function renderSwatches() {
  swatchRail.innerHTML = '';
  const all = Object.values(products).flat();
  all.forEach((p, i) => {
    const s = document.createElement('div');
    s.className = 'swatch' + (i === 0 ? ' active' : '');
    s.innerHTML = `<img src="${p.image}" alt="${p.name}" loading="lazy"><div class="swatch-label">${p.name}</div>`;
    swatchRail.appendChild(s);
    s.addEventListener('mouseenter', () => {
      document.querySelectorAll('.swatch').forEach(x => x.classList.remove('active'));
      s.classList.add('active');
    });
  });
  attachImgFallback(swatchRail);
}

/* ---------- gallery ---------- */
let galleryData = []; // [{category, image}, ...] loaded from content/gallery.json
const masonry = document.getElementById('masonry');
function renderGallery(f) {
  masonry.innerHTML = '';
  galleryData.filter(g => f === 'all' || g.category === f).forEach(g => {
    const d = document.createElement('div');
    d.className = 'gitem';
    d.innerHTML = `<img src="${g.image}" alt="" loading="lazy">`;
    d.addEventListener('click', () => {
      document.getElementById('lb-img').src = g.image;
      document.getElementById('lightbox').classList.add('open');
    });
    masonry.appendChild(d);
  });
  attachImgFallback(masonry);
}
document.querySelectorAll('#gfilters .tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#gfilters .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGallery(btn.dataset.g);
  });
});
document.querySelector('.lb-close').addEventListener('click', () => document.getElementById('lightbox').classList.remove('open'));
document.getElementById('lightbox').addEventListener('click', (e) => { if (e.target.id === 'lightbox') e.currentTarget.classList.remove('open'); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') document.getElementById('lightbox').classList.remove('open'); });

/* ---------- FAQ ---------- */
const faqWrap = document.getElementById('faqWrap');
function renderFaqs(faqs) {
  faqWrap.innerHTML = '';
  faqs.forEach((f, i) => {
    const item = document.createElement('div');
    item.className = 'faq-item' + (i === 0 ? ' open' : '');
    item.innerHTML = `<div class="faq-q"><h4>${f.question}</h4><div class="faq-icon"></div></div><div class="faq-a"><p>${f.answer}</p></div>`;
    faqWrap.appendChild(item);
    const q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a');
    if (i === 0) a.style.maxHeight = a.scrollHeight + 'px';
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(fi => { fi.classList.remove('open'); fi.querySelector('.faq-a').style.maxHeight = null; });
      if (!isOpen) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });
}

/* ---------- fetch all CMS-editable content, then build the page ---------- */
Promise.all([
  fetch('content/products.json').then(r => r.json()).catch(() => ({ items: [] })),
  fetch('content/gallery.json').then(r => r.json()).catch(() => ({ items: [] })),
  fetch('content/faq.json').then(r => r.json()).catch(() => ({ items: [] })),
]).then(([productsData, galleryDataRes, faqData]) => {
  products = {};
  (productsData.items || []).forEach(p => {
    if (!products[p.category]) products[p.category] = [];
    products[p.category].push(p);
  });
  const firstCat = document.querySelector('#tabs .tab-btn.active')?.dataset.cat || 'Flooring';
  renderProducts(firstCat);
  renderSwatches();

  galleryData = galleryDataRes.items || [];
  renderGallery('all');

  renderFaqs(faqData.items || []);
});

/* ---------- contact form → redirects to WhatsApp with the message pre-filled ---------- */
const WHATSAPP_NUMBER = '923414781263'; // 0341-4781263 in international format, no leading 0 or +

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('input[type="text"]').value.trim();
  const phone = form.querySelector('input[type="tel"]').value.trim();
  const email = form.querySelector('input[type="email"]').value.trim();
  const message = form.querySelector('textarea').value.trim();

  let text = `New Inquiry from Website\n\nName: ${name}\nPhone: ${phone}`;
  if (email) text += `\nEmail: ${email}`;
  text += `\nMessage: ${message}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  const btn = form.querySelector('button');
  const original = btn.textContent;
  btn.textContent = 'Opening WhatsApp...';
  btn.style.background = '#D6BC83';

  window.open(url, '_blank');

  setTimeout(() => { btn.textContent = original; btn.style.background = ''; form.reset(); }, 1800);
  return false;
}

/* ---------- active nav link on scroll ---------- */
const navSections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav.links a');
window.addEventListener('scroll', () => {
  let current = 'home';
  navSections.forEach(s => { if (window.scrollY >= s.offsetTop - 160) current = s.id; });
  if (current === 'about') current = 'home';
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
});
