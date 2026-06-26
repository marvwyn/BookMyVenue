import adminAxios from "../../../shared/services/adminAxios";

export const fetchAdminVenuesApi =
   async () => {

      const response =
         await adminAxios.get(
            "/venues"
         );

      return response.data;
   };

export const updateVenueStatusApi =
   async (
      venueId,
      status
   ) => {

      const response =
         await adminAxios.patch(
            `/admin/venues/${venueId}/status`,
            {
               status,
            }
         );

      return response.data;
   };