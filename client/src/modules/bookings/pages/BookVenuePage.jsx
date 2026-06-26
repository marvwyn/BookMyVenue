import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../../common/CustomerLayout";
import BackButton from "../../common/BackButton";

import DateRangeCalendar from "../components/DateRangeCalendar";
import GuestSelector from "../components/GuestSelector";
import BookingSummary from "../components/BookingSummary";

import {
  createBookingApi,
} from "../api/bookings.api";

import {
  fetchVenueByIdApi,
} from "../../venues/api/venue.api";

import { ROUTES } from "../../../shared/constants/routes";

import {
  showSuccess,
  showError,
} from "../../../shared/utils/toast";

const BookVenuePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const [range, setRange] = useState();

  const [guestCount, setGuestCount] = useState(10);

  useEffect(() => {
    loadVenue();
  }, [id]);

  const loadVenue = async () => {
    try {
      setLoading(true);

      const response = await fetchVenueByIdApi(id);

      const venueData =
        response.data?.data ?? response.data;

      if (
        !venueData ||
        venueData.status !== "APPROVED"
      ) {
        navigate(ROUTES.VENUES, {
          replace: true,
        });

        return;
      }

      setVenue(venueData);
    } catch (error) {
      setError("Unable to load venue.");
    } finally {
      setLoading(false);
    }
  };

  const startDate = range?.from;
  const endDate = range?.to;

  const totalDays = useMemo(() => {
    if (!startDate || !endDate) return 0;

    return (
      Math.ceil(
        (endDate - startDate) /
          (1000 * 60 * 60 * 24)
      ) + 1
    );
  }, [startDate, endDate]);

  const totalPrice = useMemo(() => {
    if (!venue?.price || !totalDays) return 0;

    return venue.price * totalDays;
  }, [venue, totalDays]);

  const formatDate = (date) => date.toLocaleDateString("en-CA");
  const handleBooking = async () => {
    setError("");
  
    if (!range?.from || !range?.to) {
      showError("Please select booking dates.");
      return;
    }
  
    if (
      venue.capacity &&
      guestCount > venue.capacity
    ) {
      showError(
        `Maximum capacity is ${venue.capacity} guests.`
      );
      return;
    }
  
    try {
      setSubmitting(true);
  
      await createBookingApi({
        venueId: venue.id,
        startDate: formatDate(range.from),
        endDate: formatDate(range.to),
        guestCount,
        eventType: venue.type,
      });
  
      showSuccess("Venue booked successfully!");
  
      setTimeout(() => {
        navigate(ROUTES.MY_BOOKINGS);
      }, 1200);
  
    } catch (err) {
      const message =
        err?.response?.data?.message ??
        "Unable to create booking.";
  
      setError(message);
      showError(message);
  
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto py-40 text-center">
          Loading venue...
        </div>
      </MainLayout>
    );
  }

  if (!venue) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto py-40 text-center">
          Venue not found.
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-5 py-32">

        <BackButton />

        <div className="mt-6 flex flex-col lg:flex-row gap-8">

          {/* Left */}

          <div className="flex-1 space-y-6">

            <div className="bg-white rounded-2xl border border-gray-100 p-6">

              <h1 className="text-2xl font-bold">
                {venue.name}
              </h1>

              <p className="text-gray-500 mt-1">
                📍 {venue.city}
              </p>

            </div>

            <DateRangeCalendar
              venueId={venue.id}
              value={range}
              onChange={setRange}
            />

            <GuestSelector
              value={guestCount}
              max={venue.capacity}
              onChange={setGuestCount}
            />

            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-red-600">
                {error}
              </div>
            )}

          </div>

          {/* Right */}

          <div className="lg:w-[380px]">

            <BookingSummary
              venue={venue}
              guestCount={guestCount}
              totalDays={totalDays}
              totalPrice={totalPrice}
              loading={submitting}
              onConfirm={handleBooking}
            />

          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default BookVenuePage;