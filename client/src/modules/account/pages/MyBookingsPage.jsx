import { useEffect, useState } from "react";

import BookingCard from "../components/BookingCard";

import { fetchMyBookingsApi } from "../../bookings/api/bookings.api";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setLoading(true);

      const response =
        await fetchMyBookingsApi();

      setBookings(
        response.data ?? []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        Loading bookings...
      </div>
    );
  }

  return (
    <div>

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          My Bookings
        </h1>

        <p className="text-gray-500 mt-2">
          View your upcoming and previous venue bookings.
        </p>

      </div>

      {/* Empty */}

      {bookings.length === 0 && (
        <div
          className="
            bg-white
            rounded-3xl
            border
            border-gray-100
            py-24
            text-center
          "
        >

          <div className="text-6xl mb-5">
            📅
          </div>

          <h2 className="text-2xl font-bold">
            No bookings yet
          </h2>

          <p className="text-gray-500 mt-3">

            Once you book a venue it will
            appear here.

          </p>

        </div>
      )}

      {/* List */}

      {bookings.length > 0 && (

        <div className="space-y-6">

          {bookings.map((booking) => (

            <BookingCard
              key={booking.id}
              booking={booking}
            />

          ))}

        </div>

      )}

    </div>
  );
};

export default MyBookingsPage;