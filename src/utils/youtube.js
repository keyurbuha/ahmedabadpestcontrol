export function getYoutubeId(value) {
  if (/^[A-Za-z0-9_-]{11}$/.test(value || '')) return value;
  try {
    const url = new URL(value);
    if (url.hostname === 'youtu.be') return url.pathname.split('/').filter(Boolean)[0] || '';
    if (/(^|\.)youtube\.com$/.test(url.hostname)) {
      if (url.pathname === '/watch') return url.searchParams.get('v') || '';
      const [kind, id] = url.pathname.split('/').filter(Boolean);
      if (['shorts', 'embed', 'live'].includes(kind)) return id || '';
    }
  } catch {}
  return '';
}

export function getYoutubeThumb(id) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
export function getYoutubeEmbedUrl(id) {
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
}
