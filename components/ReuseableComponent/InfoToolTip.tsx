import React, { useEffect, useState } from "react";

interface InfoProps {
  label?: string;
  infoMessage: string;
}

const InfoTooltip: React.FC<InfoProps> = ({ label, infoMessage }) => {
  const [showInfo, setShowInfo] = useState(false);

  useEffect(()=> {
    if(showInfo) {
      const timer = setTimeout(() => setShowInfo(false), 6000)
      return () => clearTimeout(timer)
    }
  },[showInfo])

  return (
    <span className="relative">
      <div
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
        onTouchStart={() => setShowInfo((prev)=> !prev)}
        className="cursor-pointer w-4 h-4 p-1 flex items-center justify-center bg-[#074335] rounded-full"
      >
        <span className="text-white text-sm ">?</span>
      </div>
      {showInfo && infoMessage && (
        <span className="absolute z-10 left-0 top-8 p-2 bg-gray-800 text-white text-sm rounded shadow-lg w-52">
          {infoMessage}
        </span>
      )}
    </span>
  );
};

export default InfoTooltip;
