"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Appliance, Results } from "@/types";
import { applianceData } from "@/data/applianceData";
import ApplianceInput from "./ApplianceInput";
import EstimatorResults from "./EstimatorResults";
import RecommendationForm from "./RecommendationForm";
import { compareInverter } from "@/data/compareInverter";

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
    totalLoad: 0,
    environmentalImpact: 0,
  });

  // useEffect moved after handleCalculate function

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

  const handleCalculate = useCallback(() => {
    const totalEnergy = selectedAppliances.reduce((total, name) => {
      const appliance = appliances.find((a) => a.name === name);
      return appliance
        ? total + (Number(appliance?.wattage) * appliance.quantity * appliance.hours) / 1000
        : total;
    }, 0);

    const totalLoadVA = selectedAppliances.reduce((total, name) => {
      const appliance = appliances.find((a) => a.name === name);
      return appliance ? total + (Number(appliance?.wattage) * appliance.quantity) : total;
    }, 0)
  
    const sunlightHours = 5;
    const onePanel = 0.4; // 400W panel = 0.4kW
  
    // Calculate Panel Size (kW)
    const panelSize = Number((totalEnergy / sunlightHours).toFixed(2));
  
    // Calculate Number of Panels Required
    const noOfPanels = Math.ceil(panelSize / onePanel);
  
    const inverterSize = compareInverter.find(({ min, max }) => 
      (min ? totalLoadVA >= min : true) && (max ? totalLoadVA < max : true)
    )?.size || "Unknown";
  
    // Calculate Environmental Impact (CO2 savings) - removed unused variable
  

    setResults({
      totalEnergy,
      panelSize: Number(panelSize),
      noOfPanels,
      inverterSize: inverterSize,
      totalLoad: totalLoadVA,
      environmentalImpact: Number((totalEnergy * 0.85).toFixed(2)),
    });
  }, [selectedAppliances, appliances]);

  useEffect(() => {
    if (selectedAppliances.length > 0) {
      handleCalculate();
    }
  }, [appliances, selectedAppliances.length, handleCalculate]);

  const handleReset = () => {
    setSelectedAppliances([]);
    setAppliances(applianceData);
    setResults({
      totalEnergy: 0,
      panelSize: 0,
      noOfPanels: 0,
      inverterSize: 0,
      totalLoad: 0,
      environmentalImpact: 0,
    });
  };

  return (
    <div className="w-full relativ lg:pb-0 pb-8">
      <div className="md:w-[94%] w-[98%] mx-auto flex flex-col lg:flex-row justify-between items-start lg:space-y-0 space-y-8">
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
          <div className="bg-white p-6 rounded-3xl shadow-lg md:w-full w-[90%] mx-auto md:max-w-xl relative">
            <RecommendationForm results={results} setOpenModal={setOpenModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EnergyEstimator;
