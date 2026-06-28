import { ROUTES } from "../../shared/constants/routes";

import AccountLayout from "./components/AccountLayout";
import AccountPage from "./pages/AccountPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import BookingDetailsPage from "./pages/BookingDetailsPage";

export const accountRoutes = [

{
    path: ROUTES.ACCOUNT,
    element: <AccountLayout />,
    children: [
      {
        index: true,
        element: <AccountPage />,
      },
      {
        path: "bookings",
        element: <MyBookingsPage />,
      },
      {
        path: "bookings/:id",
        element: <BookingDetailsPage />,
      },
    ],
  }
]