import { ROUTES } from "../../shared/constants/routes";
import HomePage from "./pages/HomePage";
import CustomerHomeGuard from "../../shared/guards/CustomerHomeGuard";

export const homeRoutes = [
   {
      path: ROUTES.HOME,
      element: <CustomerHomeGuard><HomePage /></CustomerHomeGuard>,
   },
];