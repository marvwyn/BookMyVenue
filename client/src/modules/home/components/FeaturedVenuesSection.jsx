import { useEffect, useState } from "react";
import { fetchVenuesApi } from "../../venues/api/venue.api";
import VenueCard from "../../venues/components/VenueCard";
import { useNavigate } from "react-router-dom";

const FeaturedVenuesSection = () => {
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadVenues();
  }, []);

  const loadVenues = async () => {
    try {
      const response = await fetchVenuesApi();

      setVenues(response.data.slice(0, 6));
    } catch (error) {
      console.error(error);
    }
  };
  const approvedVenues = venues.filter((venue) => venue?.status === "APPROVED");
  console.log(approvedVenues)

  return (
    <section className="py-14 bg-gray-50 px-5 sm:px-8 lg:px-[6%]">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-sm text-gray-400 uppercase">
              Handpicked for you
            </p>

            <h2 className="text-3xl font-bold">Featured Venues</h2>
          </div>
          <button
            onClick={() => {
              navigate("/venues");
            }}
            className="btn-outline !py-[9px] !px-5 !text-[0.88rem] !rounded-[10px]"
          >
            Explore More
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
      </div>
    </section>
  );
};

export default FeaturedVenuesSection;
