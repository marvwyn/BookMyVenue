import { useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { fetchVenueAvailabilityApi } from "../../venues/api/venue.api";

const DateRangeCalendar = ({
  venueId,
  value,
  onChange,
}) => {
  const [bookedRanges, setBookedRanges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAvailability();
  }, [venueId]);

  const loadAvailability = async () => {
    try {
      setLoading(true);

      const response =
        await fetchVenueAvailabilityApi(
          venueId
        );

      setBookedRanges(
        response?.data ?? []
      );
    } catch (error) {
      console.error(
        "Failed to load availability",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const normalizeDate = (dateString) => {
    const date = new Date(dateString);
  
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
  };

  const disabledDates = useMemo(() => {
    return bookedRanges.map((booking) => ({
      from: normalizeDate(booking.startDate),
      to: normalizeDate(booking.endDate),
    }));
  }, [bookedRanges]);

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">

      <div className="flex items-center justify-between mb-5">

        <h2 className="text-lg font-bold">
          Select Booking Dates
        </h2>

        {loading && (
          <span className="text-sm text-gray-400">
            Loading...
          </span>
        )}

      </div>

      <DayPicker
        mode="range"
        selected={value}
        onSelect={onChange}
        numberOfMonths={2}
        pagedNavigation
        showOutsideDays
        fixedWeeks
        disabled={[
          {
            before: today,
          },
          ...disabledDates,
        ]}
      />

      <div className="flex flex-wrap gap-5 mt-6 text-sm">

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border border-gray-300 bg-white" />
          <span>Available</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-300" />
          <span>Booked</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500" />
          <span>Selected</span>
        </div>

      </div>

      {bookedRanges.length > 0 && (
        <div className="mt-6 border-t pt-5">

          <h3 className="font-semibold text-sm mb-3">
            Upcoming Bookings
          </h3>

          <div className="space-y-2 max-h-44 overflow-y-auto">

            {bookedRanges.map((booking) => (
              <div
                key={booking.id}
                className="flex justify-between text-sm text-gray-600 border rounded-lg px-3 py-2"
              >
                <span>
                  {new Date(
                    booking.startDate
                  ).toLocaleDateString()}
                </span>

                <span>—</span>

                <span>
                  {new Date(
                    booking.endDate
                  ).toLocaleDateString()}
                </span>
              </div>
            ))}

          </div>

        </div>
      )}

    </div>
  );
};

export default DateRangeCalendar;