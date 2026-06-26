const BookingSummary = ({
    venue,
    guestCount,
    totalDays,
    totalPrice,
    loading,
    onConfirm,
  }) => {
    return (
      <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 p-6">
  
        {venue?.images?.length > 0 && (
          <img
            src={venue.images[0]}
            alt={venue.name}
            className="w-full h-56 object-cover rounded-xl mb-5"
          />
        )}
  
        <h2 className="text-xl font-bold">
          {venue.name}
        </h2>
  
        <p className="text-gray-500 mt-1">
          📍 {venue.city}
        </p>
  
        <div className="my-6 border-t border-b border-gray-100 py-5 space-y-4">
  
          <div className="flex justify-between">
  
            <span className="text-gray-500">
              Price
            </span>
  
            <span className="font-semibold">
              ₹{venue.price?.toLocaleString()} / day
            </span>
  
          </div>
  
          <div className="flex justify-between">
  
            <span className="text-gray-500">
              Guests
            </span>
  
            <span className="font-semibold">
              {guestCount}
            </span>
  
          </div>
  
          <div className="flex justify-between">
  
            <span className="text-gray-500">
              Duration
            </span>
  
            <span className="font-semibold">
  
              {totalDays
                ? `${totalDays} ${
                    totalDays === 1
                      ? "day"
                      : "days"
                  }`
                : "--"}
  
            </span>
  
          </div>
  
        </div>
  
        <div className="flex justify-between items-center">
  
          <span className="text-lg font-semibold">
            Total
          </span>
  
          <span className="text-3xl font-bold text-red-600">
  
            ₹{totalPrice.toLocaleString()}
  
          </span>
  
        </div>
  
        <button
          onClick={onConfirm}
          disabled={loading}
          className="btn-primary w-full mt-6"
        >
          {loading
            ? "Booking..."
            : "Confirm Booking"}
        </button>
  
        <div className="mt-6 rounded-xl bg-gray-50 p-4">
  
          <h4 className="font-semibold mb-2">
            Booking Policy
          </h4>
  
          <ul className="text-sm text-gray-500 space-y-2 list-disc ml-5">
  
            <li>
              Dates cannot overlap with existing bookings.
            </li>
  
            <li>
              Your booking is confirmed immediately.
            </li>
  
            <li>
              Cancellation is available before the booking starts.
            </li>
  
          </ul>
  
        </div>
  
      </div>
    );
  };
  
  export default BookingSummary;