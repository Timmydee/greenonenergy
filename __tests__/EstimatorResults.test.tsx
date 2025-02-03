import React from "react";
import { render, screen, fireEvent } from '@testing-library/react'
import EstimatorResults from "@/components/EnergyEstimator/EstimatorResults";
import { Results } from "@/types";

describe("Estimator Result Component", () => {

    const mockResults: Results = {
        totalEnergy: 12.5,
        panelSize: 2.5,
        noOfPanels: 5,
        inverterSize: 3.0,
        environmentalImpact: 10.5,
    }

    const mockSetOpen = jest.fn()
    const mockHandleReset = jest.fn();

    test("render without crashing", () => {
        render(<EstimatorResults results={mockResults} open={false} setOpen={mockSetOpen} handleReset={mockHandleReset} />);
        expect(screen.getByText("Results")).toBeInTheDocument()
    })

    test('display values from props correctly', () => {
      render(<EstimatorResults results={mockResults} open={false} setOpen={mockSetOpen} handleReset={mockHandleReset} />);

      expect(screen.getByText('Total Energy Usage:')).toBeInTheDocument();
      expect(screen.getByText("12.50 kWh/day")).toBeInTheDocument();
      expect(screen.getByText("Recommended Panel Size:")).toBeInTheDocument();
      expect(screen.getByText("2.5 kW")).toBeInTheDocument();
      expect(screen.getByText("Recommended Inverter Size:")).toBeInTheDocument();
      expect(screen.getByText("3 kW")).toBeInTheDocument();
    })

    test("Calls handle reset when button is clicked", () => {
      render(<EstimatorResults results={mockResults} open={false} setOpen={mockSetOpen} handleReset={mockHandleReset} />);

      const resetButton = screen.getByText("Reset Selections")
      fireEvent.click(resetButton)

      expect(mockHandleReset).toHaveBeenCalledTimes(1)
    })

    test("calls setOpen when dropdown is clicked", () => {
      render(<EstimatorResults results={mockResults} open={false} setOpen={mockSetOpen} handleReset={mockHandleReset} />);

      const dropButton = screen.getByTestId('toggle_button')
      fireEvent.click(dropButton)

      expect(mockSetOpen).toHaveBeenCalledTimes(1)
    })
})