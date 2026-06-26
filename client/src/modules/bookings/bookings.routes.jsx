import BookVenuePage from "./pages/BookVenuePage";

import CustomerProtectedRoute from "../../shared/guards/CustomerProtectedRoute";

import { ROUTES } from "../../shared/constants/routes";

export const bookingRoutes = [
  {
    path: ROUTES.VENUE_BOOKING,
    element: (
      <CustomerProtectedRoute>
        <BookVenuePage />
      </CustomerProtectedRoute>
    ),
  }
];