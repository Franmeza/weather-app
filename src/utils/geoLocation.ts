export const getGeolocation = async (): Promise<{
  lat: number;
  lon: number;
}> => {
  try {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported.");
    }

    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );

    return {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };
  } catch (error) {
    console.error("Error getting location:", error);
    return { lat: 51.0460954, lon: -114.065465 }; // Fallback position
  }
};
