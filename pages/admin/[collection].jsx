import { AdminShell } from '../../src/admin/AdminShell';
import { CollectionManager } from '../../src/admin/CollectionManager';
import { collections, collectionRoutes } from '../../src/admin/collections';
import { requireAdminPage } from '../../src/server/admin-page';
import { readContent } from '../../src/server/content';

export default function CollectionPage({ email, type, items, version }) {
  const config = collections[type];
  return <AdminShell title={config.label} description={config.description} email={email}><CollectionManager key={type} type={type} config={config} initialItems={items} initialVersion={version} /></AdminShell>;
}

export async function getServerSideProps(context) {
  const auth = await requireAdminPage(context);
  if (auth.redirect) return auth;
  const type = collectionRoutes[String(context.params.collection || '')];
  if (!type) return { notFound: true };
  const snapshot = await readContent();
  return { props: { ...auth.props, type, items: snapshot.content[type], version: snapshot.version } };
}
