import prisma from "../../config/db.js";

export const updateVenueLocation = async (
  venueId,
  latitude,
  longitude
) => {

  await prisma.$executeRaw`

    UPDATE "Venue"

    SET location =

      ST_SetSRID(

        ST_MakePoint(

          ${longitude},

          ${latitude}

        ),

        4326

      )::geography

    WHERE id = ${venueId};

  `;

};