import VenueListingPage from "./pages/VenueListingPage";
import { ROUTES } from "../../shared/constants/routes";
import VenueDetailsPage from "./pages/VenueDetailsPage";
import BookVenuePage from "../bookings/components/BookVenuePage";


export const venueRoutes = [
  {
    path: ROUTES.VENUES,
    element: <VenueListingPage />,
  },

  // later
  {
    path: ROUTES.VENUE_DETAILS,
    element: <VenueDetailsPage />,
  },
  {
    path: ROUTES.VENUE_DETAILS,
    element: <VenueDetailsPage />,

    path: ROUTES.VENUE_BOOKING,
    element: <BookVenuePage />,
  },
];
