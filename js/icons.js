/* =======================================================================
   Local icon registry.
   Every logo used on the site is a local file in assets/icons/ — nothing
   is loaded from an external CDN, so logos always render (no dependency
   on a third-party server being reachable, and no risk of a slug that
   doesn't exist on that CDN, which is what was breaking Canva, Affinity
   Designer and CapCut before).
   ======================================================================= */
const ICON_PATH = 'assets/icons/';
const ICON_LABELS = {
  shopify: 'Shopify',
  wordpress: 'WordPress',
  figma: 'Figma',
  canva: 'Canva',
  affinitydesigner: 'Affinity Designer',
  capcut: 'CapCut',
  meta: 'Meta Ads',
  html5: 'HTML5',
  css: 'CSS3',
  javascript: 'JavaScript',
  git: 'Git',
  nodedotjs: 'Node.js'
};

function iconImg(slug, size){
  const label = ICON_LABELS[slug] || slug;
  const s = size || 24;
  return `<img src="${ICON_PATH}${slug}.svg" width="${s}" height="${s}" alt="${label}" loading="lazy">`;
}

/* Hydrate any element written as <span data-icon="slug" data-size="28"></span> */
function hydrateIcons(){
  document.querySelectorAll('[data-icon]').forEach(el => {
    const slug = el.getAttribute('data-icon');
    const size = el.getAttribute('data-size') || 24;
    el.innerHTML = iconImg(slug, size);
  });
}
document.addEventListener('DOMContentLoaded', hydrateIcons);
