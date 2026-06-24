import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createBookingApi,
  fetchVenueByIdApi,
} from "../api/bookings.api";
import MainLayout from "../../common/CustomerLayout";
import { ROUTES } from "../../../shared/constants/routes";
import BackButton from "../../common/BackButton";

const BookVenuePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    guestCount: 10,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchVenueByIdApi(id);
        const v = res.data?.data ?? res.data;
        if (v.status !== "APPROVED") {
          navigate(`/venues/${id}`, { replace: true });
          return;
        }
        setVenue(v);
      } catch {
        setError("Failed to load venue.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);
// console.log(venue)
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

const adjustGuests = (itm) =>
  setForm((prev) => ({
    ...prev,
    guestCount: Math.min(
      venue?.capacity || 200,
      Math.max(1, prev.guestCount + itm)
    ),
  }));

  const handleSubmit = async () => {
    setError("");
    if (!form.startDate || !form.endDate) {
      setError("Please fill in all required fields.");
      return;
    }
    if (new Date(form.endDate) < new Date(form.startDate)) {
      setError("End date must be after start date.");
      return;
    }
    try {
      setSubmitting(true);

      await createBookingApi({
        venueId: id,
        startDate: form.startDate,
        endDate: form.endDate,
        guestCount: Number(form.guestCount),
        eventType:venue?.type
      });

      setSuccess(true);

      setTimeout(() => {
        navigate(ROUTES.VENUES);
      }, 2000);
    } catch (err) {
      setError(err?.response?.data?.message ?? "Booking failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const calcDays = () => {
    if (!form.startDate || !form.endDate) return null;
    const diff =
      (new Date(form.endDate) - new Date(form.startDate)) / 86400000 + 1;
    return diff > 0 ? diff : null;
  };

  const days = calcDays();
  const total = days && venue?.price ? days * venue?.price : null;

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto ">
        <BackButton/>
        <div className=" bg-white border my-4 border-[1.5px] border-gray-100 rounded-[20px] p-6 flex justify-between items center">
          <p className="font-extrabold pt-2 text-lg  text-black">
            Make Your Booking Request
          </p>
          <div>
            <h1 className="text-red-600 mb-1">{venue?.name}</h1>
            <p className="text-black text-sm text-end">
              📍 {venue?.city || venue?.address || "Location TBD"}
            </p>
          </div>
        </div>

        <div className="">
          <div className="space-y-5">
            {/* Dates */}
            <div className="bg-white border border-[1.5px] border-gray-100 rounded-[20px] p-6">
              <p className="sectionTitle">
                <span>📅</span> Select dates
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="selectionTitle block">
                    Start date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={handleChange}
                    className="inputClass"
                  />
                </div>
                <div>
                  <label className="selectionTitle block">
                    End date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    min={
                      form.startDate || new Date().toISOString().split("T")[0]
                    }
                    onChange={handleChange}
                    className="inputClass"
                  />
                </div>
              </div>
            </div>

            {/* Guests */}
            <div className="bg-white border border-[1.5px] border-gray-100 rounded-[20px] p-6">
              <p className="sectionTitle">
                <span>👥</span> Number of guests
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => adjustGuests(-1)}
                  className="w-10 h-10 rounded-full border border-[1.5px] border-gray-200 text-xl font-bold flex items-center justify-center hover:border-gray-900 hover:bg-gray-50 transition-all"
                >
                  −
                </button>

                <input
                  type="number"
                  min="1"
                  max={venue?.capacity || 500}
                  value={form.guestCount}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      guestCount: Math.max(
                        1,
                        Math.min(
                          venue?.capacity || 500,
                          Number(e.target.value) || 1,
                        ),
                      ),
                    }))
                  }
                  className="w-24 h-10 text-center border border-gray-200 rounded-lg font-bold text-lg focus:outline-none focus:border-red-500"
                />

                <button
                  onClick={() => adjustGuests(1)}
                  className="w-10 h-10 rounded-full border border-[1.5px] border-gray-200 text-xl font-bold flex items-center justify-center hover:border-gray-900 hover:bg-gray-50 transition-all"
                >
                  +
                </button>

                {venue?.capacity && (
                  <span className="text-xs text-gray-400 ml-1">
                    Max {venue.capacity} guests
                  </span>
                )}
              </div>
            </div>

            <div className="lg:sticky lg:top-[88px]">
              <div className="bg-white border border-[1.5px] border-gray-100 rounded-[20px] p-6 space-y-4">
                <p className="sectionTitle">
                  Booking Details
                </p>

                <div className="pb-4 border-b border-gray-100">
                  {venue?.images?.length > 0 ? (
                    <img
                      src={venue?.images[0]}
                      alt={venue?.name}
                      className="w-full h-full object-cover rounded-xl mb-3"
                    />
                  ) : (
                    <div className="w-full h-[120px] bg-gray-100 rounded-xl mb-3" />
                  )}
                  <p className="font-bold text-gray-900 text-sm">
                    {venue?.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    📍 {venue?.city || venue?.address || "—"}
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Rate</span>
                    <span className="font-medium">
                      {venue?.price
                        ? `${venue?.currency ?? "INR"} ${venue?.price} / day`
                        : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium">
                      {days ? `${days} ${days === 1 ? "day" : "days"}` : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Guests</span>
                    <span className="font-medium">{form.guestCount}</span>
                  </div>
                </div>

                {total && (
                  <div className="flex justify-between text-base font-extrabold pt-3 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-red-600">
                      {venue?.currency ?? "INR"} {total.toLocaleString()}
                    </span>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {submitting ? "Sending request..." : "Confirm booking"}
                </button>

                <p className="text-xs text-gray-400 text-center leading-relaxed">
                  You won't be charged yet. The owner will confirm your request.
                </p>
              </div>
            </div>
          </div>
        </div>
        {success && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 text-center max-w-sm w-full">
              <div className="text-5xl mb-4">✅</div>

              <h2 className="text-xl font-bold text-green-600">
                Booking Successful
              </h2>

              <p className="text-gray-500 mt-2">
                Your booking request has been submitted successfully.
              </p>

              <p className="text-sm text-gray-400 mt-4">
                Redirecting to your Venues
              </p>
            </div>
          </div>
        )}
        {error && (
          <p className="text-sm mt-4 text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            {error}
          </p>
        )}
      </div>
    </MainLayout>
  );
};

export default BookVenuePage;
