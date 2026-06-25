import { useAuth } from "../../../shared/context/CustomerAuthContext";

import React, { useState } from "react";
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

  address: z.string().min(1, "Address is required"),

  description: z.string().optional(),

  capacity: z.string().optional(),

  price: z.string().optional(),
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
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(venueSchema),
    defaultValues: {
      name: "",
      type: "",
      city: "",
      address: "",
      description: "",
      capacity: "",
      price: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("type", data.type);
      formData.append("city", data.city);
      formData.append("address", data.address);
      formData.append("description", data.description || "");
      formData.append("capacity", data.capacity || "");
      formData.append("price", data.price || "");

      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      const res = await becomePartnerApi(formData);

      login(res.user, res.accessToken);
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="
        bg-white
        rounded-2xl
        shadow-xl
        w-full
        max-w-2xl
        max-h-[90vh]
        overflow-y-auto
        relative
        pointer-events-auto
      "
        >
          {/* Header */}
          <div className="sticky top-0 bg-white z-10 border-b px-6 py-4">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-900">
              Become a Partner
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Register your venue and start accepting bookings.
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            {/* Venue Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Venue Name
              </label>

              <input
                {...register("name")}
                placeholder="e.g. The Grand Hall"
                className="
              w-full
              h-12
              px-4
              rounded-xl
              border
              border-gray-300
              focus:border-red-500
              focus:ring-4
              focus:ring-red-100
              outline-none
            "
              />

              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Venue Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Venue Type
              </label>

              <select
                {...register("type")}
                className="
              w-full
              h-12
              px-4
              rounded-xl
              border
              border-gray-300
              bg-white
              focus:border-red-500
              focus:ring-4
              focus:ring-red-100
              outline-none
            "
              >
                <option value="">Select type</option>

                {VENUE_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>

              {errors.type && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.type.message}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>

              <input
                {...register("city")}
                placeholder="e.g. Mumbai"
                className="
              w-full
              h-12
              px-4
              rounded-xl
              border
              border-gray-300
              focus:border-red-500
              focus:ring-4
              focus:ring-red-100
              outline-none
            "
              />

              {errors.city && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>

              <input
                {...register("address")}
                placeholder="Venue address"
                className="
              w-full
              h-12
              px-4
              rounded-xl
              border
              border-gray-300
              focus:border-red-500
              focus:ring-4
              focus:ring-red-100
              outline-none
            "
              />

              {errors.address && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>

              <textarea
                rows={4}
                {...register("description")}
                placeholder="Describe your venue..."
                className="
              w-full
              px-4
              py-3
              rounded-xl
              border
              border-gray-300
              focus:border-red-500
              focus:ring-4
              focus:ring-red-100
              outline-none
            "
              />
            </div>

            {/* Capacity & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity
                </label>

                <input
                  type="number"
                  {...register("capacity")}
                  placeholder="100"
                  className="
                w-full
                h-12
                px-4
                rounded-xl
                border
                border-gray-300
                focus:border-red-500
                focus:ring-4
                focus:ring-red-100
                outline-none
              "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Per Day (₹)
                </label>

                <input
                  type="number"
                  {...register("price")}
                  placeholder="5000"
                  className="
                w-full
                h-12
                px-4
                rounded-xl
                border
                border-gray-300
                focus:border-red-500
                focus:ring-4
                focus:ring-red-100
                outline-none
              "
                />
              </div>
            </div>

            {/* Upload Photos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Venue Photos
              </label>

              <label
                className="
              border-2
              border-dashed
              border-gray-300
              rounded-2xl
              p-8
              flex
              flex-col
              items-center
              justify-center
              text-center
              cursor-pointer
              hover:border-red-400
              hover:bg-red-50
              transition
            "
              >
                <span className="text-5xl mb-2">📸</span>

                <p className="font-semibold">Upload Venue Photos</p>

                <p className="text-sm text-gray-500 mt-1">
                  JPG, PNG • Multiple images allowed
                </p>

                <span className="mt-4 px-4 py-2 rounded-xl bg-red-600 text-white text-sm">
                  Choose Photos
                </span>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {/* Selected Images Preview */}
            {selectedFiles.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">
                  Selected Images ({selectedFiles.length})
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="relative rounded-xl overflow-hidden border"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt=""
                        className="w-full h-32 object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedFiles((prev) =>
                            prev.filter((_, i) => i !== index),
                          )
                        }
                        className="
                      absolute
                      top-2
                      right-2
                      w-8
                      h-8
                      rounded-full
                      bg-white
                      shadow
                    "
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="pt-4 border-t">
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="
              w-full
              h-12
              rounded-xl
              bg-red-600
              hover:bg-red-700
              text-white
              font-semibold
              transition
              disabled:opacity-60
            "
              >
                {isSubmitting ? "Submitting..." : "Register My Venue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomePartnerModal;
