import { ROUTES } from "../../shared/constants/routes";

import OwnerOnboardingPage from "./pages/OwnerOnboardingPage";

import CustomerProtectedRoute from "../../shared/guards/CustomerProtectedRoute";

export const ownerOnboardingRoutes = [
  {
    path: ROUTES.BECOME_PARTNER,

    element: (
      <CustomerProtectedRoute>
        <OwnerOnboardingPage />
      </CustomerProtectedRoute>
    ),
  },
];