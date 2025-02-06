import React, { useState } from "react";

interface RecommendationFormProps {
  results: {
    totalEnergy: number;
    inverterSize: number;
  };
}

const RecommendationForm = ({ results }: RecommendationFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    energyUsage: results?.totalEnergy || 0,
    inverterSize: results?.inverterSize || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Thank you! We'll get back to you with recommendations.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          energyUsage: results?.totalEnergy || 0,
          inverterSize: results?.inverterSize || 0,
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit form.");
    }
  };

  return (
    <main className="md:max-w-2xl mx-auto w-[90%] bg-white shadow-lg px-4 py-4 rounded-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-black"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-black"
            required
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-black"
            required
          />
        </div>
        <div>
          <label
            htmlFor="energyUsage"
            className="block text-sm font-medium text-gray-700"
          >
            Total Energy Usage (kWh/day)
          </label>
          <input
            type="number"
            name="energyUsage"
            id="energyUsage"
            value={formData.energyUsage}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-black"
            required
          />
        </div>
        <div>
          <label
            htmlFor="inverterSize"
            className="block text-sm font-medium text-gray-700"
          >
            Recommended Inverter Size (kW)
          </label>
          <input
            type="number"
            name="inverterSize"
            id="inverterSize"
            value={formData.inverterSize}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm text-black"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
          >
            Get Recommendations
          </button>
        </div>
      </form>
    </main>
  );
};

export default RecommendationForm;
