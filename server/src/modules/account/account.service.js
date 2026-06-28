import prisma from "../../shared/config/db.js";

import ApiError from "../../shared/utils/apiError.js";

import { STATUS_CODES } from "../../shared/constants/statusCodes.js";

import { ERROR_MESSAGES } from "../../shared/constants/messages.js";

export const getMyAccountService = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,

      name: true,
      email: true,
      phone: true,

      createdAt: true,
      updatedAt: true,

      roles: {
        select: {
          role: true,
        },
      },
    },
  });

  if (!user) {
    throw new ApiError(
      STATUS_CODES.NOT_FOUND,
      ERROR_MESSAGES.USER_NOT_FOUND
    );
  }

  return {
    ...user,

    roles: user.roles.map((role) => role.role),
  };
};

export const updateMyAccountService = async (
  userId,
  data
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!existingUser) {
    throw new ApiError(
      STATUS_CODES.NOT_FOUND,
      ERROR_MESSAGES.USER_NOT_FOUND
    );
  }

  if (
    data.phone &&
    data.phone !== existingUser.phone
  ) {
    const phoneExists =
      await prisma.user.findFirst({
        where: {
          phone: data.phone,

          NOT: {
            id: userId,
          },
        },
      });

    if (phoneExists) {
      throw new ApiError(
        STATUS_CODES.BAD_REQUEST,
        "Phone number already in use"
      );
    }
  }

  const updatedUser =
    await prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        name: data.name,
        phone: data.phone,
      },

      select: {
        id: true,

        name: true,
        email: true,
        phone: true,

        createdAt: true,
        updatedAt: true,

        roles: {
          select: {
            role: true,
          },
        },
      },
    });

  return {
    ...updatedUser,

    roles: updatedUser.roles.map(
      (role) => role.role
    ),
  };
};