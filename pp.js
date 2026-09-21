/* =====================================================================
   PERSPECTIVE PHOTO — script commun : données, chrome, tiroirs, panier,
   curseur sur les œuvres, transitions, aides de mise en page
   ===================================================================== */
window.PP = (() => {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s), $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches, fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const SITE = 'https://perspective-photo-final.vercel.app';
  const WIX = id => `https://static.wixstatic.com/media/${id}/v1/fill/w_1600,h_1100,al_c,q_88/${id}`;

  /* ---------------- Données ---------------- */
  const UNIV = [['concert','Concerts & Artistes'],['newyork','New York'],['havrenuit','Le Havre la nuit'],['caraibes','Caraïbes'],['cyclades','Les Cyclades'],['street','Street Art'],['nature','Paysages & Nature'],['portraits','Portraits de rue'],['creatif','Art créatif']];
  const GROUPS = [['all','Tout'],['concert','Concerts'],['newyork','New York','street'],['havrenuit','Le Havre'],['voyage','Voyages','caraibes','cyclades','nature'],['creatif','Créatif & portraits','portraits']];
  const W = [
    {id:'judith-hill',t:'Judith Hill, Les Nuits Suspendues',u:'concert',img:'media/concert-judith.jpg',o:'l',isNew:true,story:'Capturée en couleur lors du festival Les Nuits Suspendues au Havre, cette photographie immortalise l\'énergie et les jeux de lumière du concert de Judith Hill.',place:'Le Havre, Les Nuits Suspendues'},
    {id:'axel-bauer',t:'Axel Bauer au Havre',u:'concert',img:'media/concert-rock.jpg',o:'l',story:'L\'énergie pure du rock français, un soir sur la scène du Tetris.',place:'Le Havre, le Tetris'},
    {id:'skyline',t:'Skyline depuis Brooklyn',u:'newyork',img:'media/ny-skyline.jpg',o:'l',story:'Manhattan à l\'heure bleue, quand les fenêtres s\'allument une à une.',place:'New York, Brooklyn'},
    {id:'taxi',t:'Yellow Cab, Mulberry Street',u:'newyork',img:'media/ny-taxi.jpg',o:'l',story:'Un taxi, une rue, une lumière de fin d\'après-midi : New York résumé en une image.',place:'New York, Little Italy'},
    {id:'hepburn',t:'Audrey Hepburn, Mulberry Street',u:'street',img:WIX('c38898_732b9b0e784a4697bc12d6a2d6f9bf45~mv2.jpg'),fallback:'media/street-art.jpg',o:'l',story:'Une fresque de street art à Little Italy, New York, saisie avant que le mur ne change encore.',place:'New York, Mulberry Street'},
    {id:'havre-nuit',t:'Le bassin du Commerce la nuit',u:'havrenuit',img:'media/havre-nuit.jpg',o:'l',story:'Les reflets du Havre reconstruit, ville Perret, sur l\'eau immobile du bassin.',place:'Le Havre, bassin du Commerce'},
    {id:'anse-mabouya',t:'Anse Mabouya, Sainte-Luce',u:'caraibes',img:'media/caraibes-plage.jpg',o:'l',story:'Le sable, l\'eau turquoise et un palmier penché : la Martinique en une ligne.',place:'Martinique, Sainte-Luce'},
    {id:'diamant',t:'Coucher de soleil sur le Diamant',u:'caraibes',img:'media/caraibes-diamant.jpg',o:'l',story:'Le rocher du Diamant découpé dans un ciel de feu, depuis la plage.',place:'Martinique, Le Diamant'},
    {id:'oia',t:'Dôme bleu à Oïa',u:'cyclades',img:'media/cyclades-dome.jpg',o:'p',story:'Le bleu et le blanc de Santorin, réduits à l\'essentiel.',place:'Santorin, Oïa'},
    {id:'firostefani',t:'Les escaliers de Firostefani',u:'cyclades',img:'media/cyclades-escaliers.jpg',o:'p',story:'Des marches blanches qui montent vers la lumière, au bord de la caldeira.',place:'Santorin, Firostefani'},
    {id:'noilleraie',t:'Noilleraie, Périgord noir',u:'nature',img:WIX('c38898_c1e4789e43ba4672afac69d93015d5a6~mv2.jpg'),fallback:'media/perigord.jpg',o:'l',story:'Les collines d\'Aubas, en Périgord noir, dans la brume du matin.',place:'Périgord, Aubas'},
    {id:'portrait',t:'Portrait de rue, Le Havre',u:'portraits',img:'media/portrait-rue.jpg',o:'p',story:'Un regard croisé sur le quai, une seconde avant qu\'il ne se détourne.',place:'Le Havre, les quais'},
    {id:'eiffel',t:'La Tour Eiffel en noir et blanc',u:'creatif',img:'media/eiffel.jpg',o:'p',story:'Paris réduit à une silhouette, dans un ciel d\'argent.',place:'Paris'},
    {id:'lotus',t:'Lotus bleu d\'Égypte, jardin de Balata',u:'creatif',img:'media/lotus.jpg',o:'l',story:'Une fleur, un bassin, le jardin de Balata en Martinique.',place:'Martinique, jardin de Balata'},
  ];
  // formats : largeur et hauteur en cm (paysage), prix papier ; aluminium +30 %
  const FORMATS = [{l:'30 × 45 cm',w:45,h:30,p:190},{l:'40 × 60 cm',w:60,h:40,p:290},{l:'60 × 90 cm',w:90,h:60,p:450},{l:'80 × 120 cm',w:120,h:80,p:690}];
  const ALU = 1.3, ED = 30;
  const byId = id => W.find(w => w.id === id) || W[0];
  const uname = u => (UNIV.find(x => x[0] === u) || [])[1] || u;
  const eur = n => Math.round(n).toLocaleString('fr-FR') + ' €';
  const price = (f, s) => Math.round(FORMATS[f].p * (s === 'alu' ? ALU : 1));
  const img = (w, cls = '', eager = false) => `<img class="${cls}" src="${w.img}" alt="${w.t}" ${eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}${w.fallback ? ` onerror="this.onerror=null;this.src='${w.fallback}'"` : ''}>`;
  const src = w => w.img;
  const inGroup = (w, g) => { if (g === 'all') return true; const G = GROUPS.find(x => x[0] === g); return G && (G[0] === w.u || G.slice(2).includes(w.u)); };

  /* ---------------- État ---------------- */
  const state = { fav: new Set(JSON.parse(sessionStorage.getItem('pp-fav') || '[]')), cart: JSON.parse(sessionStorage.getItem('pp-cart') || '[]') };
  const save = () => { sessionStorage.setItem('pp-fav', JSON.stringify([...state.fav])); sessionStorage.setItem('pp-cart', JSON.stringify(state.cart)); const f = $('#favCount'), c = $('#cartCount'); if (f) { f.textContent = state.fav.size; f.classList.toggle('is-on', state.fav.size > 0); } if (c) { c.textContent = state.cart.length; c.classList.toggle('is-on', state.cart.length > 0); } };
  const toast = m => { const t = $('#toast'); t.textContent = m; t.classList.add('is-on'); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('is-on'), 2200); };
  const toggleFav = id => { state.fav.has(id) ? state.fav.delete(id) : state.fav.add(id); save(); renderFav(); document.dispatchEvent(new CustomEvent('pp:fav', {detail:id})); return state.fav.has(id); };
  const addToCart = (id, f, s) => { const w = byId(id); state.cart.push({id, f, s, p: price(f, s), t: w.t}); save(); renderCart(); toast(`${w.t} ajouté au panier`); };
  const addGift = (amt, to) => { state.cart.push({gift:true, p:amt, t:'Carte cadeau ' + eur(amt), to}); save(); renderCart(); toast('Carte cadeau ajoutée au panier'); };

  /* ---------------- Chrome commun ---------------- */
  const PAGES = [['/galerie','Galerie'],['/mur','Sur mon mur'],['/atelier',"L'atelier"]];
  const here = location.pathname.replace(/\/index(\.html)?$/, '/').replace(/\.html$/, '') || '/';
  const icon = {heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>', bag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2"/></svg>', arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'};
  function mount() {
    document.body.insertAdjacentHTML('afterbegin', `<a class="skip" href="#main">Aller au contenu</a>
<div class="veil" id="veil" aria-hidden="true"></div>
<header class="nav" id="nav"><a class="nav__logo" href="/"><i></i>Perspective Photo</a><nav aria-label="Navigation principale"><ul>${PAGES.map(([h,l]) => `<li><a href="${h}"${here === h || (here === '/oeuvre' && h === '/galerie') ? ' aria-current="page"' : ''}>${l}</a></li>`).join('')}</ul></nav><div class="nav__r"><button class="btn--icon btn" id="favBtn" aria-label="Mes favoris">${icon.heart}<b id="favCount">0</b></button><button class="btn--icon btn" id="cartBtn" aria-label="Mon panier">${icon.bag}<b id="cartCount">0</b></button><button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span></button></div></header>
<div class="menu" id="menu" aria-hidden="true"><a class="big" href="/">Accueil</a>${PAGES.map(([h,l]) => `<a class="big" href="${h}">${l}</a>`).join('')}<button class="big" id="giftMenu" style="text-align:left">Carte cadeau</button><span class="mono">Joël Gourlain, Le Havre. Éditions limitées.</span></div>
<div class="overlay" id="overlay"></div>
<aside class="drawer" id="favDrawer" role="dialog" aria-modal="true" aria-label="Mes favoris"><div class="drawer__head"><h3>Mes favoris</h3><button class="close" data-close aria-label="Fermer">×</button></div><div class="items" id="favItems"></div></aside>
<aside class="drawer" id="cartDrawer" role="dialog" aria-modal="true" aria-label="Mon panier"><div class="drawer__head"><h3>Mon panier</h3><button class="close" data-close aria-label="Fermer">×</button></div><div class="items" id="cartItems"></div><div class="total"><span>Total <small>livraison offerte</small></span><b id="cartTotal">0 €</b></div><form id="checkout" novalidate><input type="text" id="cName" placeholder="Nom" autocomplete="name" required><input type="email" id="cMail" placeholder="E-mail" autocomplete="email" required><input type="text" id="cAddr" placeholder="Adresse de livraison" autocomplete="street-address"><button class="btn btn--solid" type="submit">Réserver mon exemplaire</button><span class="mono" style="text-align:center">Paiement sécurisé, CB ou PayPal. Maquette : aucun paiement réel.</span></form><div class="done"><div class="spot"></div><h3>Merci, à vous.</h3><p class="lead" style="margin:10px auto 0;max-width:34ch">Votre exemplaire est réservé. Joël signe et numérote votre tirage, vous recevez un e-mail à l'expédition.</p></div></aside>
<aside class="drawer" id="giftDrawer" role="dialog" aria-modal="true" aria-label="Carte cadeau"><div class="drawer__head"><h3>Carte cadeau</h3><button class="close" data-close aria-label="Fermer">×</button></div><div class="gift-card"><span class="mono">Perspective Photo</span><div><div class="amt" id="gAmt">150 €</div><div class="to">Pour<b id="gTo">Vous</b></div></div></div><p class="lead" style="font-size:14px;margin-bottom:12px">Envoyée par e-mail à la date de votre choix, valable un an sur toutes les éditions, tous formats et supports.</p><div class="amts" id="gAmts">${[100,150,250,450].map(a => `<button class="opt" type="button" data-a="${a}" aria-pressed="${a === 150}">${a} €</button>`).join('')}</div><form id="giftForm" novalidate><input type="text" id="gName" placeholder="Pour qui ?"><textarea id="gMsg" rows="2" placeholder="Votre message"></textarea><button class="btn btn--solid" type="submit">Ajouter au panier</button></form></aside>
<div class="toast" id="toast" role="status"></div>
<div class="cursor" id="cursor" aria-hidden="true"><div class="cursor__ring"><span id="cursorLbl"></span></div></div>`);
    document.body.insertAdjacentHTML('beforeend', `<div class="cta-band" id="ctaBand"><div class="in"><div><h2>Une œuvre, chez vous, dans dix jours.</h2><p>Trente exemplaires par photographie, signés et numérotés au dos. Livraison offerte en France et en Europe.</p></div><a class="btn btn--solid" href="/galerie">Entrer dans la galerie ${icon.arrow}</a></div></div>
<footer><div class="f-grid"><div><a class="nav__logo" href="/"><i></i>Perspective Photo</a><p style="margin-top:12px;max-width:34ch">Photographies d'art en édition limitée, signées et numérotées. Joël Gourlain, Le Havre, Normandie.</p></div><div><h4>Le site</h4><ul><li><a href="/galerie">Galerie</a></li><li><a href="/mur">Sur mon mur</a></li><li><a href="/atelier">L'atelier</a></li><li><button id="giftFoot" style="color:inherit">Carte cadeau</button></li></ul></div><div><h4>Le photographe</h4><ul><li><a href="/atelier#photographe">Joël Gourlain</a></li><li><a href="https://www.youtube.com/@joelgourlain" target="_blank" rel="noopener">YouTube</a></li><li><a href="https://www.facebook.com/joelgourlain" target="_blank" rel="noopener">Facebook</a></li><li><a href="/atelier#faq">Questions</a></li></ul></div><div><h4>Commander</h4><ul><li>Livraison offerte</li><li>Emballage renforcé</li><li>Paiement sécurisé</li><li><a href="#" data-dead>Conditions de vente</a></li></ul></div></div><div class="f-bottom"><span>© 2014–2026 Joël Gourlain, Perspective Photo</span><span><a href="#" data-dead>Mentions légales</a></span></div></footer>`);
    if (document.body.dataset.noband) $('#ctaBand').remove();
    // navigation
    const nav = $('#nav'); addEventListener('scroll', () => nav.classList.toggle('is-scrolled', scrollY > 40), {passive:true}); nav.classList.toggle('is-scrolled', scrollY > 40 || document.body.dataset.solid === '1');
    const burger = $('#burger'), menu = $('#menu');
    const toggleMenu = o => { menu.classList.toggle('is-open', o); burger.classList.toggle('x', o); burger.setAttribute('aria-expanded', o); menu.setAttribute('aria-hidden', !o); document.body.style.overflow = o ? 'hidden' : ''; };
    burger.onclick = () => toggleMenu(!menu.classList.contains('is-open'));
    // tiroirs
    const overlay = $('#overlay'); let openDrawer = null, lastF = null;
    const open = id => { lastF = document.activeElement; toggleMenu(false); $$('.drawer').forEach(d => d.classList.toggle('is-open', d.id === id)); overlay.classList.add('is-on'); openDrawer = id; document.body.style.overflow = 'hidden'; $('#' + id + ' .close').focus(); };
    const close = () => { $$('.drawer').forEach(d => d.classList.remove('is-open')); overlay.classList.remove('is-on'); openDrawer = null; document.body.style.overflow = ''; lastF?.focus?.(); };
    $('#favBtn').onclick = () => open('favDrawer'); $('#cartBtn').onclick = () => open('cartDrawer'); $('#giftMenu').onclick = () => open('giftDrawer'); $('#giftFoot').onclick = () => open('giftDrawer');
    $$('[data-close]').forEach(b => b.onclick = close); overlay.onclick = close; addEventListener('keydown', e => { if (e.key === 'Escape') { close(); toggleMenu(false); } });
    document.addEventListener('click', e => { const b = e.target.closest('[data-open-gift]'); if (b) { e.preventDefault(); open('giftDrawer'); } const c = e.target.closest('[data-open-cart]'); if (c) { e.preventDefault(); open('cartDrawer'); } });
    // carte cadeau
    $('#gAmts').addEventListener('click', e => { const b = e.target.closest('.opt'); if (!b) return; $$('#gAmts .opt').forEach(x => x.setAttribute('aria-pressed', x === b)); $('#gAmt').textContent = b.dataset.a + ' €'; });
    $('#gName').addEventListener('input', e => $('#gTo').textContent = e.target.value.trim() || 'Vous');
    $('#giftForm').addEventListener('submit', e => { e.preventDefault(); addGift(+$('#gAmts .opt[aria-pressed="true"]').dataset.a, $('#gName').value.trim()); open('cartDrawer'); });
    // commande
    $('#checkout').addEventListener('submit', e => { e.preventDefault(); if (!state.cart.length) { toast('Votre panier est vide'); return; } const n = $('#cName'), m = $('#cMail'); if (!n.value.trim()) { n.focus(); return; } if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m.value)) { m.focus(); return; } $('#cartDrawer').classList.add('finished'); state.cart = []; save(); });
    renderFav(); renderCart(); save();
    // transition : la lumière baisse, remonte sur la page suivante
    const veil = $('#veil');
    document.addEventListener('click', e => { const a = e.target.closest('a'); if (!a) return; if (a.hasAttribute('data-dead')) { e.preventDefault(); toast('Page à venir'); return; } const h = a.getAttribute('href') || ''; if (!h.startsWith('/') || a.target === '_blank') return; const path = h.split('#')[0].split('?')[0]; if (path === here && !h.includes('?')) return; e.preventDefault(); toggleMenu(false); if (reduced) { location.href = h; return; } veil.classList.add('is-on'); setTimeout(() => location.href = h, 380); });
    addEventListener('pageshow', () => { veil.classList.remove('is-on'); document.body.classList.add('is-ready'); });
    // intro, une fois par session, seulement sur l'accueil
    if (here === '/' && !sessionStorage.getItem('pp-intro') && !reduced) { sessionStorage.setItem('pp-intro', '1'); document.body.insertAdjacentHTML('afterbegin', '<div class="intro" id="intro" aria-hidden="true"><div><div class="intro__box"><i></i></div><div class="intro__name">Perspective Photo</div><div class="intro__sub">Joël Gourlain, Le Havre. Éditions limitées.</div></div></div>'); setTimeout(() => $('#intro').classList.add('is-done'), 2200); setTimeout(() => $('#intro')?.remove(), 3200); }
    requestAnimationFrame(() => setTimeout(() => document.body.classList.add('is-ready'), 60));
    // curseur, uniquement sur les éléments marqués
    if (fine && !reduced) { const c = $('#cursor'), ring = $('.cursor__ring', c), lbl = $('#cursorLbl'); let x = 0, y = 0, rx = 0, ry = 0, on = false; addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; }, {passive:true}); (function loop(){ rx += (x - rx) * .2; ry += (y - ry) * .2; if (on) ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; requestAnimationFrame(loop); })(); document.addEventListener('mouseover', e => { const el = e.target.closest('[data-cursor]'); if (el) { lbl.textContent = el.dataset.cursor; c.classList.add('is-on'); on = true; } }); document.addEventListener('mouseout', e => { const el = e.target.closest('[data-cursor]'); if (el && !el.contains(e.relatedTarget)) { c.classList.remove('is-on'); on = false; } }); }
    // reveals
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), {threshold:.12});
    $$('.rv').forEach(el => io.observe(el)); window.PP.observe = el => io.observe(el);
  }
  function renderFav() { const box = $('#favItems'); if (!box) return; const list = [...state.fav].map(byId); box.innerHTML = list.length ? list.map(w => `<div class="item">${img(w)}<div><b>${w.t}</b><span>${uname(w.u)} · à partir de ${eur(FORMATS[0].p)}</span></div><div style="display:grid;gap:6px;justify-items:end"><a href="/oeuvre?id=${w.id}" style="font-size:12px;text-decoration:underline">Voir</a><button data-unfav="${w.id}">Retirer</button></div></div>`).join('') : '<p class="empty">Aucun favori pour l\'instant. Le cœur sur une œuvre la garde ici.</p>'; $$('[data-unfav]', box).forEach(b => b.onclick = () => toggleFav(b.dataset.unfav)); }
  function renderCart() { const box = $('#cartItems'); if (!box) return; box.innerHTML = state.cart.length ? state.cart.map((c, i) => `<div class="item">${c.gift ? '<div style="width:76px;height:56px;border:1px solid var(--line);display:grid;place-items:center;font-family:var(--mono);font-size:10px">CADEAU</div>' : img(byId(c.id))}<div><b>${c.t}</b><span>${c.gift ? (c.to ? 'Pour ' + c.to : 'Montant libre') : FORMATS[c.f].l + ' · ' + (c.s === 'alu' ? 'Aluminium Dibond' : 'Fine Art Hahnemühle')}</span></div><div style="text-align:right"><b style="font-family:var(--display);font-size:18px">${eur(c.p)}</b><br><button data-rm="${i}">Retirer</button></div></div>`).join('') : '<p class="empty">Votre panier est vide.</p>'; $('#cartTotal').textContent = eur(state.cart.reduce((s, c) => s + c.p, 0)); $$('[data-rm]', box).forEach(b => b.onclick = () => { state.cart.splice(+b.dataset.rm, 1); save(); renderCart(); }); }
  document.addEventListener('DOMContentLoaded', mount);
  return {W, UNIV, GROUPS, FORMATS, ALU, ED, SITE, byId, uname, eur, price, img, src, inGroup, state, toggleFav, addToCart, toast, reduced, fine};
})();
