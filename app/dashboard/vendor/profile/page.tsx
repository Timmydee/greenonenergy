"use client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { FaPhone, FaEnvelope, FaGlobe, FaWhatsapp, FaBuilding } from "react-icons/fa";

// Fetch profile data
const getProfile = async () => {
  const { data } = await axios.get("/api/vendor/me");
  return data;
};

const Profile = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg animate-pulse">
        <div className="h-6 w-1/2 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-2/3 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 bg-red-100 text-red-700 rounded-lg">⚠️ Error loading profile. Please try again.</div>;
  }

  const vendor = data?.vendor;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Vendor Profile</h1>
      
      <div className="space-y-4 text-gray-700">
        {vendor?.companyName && (
          <div className="flex items-center gap-3">
            <FaBuilding className="text-blue-500" />
            <p><strong>Company Name:</strong> {vendor.companyName}</p>
          </div>
        )}

        {vendor?.email && (
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-red-500" />
            <p><strong>Email:</strong> {vendor.email}</p>
          </div>
        )}

        {vendor?.phone && (
          <div className="flex items-center gap-3">
            <FaPhone className="text-green-500" />
            <p><strong>Phone:</strong> {vendor.phone}</p>
          </div>
        )}

        {vendor?.website && (
          <div className="flex items-center gap-3">
            <FaGlobe className="text-blue-700" />
            <p>
              <strong>Website:</strong>{" "}
              <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                {vendor.website}
              </a>
            </p>
          </div>
        )}

        {vendor?.whatsapp && (
          <div className="flex items-center gap-3">
            <FaWhatsapp className="text-green-600" />
            <p>
              <strong>WhatsApp:</strong>{" "}
              <a href={`https://wa.me/${vendor.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-green-600 underline">
                Chat on WhatsApp
              </a>
            </p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <Link href="profile/edit">
          <Button variant="outline" className="w-full">Edit Profile</Button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
