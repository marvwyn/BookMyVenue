import { useState } from "react";

import SearchBox from "./SearchBox";
import MapView from "./MapView";

const LocationPicker = ({
    value,
    onChange,
}) => {

    const [results, setResults] =
        useState([]);

    return (

        <div className="space-y-4">

            <SearchBox
                results={results}
                setResults={setResults}
                onSelect={(location) => {
                    onChange(location);
                    setResults([]);
                }}
            />
{/* 
            <MapView
                value={value}
                onChange={onChange}
            /> */}

            {value.address && (
                <div className="rounded-xl border bg-gray-50 p-4">
                    <p className="text-xs text-gray-500 mb-1">
                        Selected Location
                    </p>

                    <p className="font-medium">
                        {value.address}
                    </p>

                    <p className="text-sm text-gray-500">
                        {value.city}
                    </p>
                </div>
            )}

        </div>

    );

};

export default LocationPicker;