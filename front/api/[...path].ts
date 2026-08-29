export const config = {
  runtime: 'edge',
};

const SKIP_HEADERS = new Set([
  'host',
  'connection',
  'content-length',
  'transfer-encoding',
  'accept-encoding',
]);

function resolveApiBase(raw?: string): URL | null {
  if (!raw?.trim()) return null;

  let value = raw.trim().replace(/\/$/, '').replace(/\/api$/, '');
  if (!/^https?:\/\//i.test(value)) {
    value = `https://${value}`;
  }

  try {
    return new URL(value);
  } catch {
    return null;
  }
}

export default async function handler(request: Request): Promise<Response> {
  const apiBase = resolveApiBase(process.env.API_URL);

  if (!apiBase) {
    return Response.json({ error: 'API_URL not configured or invalid' }, { status: 503 });
  }

  const incoming = new URL(request.url);
  const path = incoming.pathname.replace(/^\/api\/?/, '');
  const target = new URL(`/api/${path}`, apiBase);

  incoming.searchParams.forEach((value, key) => {
    if (key !== 'path' && key !== '...path') {
      target.searchParams.set(key, value);
    }
  });

  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (!SKIP_HEADERS.has(key)) {
      headers.set(key, value);
    }
  });

  const init: RequestInit = {
    method: request.method,
    headers,
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = request.body;
  }

  try {
    const response = await fetch(target, init);
    return new Response(response.body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    console.error('[api proxy]', target.toString(), error);
    return Response.json({ error: 'Backend unreachable' }, { status: 502 });
  }
}
