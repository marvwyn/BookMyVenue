import { useNavigate } from "react-router-dom";

import { CalendarDays, Users, MapPin } from "lucide-react";

import { ROUTES } from "../../../shared/constants/routes";

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();

  const getStatusClass = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700";

      case "COMPLETED":
        return "bg-blue-100 text-blue-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-gray-100
        overflow-hidden
        hover:shadow-lg
        transition-all
      "
    >
      {/* Image */}

      <div className="relative h-52">

        {booking.venue?.images?.length > 0 ? (
          <img
            src={booking.venue.images[0]}
            alt={booking.venue.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="
              w-full
              h-full
              bg-gray-100
              flex
              items-center
              justify-center
              text-5xl
            "
          >
            🏛️
          </div>
        )}

        <span
          className={`
            absolute
            top-4
            right-4
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            ${getStatusClass(booking.status)}
          `}
        >
          {booking.status}
        </span>

      </div>

      {/* Body */}

      <div className="p-6">

        <h2 className="text-xl font-bold text-gray-900">
          {booking.venue?.name}
        </h2>

        <div className="flex items-center gap-2 text-gray-500 mt-2">

          <MapPin size={16} />

          <span>
            {booking.venue?.city}
          </span>

        </div>

        <div className="mt-6 space-y-3">

          <div className="flex items-center gap-3">

            <CalendarDays size={18} className="text-red-600" />

            <span className="text-gray-700">

              {formatDate(booking.startDate)}

              {"  "}—{"  "}

              {formatDate(booking.endDate)}

            </span>

          </div>

          <div className="flex items-center gap-3">

            <Users size={18} className="text-red-600" />

            <span className="text-gray-700">

              {booking.guestCount} Guests

            </span>

          </div>

        </div>

        <div className="flex items-center justify-between mt-8">

          <div>

            <p className="text-xs text-gray-400">
              Total
            </p>

            <p className="text-2xl font-bold text-red-600">

              ₹
              {Number(
                booking.totalPrice ?? 0
              ).toLocaleString()}

            </p>

          </div>

          <button
            onClick={() =>
              navigate(
                `${ROUTES.ACCOUNT_BOOKINGS}/${booking.id}`
              )
            }
            className="btn-primary"
          >
            View Details
          </button>

        </div>

      </div>
    </div>
  );
};

export default BookingCard;