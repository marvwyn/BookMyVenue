import { useAuth } from "../../../shared/context/CustomerAuthContext";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosInstance from "../../../shared/services/axios";
import { API_ROUTES } from "../../../shared/constants/apiRoutes";
import { becomePartnerApi } from "../api/owner.api";

const venueSchema = z.object({
  name: z.string().min(1, "Venue name is required"),
  type: z.enum(
    [
      "AUDITORIUM",
      "BANQUET_HALL",
      "CAFE",
      "RESTAURANT",
      "CONFERENCE_ROOM",
      "STUDIO",
      "OUTDOOR_SPACE",
      "OTHER",
    ],
    { errorMap: () => ({ message: "Select a venue type" }) },
  ),
  city: z.string().min(1, "City is required"),
});

const VENUE_TYPES = [
  { value: "AUDITORIUM", label: "Auditorium" },
  { value: "BANQUET_HALL", label: "Banquet Hall" },
  { value: "CAFE", label: "Café" },
  { value: "RESTAURANT", label: "Restaurant" },
  { value: "CONFERENCE_ROOM", label: "Conference Room" },
  { value: "STUDIO", label: "Studio" },
  { value: "OUTDOOR_SPACE", label: "Outdoor Space" },
  { value: "OTHER", label: "Other" },
];

const BecomePartnerModal = ({ onClose }) => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(venueSchema) });

  const onSubmit = async (data) => {
    try {
      const res = await becomePartnerApi({
        name: data.name,
        type: data.type,
        city: data.city,
      });

      login(res.user, res.accessToken);
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-7 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl leading-none"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Become a Partner
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Register your venue and start accepting bookings.
        </p>

        <div className="flex flex-col gap-4">
   
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Venue Name
            </label>
            <input
              {...register("name")}
              placeholder="e.g. The Grand Hall"
              className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Venue Type
            </label>
            <select
              {...register("type")}
              className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition bg-white"
            >
              <option value="">Select type</option>
              {VENUE_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
            )}
          </div>

   
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              {...register("city")}
              placeholder="e.g. Mumbai"
              className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition"
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
            )}
          </div>

          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full h-12 rounded-xl bg-red-600 text-white font-semibold mt-2 disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Register My Venue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BecomePartnerModal;
