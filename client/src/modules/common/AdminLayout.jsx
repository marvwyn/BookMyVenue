import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/bookmyvenue.webp";
import { useAdminAuth } from "../../shared/context/AdminAuthContext";

const AdminLayout = () => {
  const { admin, logoutAdmin } = useAdminAuth();
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white">
        <div className="flex items-center justify-between h-[68px] px-5 sm:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2 font-extrabold text-lg tracking-tight">
            <div className="w-20 h-auto bg-gray-900 rounded-[10px] flex items-center justify-center">
              <img
                src={logo}
                alt="BookMyVenue"
                className="h-16 w-20"
              />
            </div>

            <span>BookMyVenue Admin</span>
          </div>

          {/* Admin Actions */}
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-700">
              Hi, {admin?.name}
            </span>
            <button
              onClick={() => {
                logoutAdmin();
                navigate("/admin/login");
              }}
              className="btn-outline !py-[9px] !px-5 !text-[0.88rem] !rounded-[10px]"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="pt-[68px] min-h-screen bg-gray-50">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-5 sm:px-8 bg-white">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={logo}
                alt=""
                className="w-9 h-9 object-cover"
              />
            </div>

            <span className="font-medium text-[0.95rem]">
              BookMyVenue Admin
            </span>
          </div>

          <p className="text-gray-400 text-[0.82rem] leading-[1.7]">
            Administration Portal
          </p>

          <span className="text-[0.75rem] text-gray-300">
            © 2026 BookMyVenue. All rights reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default AdminLayout;