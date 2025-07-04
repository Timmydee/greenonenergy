import { Appliance } from "@/types";

import {
  GiLightBulb,
  GiCeilingLight,
  GiDeskLamp,
  GiVacuumCleaner,
  GiLaptop,
} from "react-icons/gi";
import {
  MdTv,
  MdComputer,
  MdRouter,
} from "react-icons/md";
import { FaFan, FaPlug } from "react-icons/fa";
import { BiWater } from "react-icons/bi";
import { LiaFanSolid } from "react-icons/lia";
import { RiFridgeLine } from "react-icons/ri";
import { TbAirConditioning } from "react-icons/tb";
import { TbAirConditioningDisabled } from "react-icons/tb";
import { LuHeater } from "react-icons/lu";
import { MdOutlineMicrowave } from "react-icons/md";
import { LuWashingMachine } from "react-icons/lu";
import { MdOutlineIron } from "react-icons/md";

export const applianceData: Appliance[] = [
  { name: "LED Bulb", wattage: 10, hours: 1, quantity: 1, icon: <GiLightBulb /> },
  { name: "CFL Bulb", wattage: 20, hours: 1, quantity: 1, icon: <GiCeilingLight /> },
  { name: "Table Lamp", wattage: 40, hours: 1, quantity: 1, icon: <GiDeskLamp /> },
  { name: "Ceiling Fan", wattage: 75, hours: 1, quantity: 1, icon: <FaFan /> },
  { name: "Table Fan", wattage: 60, hours: 1, quantity: 1, icon: <LiaFanSolid /> },
  { name: "Refrigerator", wattage: 200, hours: 1, quantity: 1, icon: <RiFridgeLine /> },
  { name: "Air Conditioner (1 Ton)", wattage: 1500, hours: 1, quantity: 1, icon: <TbAirConditioningDisabled /> },
  { name: "Air Conditioner (1.5 Ton)", wattage: 2000, hours: 1, quantity: 1, icon: <TbAirConditioning /> },
  { name: "Water Heater (Geyser)", wattage: 2000, hours: 1, quantity: 1, icon: <LuHeater /> },
  { name: "Microwave Oven", wattage: 1200, hours: 1, quantity: 1, icon: <MdOutlineMicrowave /> },
  { name: "Washing Machine", wattage: 800, hours: 1, quantity: 1, icon: <LuWashingMachine /> },
  { name: "Clothes Iron", wattage: 1200, hours: 1, quantity: 1, icon: <MdOutlineIron /> },
  { name: "Vacuum Cleaner", wattage: 1000, hours: 1, quantity: 1, icon: <GiVacuumCleaner /> },
  { name: "Television (LED)", wattage: 120, hours: 1, quantity: 1, icon: <MdTv /> },
  { name: "Desktop Computer", wattage: 300, hours: 1, quantity: 1, icon: <MdComputer /> },
  { name: "Laptop", wattage: 75, hours: 1, quantity: 1, icon: <GiLaptop /> },
  { name: "Wi-Fi Router", wattage: 15, hours: 1, quantity: 1, icon: <MdRouter /> },
];