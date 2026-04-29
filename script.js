// KOTOKA Pitch Deck — keyboard nav + 16:9 fit-to-viewport
(() => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const total = slides.length;
  let idx = 0;

  const counter = document.getElementById('counter');
  const stage = document.getElementById('stage');

  function show(i) {
    idx = (i + total) % total;
    slides.forEach((s, k) => s.classList.toggle('active', k === idx));
    counter.textContent = String(idx + 1).padStart(2, '0') + ' / ' + total;
    location.hash = '#' + (idx + 1);
  }

  function fit() {
    const W = window.innerWidth, H = window.innerHeight;
    const sx = W / 1920, sy = H / 1080;
    document.documentElement.style.setProperty('--scale', Math.min(sx, sy).toFixed(4));
  }

  document.getElementById('prev').addEventListener('click', () => show(idx - 1));
  document.getElementById('next').addEventListener('click', () => show(idx + 1));
  document.getElementById('full').addEventListener('click', () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') show(idx + 1);
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') show(idx - 1);
    else if (e.key === 'Home') show(0);
    else if (e.key === 'End') show(total - 1);
    else if (e.key === 'f' || e.key === 'F') document.getElementById('full').click();
    else if (/^[1-9]$/.test(e.key)) show(parseInt(e.key, 10) - 1);
  });

  // hash deep link
  const h = parseInt((location.hash || '#1').slice(1), 10);
  if (!isNaN(h)) idx = Math.max(0, Math.min(total - 1, h - 1));

  window.addEventListener('resize', fit);
  fit();
  show(idx);
})();
