(() => {
  const header = document.querySelector('.pg-site-header');
  if (!header) return;

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const galleryHref = 'gallery.html';
  const galleryIsCurrent = currentPage === galleryHref;
  const galleryLinkHtml = `<a href="${galleryHref}"${galleryIsCurrent ? ' aria-current="page"' : ''}>Gallery</a>`;

  const desktopAttendMenu = [...header.querySelectorAll('.pg-nav-submenu')]
    .find(menu => menu.querySelector('a[href="venue.html"]') && menu.querySelector('a[href="hotels.html"]'));
  if (desktopAttendMenu && !desktopAttendMenu.querySelector(`a[href="${galleryHref}"]`)) {
    desktopAttendMenu.insertAdjacentHTML('beforeend', galleryLinkHtml);
  }

  const mobileAttendMenu = [...header.querySelectorAll('.pg-mobile-group')]
    .find(group => group.querySelector('a[href="venue.html"]') && group.querySelector('a[href="hotels.html"]'));
  if (mobileAttendMenu && !mobileAttendMenu.querySelector(`a[href="${galleryHref}"]`)) {
    mobileAttendMenu.insertAdjacentHTML('beforeend', galleryLinkHtml);
  }

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
