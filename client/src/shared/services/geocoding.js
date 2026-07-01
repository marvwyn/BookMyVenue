export const reverseGeocode = async (
    latitude,
    longitude
) => {

    const response = await fetch(
        `https://photon.komoot.io/reverse?lat=${latitude}&lon=${longitude}`
    );

    const data =
        await response.json();

    const place =
        data.features?.[0];

    const properties =
        place?.properties || {};

    return {

        latitude,

        longitude,

        address: [
            properties.name,
            properties.street,
        ]
            .filter(Boolean)
            .join(", "),

        city:
            properties.city ||
            properties.county ||
            properties.state ||
            "",

        placeId:
            properties.osm_id || "",

    };

};