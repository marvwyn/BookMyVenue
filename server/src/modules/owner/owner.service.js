import prisma from "../../shared/config/db.js";

import ApiError from "../../shared/utils/apiError.js";

import { STATUS_CODES } from "../../shared/constants/statusCodes.js";

import { generateAccessToken } from "../../shared/utils/jwt.js";

export const onboardOwnerService = async (
  userId,
  venueData
) => {

  const existingOwnerRole =
    await prisma.userRole.findFirst({
      where: {
        userId,
        role: "OWNER",
      },
    });

  if (existingOwnerRole) {
    throw new ApiError(
      STATUS_CODES.BAD_REQUEST,
      "User is already an owner"
    );
  }

  await prisma.$transaction(async (tx) => {

    await tx.userRole.create({
      data: {
        userId,
        role: "OWNER",
      },
    });

    await tx.venue.create({
      data: {

        ownerId: userId,

        name: venueData.name,

        type: venueData.type,

        city: venueData.city,

        address: venueData.address,

        description:
          venueData.description,

        capacity:
          venueData.capacity
            ? Number(venueData.capacity)
            : null,

        price:
          venueData.price
            ? Number(venueData.price)
            : null,

        amenities:
          venueData.amenities || [],

        images:
          venueData.images || [],
      },
    });

  });

  const user =
    await prisma.user.findUnique({

      where: {
        id: userId,
      },

      include: {
        roles: true,
      },

    });

  const accessToken =
    generateAccessToken({

      userId: user.id,

      roles:
        user.roles.map(
          role => role.role
        ),

    });

  return {

    accessToken,

    user: {

      id: user.id,

      name: user.name,

      email: user.email,

      roles:
        user.roles.map(
          role => role.role
        ),

    },

  };

};