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
        <h5 className="h3">
        Select Your Appliances
        </h5>
        <p className="p2">Choose  your appliance inside your home</p>
        <div className="grid grid-cols-5 md:font-normal font-light items-end border-b pb-2 text-[#808080] md:text-base text-[14px] mt-4">
          <span className="justify-self-start col-span-2">Appliances</span>
          <span className="justify-self-center">Quantity</span>
          <span className="justify-self-center">Wattage (W)</span>
          <span className="justify-self-center">Hours Used</span>

        </div>
        {appliances.map((appliance) => (
          <div
            key={appliance.name}
            className={`grid grid-cols-5 gap-4 items-center py-3 md:px-0 px-2 cursor-pointer transition duration-200 font-normal text-gray-800 md:text-base text-sm border border-b-[#0743350F] ${selectedAppliances.includes(appliance.name)
              ? "bg-[#07433529] shadow-sm p-2 rounded-md"
              : "hover:bg-gray-50 p-2 border-transparent"
            }`}
          >
            <span
              className={`flex items-center md:space-x-3 space-x-2 col-span-2 md:pl-4`}
            >
              <input type="checkbox" className="w-5 h-5 accent-green-500" checked={selectedAppliances.includes(appliance.name)} onChange={() => handleToggleAppliance(appliance.name)}/>
              <span className="text-xl text-[#292D32]">{appliance.icon}</span>
              <span className="text-[#292D32] text-base font-normal">
                {appliance.name} <span className="text-[#07433570]">({appliance.wattage}W)</span>
              </span>
            </span>

            <div className="flex space-x-2 justify-center">
              <button
                className={`rounded text-white transition h-7 w-7 ${appliance.quantity === 1 ? 'bg-gray-400' : 'bg-[#074335] hover:bg-[#08644A] '}`}
                onClick={() =>
                  handleUpdateField(appliance.name, "quantity", -1)
                }
              >
                -
              </button>
              <span className="bg-transparent text-black text-center">
                {appliance.quantity}
              </span>
              <button
                className="bg-[#074335] rounded hover:bg-[#08644A] text-white transition h-7 w-7"
                onClick={() => handleUpdateField(appliance.name, "quantity", 1)}
              >
                +
              </button>
            </div>
            <span className=" font-bold text-center text-[#292D32]">
              {Number(appliance.wattage) * appliance.quantity} W
            </span>
            <div className="flex space-x-2 justify-center">
              <button
                className={`rounded text-white transition h-7 w-7 ${appliance.quantity === 1 ? 'bg-gray-400' : 'bg-[#074335] hover:bg-[#08644A] '}`}
                onClick={() => handleUpdateField(appliance.name, "hours", -1)}
              >
                -
              </button>
              <span className="bg-transparent text-black text-center">
                {appliance.hours}
              </span>
              <button
                className="bg-[#074335] rounded hover:bg-[#08644A] text-white transition h-7 w-7"
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
