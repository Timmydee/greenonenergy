import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EnergyEstimator from "@/components/EnergyEstimator";

describe("EnergyEstimator Integration Tests", () => {
  test("selects an appliance and updates results", async () => {
    render(<EnergyEstimator />);

    const ledBulb = screen.getByText("LED Bulb (10) W");
    fireEvent.click(ledBulb); // Select LED Bulb

    const increaseHoursButton = screen.getAllByText("+")[0]; // First "+" should be for hours
    fireEvent.click(increaseHoursButton);

    // Wait for the updated result to appear
    expect(await screen.findByText("Total Energy Usage:")).toBeInTheDocument();
    expect(await screen.findByText("0.05 kWh/day")).toBeInTheDocument();
  });

  test("updates the results dynamically when quantity changes", async () => {
    render(<EnergyEstimator />);

    const ledBulb = screen.getByText("LED Bulb (10) W");
    fireEvent.click(ledBulb); // Select LED Bulb

    const increaseQuantityButton = screen.getAllByText("+")[1]; // Second "+" should be for quantity
    fireEvent.click(increaseQuantityButton);

    // Wait for the updated result to appear
    expect(await screen.findByText("Total Energy Usage:")).toBeInTheDocument();
    expect(await screen.findByText("0.10 kWh/day")).toBeInTheDocument(); // Assuming 2 LED bulbs at 1 hour each
  });

  test("resets appliances and results when Reset button is clicked", async () => {
    render(<EnergyEstimator />);

    const ledBulb = screen.getByText("LED Bulb (10) W");
    fireEvent.click(ledBulb); // Select LED Bulb

    const resetButton = screen.getByText("Reset Selections");
    fireEvent.click(resetButton);

    // Wait for the reset result to appear
    expect(await screen.findByText("Total Energy Usage: 0 kWh/day")).toBeInTheDocument();
  });
});
