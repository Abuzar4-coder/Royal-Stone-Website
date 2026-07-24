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

/* ---------- verified product images (Pexels, free-license) ---------- */
function px(id, w) { return 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&w=' + (w || 700); }

const products = {
  Flooring: [
    ["Sunny White Marble", "Bright, uniform white marble — Pakistan's most requested flooring stone.", px(2341290)],
    ["Tavera Marble", "Warm, softly veined marble for an inviting floor.", px(1323712)],
  ],
  Kitchen: [
    ["Black Galaxy Granite", "Dense black granite with fine gold flecking, built to last.", px(5506219)],
    ["White Quartz Countertops", "Engineered quartz — consistent, non-porous, easy to maintain.", px(5623225)],
  ],
  Wall: [
    ["Natural Stone Wall Cladding", "Textured natural stone for feature and exterior walls.", px(32129603)],
    ["Stacked Stone Wall Panels", "Layered stacked-stone texture for a rustic, refined accent wall.", px(3575827)],
  ],
  Mosaic: [
    ["Marble Mosaic Tiles", "Fine marble chips set in classic mosaic patterns.", px(7245527)],
    ["Glass Mosaic Tiles", "Reflective glass mosaic for kitchens and bathrooms.", px(30742339)],
  ],
  Stairs: [
    ["Straight Marble Staircase", "Grand straight-run marble stairs as a centrepiece.", px(16709869)],
    ["Granite Staircase", "Hard-wearing granite treads for high-traffic stairways.", px(6039191)],
  ],
  Grass: [
    ["Landscape Artificial Grass", "Lush, even, low-maintenance turf for gardens and lawns.", px(13083599)],
    ["Sports Artificial Grass", "Durable synthetic turf built for active, all-weather use.", px(399187)],
  ],
};

const productGrid = document.getElementById('productGrid');
function renderProducts(cat) {
  productGrid.innerHTML = '';
  products[cat].forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'pcard reveal';
    card.innerHTML = `
      <div class="pcard-img"><img src="${p[2]}" alt="${p[0]}" loading="lazy"></div>
      <div class="pcard-body">
        <div><h4>${p[0]}</h4><p>${p[1]}</p></div>
        <div class="pcard-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" stroke-width="2"><path d="M5 19L19 5M19 5H8M19 5v11"/></svg></div>
      </div>`;
    productGrid.appendChild(card);
    attachImgFallback(card);
    initReveal(card);
    ScrollTrigger.create({ trigger: card, start: 'top 92%', onEnter: () => gsap.to(card, { opacity: 1, y: 0, duration: .6, delay: i * 0.06, ease: 'power2.out' }) });
  });
}
renderProducts('Flooring');
document.querySelectorAll('#tabs .tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#tabs .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.cat);
  });
});

/* ---------- swatch rail (reuses verified product images) ---------- */
const swatchRail = document.getElementById('swatchRail');
const swatchData = Object.values(products).flat();
swatchData.forEach((p, i) => {
  const s = document.createElement('div');
  s.className = 'swatch' + (i === 0 ? ' active' : '');
  s.innerHTML = `<img src="${p[2]}" alt="${p[0]}" loading="lazy"><div class="swatch-label">${p[0]}</div>`;
  swatchRail.appendChild(s);
  s.addEventListener('mouseenter', () => {
    document.querySelectorAll('.swatch').forEach(x => x.classList.remove('active'));
    s.classList.add('active');
  });
});
attachImgFallback(swatchRail);

/* ---------- gallery ---------- */
const galleryData = [
  ["flooring", px(2341290)],
  ["kitchen", px(5506219)],
  ["wall", px(32129603)],
  ["stairs", px(16709869)],
  ["flooring", px(1323712)],
  ["kitchen", px(5623225)],
  ["wall", px(3575827)],
  ["stairs", px(6039191)],
  ["flooring", px(7750107)],
  ["kitchen", px(30742339)],
  ["wall", px(7245527)],
  ["flooring", px(15011349)],
];
const masonry = document.getElementById('masonry');
function renderGallery(f) {
  masonry.innerHTML = '';
  galleryData.filter(g => f === 'all' || g[0] === f).forEach(g => {
    const d = document.createElement('div');
    d.className = 'gitem';
    d.innerHTML = `<img src="${g[1]}" alt="" loading="lazy">`;
    d.addEventListener('click', () => {
      document.getElementById('lb-img').src = g[1];
      document.getElementById('lightbox').classList.add('open');
    });
    masonry.appendChild(d);
  });
  attachImgFallback(masonry);
}
renderGallery('all');
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
const faqs = [
  ["Do you provide both local and imported marble?", "Yes — The Royal Stone stocks a full range of local Pakistani stone alongside imported marble and granite, all available to view at our Mandi Bahauddin showroom."],
  ["Do you handle installation, or just supply materials?", "We manage the complete process end-to-end: consultation, material selection, professional installation and final inspection, all with our own trained team."],
  ["Which areas do you serve?", "We currently serve customers across Punjab, with our showroom and workshop based in Phalia, Mandi Bahauddin."],
  ["How long does a typical flooring or kitchen top project take?", "Timelines vary with scope, but most residential flooring or kitchen top projects are completed within one to three weeks after material selection."],
  ["Can I visit the showroom before deciding?", "Absolutely — we welcome walk-ins at our Sargodha Road showroom, and our team is happy to walk you through samples in person."],
  ["How do I get a quotation?", "Reach out via WhatsApp, phone, or the contact form below with your project details, and we'll arrange a site visit and itemised quote."],
];
const faqWrap = document.getElementById('faqWrap');
faqs.forEach((f, i) => {
  const item = document.createElement('div');
  item.className = 'faq-item' + (i === 0 ? ' open' : '');
  item.innerHTML = `<div class="faq-q"><h4>${f[0]}</h4><div class="faq-icon"></div></div><div class="faq-a"><p>${f[1]}</p></div>`;
  faqWrap.appendChild(item);
  const q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a');
  if (i === 0) a.style.maxHeight = a.scrollHeight + 'px';
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(fi => { fi.classList.remove('open'); fi.querySelector('.faq-a').style.maxHeight = null; });
    if (!isOpen) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
  });
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
