import React from "react";
import Image from 'next/image'


const Hero = () => {
  return (
    <section className="relative">
      <div className="max-w-8xl mx-auto px-4 md:py-8 py-6 text-center">
        <div className="flex gap-1 justify-center items-center bg-[#FAFAFA] rounded-lg p-2 max-w-[476px] mx-auto ">
          <Image src='/AI.webp' width={20} height={20} alt="Inverter" />
          <p className="p2">Power Calculator to get your perfect solar Inverter setup</p>
        </div>
        <h2 className="h1 md:mt-0 pt-3">
          Estimate Your Energy Needs in Minutes!
        </h2>
        <p className="mb-1 p1 text-center">
        Find out the right solar panel and inverter for your home
        </p>
        <p className="mb-6 p1 max-w-5xl text-center mx-auto">
        Simply select your appliances, and we’ll give you a personalized recommendation—fast and hassle-free!
        </p>
      </div>
      <div className="absolute lg:top-0 lg:left-20 md:top-4 md:left-12 md:block hidden">
        <Image src='/star3.png' alt="inverter_star" width={52} height={52} />
      </div>
      <div className="absolute lg:top-16 lg:right-20 md:top-12 md:right-16 md:block hidden">
        <Image src='/star4.png' alt="inverter_star" width={52} height={52} />
      </div>
    </section>
  );
};

export default Hero;
