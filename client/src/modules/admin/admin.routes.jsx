import AdminDashboard from "./pages/AdminDashboard";

import { ROUTES } from "../../shared/constants/routes";

import AdminProtectedRoute from "../../shared/guards/AdminProtectedRoute";
import AdminLayout from "../common/AdminLayout";

export const adminRoutes = [
   {
      path: ROUTES.ADMIN,
      element: (
         <AdminProtectedRoute>
            <AdminLayout />
         </AdminProtectedRoute>),
      children: [

         {
            index: true,
            element: <AdminDashboard />,
         },
      ]
   }
];