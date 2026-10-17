import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function useLocation() {
  const router = useRouter();
  const [path, hash = ''] = router.asPath.split('#');
  const [pathname, search = ''] = path.split('?');
  return { pathname, search: search ? `?${search}` : '', hash: hash ? `#${hash}` : '' };
}

export function useParams() {
  const router = useRouter();
  const parts = router.query.slug || [];
  return { slug: Array.isArray(parts) ? parts.at(-1) : parts };
}

export function Navigate({ href: to }) {
  const router = useRouter();
  useEffect(() => { router.replace(to); }, [router, to]);
  return null;
}
