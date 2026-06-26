import VenueListingPage from "./pages/VenueListingPage";
import { ROUTES } from "../../shared/constants/routes";
import VenueDetailsPage from "./pages/VenueDetailsPage";

export const venueRoutes = [
  {
    path: ROUTES.VENUES,
    element: <VenueListingPage />,
  },

  {
    path: ROUTES.VENUE_DETAILS,
    element: <VenueDetailsPage />,
  }
];
