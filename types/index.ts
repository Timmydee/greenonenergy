export interface Appliance {
    name: string;
    wattage?: number;
    hours: number;
    quantity: number;
    icon: any
  }
  
export interface Results {
    totalEnergy: number;
    panelSize: number;
    noOfPanels: number;
    inverterSize: number;
    environmentalImpact: number;
  }