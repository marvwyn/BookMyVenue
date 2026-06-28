import { useEffect, useState } from "react";

import {
  User,
  Mail,
  Phone,
  Shield,
  CalendarDays,
} from "lucide-react";

import { Link } from "react-router-dom";

import { fetchAccountApi } from "../api/account.api";

import { ROUTES } from "../../../shared/constants/routes";

const AccountPage = () => {
  const [account, setAccount] = useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadAccount();
  }, []);

  const loadAccount = async () => {
    try {
      setLoading(true);

      const response =
        await fetchAccountApi();

      setAccount(
        response.data ?? response
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-24">
        Loading account...
      </div>
    );
  }

  if (!account) {
    return (
      <div className="text-center py-24">
        Unable to load account.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-white rounded-3xl border border-gray-100 p-8">

        <div className="flex flex-col md:flex-row md:items-center gap-6">

          <div
            className="
              w-24
              h-24
              rounded-full
              bg-red-100
              text-red-600
              flex
              items-center
              justify-center
              text-4xl
              font-bold
            "
          >
            {account.name?.charAt(0)}
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              {account.name}
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome back to BookMyVenue.
            </p>

          </div>

        </div>

      </div>

      {/* Account Information */}

      <div className="bg-white rounded-3xl border border-gray-100 p-8">

        <h2 className="text-xl font-bold mb-8">
          Personal Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="flex items-start gap-4">

            <User
              className="text-red-600 mt-1"
              size={20}
            />

            <div>

              <p className="text-sm text-gray-400">
                Full Name
              </p>

              <p className="font-semibold mt-1">
                {account.name}
              </p>

            </div>

          </div>

          <div className="flex items-start gap-4">

            <Mail
              className="text-red-600 mt-1"
              size={20}
            />

            <div>

              <p className="text-sm text-gray-400">
                Email
              </p>

              <p className="font-semibold mt-1">
                {account.email}
              </p>

            </div>

          </div>

          <div className="flex items-start gap-4">

            <Phone
              className="text-red-600 mt-1"
              size={20}
            />

            <div>

              <p className="text-sm text-gray-400">
                Phone
              </p>

              <p className="font-semibold mt-1">
                {account.phone}
              </p>

            </div>

          </div>

          <div className="flex items-start gap-4">

            <Shield
              className="text-red-600 mt-1"
              size={20}
            />

            <div>

              <p className="text-sm text-gray-400">
                Roles
              </p>

              <div className="flex flex-wrap gap-2 mt-2">

                {account.roles?.map((role) => (
                  <span
                    key={role}
                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-red-50
                      text-red-600
                      text-xs
                      font-semibold
                    "
                  >
                    {role}
                  </span>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="bg-white rounded-3xl border border-gray-100 p-8">

        <h2 className="text-xl font-bold mb-6">
          Quick Actions
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">

          <Link
            to={ROUTES.ACCOUNT_BOOKINGS}
            className="
              border
              border-gray-100
              rounded-2xl
              p-6
              hover:border-red-500
              hover:shadow-md
              transition-all
            "
          >

            <CalendarDays
              className="text-red-600 mb-4"
              size={34}
            />

            <h3 className="font-bold text-lg">
              My Bookings
            </h3>

            <p className="text-gray-500 mt-2">

              View all your current and
              previous bookings.

            </p>

          </Link>

        </div>

      </div>

    </div>
  );
};

export default AccountPage;