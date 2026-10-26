// Set the saved view before styles paint. First visits always use pastel.
(() => {
  let professional = false;
  try { professional = localStorage.getItem('chaitra-portfolio-mode-v2') === 'professional'; } catch {}
  document.documentElement.dataset.theme = professional ? 'night' : 'paper';
  document.documentElement.style.colorScheme = professional ? 'dark' : 'light';
})();
