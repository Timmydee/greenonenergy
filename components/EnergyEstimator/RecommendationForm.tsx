import React, { useState } from "react";
import Button from "../ReuseableComponent/Button";
import { MdClose } from "react-icons/md";
import Image from "next/image";

interface RecommendationFormProps {
  results: {
    totalEnergy: number;
    inverterSize: number;
    panelSize: number;
  }
  setOpenModal: (openModal: boolean) => void;
}

const RecommendationForm = ({ results, setOpenModal }: RecommendationFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: results,
    // energyUsage: results?.totalEnergy || 0,
    // inverterSize: results?.inverterSize || 0,
    // panelSize: results?.panelSize || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   setIsLoading(true)
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("/api/submit", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       setIsLoading(false)
  //       setIsSuccess(true)
  //       setFormData({
  //         name: "",
  //         email: "",
  //         phone: "",
  //         energyUsage: results?.totalEnergy || 0,
  //         inverterSize: results?.inverterSize || 0,
  //         panelSize: results?.panelSize || 0,
  //       });
  //     } else {
  //       setIsLoading(false)
  //       alert("Something went wrong. Please try again.");
  //     }
  //   } catch (error) {
  //     setIsLoading(false)
  //     console.error(error);
  //     alert("Failed to submit form.");
  //   }
  // };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setIsLoading(false)
        setIsSuccess(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          summary: results
        })
    } else {
        setIsLoading(false);
        alert("Something went wrong. Please try again.");
    } 
  };

  return (
    <main className="md:max-w-2xl px-4 py-4">
      {isSuccess ?
        <div>
          <div className="flex justify-center items-center space-x-2 bg-[#FAFAFA] rounded-2xl p-2 max-w-[136px] mx-auto ">
            <Image src='/AI.webp' width={20} height={20} alt="Inverter" />
            <p className="p2">Successful</p>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <Image src='/success.webp' width={181} height={181} alt="Inverter" />
          </div>
          <div className="flex flex-col justify-center items-center mt-8">
            <p className="p2">Get full detailed result summary on your Email</p>
            {/* <Button text='Return to Website' type="button" /> */}
          </div>
        </div> :
        <div className="overflow-x-hidden">
          <div className="text-center mb-10">
            <h5 className="h2">Recommendation Results</h5>
            <p className="p2">Get full detailed result summary on your Email</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block p4"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block formInput"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block p4"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block formInput"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block p4"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block formInput"
                required
              />
            </div>
            <div className="mt-8 p-3 border bg-[#FAFAFA] border-[#07433594] rounded-xl">
              <h5 className="h4">Result Summary</h5>
              <div className="mt-3">
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
              </div>
            </div>
            <div>
              <Button text={!isLoading ? 'Get Full Result' : 'Submitting'} type="submit" />
            </div>
          </form>
        </div>
      }
      <div onClick={() => setOpenModal(false)} className="w-8 h-8 flex items-center justify-center font-bold text-[#074335] border border-[#074335] cursor-pointer rounded-full absolute md:top-6 md:right-6 top-3 right-3">
        <MdClose size={24} />
      </div>
    </main>
  );
};

export default RecommendationForm;
