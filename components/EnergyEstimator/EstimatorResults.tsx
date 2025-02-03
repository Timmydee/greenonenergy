import { Results } from "@/types";
import React from "react";
import { BiDownArrow } from "react-icons/bi";
import { BsArrowUp } from "react-icons/bs";

interface EstimatorResultsProps {
  results: Results;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleReset: () => void;
}

const EstimatorResults: React.FC<EstimatorResultsProps> = ({
  results,
  open,
  setOpen,
  handleReset,
}) => {
  return (
    <div className="">
      <div
        className={`md:w-[94%] w-[98%] mx-auto fixed p-4 ${
          open ? `lg:bottom-[-250px] bottom-0` : `lg:bottom-0 bottom-[-250px]`
        } rounded-tr-md rounded-tl-md`}
      >
        <div className="bg-white p-2 space-y-4 text-black border w-full md:p-6 shadow-lg rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-normal text-green-500">Results</h2>
            <div
              data-testid = 'toggle_button'
              onClick={() => setOpen(!open)}
              className="border p-2 rounded-full"
            >
              {open ? <BsArrowUp size={20} /> : <BiDownArrow size={20} />}
            </div>
          </div>
          <p>
            Total Energy Usage:{" "}
            <strong>{results.totalEnergy.toFixed(2)} kWh/day</strong>
          </p>
          <p>
            Recommended Panel Size: <strong>{results.panelSize} kW</strong>
          </p>
          <p>
            Recommended Inverter Size:{" "}
            <strong>{results.inverterSize} kW</strong>
          </p>
          <div className="bg-gray-100 p-3 rounded lg:w-[500px]">
            <h3 className="text-lg font-semibold">Environmental Impact</h3>
            <p>
              By using renewable energy, you could reduce CO2 emissions by
              approximately:{" "}
              <strong>{results.environmentalImpact} kg/year</strong>
            </p>
          </div>
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mr-6">
            Download Report
          </button>
          <button
            onClick={handleReset}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reset Selections
          </button>
        </div>
      </div>
    </div>
  );
};

export default EstimatorResults;
