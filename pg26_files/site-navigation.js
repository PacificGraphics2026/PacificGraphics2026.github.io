(() => {
  const header = document.querySelector('.pg-site-header');
  if (!header) return;
  const groups = [...header.querySelectorAll('details')];
  groups.forEach(group => {
    group.addEventListener('toggle', () => {
      if (group.open) groups.forEach(other => { if (other !== group) other.open = false; });
    });
  });
  document.addEventListener('click', event => {
    groups.forEach(group => { if (!group.contains(event.target)) group.open = false; });
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    groups.forEach(group => {
      if (group.open) { group.open = false; group.querySelector('summary')?.focus(); }
    });
  });
  header.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => groups.forEach(group => { group.open = false; }));
  });
})();
