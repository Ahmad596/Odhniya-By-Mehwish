import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './server.js';

test('static user and admin routes work without login', async () => {
  const server = createApp();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const home = await fetch(base + '/');
    assert.equal(home.status, 200);
    assert.match(await home.text(), /Home \| Odhniya/);
    const redirect = await fetch(base + '/admin', { redirect: 'manual' });
    assert.equal(redirect.status, 308);
    assert.equal(redirect.headers.get('location'), '/admin/');
    const panel = await fetch(base + '/admin/');
    assert.equal(panel.status, 200);
    assert.equal(panel.headers.get('www-authenticate'), null);
    assert.match(await panel.text(), /Admin Dashboard/);
    assert.equal((await fetch(base + '/admin-panal/index.html')).status, 200);
    for (const path of ['/admin/js/main.js', '/admin/css/styles.css']) assert.equal((await fetch(base + path)).status, 200);
    for (const path of ['/pages/about.html', '/css/style.css', '/assets/images/logo.png']) assert.equal((await fetch(base + path)).status, 200);
    for (const path of ['/.env', '/server.js', '/admin/README.md', '/unknown', '/admin/%2e%2e%2f.env']) assert.equal((await fetch(base + path)).status, 404);
  } finally { await new Promise(resolve => server.close(resolve)); }
});
