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

const router = Router();

router.get('/health', getHealth);
router.get('/site', getSite);
router.get('/destinations', getDestinations);
router.get('/destinations/:id', getDestinationBySlug);
router.get('/listings', getListings);
router.get('/listings/:id', getListing);
router.get('/listings/:id/availability', getAvailability);
router.post('/listings/reload', reloadListings);

export default router;
