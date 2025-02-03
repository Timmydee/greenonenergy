"use client";

import { useState } from "react";

interface Appliance {
  name: string;
  wattage?: number;
  hours: number;
}

interface Results {
  totalEnergy: number;
  panelSize: string;
  noOfPanels: number;
  inverterSize: string;
}

const ApplicationInputs = () => {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [newAppliance, setNewAppliance] = useState<Appliance>({
    name: "",
    // wattage: 0,
    hours: 0,
  });
  const [results, setResults] = useState<Results | null>(null);

  const applianceData: Appliance[] = [
    { name: "LED Bulb", wattage: 10, hours: 0 },
    { name: "CFL Bulb", wattage: 20, hours: 0 },
    { name: "Tube Light", wattage: 40, hours: 0 },
    { name: "Ceiling Fan", wattage: 75, hours: 0 },
    { name: "Table Fan", wattage: 60, hours: 0 },
    { name: "Refrigerator", wattage: 200, hours: 0 },
    { name: "Air Conditioner (1 Ton)", wattage: 1500, hours: 0 },
    { name: "Air Conditioner (1.5 Ton)", wattage: 2000, hours: 0 },
    { name: "Water Heater (Geyser)", wattage: 2000, hours: 0 },
    { name: "Microwave Oven", wattage: 1200, hours: 0 },
    { name: "Electric Kettle", wattage: 1800, hours: 0 },
    { name: "Induction Cooktop", wattage: 2000, hours: 0 },
    { name: "Toaster", wattage: 1200, hours: 0 },
    { name: "Washing Machine", wattage: 800, hours: 0 },
    { name: "Clothes Iron", wattage: 1200, hours: 0 },
    { name: "Vacuum Cleaner", wattage: 1000, hours: 0 },
    { name: "Television (LED)", wattage: 120, hours: 0 },
    { name: "Desktop Computer", wattage: 300, hours: 0 },
    { name: "Laptop", wattage: 75, hours: 0 },
    { name: "Wi-Fi Router", wattage: 15, hours: 0 },
    { name: "Hair Dryer", wattage: 1500, hours: 0 },
  ];

  const handleAddAppliance = () => {
    if (newAppliance.name && newAppliance.hours > 0) {
      const selectedAppliance = applianceData.find(
        (appliance) => appliance.name === newAppliance.name
      );
      if (selectedAppliance) {
        setAppliances([
          ...appliances,
          { ...selectedAppliance, hours: newAppliance.hours },
        ]);
        setNewAppliance({ name: "", wattage: 0, hours: 1 });
      }
    }
  };

  const handleRemoveAppliance = (index: number) => {
    setAppliances(appliances.filter((_, i) => i !== index));
  };

  const handleCalculate = () => {
    const totalEnergy = appliances.reduce((total: number, appliance) => {
      const applianceInfo = applianceData.find(
        (a) => a.name === appliance.name
      );
      const wattage = applianceInfo?.wattage || 0;
      const hours = appliance.hours || 0;
      return total + (wattage * hours) / 1000;
    }, 0);

    const sunlightHours = 5;
    const onePanel = 0.4;

    const panelSize = (totalEnergy / sunlightHours).toFixed(2);
    const noOfPanels = Math.ceil(Number(panelSize) / onePanel);

    const inverterSize = Math.max(
      ...appliances.map((a) => {
        const applianceInfo = applianceData.find((ap) => ap.name === a.name);

        const wattage = applianceInfo?.wattage || 0;
        return wattage / 1000;
      })
    ).toFixed(2);
    setResults({
      totalEnergy,
      panelSize,
      noOfPanels,
      inverterSize,
    });
  };

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6 text-black">
      <div className="flex justify-between w-full space-x-7">
        <div className="w-[60%]">
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Input Your Appliances
            </h2>

            {/* Appliance Input Form */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div>
                <label
                  htmlFor="appliance-type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Appliance
                </label>
                <select
                  id="appliance-type"
                  className="mt-1 block w-full p-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={newAppliance.name}
                  onChange={(e) =>
                    setNewAppliance({ ...newAppliance, name: e.target.value })
                  }
                >
                  <option value="">Select Appliance</option>
                  {applianceData.map((appliance) => (
                    <option key={appliance.name} value={appliance.name}>
                      {appliance.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hours Input */}
              <div>
                <p className="block text-sm font-medium text-gray-700">
                  {" "}
                  Hours Used Daily
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setNewAppliance({...newAppliance, hours:newAppliance.hours + 1})}
                  >
                    +
                  </button>
                  <div>{newAppliance.hours}</div>
                  <button
                    onClick={() => setNewAppliance({...newAppliance, hours:newAppliance.hours - 1})}
                  >
                    -
                  </button>
                </div>
              </div>
              {/* <div>
                <label
                  htmlFor="hours"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hours Used Daily
                </label>
                <input
                  id="hours"
                  type="number"
                  min={1}
                  placeholder="Hours/day"
                  className="mt-1 block w-full p-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={newAppliance.hours}
                  onChange={(e) =>
                    setNewAppliance({
                      ...newAppliance,
                      hours: Math.max(1, +e.target.value),
                    })
                  }
                />
              </div> */}

              {/* Add Appliance Button */}
              <div>
                <button
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={handleAddAppliance}
                >
                  Add Appliance
                </button>
              </div>
            </div>

            {/* List of Appliances */}
            {appliances.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-700">
                  Your Appliances
                </h3>
                <ul className="space-y-3">
                  {appliances.map((appliance, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm border"
                    >
                      <span className="text-gray-800 font-medium">
                        {appliance.name} ({appliance.hours} hrs/day)
                      </span>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleRemoveAppliance(index)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Calculate Button */}
          <div className="text-center">
            <button
              className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
              onClick={handleCalculate}
            >
              Calculate My Energy Needs
            </button>
          </div>
        </div>
        <div className="w-[40%]">
          {/* Result Display */}
          {/* {results && ( */}
          <div className="bg-white p-4 rounded shadow space-y-4">
            <h2 className="text-xl font-semibold">Results</h2>
            <p>
              Total Energy Usage:{" "}
              <strong>{results?.totalEnergy || 0} kWh/day</strong>
            </p>
            <p>
              Recommended Panel Size:{" "}
              <strong>{results?.panelSize || 0} kW</strong>
            </p>
            <p>
              Recommended Inverter Size:{" "}
              <strong>{results?.inverterSize || 0} kW</strong>
            </p>

            <div className="bg-gray-100 p-3 rounded">
              <h3 className="text-lg font-semibold">Environmental Impact</h3>
              <p>
                By using renewable energy, you could reduce CO2 emissions by
                approximately{" "}
                <strong>
                  {(results?.totalEnergy * 0.85 || 0).toFixed(2)} kg/year
                </strong>
                .
              </p>
            </div>

            <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
              Download Report
            </button>
          </div>
          {/* )} */}
        </div>
      </div>
    </main>
  );
};

export default ApplicationInputs;
