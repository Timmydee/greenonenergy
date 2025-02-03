import React from "react";
import { Appliance } from "@/types";

interface ApplianceInputProps {
  appliances: Appliance[];
  selectedAppliances: string[];
  handleToggleAppliance: (name: string) => void;
  handleUpdateField: (name: string, field: keyof Appliance, increment: number) => void;
}
const ApplianceInput: React.FC<ApplianceInputProps> = ({ appliances, selectedAppliances, handleToggleAppliance, handleUpdateField }) => {
  return (
    <div>
      <div >
        <h2 className="text-normal mb-6 text-start text-green-500">
          Choose how you’ll power your appliances with renewable energy
        </h2>
        <div className="grid grid-cols-4 md:font-normal font-light items-end border-b pb-2 text-gray-700 md:text-base text-sm">
          <span className="justify-self-center">Appliances</span>
          <span className="justify-self-center">Quantity</span>
          <span className="justify-self-center">Wattage (W)</span>
          <span className="justify-self-center">Hours Used</span>

        </div>
        {appliances.map((appliance) => (
          <div
            key={appliance.name}
            className="grid grid-cols-4 gap-4 items-center py-3"
          >
            <span
              className={`flex items-center gap-2 border-b cursor-pointer transition duration-200 font-normal text-gray-800 md:text-base text-sm ${selectedAppliances.includes(appliance.name)
                  ? "bg-green-100 shadow-sm p-2 rounded-md border-green-300"
                  : "hover:bg-gray-50 p-2 rounded-md border-transparent"
                }`}
              onClick={() => handleToggleAppliance(appliance.name)}
            >
              <span className="text-xl text-green-600">{appliance.icon}</span>
              <span>
                {appliance.name} <span className="text-gray-500">({appliance.wattage}W)</span>
              </span>
            </span>

            <div className="flex space-x-2 justify-center">
              <button
                className="px-2 bg-red-500 rounded hover:bg-red-600 transition"
                onClick={() =>
                  handleUpdateField(appliance.name, "quantity", -1)
                }
              >
                -
              </button>
              <span className="px-2 py-1 bg-white text-black border rounded shadow-sm text-center w-10">
                {appliance.quantity}
              </span>
              <button
                className="px-2 bg-blue-500 rounded hover:bg-blue-600 transition"
                onClick={() => handleUpdateField(appliance.name, "quantity", 1)}
              >
                +
              </button>
            </div>
            <span className="text-gray-700 font-medium text-center">
              {Number(appliance.wattage) * appliance.quantity} W
            </span>
            <div className="flex space-x-2 justify-center">
              <button
                className="px-2 bg-red-500 rounded hover:bg-red-600 transition"
                onClick={() => handleUpdateField(appliance.name, "hours", -1)}
              >
                -
              </button>
              <span className="px-2 py-1 bg-white text-black border rounded shadow-sm text-center w-10">
                {appliance.hours}
              </span>
              <button
                className="px-2 bg-blue-500 rounded hover:bg-blue-600 transition"
                onClick={() => handleUpdateField(appliance.name, "hours", 1)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplianceInput;
