// // fetch sunlight hours based on latitude and logitude
// // Get location longitude and latitude based on user input

// "use client";

// import React, { useState } from "react";
// import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";


// const LocationInputs = () => {
//     const { location, setLocation } = useState<string>('')
//     const { sunlightHours, setSunlightHours } = useState<number | null>(null)
//     const { latitude, setLatitude } = useState<number | null>(null)
//     const { longitude, setlongitude } = useState<number | null>(null)

//     const { isLoaded } = useJsApiLoader({
//         googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
//         libraries: ["places"],
//     });

//     const handlePlaceSelect = (autocomplete: google.maps.places.Autocomplete) => {
//         const place = autocomplete.getPlace();
//         const loc = place.formatted_address || "";
//         setLocation(loc);

//         if (place.geometry?.location) {
//             const lat = place.geometry.location.lat();
//             const lng = place.geometry.location.lng();

//             setLatitude(lat);
//             setLongitude(lng);

//             // Fetch sunlight hours after getting lat/lng
//             fetchSunlightHours(lat, lng).then(setSunlightHours);
//         }
//     };

//     if (!isLoaded) return <div>Loading...</div>;


//     return (
//         <div>
//             <main className="max-w-4xl mx-auto p-6 space-y-6 text-black">
//                 <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
//                     <h2 className="text-2xl font-bold text-gray-800">Get Average Sunlight Hours</h2>
//                     <div>
//                         <label htmlFor="location" className="block text-sm font-medium text-gray-700">
//                             Enter Your Location
//                         </label>
//                         <Autocomplete
//                             onLoad={(autocomplete) => {
//                                 autocomplete.addListener("place_changed", () => handlePlaceSelect(autocomplete));
//                             }}
//                         >
//                             <input
//                                 id="location"
//                                 type="text"
//                                 placeholder="Search your location..."
//                                 className="mt-1 block w-full p-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                             />
//                         </Autocomplete>
//                     </div>

//                     {latitude && longitude && (
//                         <p className="text-gray-600">
//                             Location: {latitude.toFixed(2)}, {longitude.toFixed(2)}
//                         </p>
//                     )}
//                     {sunlightHours !== null && (
//                         <p className="mt-4 text-green-600 font-medium">
//                             Average Sunlight Hours: {sunlightHours} hours/day
//                         </p>
//                     )}
//                 </div>
//             </main>
//         </div>
//     )
// }

// export default LocationInputs