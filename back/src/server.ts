import 'dotenv/config';
import { existsSync } from 'fs';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { IMAGES_ROOT } from './config/destinations';
import { purgeClosedDepartures, seedTourDeparturesIfEmpty } from './services/tourDeparturesService';
import { assertAdminEnv } from './utils/adminAuth';

const PORT = process.env.PORT ?? 3000;
const CLIENT_ORIGINS = (process.env.CLIENT_ORIGIN ?? 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const app = express();

if (process.env.TRUST_PROXY === '1' || process.env.TRUST_PROXY === 'true') {
  app.set('trust proxy', 1);
}

app.use(
  helmet({
    contentSecurityPolicy: false, // SPA sirve el front por separado
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || CLIENT_ORIGINS.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 600,
  })
);

app.use(express.json({ limit: '32kb' }));

if (existsSync(IMAGES_ROOT)) {
  app.use(
    '/images',
    express.static(IMAGES_ROOT, {
      maxAge: '7d',
      fallthrough: false,
      index: false,
    })
  );
}

app.use('/api', routes);

assertAdminEnv();
seedTourDeparturesIfEmpty();
purgeClosedDepartures();

app.listen(PORT, () => {
  console.log(`[Server] KAIMAN turismo en puerto ${PORT}`);
  console.log('[Server] Destinos: back/destinations.json · Hospedajes: back/listings.json');
  console.log('[Server] Salidas de tours: tour-departures.json');
  console.log(
    existsSync(IMAGES_ROOT)
      ? `[Server] Imágenes estáticas: /images ← ${IMAGES_ROOT}`
      : `[Server] Sin carpeta de imágenes en ${IMAGES_ROOT} (fallback Unsplash)`
  );
});
