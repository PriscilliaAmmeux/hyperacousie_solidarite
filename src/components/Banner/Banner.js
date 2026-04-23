document.getElementById('ticker-close')?.addEventListener('click', () => {
  const banner = document.getElementById('ticker-banner');
  if (banner) banner.style.display = 'none';
});
