import { createBrowserRouter } from 'react-router-dom';
import ownerRoutes from "../modules/owner/owner.routes";

import { venueRoutes } from "../modules/venues/venues.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { homeRoutes } from "../modules/home/home.routes";
import { adminRoutes } from "../modules/admin/admin.routes";
import { bookingRoutes } from "../modules/bookings/bookings.routes";

const router = createBrowserRouter([
   ...homeRoutes,
   ...authRoutes,
   ...venueRoutes,
   ...ownerRoutes,
   ...adminRoutes,
   ...bookingRoutes,
]);

export default router;