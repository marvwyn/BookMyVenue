import prisma from "../../shared/config/db.js";
import { updateVenueLocation } from "../../shared/services/location/location.service.js";

import { ERROR_MESSAGES } from "../../shared/constants/messages.js";
import { STATUS_CODES } from "../../shared/constants/statusCodes.js";
import ApiError from "../../shared/utils/apiError.js";

export const createVenueService = async (
  venueData,
  ownerId
) => {

  const venue = await prisma.venue.create({

    data: {

      name: venueData.name,

      type: venueData.type,

      ownerId,

      city: venueData.city,

      address: venueData.address,

      placeId: venueData.placeId,

      latitude: Number(venueData.latitude),

      longitude: Number(venueData.longitude),

      description: venueData.description,

      capacity: venueData.capacity
        ? Number(venueData.capacity)
        : null,

      price: venueData.price
        ? Number(venueData.price)
        : null,

      images: venueData.images || [],

    },

  });

  await updateVenueLocation(

    venue.id,

    venue.latitude,

    venue.longitude

  );

  return venue;

};

export const getVenuesService = async () => {
  return prisma.venue.findMany({
    include: {
      owner: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getMyVenuesService = async (
  ownerId
) => {
  return prisma.venue.findMany({
    where: {
      ownerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getVenueByIdService = async (
  id
) => {
  return prisma.venue.findUnique({
    where: {
      id,
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const updateVenueService = async (
  id,
  venueData,
  ownerId
) => {
  const venue = await prisma.venue.findUnique({
    where: {
      id,
    },
  });

  if (!venue) {
    throw new ApiError(
      STATUS_CODES.NOT_FOUND,
      ERROR_MESSAGES.VENUE_NOT_FOUND
    );
  }

  if (venue.ownerId !== ownerId) {
    throw new ApiError(
      STATUS_CODES.FORBIDDEN,
      "You cannot update this venue"
    );
  }

  const updatedVenue =
    await prisma.venue.update({

      where: {

        id,

      },

      data: {

        name: venueData.name,

        type: venueData.type,

        city: venueData.city,

        address: venueData.address,

        placeId: venueData.placeId,

        latitude: Number(venueData.latitude),

        longitude: Number(venueData.longitude),

        description: venueData.description,

        capacity: venueData.capacity
          ? Number(venueData.capacity)
          : null,

        price: venueData.price
          ? Number(venueData.price)
          : null,

        images:
          venueData.images ??
          venue.images,

      },

    });

  await updateVenueLocation(

    updatedVenue.id,

    updatedVenue.latitude,

    updatedVenue.longitude

  );

  return updatedVenue;
};

export const deleteVenueService = async (
  id,
  ownerId
) => {
  const venue = await prisma.venue.findUnique({
    where: {
      id,
    },
  });

  if (!venue) {
    throw new ApiError(
      STATUS_CODES.NOT_FOUND,
      ERROR_MESSAGES.VENUE_NOT_FOUND
    );
  }

  if (venue.ownerId !== ownerId) {
    throw new ApiError(
      STATUS_CODES.FORBIDDEN,
      "You cannot delete this venue"
    );
  }

  await prisma.venue.delete({
    where: {
      id,
    },
  });

  return true;
};

export const getVenueAvailabilityService =
  async (venueId) => {

    return prisma.booking.findMany({

      where: {

        venueId,

        status: {
          not: "CANCELLED"
        }

      },

      select: {

        startDate: true,
        endDate: true

      },

      orderBy: {
        startDate: "asc"
      }

    });

  };

export const getNearbyVenuesService = async (
  latitude,
  longitude,
  limit = 20
) => {

  return prisma.$queryRaw`
  
      SELECT
  
        id,
  
        name,
  
        city,
  
        address,
  
        price,
  
        images,
  
        type,
  
        capacity,
  
        status,
  
        ST_Distance(
  
          location,
  
          ST_SetSRID(
  
            ST_MakePoint(
  
              ${longitude},
  
              ${latitude}
  
            ),
  
            4326
  
          )::geography
  
        ) AS distance
  
      FROM "Venue"
  
      WHERE status = 'APPROVED'
  
      ORDER BY distance
  
      LIMIT ${limit};
  
    `;

};