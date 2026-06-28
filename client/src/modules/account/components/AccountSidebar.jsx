import { NavLink, useNavigate } from "react-router-dom";

import { User, CalendarDays, LogOut } from "lucide-react";

import { ROUTES } from "../../../shared/constants/routes";

import { useAuth } from "../../../shared/context/CustomerAuthContext";

const AccountSidebar = () => {
  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const menu = [
    {
      label: "Account",
      icon: User,
      to: ROUTES.ACCOUNT,
    },
    {
      label: "My Bookings",
      icon: CalendarDays,
      to: ROUTES.ACCOUNT_BOOKINGS,
    },
  ];

  return (
    <div
      className="
        bg-white
        border
        border-gray-100
        rounded-3xl
        p-6
        sticky
        top-28
      "
    >
      {/* User */}

      <div className="flex items-center gap-4 mb-8">

        <div
          className="
            w-14
            h-14
            rounded-full
            bg-red-100
            text-red-600
            font-bold
            text-xl
            flex
            items-center
            justify-center
          "
        >
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>

        <div>

          <h2 className="font-bold text-lg">
            {user?.name}
          </h2>

          <p className="text-sm text-gray-500">
            {user?.email}
          </p>

        </div>

      </div>

      {/* Navigation */}

      <div className="space-y-2">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === ROUTES.ACCOUNT}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                transition-all
                ${
                  isActive
                    ? "bg-red-600 text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }
              `
              }
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.label}
              </span>
            </NavLink>
          );
        })}

      </div>

      {/* Divider */}

      <div className="border-t border-gray-100 my-8" />

      {/* Logout */}

      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
        className="
          w-full
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-xl
          text-red-600
          hover:bg-red-50
          transition-all
        "
      >
        <LogOut size={20} />

        <span className="font-medium">
          Logout
        </span>
      </button>

    </div>
  );
};

export default AccountSidebar;