import React from "react";
import Image from 'next/image'


const Hero = () => {
  return (
    <section className="relative">
      <div className="max-w-8xl mx-auto px-4 md:py-8 py-6 text-center">
        <div className="flex justify-center items-center bg-[#FAFAFA] rounded-lg p-2 max-w-[476px] mx-auto ">
          <Image src='/AI.webp' width={20} height={20} alt="Inverter" />
          <p className="p2">Power Calculator to get your solar Inverter recommendation</p>
        </div>
        <h2 className="h1 md:mt-0 pt-3">
          Estimate Your Energy Needs in Minutes!
        </h2>
        <p className="mb-6 p1">
        Select your usage preferences to get personalized recommendations for solar panels, inverters, and more.
        </p>
      </div>
      <div className="absolute top-0 left-20 md:block hidden">
        <Image src='/star3.png' alt="inverter_star" width={52} height={52} />
      </div>
      <div className="absolute top-16 right-20 md:block hidden">
        <Image src='/star4.png' alt="inverter_star" width={52} height={52} />
      </div>
    </section>
  );
};

export default Hero;
