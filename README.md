# Odhniya static panels

From this project folder, run:

```powershell
npm.cmd start
```

Requires Node.js 22 or newer. No dependency installation or credential configuration is needed.

- User website: http://localhost:3000/
- Admin dashboard: http://localhost:3000/admin

The server serves the existing static HTML, CSS, JavaScript, and images. Both panels retain their existing design and functionality. `/admin` redirects to `/admin/` so relative assets and dashboard hash navigation work correctly. Legacy `/admin-panal/` links redirect to the admin route.

There is no login or role verification. Anyone who knows the admin URL can access it. The user website does not link to the admin dashboard. Existing demo data and backend behavior are unchanged.

For deployment, forward requests to this static server, or configure your static host to map `/` to `user-panal/index.html` and `/admin/` to `admin-panal/index.html`, including their respective assets. Keep the trailing-slash redirect for `/admin`.

Run routing checks with `npm.cmd test`.
