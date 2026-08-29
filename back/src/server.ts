import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';

const PORT = process.env.PORT ?? 3000;
const CLIENT_ORIGINS = (process.env.CLIENT_ORIGIN ?? 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || CLIENT_ORIGINS.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
  })
);
app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`[Server] KAIMAN turismo en puerto ${PORT}`);
  console.log('[Server] Destinos: back/destinations.json · Hospedajes: back/listings.json');
});
