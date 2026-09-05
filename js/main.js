/* ================= Custom cursor ================= */
(function(){
  if(!window.matchMedia('(pointer: fine)').matches) return;
  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx=0, my=0, rx=0, ry=0;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx+'px'; dot.style.top = my+'px'; });
  function loop(){
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  document.addEventListener('mouseover', e => {
    if(e.target.closest('a, button, .tag, .cursor-grow')) ring.classList.add('big');
  });
  document.addEventListener('mouseout', e => {
    if(e.target.closest('a, button, .tag, .cursor-grow')) ring.classList.remove('big');
  });
  document.addEventListener('mouseleave', () => ring.classList.add('hide'));
  document.addEventListener('mouseenter', () => ring.classList.remove('hide'));
})();

/* ================= Header / scroll progress / back to top ================= */
const header = document.getElementById('siteHeader');
const progress = document.getElementById('progress');
const toTop = document.getElementById('toTop');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if(header) header.classList.toggle('scrolled', scrolled > 10);
  if(toTop) toTop.classList.toggle('show', scrolled > 600);
  if(progress){
    const h = document.documentElement;
    const pct = (scrolled / (h.scrollHeight - h.clientHeight)) * 100;
    progress.style.width = pct + '%';
  }
  // parallax layers
  document.querySelectorAll('[data-parallax]').forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.15;
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});
if(toTop) toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

/* ================= Mobile nav toggle ================= */
const menuToggle = document.getElementById('menuToggle');
const navlinks = document.getElementById('navlinks');
if(menuToggle && navlinks){
  menuToggle.addEventListener('click', () => {
    navlinks.classList.toggle('open');
    menuToggle.classList.toggle('open');
  });
  navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navlinks.classList.remove('open');
  }));
}

/* ================= Scroll reveal ================= */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ================= Toast ================= */
function showToast(msg){
  let toast = document.getElementById('toast');
  if(!toast){
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.innerHTML = '<span class="dot"></span><span id="toastMsg"></span>';
    document.body.appendChild(toast);
  }
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 3800);
}

/* ================= Project unlock (Shopify password-protected preview) =================
   Opens the store in a new tab and auto-submits Shopify's own storefront
   password form, exactly like a visitor typing it in manually.
   Some stores may still show the password screen if the theme requires a
   fresh CSRF token — as a safety net we also copy the password to the
   clipboard so it can be pasted in one click. */
function openProject(url, password){
  const winName = 'proj_' + Date.now();
  const win = window.open('about:blank', winName);

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = url.replace(/\/+$/,'') + '/password';
  form.target = winName;
  form.style.display = 'none';

  const f1 = document.createElement('input');
  f1.type = 'hidden'; f1.name = 'form_type'; f1.value = 'storefront_password';
  const f2 = document.createElement('input');
  f2.type = 'hidden'; f2.name = 'utf8'; f2.value = '✓';
  const f3 = document.createElement('input');
  f3.type = 'hidden'; f3.name = 'password'; f3.value = password;

  form.appendChild(f1); form.appendChild(f2); form.appendChild(f3);
  document.body.appendChild(form);
  form.submit();
  setTimeout(() => form.remove(), 500);

  if(navigator.clipboard){
    navigator.clipboard.writeText(password).catch(()=>{});
  }
  showToast('Opening preview — password "' + password + '" copied, just in case.');
}

/* ================= Skills marquee builder =================
   Uses the local icon registry (js/icons.js) instead of an external CDN,
   so the logos always render regardless of network/CDN availability. */
function buildMarquee(elId, items){
  const el = document.getElementById(elId);
  if(!el) return;
  let html = '';
  for(let rep=0; rep<2; rep++){
    items.forEach(([slug, label]) => {
      html += `<div class="logo-chip">${iconImg(slug, 28)}${label}</div>`;
    });
  }
  el.innerHTML = html;
}

/* ================= Footer year ================= */
document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());
