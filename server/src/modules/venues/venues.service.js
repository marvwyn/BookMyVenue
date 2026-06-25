import prisma from "../../shared/config/db.js";
import { ERROR_MESSAGES } from "../../shared/constants/messages.js";
import { STATUS_CODES } from "../../shared/constants/statusCodes.js";
import ApiError from "../../shared/utils/apiError.js";
import { generateAccessToken } from "../../shared/utils/jwt.js";

export const createVenueService = async (venueData, ownerId) => {
  return prisma.venue.create({
    data: {
      name: venueData.name,
      type: venueData.type,

      ownerId,

      city: venueData.city,
      address: venueData.address,

      description: venueData.description,

      capacity: venueData.capacity,
      price: venueData.price,

      images: venueData.images || [],
    },
  });
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

export const getMyVenuesService = async (ownerId) => {
  return prisma.venue.findMany({
    where: {
      ownerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getVenueByIdService = async (id) => {
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

export const updateVenueService = async (id, venueData, ownerId) => {
  const venue = await prisma.venue.findUnique({
    where: {
      id,
    },
  });

  if (!venue) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.VENUE_NOT_FOUND);
  }

  if (venue.ownerId !== ownerId) {
    throw new ApiError(STATUS_CODES.FORBIDDEN, "You cannot update this venue");
  }

  return prisma.venue.update({
    where: {
      id,
    },
    data: {
      name: venueData.name,
      type: venueData.type,

      city: venueData.city,
      address: venueData.address,

      description: venueData.description,

      capacity: venueData.capacity,
      price: venueData.price,

      images: venueData.images,
    },
  });
};

export const deleteVenueService = async (id, ownerId) => {
  const venue = await prisma.venue.findUnique({
    where: {
      id,
    },
  });

  if (!venue) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.VENUE_NOT_FOUND);
  }

  if (venue.ownerId !== ownerId) {
    throw new ApiError(STATUS_CODES.FORBIDDEN, "You cannot delete this venue");
  }

  await prisma.venue.delete({
    where: {
      id,
    },
  });

  return true;
};

export const becomeOwner = async (userId, venueData) => {
  const existingOwnerRole = await prisma.userRole.findFirst({
    where: { userId, role: "OWNER" },
  });

  if (existingOwnerRole) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "User is already an owner");
  }

  await prisma.$transaction(async (tx) => {
    await tx.userRole.create({
      data: { userId, role: "OWNER" },
    });

    await tx.venue.create({
      data: {
        ownerId: userId,
        name: venueData.name,
        type: venueData.type,
        city: venueData.city,
        address: venueData.address,
        description: venueData.description,

        capacity: venueData.capacity ? Number(venueData.capacity) : null,

        price: venueData.price ? Number(venueData.price) : null,

        images: venueData.images || [],
      },
    });
  });

  const userWithRoles = await prisma.user.findUnique({
    where: { id: userId },
    include: { roles: true },
  });

  const accessToken = generateAccessToken({
    userId: userWithRoles.id,
    roles: userWithRoles.roles.map((r) => r.role),
  });

  return {
    accessToken,
    user: {
      id: userWithRoles.id,
      name: userWithRoles.name,
      email: userWithRoles.email,
      roles: userWithRoles.roles.map((r) => r.role),
    },
  };
};
