import { getAllDestinations, getDestinationById } from '../config/destinations';
import { getAllListings } from '../config/listings';

export const listDestinations = () => {
  const listings = getAllListings();

  return getAllDestinations().map((destination) => ({
    ...destination,
    listingCount: listings.filter((listing) => listing.destinationId === destination.id)
      .length,
  }));
};

export const getDestination = (id: string) => {
  const destination = getDestinationById(id);

  if (!destination) {
    return null;
  }

  const listingCount = getAllListings().filter(
    (listing) => listing.destinationId === destination.id
  ).length;

  return { ...destination, listingCount };
};
