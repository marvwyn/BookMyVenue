import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import MainLayout from "../../common/CustomerLayout";

import BackButton from "../../common/BackButton";

import ImageUploader from "../components/ImageUploader";

import { ownerOnboardingSchema } from "../validation/onboarding.schema";

import { onboardOwnerApi } from "../api/owner.api";

import {
  showSuccess,
  showError,
} from "../../../shared/utils/toast";

import { useAuth } from "../../../shared/context/CustomerAuthContext";

import { ROUTES } from "../../../shared/constants/routes";

const VENUE_TYPES = [
  {
    value: "AUDITORIUM",
    label: "Auditorium",
  },
  {
    value: "BANQUET_HALL",
    label: "Banquet Hall",
  },
  {
    value: "CAFE",
    label: "Cafe",
  },
  {
    value: "RESTAURANT",
    label: "Restaurant",
  },
  {
    value: "CONFERENCE_ROOM",
    label: "Conference Room",
  },
  {
    value: "STUDIO",
    label: "Studio",
  },
  {
    value: "OUTDOOR_SPACE",
    label: "Outdoor Space",
  },
  {
    value: "OTHER",
    label: "Other",
  },
];

const OwnerOnboardingPage = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [selectedFiles, setSelectedFiles] =
    useState([]);

  const {
    register,

    handleSubmit,

    formState: {
      errors,
      isSubmitting,
    },

  } = useForm({

    resolver:
      zodResolver(
        ownerOnboardingSchema
      ),

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

      if (selectedFiles.length === 0) {

        showError(
          "Please upload at least one venue image."
        );

        return;

      }

      const formData =
        new FormData();

      formData.append(
        "name",
        data.name
      );

      formData.append(
        "type",
        data.type
      );

      formData.append(
        "city",
        data.city
      );

      formData.append(
        "address",
        data.address
      );

      formData.append(
        "description",
        data.description
      );

      formData.append(
        "capacity",
        data.capacity
      );

      formData.append(
        "price",
        data.price
      );

      selectedFiles.forEach(
        (image) => {

          formData.append(
            "images",
            image
          );

        }
      );
      console.log("entered here");
      
      const response =
        await onboardOwnerApi(
          formData
        );

      login(
        response.data.user,
        response.data.accessToken
      );

      showSuccess(
        "Welcome! Your venue has been registered."
      );

      navigate(
        ROUTES.OWNER
      );

    } catch (error) {

      showError(
        error?.response?.data?.message ||
          "Unable to complete onboarding."
      );

    }

  };
  return (
    <MainLayout>

      <div className="max-w-5xl mx-auto px-5 py-32">

        <BackButton />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 mt-6"
        >

          {/* Hero */}

          <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-3xl p-10 text-white">

            <span className="inline-flex items-center rounded-full bg-white/20 px-4 py-1 text-sm font-medium">

              Become a BookMyVenue Partner

            </span>

            <h1 className="text-4xl font-bold mt-5">

              Start accepting venue bookings.

            </h1>

            <p className="mt-4 max-w-2xl text-red-50 leading-7">

              Create your first venue listing and start
              receiving booking requests from customers.
              You can always edit your venue details later.

            </p>

          </div>

          {/* Venue Information */}

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

            <div className="mb-8">

              <h2 className="text-2xl font-bold">

                Venue Information

              </h2>

              <p className="text-gray-500 mt-2">

                Basic information about your venue.

              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Venue Name */}

              <div className="md:col-span-2">

                <label className="block text-sm font-medium mb-2">

                  Venue Name

                </label>

                <input
                  {...register("name")}
                  placeholder="Grand Convention Hall"
                  className="inputClass"
                />

                {errors.name && (

                  <p className="text-sm text-red-500 mt-2">

                    {errors.name.message}

                  </p>

                )}

              </div>

              {/* Venue Type */}

              <div>

                <label className="block text-sm font-medium mb-2">

                  Venue Type

                </label>

                <select
                  {...register("type")}
                  className="inputClass"
                >

                  <option value="">

                    Select venue type

                  </option>

                  {VENUE_TYPES.map((type) => (

                    <option
                      key={type.value}
                      value={type.value}
                    >

                      {type.label}

                    </option>

                  ))}

                </select>

                {errors.type && (

                  <p className="text-sm text-red-500 mt-2">

                    {errors.type.message}

                  </p>

                )}

              </div>

              {/* City */}

              <div>

                <label className="block text-sm font-medium mb-2">

                  City

                </label>

                <input
                  {...register("city")}
                  placeholder="Kochi"
                  className="inputClass"
                />

                {errors.city && (

                  <p className="text-sm text-red-500 mt-2">

                    {errors.city.message}

                  </p>

                )}

              </div>

              {/* Address */}

              <div className="md:col-span-2">

                <label className="block text-sm font-medium mb-2">

                  Full Address

                </label>

                <textarea
                  rows={3}
                  {...register("address")}
                  placeholder="Enter the complete venue address..."
                  className="inputClass py-3"
                />

                {errors.address && (

                  <p className="text-sm text-red-500 mt-2">

                    {errors.address.message}

                  </p>

                )}

              </div>

            </div>

          </div>
                    {/* Venue Details */}

                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

<div className="mb-8">

  <h2 className="text-2xl font-bold">
    Venue Details
  </h2>

  <p className="text-gray-500 mt-2">
    Help customers understand your venue.
  </p>

</div>

<div className="space-y-6">

  {/* Description */}

  <div>

    <label className="block text-sm font-medium mb-2">

      Description

    </label>

    <textarea
      rows={6}
      {...register("description")}
      placeholder="Tell customers about your venue, facilities, nearby landmarks, parking availability, ideal events..."
      className="inputClass py-3"
    />

    <div className="flex justify-between mt-2">

      {errors.description ? (

        <p className="text-sm text-red-500">

          {errors.description.message}

        </p>

      ) : (

        <p className="text-xs text-gray-400">

          A good description improves bookings.

        </p>

      )}

    </div>

  </div>

  {/* Capacity & Price */}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    <div>

      <label className="block text-sm font-medium mb-2">

        Maximum Capacity

      </label>

      <input
        type="number"
        min="1"
        {...register("capacity")}
        placeholder="200"
        className="inputClass"
      />

      {errors.capacity && (

        <p className="text-sm text-red-500 mt-2">

          {errors.capacity.message}

        </p>

      )}

    </div>

    <div>

      <label className="block text-sm font-medium mb-2">

        Price Per Day (₹)

      </label>

      <input
        type="number"
        min="1"
        {...register("price")}
        placeholder="15000"
        className="inputClass"
      />

      {errors.price && (

        <p className="text-sm text-red-500 mt-2">

          {errors.price.message}

        </p>

      )}

    </div>

  </div>

</div>

</div>

{/* Venue Images */}

<div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

<div className="mb-8">

  <h2 className="text-2xl font-bold">

    Venue Photos

  </h2>

  <p className="text-gray-500 mt-2">

    Upload high-quality photos of your venue.
    The first image will be used as the cover photo.

  </p>

</div>

<ImageUploader
  files={selectedFiles}
  setFiles={setSelectedFiles}
/>

</div>

          {/* Information */}

          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">

            <div className="flex items-start gap-4">

              <div className="text-3xl">
                💡
              </div>

              <div>

                <h3 className="font-semibold text-amber-900">
                  Before you continue
                </h3>

                <p className="text-sm text-amber-700 mt-2 leading-6">

                  Your venue will be submitted for review after
                  registration. Once approved by an administrator,
                  it will become visible to customers for booking.

                </p>

              </div>

            </div>

          </div>

          {/* Footer */}

          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 pt-2">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-outline w-full md:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full md:w-auto px-10"
            >
              {isSubmitting
                ? "Creating Partner Account..."
                : "Become a Partner"}
            </button>

          </div>

        </form>

      </div>

    </MainLayout>
  );

};

export default OwnerOnboardingPage;