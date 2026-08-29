import { writeFileSync } from 'node:fs';

const apiBase = process.env.API_URL?.replace(/\/$/, '');
const rewrites = [];

if (apiBase) {
  rewrites.push({
    source: '/api/:path*',
    destination: `${apiBase}/api/:path*`,
  });
}

rewrites.push({ source: '/(.*)', destination: '/index.html' });

writeFileSync('vercel.json', `${JSON.stringify({ rewrites }, null, 2)}\n`);

if (apiBase) {
  console.log(`[vercel] API proxy -> ${apiBase}`);
} else {
  console.log('[vercel] API_URL not set; /api proxy skipped');
}
