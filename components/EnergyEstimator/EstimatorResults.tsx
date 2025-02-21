import { Results } from "@/types";
import React from "react";
import Image from "next/image";
import { BiDownArrow } from "react-icons/bi";
import { BsArrowUp } from "react-icons/bs";

interface EstimatorResultsProps {
  results: Results;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleReset: () => void;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
}

const EstimatorResults: React.FC<EstimatorResultsProps> = ({
  results,
  open,
  setOpen,
  handleReset,
  openModal,
  setOpenModal,
}) => {
  return (
    <div className="w-full">
      {/* <div
        className={`md:w-[94%] w-[98%] mx-auto fixe p-4 ${
          open ? `lg:bottom-[-250px] bottom-0` : `lg:bottom-0 bottom-[-250px]`
        } rounded-tr-md rounded-tl-md`}
      > */}
      <div className="bg-white p-2 space-y-4 text-black border w-full md:p-6 shadow-lg rounded-lg">
        <div className="flex justify-between items-center">
          <div className="">
            <h5 className="h3">Results</h5>
            <p className="p2">Estimates your energy consumption.</p>
          </div>
          {/* <div
              data-testid="toggle_button"
              onClick={() => setOpen(!open)}
              className="border p-2 rounded-full lg:hidden block"
            >
              {open ? <BsArrowUp size={20} /> : <BiDownArrow size={20} />}
            </div> */}
        </div>
        {results?.totalEnergy > 0 ? (
          <div className="mt-8">
            <p className="p2">
              Total Energy Usage:{" "}
              <strong className="text-[#292D32] font-bold">{results?.totalEnergy.toFixed(2)} kWh/day</strong>
            </p>
            <p className="p2">
              Recommended Panel Size: <strong className="text-[#292D32] font-bold">{results.panelSize} kW</strong>
            </p>
            <p className="p2">
              Recommended Inverter Size:{" "}
              <strong className="text-[#292D32] font-bold">{results?.inverterSize} kW</strong>
            </p>

            <button
              onClick={handleReset}
              className="mt-4 font-bold text-[#007B23]"
            >
              {`Reset Selections >>>`}
            </button>
            {/* <div className="bg-gray-100 p-3 rounded lg:w-[500px]">
          <h3 className="text-lg font-semibold">Your need</h3>
          <p>
            Base on your selected appliances and duration of use, you will
            need to get an Inverter Size of{" "}
            <strong>{results?.inverterSize} kW</strong> and a recommended
            solar panel size of <strong>{results.panelSize} kW</strong>
          </p>
          </div> */}
            <div className="bg-gray-100 p-3 rounded mt-10">
              <h5 className="h3">Environmental Impact</h5>
              <p className="p2">
                By using renewable energy, you could reduce CO2 emissions by
                approximately:{" "}
                <strong className="text-[#292D32] font-bold">{results.environmentalImpact} kg/year</strong>
              </p>
            </div>
            <button
              className="bg-[#073743] hover:bg-[#08644A] text-white px-6 py-2 rounded mr-6 w-full mt-4"
              onClick={() => setOpenModal(!openModal)}
            >
              Get Recommendations
            </button>
          </div>
        ) : (
          <div className="flex justify-center flex-col items-center mt-8">
            <Image
              src="/resultFrame.webp"
              alt="inverter_result"
              width={250}
              height={250}
            />
            <p className='p1 text-center mt-4'>Select some appliances to get Inverter Recommendations</p>
          </div>
        )}{" "}
      </div>
    </div>
  );
};

export default EstimatorResults;
