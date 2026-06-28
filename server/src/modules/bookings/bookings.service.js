import prisma from "../../shared/config/db.js";

import ApiError from "../../shared/utils/apiError.js";

import { STATUS_CODES } from "../../shared/constants/statusCodes.js";

export const createBookingService =
  async (data, userId) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (startDate > endDate) {
      throw new ApiError(
        STATUS_CODES.BAD_REQUEST,
        "Invalid booking dates"
      );
    }
    const venue =
      await prisma.venue.findUnique({
        where: {
          id: data.venueId,
        },
      });

    if (!venue) {
      throw new ApiError(
        STATUS_CODES.NOT_FOUND,
        "Venue not found"
      );
    }

    if (venue.status !== "APPROVED") {
      throw new ApiError(
        STATUS_CODES.BAD_REQUEST,
        "Venue not available"
      );
    }

    if (
      venue.capacity &&
      data.guestCount > venue.capacity
    ) {
      throw new ApiError(
        STATUS_CODES.BAD_REQUEST,
        "Guest count exceeds venue capacity"
      );
    }

    const overlap =
      await prisma.booking.findFirst({
        where: {
          venueId: data.venueId,

          status: {
            not: "CANCELLED"
          },

          startDate: {
            lte: new Date(data.endDate),
          },

          endDate: {
            gte: new Date(data.startDate),
          },
        },
      });

    if (overlap) {
      throw new ApiError(
        STATUS_CODES.BAD_REQUEST,
        "Venue unavailable for selected dates"
      );
    }

    const days =
      Math.ceil(
        (
          new Date(data.endDate) -
          new Date(data.startDate)
        ) /
        (1000 * 60 * 60 * 24)
      ) + 1;

    const totalPrice =
      venue.price
        ? venue.price * days
        : null;

    return prisma.booking.create({
      data: {
        venueId: data.venueId,

        userId,

        startDate:
          new Date(data.startDate),

        endDate:
          new Date(data.endDate),

        guestCount:
          data.guestCount,

        eventType:
          data.eventType,

        notes:
          data.notes,

        totalPrice,
      },

      include: {
        venue: true,
      },
    });
  };

export const getMyBookingsService =
  async (userId) => {

    return prisma.booking.findMany({
      where: {
        userId,
      },

      include: {
        venue: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  };

export const getOwnerBookingsService =
  async (ownerId) => {

    return prisma.booking.findMany({
      where: {
        venue: {
          ownerId,
        },
      },

      include: {
        user: true,
        venue: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  };

export const updateBookingStatusService =
  async (
    bookingId,
    status,
    ownerId
  ) => {

    const booking =
      await prisma.booking.findUnique({
        where: {
          id: bookingId,
        },

        include: {
          venue: true,
        },
      });

    if (!booking) {
      throw new ApiError(
        STATUS_CODES.NOT_FOUND,
        "Booking not found"
      );
    }

    if (
      booking.venue.ownerId !== ownerId
    ) {
      throw new ApiError(
        STATUS_CODES.FORBIDDEN,
        "Not authorized"
      );
    }

    return prisma.booking.update({
      where: {
        id: bookingId,
      },

      data: {
        status,
      },
    });
  };

export const cancelBookingService =
  async (bookingId, ownerId) => {

    const booking =
      await prisma.booking.findUnique({

        where: { id: bookingId },

        include: {
          venue: true
        }

      });

    if (!booking) {
      throw new ApiError(
        STATUS_CODES.NOT_FOUND,
        "Booking not found"
      );
    }

    if (booking.venue.ownerId !== ownerId) {
      throw new ApiError(
        STATUS_CODES.FORBIDDEN,
        "Not authorized"
      );
    }

    return prisma.booking.update({

      where: { id: bookingId },

      data: {
        status: "CANCELLED"
      }

    });

  };

export const completeBookingService =
  async (bookingId, ownerId) => {

    const booking =
      await prisma.booking.findUnique({

        where: { id: bookingId },

        include: {
          venue: true
        }

      });

    if (!booking) {
      throw new ApiError(
        STATUS_CODES.NOT_FOUND,
        "Booking not found"
      );
    }

    if (booking.venue.ownerId !== ownerId) {
      throw new ApiError(
        STATUS_CODES.FORBIDDEN,
        "Not authorized"
      );
    }

    return prisma.booking.update({

      where: { id: bookingId },

      data: {
        status: "COMPLETED"
      }

    });

  };

  export const getBookingByIdService = async (
    bookingId,
    userId
  ) => {
    const booking =
      await prisma.booking.findUnique({
        where: {
          id: bookingId,
        },
  
        include: {
          venue: {
            include: {
              owner: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      });
  
    if (!booking) {
      throw new ApiError(
        STATUS_CODES.NOT_FOUND,
        "Booking not found"
      );
    }
  
    if (booking.userId !== userId) {
      throw new ApiError(
        STATUS_CODES.FORBIDDEN,
        "Not authorized to view this booking"
      );
    }
  
    return booking;
  };