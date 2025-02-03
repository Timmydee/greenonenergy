import React from "react";
import { render, screen, fireEvent } from '@testing-library/react'
import { Appliance } from "@/types";
import ApplianceInput from "@/components/EnergyEstimator/ApplianceInput";


describe('Applaince Component', () => {
    const mockAppliances: Appliance[] = [
        { name: "LED Bulb", wattage: 10, hours: 2, quantity: 1 },
        { name: "Fan", wattage: 60, hours: 3, quantity: 1 },
    ]

    const mockSelectedAppliances = ['Led Bulb']
    const mockHandleToggleAppliance = jest.fn()
    const mockHandleUpdateField = jest.fn()

    test('render without crashing', () => {
        render(<ApplianceInput appliances={mockAppliances}
            selectedAppliances={mockSelectedAppliances}
            handleToggleAppliance={mockHandleToggleAppliance}
            handleUpdateField={mockHandleUpdateField} />)

        expect(screen.getByText('Appliance Usage')).toBeInTheDocument()
    })

    test('displays appliances and their details', () => {
        render(<ApplianceInput appliances={mockAppliances}
            selectedAppliances={mockSelectedAppliances}
            handleToggleAppliance={mockHandleToggleAppliance}
            handleUpdateField={mockHandleUpdateField} />)

        expect(screen.getByText("LED Bulb (10) W")).toBeInTheDocument();
        expect(screen.getByText("Fan (60) W")).toBeInTheDocument();
    }),

        test('calls handletoggleappliance when clicking on an appiance', () => {
            render(<ApplianceInput appliances={mockAppliances}
                selectedAppliances={mockSelectedAppliances}
                handleToggleAppliance={mockHandleToggleAppliance}
                handleUpdateField={mockHandleUpdateField} />)

            const ledBulb = screen.getByText('LED Bulb (10) W')
            fireEvent.click(ledBulb)

            expect(mockHandleToggleAppliance).toHaveBeenCalledTimes(1)
            expect(mockHandleToggleAppliance).toHaveBeenCalledWith('LED Bulb')
        })



    test("Calls handleUpdateField when quantity button are clicked", () => {
        render(<ApplianceInput appliances={mockAppliances}
            selectedAppliances={mockSelectedAppliances}
            handleToggleAppliance={mockHandleToggleAppliance}
            handleUpdateField={mockHandleUpdateField} />)

            const increaseButton = screen.getAllByText("+")[0];
            fireEvent.click(increaseButton);
        
            expect(mockHandleUpdateField).toHaveBeenCalledTimes(1);
            expect(mockHandleUpdateField).toHaveBeenCalledWith("LED Bulb", "quantity", 1);
    })
})