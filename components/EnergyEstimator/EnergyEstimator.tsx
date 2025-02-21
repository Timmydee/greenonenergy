"use client";

import React, { useEffect, useState } from "react";
import { Appliance, Results } from "@/types";
import { applianceData } from "@/utils/applianceData";
import ApplianceInput from "./ApplianceInput";
import EstimatorResults from "./EstimatorResults";
import RecommendationForm from "./RecommendationForm";

const EnergyEstimator = () => {
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>([]);
  const [appliances, setAppliances] = useState<Appliance[]>(applianceData);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [results, setResults] = useState<Results>({
    totalEnergy: 0,
    panelSize: 0,
    noOfPanels: 0,
    inverterSize: 0,
    environmentalImpact: 0,
  });

  useEffect(() => {
    if (selectedAppliances.length > 0) {
      handleCalculate();
    }
  }, [appliances]);

  const handleToggleAppliance = (name: string) => {
    setSelectedAppliances((prevSelected) => {
      const isAlreadySelected = prevSelected.includes(name);
      setAppliances((prevAppliances) =>
        prevAppliances.map((appliance) =>
          appliance.name === name
            ? {
                ...appliance,
                hours: isAlreadySelected ? 0 : appliance.hours,
                quantity: isAlreadySelected ? 1 : appliance.quantity,
              }
            : appliance
        )
      );
      return isAlreadySelected
        ? prevSelected.filter((appliance) => appliance !== name)
        : [...prevSelected, name];
    });
  };

  const handleUpdateField = (
    name: string,
    field: keyof Appliance,
    increment: number
  ) => {
    setAppliances((prevAppliances) =>
      prevAppliances.map((appliance) =>
        appliance.name === name
          ? {
              ...appliance,
              [field]: Math.max(0, Number(appliance[field]) + increment),
            }
          : appliance
      )
    );
  };

  const handleCalculate = () => {
    const totalEnergy = selectedAppliances.reduce((total, name) => {
      const appliance = appliances.find((a) => a.name === name);
      return appliance
        ? total +
            (Number(appliance?.wattage) *
              appliance.hours *
              appliance.quantity) /
              1000
        : total;
    }, 0);

    const sunlightHours = 5;
    const onePanel = 0.4;
    const panelSize = (totalEnergy / sunlightHours).toFixed(2);
    const noOfPanels = Math.ceil(Number(panelSize) / onePanel);

    const inverterSize = selectedAppliances
      .reduce((sum, name) => {
        const appliance = appliances.find((a) => a.name === name);
        return appliance
          ? sum + (Number(appliance.wattage) * appliance.quantity) / 1000
          : sum;
      }, 0)
      .toFixed(2);

    setResults({
      totalEnergy,
      panelSize: Number(panelSize),
      noOfPanels,
      inverterSize: Number(inverterSize),
      environmentalImpact: Number((totalEnergy * 0.85).toFixed(2)),
    });
  };

  const handleReset = () => {
    setSelectedAppliances([]);
    setAppliances(applianceData);
    setResults({
      totalEnergy: 0,
      panelSize: 0,
      noOfPanels: 0,
      inverterSize: 0,
      environmentalImpact: 0,
    });
  };

  return (
    <div className=" w-full relativ">
      <div className="md:w-[94%] w-[98%] mx-auto flex flex-col lg:flex-row justify-between items-start">
        <div className="lg:w-[60%] w-full md:p-6 p-2 bg-white shadow-md rounded-lg lg:mb-4">
          <ApplianceInput
            appliances={appliances}
            selectedAppliances={selectedAppliances}
            handleToggleAppliance={handleToggleAppliance}
            handleUpdateField={handleUpdateField}
          />
        </div>

        {/* Results */}
        <div className="lg:w-[38%] w-full shadow-md">
          <EstimatorResults
            results={results}
            open={open}
            setOpen={setOpen}
            handleReset={handleReset}
            setOpenModal={setOpenModal}
            openModal={openModal}
          />
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <RecommendationForm results={results} />
            <button
              onClick={() => setOpenModal(false)}
              className="mt-4 w-[100px] mx-auto flex justify-center bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnergyEstimator;
