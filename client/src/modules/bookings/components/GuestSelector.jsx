const GuestSelector = ({
    value,
    max = 500,
    onChange,
  }) => {
    const increaseGuests = () => {
      onChange(Math.min(max, value + 1));
    };
  
    const decreaseGuests = () => {
      onChange(Math.max(1, value - 1));
    };
  
    const handleInput = (e) => {
      const guests = Number(e.target.value);
  
      if (Number.isNaN(guests)) {
        onChange(1);
        return;
      }
  
      onChange(
        Math.max(
          1,
          Math.min(max, guests)
        )
      );
    };
  
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
  
        <h2 className="text-lg font-bold mb-5">
          Number of Guests
        </h2>
  
        <div className="flex items-center gap-4">
  
          <button
            type="button"
            onClick={decreaseGuests}
            disabled={value <= 1}
            className="
              w-10
              h-10
              rounded-full
              border
              border-gray-300
              text-xl
              font-bold
              flex
              items-center
              justify-center
              hover:bg-gray-100
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >
            −
          </button>
  
          <input
            type="number"
            min={1}
            max={max}
            value={value}
            onChange={handleInput}
            className="
              w-24
              h-11
              border
              border-gray-300
              rounded-xl
              text-center
              text-lg
              font-semibold
              focus:outline-none
              focus:border-red-500
            "
          />
  
          <button
            type="button"
            onClick={increaseGuests}
            disabled={value >= max}
            className="
              w-10
              h-10
              rounded-full
              border
              border-gray-300
              text-xl
              font-bold
              flex
              items-center
              justify-center
              hover:bg-gray-100
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >
            +
          </button>
  
          <span className="text-sm text-gray-500">
            Maximum{" "}
            <strong>{max}</strong>{" "}
            guests
          </span>
  
        </div>
  
        <div className="mt-5 bg-gray-50 rounded-xl p-4">
  
          <div className="flex justify-between">
  
            <span className="text-gray-600">
              Selected Guests
            </span>
  
            <span className="font-bold text-red-600">
              {value}
            </span>
  
          </div>
  
          <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
  
            <div
              className="h-full bg-red-500 transition-all duration-300"
              style={{
                width: `${(value / max) * 100}%`,
              }}
            />
  
          </div>
  
          <p className="text-xs text-gray-400 mt-2">
  
            {Math.round(
              (value / max) * 100
            )}
            % of venue capacity
  
          </p>
  
        </div>
  
      </div>
    );
  };
  
  export default GuestSelector;