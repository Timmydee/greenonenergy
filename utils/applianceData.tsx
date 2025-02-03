import { Appliance } from "@/types";

import {
  GiLightBulb,
  GiCeilingLight,
  GiDeskLamp,
  GiWindmill,
  GiToaster,
  GiWashingMachine,
  GiVacuumCleaner,
  GiLaptop,
  GiHairStrands,
} from "react-icons/gi";
import {
  MdOutlineKitchen,
  MdLocalLaundryService,
  MdTv,
  MdComputer,
  MdRouter,
} from "react-icons/md";
import { FaFan, FaTemperatureHigh, FaPlug } from "react-icons/fa";
import { BiFridge, BiWater } from "react-icons/bi";

export const applianceData: Appliance[] = [
  { name: "LED Bulb", wattage: 10, hours: 1, quantity: 1, icon: <GiLightBulb /> },
  { name: "CFL Bulb", wattage: 20, hours: 1, quantity: 1, icon: <GiCeilingLight /> },
  { name: "Tube Light", wattage: 40, hours: 1, quantity: 1, icon: <GiDeskLamp /> },
  { name: "Ceiling Fan", wattage: 75, hours: 1, quantity: 1, icon: <FaFan /> },
  { name: "Table Fan", wattage: 60, hours: 1, quantity: 1, icon: <GiWindmill /> },
  { name: "Refrigerator", wattage: 200, hours: 1, quantity: 1, icon: <BiFridge /> },
  { name: "Air Conditioner (1 Ton)", wattage: 1500, hours: 1, quantity: 1, icon: <FaTemperatureHigh /> },
  { name: "Air Conditioner (1.5 Ton)", wattage: 2000, hours: 1, quantity: 1, icon: <FaTemperatureHigh /> },
  { name: "Water Heater (Geyser)", wattage: 2000, hours: 1, quantity: 1, icon: <BiWater /> },
  { name: "Microwave Oven", wattage: 1200, hours: 1, quantity: 1, icon: <MdOutlineKitchen /> },
  { name: "Electric Kettle", wattage: 1800, hours: 1, quantity: 1, icon: <FaPlug /> },
  { name: "Induction Cooktop", wattage: 2000, hours: 1, quantity: 1, icon: <MdOutlineKitchen /> },
  { name: "Toaster", wattage: 1200, hours: 1, quantity: 1, icon: <GiToaster /> },
  { name: "Washing Machine", wattage: 800, hours: 1, quantity: 1, icon: <MdLocalLaundryService /> },
  { name: "Clothes Iron", wattage: 1200, hours: 1, quantity: 1, icon: <GiVacuumCleaner /> }, // Alternative for iron
  { name: "Vacuum Cleaner", wattage: 1000, hours: 1, quantity: 1, icon: <GiVacuumCleaner /> },
  { name: "Television (LED)", wattage: 120, hours: 1, quantity: 1, icon: <MdTv /> },
  { name: "Desktop Computer", wattage: 300, hours: 1, quantity: 1, icon: <MdComputer /> },
  { name: "Laptop", wattage: 75, hours: 1, quantity: 1, icon: <GiLaptop /> },
  { name: "Wi-Fi Router", wattage: 15, hours: 1, quantity: 1, icon: <MdRouter /> },
  { name: "Hair Dryer", wattage: 1500, hours: 1, quantity: 1, icon: <GiHairStrands /> },
];