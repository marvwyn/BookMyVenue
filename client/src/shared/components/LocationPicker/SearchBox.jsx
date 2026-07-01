import { useEffect, useState } from "react";

const SearchBox = ({
    results,
    setResults,
    onSelect,
}) => {

    const [query, setQuery] = useState("");

    useEffect(() => {

        if (!query.trim()) {
            setResults([]);
            return;
        }

        const timer = setTimeout(async () => {

            try {

                const response = await fetch(
                    `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`
                );

                const data =
                    await response.json();

                setResults(
                    data.features || []
                );

            } catch (error) {

                console.error(error);

            }

        }, 400);

        return () => clearTimeout(timer);

    }, [query, setResults]);

    const handleSelect = (
        feature
    ) => {

        const properties =
            feature.properties;

        const coordinates =
            feature.geometry.coordinates;

        onSelect({

            address:
                properties.name +
                (
                    properties.street
                        ? `, ${properties.street}`
                        : ""
                ) +
                (
                    properties.city
                        ? `, ${properties.city}`
                        : ""
                ),

            city:
                properties.city ||
                properties.county ||
                properties.state ||
                "",

            latitude:
                coordinates[1],

            longitude:
                coordinates[0],

            placeId:
                properties.osm_id,

        });

        setQuery("");

        setResults([]);

    };

    return (

        <div className="relative">

            <input
                type="text"
                value={query}
                onChange={(e) =>
                    setQuery(
                        e.target.value
                    )
                }
                placeholder="Search your venue location..."
                className="inputClass"
            />

            {results.length > 0 && (

                <div
                    className="
                    absolute
                    z-50
                    mt-2
                    w-full
                    rounded-xl
                    border
                    bg-white
                    shadow-xl
                    max-h-72
                    overflow-y-auto
                "
                >

                    {results.map(
                        (place) => (

                            <button
                                key={
                                    place.properties.osm_id
                                }
                                type="button"
                                onClick={() =>
                                    handleSelect(
                                        place
                                    )
                                }
                                className="
                                w-full
                                px-4
                                py-3
                                text-left
                                hover:bg-gray-100
                                border-b
                                last:border-b-0
                            "
                            >

                                <p className="font-medium">

                                    {
                                        place.properties.name
                                    }

                                </p>

                                <p className="text-sm text-gray-500">

                                    {
                                        place.properties.city
                                    }

                                    {place.properties.state &&
                                        `, ${place.properties.state}`}

                                </p>

                            </button>

                        )
                    )}

                </div>

            )}

        </div>

    );

};

export default SearchBox;