import { Results } from "@/types";
import React from "react";
import Image from "next/image";
import InfoTooltip from "../ReuseableComponent/InfoToolTip";
import { useRouter } from "next/navigation";

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
  const router = useRouter()
  return (
    <div className="w-full">
      <div className="bg-white p-2 lg:py-6 py-2 space-y-4 text-black border w-full md:p-6 shadow-lg rounded-lg">
        <div className="flex justify-between items-center">
          <div className="">
            <h5 className="h3">⚡ Your Energy Report</h5>
            <p className="p2">
              Based on your input, here’s what you need to switch to solar
            </p>
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
            <div className="flex items-center gap-[2px]">
              <InfoTooltip
                label="Total Energy Usage"
                infoMessage="This is the total amount of electricity you consume daily, measured in kilowatt-hours (kWh). It helps determine your solar and battery needs"
              />
              <p className="p2">
                Total Energy Usage:{" "}
                <strong className="text-[#292D32] font-bold">
                  {results?.totalEnergy.toFixed(2)} kWh/day
                </strong>
              </p>
            </div>
            <div className="flex items-center gap-[2px]">
              <InfoTooltip
                label="Total Load"
                infoMessage="This represents the total power demand of your appliances at any given moment, measured in Volt-Amperes (VA). It helps size the right inverter.."
              />
              <p className="p2">
                Total Load:{" "}
                <strong className="text-[#292D32] font-bold">
                  {results.totalLoad} VA
                </strong>
              </p>
            </div>

            <div className="flex items-center gap-[2px]">
              <InfoTooltip
                label="Recommended Inverter Size"
                infoMessage="Your inverter must handle the total load. This recommended size ensures your appliances can run efficiently without overloading."
              />
              <p className="p2">
                Recommended Inverter Size:{" "}
                <strong className="text-[#292D32] font-bold">
                  {results?.inverterSize}
                </strong>
              </p>
            </div>
            <div className="flex items-center gap-[2px]">
              <InfoTooltip
                label="Recommended Panel Size"
                infoMessage="This is the total solar capacity needed to generate enough electricity for your daily usage, based on available sunlight hours."
              />
              <p className="p2">
                Recommended Panel Size:{" "}
                <strong className="text-[#292D32] font-bold">
                  {results.panelSize} kW
                </strong>
              </p>
            </div>
            <div className="flex items-center gap-[2px]">
              <InfoTooltip
                label="Recommended Panel Number"
                infoMessage="This is the number of solar panels required to meet your energy needs, assuming each panel has a standard capacity of 400W."
              />
              <p className="p2">
                Recommended Panel Number:{" "}
                <strong className="text-[#292D32] font-bold">
                  {results.noOfPanels} × 400W panel(s)
                </strong>
              </p>
            </div>

            <button
              onClick={handleReset}
              className="mt-4 font-bold text-[#007B23]"
            >
              {`Reset Selections >>>`}
            </button>
            <div className="bg-gray-100 p-3 rounded mt-10">
              <h5 className="h3">Environmental Impact</h5>
              <p className="p2">
                By using renewable energy, you could reduce CO2 emissions by
                approximately:{" "}
                <strong className="text-[#292D32] font-bold">
                  {results.environmentalImpact} kg/year
                </strong>
              </p>
            </div>
            <button
              className="bg-[#073743] hover:bg-[#08644A] text-white px-6 py-2 rounded mr-6 w-full mt-4"
              onClick={() => setOpenModal(!openModal)}
              // onClick={() => {
              //   router.push(`/recommendations?${results.inverterSize}&panelSize=${results.panelSize}`);
              // }}
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
            <p className="p1 text-center mt-4">
              Select some appliances to get Inverter Recommendations
            </p>
          </div>
        )}{" "}
      </div>
    </div>
  );
};

export default EstimatorResults;
