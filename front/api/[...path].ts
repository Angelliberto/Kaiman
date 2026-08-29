import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  const apiUrl = process.env.API_URL?.replace(/\/$/, '');

  if (!apiUrl) {
    res.status(503).json({ error: 'API_URL not configured' });
    return;
  }

  const segments = req.query.path;
  const path = Array.isArray(segments) ? segments.join('/') : (segments ?? '');
  const queryStart = req.url?.indexOf('?') ?? -1;
  const query = queryStart >= 0 ? req.url!.slice(queryStart) : '';
  const target = `${apiUrl}/api/${path}${query}`;

  const headers: Record<string, string> = {};
  for (const [key, value] of Object.entries(req.headers)) {
    if (!value || key === 'host' || key === 'connection') continue;
    headers[key] = Array.isArray(value) ? value[0] : value;
  }

  const init: RequestInit = {
    method: req.method,
    headers,
  };

  if (req.method && !['GET', 'HEAD'].includes(req.method)) {
    init.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body ?? {});
    if (!headers['content-type']) {
      headers['content-type'] = 'application/json';
    }
  }

  try {
    const response = await fetch(target, init);
    const body = await response.text();

    res.status(response.status);
    const contentType = response.headers.get('content-type');
    if (contentType) {
      res.setHeader('content-type', contentType);
    }

    res.send(body);
  } catch (error) {
    console.error('[api proxy]', target, error);
    res.status(502).json({ error: 'Backend unreachable' });
  }
}
