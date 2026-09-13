import { Router } from 'express';
import { getHealth } from '../controllers/healthController';
import {
  getDestinationBySlug,
  getDestinations,
} from '../controllers/destinationsController';
import {
  getAvailability,
  getListing,
  getListings,
  getSite,
  reloadListings,
} from '../controllers/listingsController';
import { postContact } from '../controllers/contactController';
import {
  adminLogin,
  getAdminDepartures,
  getPublicDepartures,
  postAdminDeparture,
  removeAdminDeparture,
} from '../controllers/tourDeparturesController';
import { requireAdmin } from '../middleware/requireAdmin';
import { rateLimit } from '../middleware/rateLimit';

const router = Router();

const loginLimiter = rateLimit('admin-login', {
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Demasiados intentos de acceso. Espera unos minutos.',
});

const contactLimiter = rateLimit('contact', {
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: 'Has enviado demasiados mensajes. Intenta más tarde.',
});

const contactBurstLimiter = rateLimit('contact-burst', {
  windowMs: 60 * 1000,
  max: 1,
  message: 'Espera un momento antes de enviar otro mensaje.',
});

const apiLimiter = rateLimit('api-general', {
  windowMs: 60 * 1000,
  max: 120,
  message: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.',
});

router.use(apiLimiter);

router.get('/health', getHealth);
router.get('/site', getSite);
router.get('/destinations', getDestinations);
router.get('/destinations/:id', getDestinationBySlug);
router.get('/destinations/:id/departures', getPublicDepartures);
router.get('/listings', getListings);
router.get('/listings/:id', getListing);
router.get('/listings/:id/availability', getAvailability);
router.post('/listings/reload', requireAdmin, reloadListings);
router.post('/contact', contactBurstLimiter, contactLimiter, postContact);

router.post('/admin/login', loginLimiter, adminLogin);
router.get('/admin/departures', requireAdmin, getAdminDepartures);
router.post('/admin/departures', requireAdmin, postAdminDeparture);
router.delete('/admin/departures/:id', requireAdmin, removeAdminDeparture);

export default router;
