import { useNavigate } from "react-router-dom";
import MainLayout from "../../common/MainLayout";

import VenueCard from "../components/VenueCard";

import { useVenues } from "../hooks/useVenues";
import BackButton from "../../common/BackButton";

const VenueListingPage = () => {
  const { venues, loading } = useVenues();
  const navigate = useNavigate();
  const approvedVenues = venues.filter((venue) => venue?.status === "APPROVED");
  return (
    <MainLayout>
      <div
        className="
               w-full
               mx-auto
               px-5
               py-32
               bg-white
               
            "
      >
        <BackButton />

        {loading ? (
          <p>Loading venues...</p>
        ) : venues.length === 0 ? (
          <p>No venues available.</p>
        ) : (
          <div
            className="
                     grid
                     grid-cols-1
                     sm:grid-cols-2
                     lg:grid-cols-3
                     gap-5
                  "
          >
            {approvedVenues.length > 0 ? (
              approvedVenues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100">
                <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-4">
                  <span className="text-4xl">🏛️</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No Venues Available
                </h3>

                <p className="text-gray-500 text-center max-w-md px-4">
                  There are currently no approved venues available for booking.
                  Please check back later.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default VenueListingPage;
