import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import EnergyEstimator from '@/components/EnergyEstimator'
import { applianceData } from '@/data/applianceData'

describe('Energy Estimator Calculator', () => {
    test('render Appliance Input and Estimator Result', () => {
        render(<EnergyEstimator />)

        expect(screen.getByText('Appliance Usage')).toBeInTheDocument()
        expect(screen.getByText('Results')).toBeInTheDocument()
    })

    test('selects when appliance are clicked', () => {
        render(<EnergyEstimator />)

        const ledBulb = screen.getByText('LED Bulb (10) W')
        fireEvent.click(ledBulb)

        expect(ledBulb).toHaveClass('bg-green-300')
    })
})