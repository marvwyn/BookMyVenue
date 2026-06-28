import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  CalendarDays,
  Users,
  MapPin,
  Wallet,
  BadgeInfo,
  Clock,
} from "lucide-react";

import MainLayout from "../../common/CustomerLayout";
import BackButton from "../../common/BackButton";

import {
    fetchBookingDetailsApi,
  } from "../../bookings/api/bookings.api";

const BookingDetailsPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooking();
  }, [id]);

  const loadBooking = async () => {
    try {
      setLoading(true);

      const response =
        await fetchBookingDetailsApi(id);

      setBooking(
        response.data ?? response
      );
    } catch (error) {
      navigate("/account/bookings");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

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

  if (loading) {
    return (
      <MainLayout>
        <div className="py-40 text-center">
          Loading booking...
        </div>
      </MainLayout>
    );
  }

  if (!booking) {
    return (
      <MainLayout>
        <div className="py-40 text-center">
          Booking not found.
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-5 py-32">

        <BackButton />

        <div className="grid lg:grid-cols-3 gap-8 mt-6">

          {/* LEFT */}

          <div className="lg:col-span-2 space-y-6">

            {/* Hero */}

            <div className="bg-white rounded-3xl overflow-hidden border border-gray-100">

              {booking.venue.images?.length > 0 ? (

                <img
                  src={booking.venue.images[0]}
                  alt={booking.venue.name}
                  className="w-full h-[360px] object-cover"
                />

              ) : (

                <div className="h-[360px] bg-gray-100 flex items-center justify-center text-7xl">
                  🏛️
                </div>

              )}

              <div className="p-8">

                <div className="flex items-start justify-between">

                  <div>

                    <h1 className="text-3xl font-bold">
                      {booking.venue.name}
                    </h1>

                    <div className="flex items-center gap-2 mt-3 text-gray-500">

                      <MapPin size={18} />

                      {booking.venue.city}

                    </div>

                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusClass(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>

                </div>

                {booking.venue.description && (

                  <p className="mt-6 text-gray-600 leading-7">

                    {booking.venue.description}

                  </p>

                )}

              </div>

            </div>

            {/* Booking Information */}

            <div className="bg-white rounded-3xl border border-gray-100 p-8">

              <h2 className="text-xl font-bold mb-8">
                Booking Information
              </h2>

              <div className="grid md:grid-cols-2 gap-8">

                <div className="flex gap-4">

                  <CalendarDays
                    className="text-red-600 mt-1"
                    size={20}
                  />

                  <div>

                    <p className="text-sm text-gray-400">
                      Booking Dates
                    </p>

                    <p className="font-semibold mt-1">

                      {formatDate(
                        booking.startDate
                      )}

                    </p>

                    <p className="font-semibold">

                      {formatDate(
                        booking.endDate
                      )}

                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <Users
                    className="text-red-600 mt-1"
                    size={20}
                  />

                  <div>

                    <p className="text-sm text-gray-400">
                      Guests
                    </p>

                    <p className="font-semibold mt-1">

                      {booking.guestCount}

                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <BadgeInfo
                    className="text-red-600 mt-1"
                    size={20}
                  />

                  <div>

                    <p className="text-sm text-gray-400">
                      Event Type
                    </p>

                    <p className="font-semibold mt-1">

                      {booking.eventType || "-"}

                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <Clock
                    className="text-red-600 mt-1"
                    size={20}
                  />

                  <div>

                    <p className="text-sm text-gray-400">
                      Booked On
                    </p>

                    <p className="font-semibold mt-1">

                      {formatDate(
                        booking.createdAt
                      )}

                    </p>

                  </div>

                </div>

              </div>

            </div>
            </div>

{/* RIGHT SIDEBAR */}

<div>

  <div className="sticky top-28 bg-white rounded-3xl border border-gray-100 p-8">

    <h2 className="text-xl font-bold mb-6">
      Booking Summary
    </h2>

    <div className="space-y-5">

      <div className="flex justify-between items-center">

        <span className="text-gray-500">
          Status
        </span>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
            booking.status
          )}`}
        >
          {booking.status}
        </span>

      </div>

      <div className="flex justify-between items-center">

        <span className="text-gray-500">
          Guests
        </span>

        <span className="font-semibold">
          {booking.guestCount}
        </span>

      </div>

      <div className="flex justify-between items-center">

        <span className="text-gray-500">
          Event
        </span>

        <span className="font-semibold">
          {booking.eventType || "-"}
        </span>

      </div>

      <div className="flex justify-between items-center">

        <span className="text-gray-500">
          Duration
        </span>

        <span className="font-semibold">

          {Math.ceil(
            (new Date(booking.endDate) -
              new Date(booking.startDate)) /
              (1000 * 60 * 60 * 24)
          ) + 1}
          {" "}
          day(s)

        </span>

      </div>

    </div>

    <hr className="my-6" />

    <div className="flex items-center justify-between">

      <div className="flex items-center gap-2">

        <Wallet
          size={20}
          className="text-red-600"
        />

        <span className="font-medium">
          Total Paid
        </span>

      </div>

      <span className="text-2xl font-bold text-red-600">

        ₹
        {Number(
          booking.totalPrice ?? 0
        ).toLocaleString()}

      </span>

    </div>

    {booking.notes && (

      <>

        <hr className="my-6" />

        <div>

          <h3 className="font-semibold mb-3">
            Notes
          </h3>

          <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 text-gray-600 leading-7">

            {booking.notes}

          </div>

        </div>

      </>

    )}

    <hr className="my-6" />

    <div>

      <h3 className="font-semibold mb-3">
        Venue Address
      </h3>

      <p className="text-gray-600 leading-7">

        {booking.venue.address || "-"}

      </p>

    </div>

    {booking.status === "CONFIRMED" &&
      new Date(booking.startDate) > new Date() && (

      <button
        className="
          w-full
          mt-8
          py-3
          rounded-xl
          bg-red-600
          text-white
          font-semibold
          hover:bg-red-700
          transition
        "
        onClick={() => {
          // TODO
          // call cancel booking api
        }}
      >
        Cancel Booking
      </button>

    )}

  </div>

</div>

</div>

</div>

</MainLayout>
);
};

export default BookingDetailsPage;