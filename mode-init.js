// Set the saved view before styles paint. First visits always use pastel.
(() => {
  let professional = false;
  try { professional = localStorage.getItem('chaitra-portfolio-mode-v2') === 'professional'; } catch {}
  if(['currents','caustics','ribbon'].includes(new URLSearchParams(location.search).get('hero'))) professional=true;
  if(['aurora','constellation','glass'].includes(new URLSearchParams(location.search).get('background')))professional=true;
  document.documentElement.dataset.background = 'glass';
  document.documentElement.dataset.hero = 'ribbon';
  document.documentElement.dataset.theme = professional ? 'night' : 'paper';
  document.documentElement.style.colorScheme = professional ? 'dark' : 'light';
})();
