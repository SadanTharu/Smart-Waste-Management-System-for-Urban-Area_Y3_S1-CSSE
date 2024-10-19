import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CalPayment from './CalPayment.jsx';

describe('CalPayment Component', () => {
    test('renders payment option buttons correctly', () => {
        render(
            <BrowserRouter>
                <CalPayment />
            </BrowserRouter>
        );
        
        expect(screen.getByText('Weight-based')).toBeInTheDocument();
        expect(screen.getByText('Flat-based')).toBeInTheDocument();
    });

    test('calculates weight-based payment correctly', () => {
        render(
            <BrowserRouter>
                <CalPayment />
            </BrowserRouter>
        );
        
        fireEvent.click(screen.getByText('Weight-based'));
        fireEvent.change(screen.getByLabelText('Enter weight (in kg):'), { target: { value: '10' } });
        fireEvent.click(screen.getByText('Calculate Payment'));
        
        expect(screen.getByText('Total Amount: 3000 rupees')).toBeInTheDocument();
    });

    test('sets flat-based payment correctly', () => {
        render(
            <BrowserRouter>
                <CalPayment />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Flat-based'));

        expect(screen.getByText('Total Amount: 5000 rupees')).toBeInTheDocument();
    });

    test('disables proceed button if total amount is 0', () => {
        render(
            <BrowserRouter>
                <CalPayment />
            </BrowserRouter>
        );

        const proceedButton = screen.getByText('Proceed to Payment');
        expect(proceedButton).toBeDisabled();
    });

    test('enables proceed button if total amount is greater than 0', () => {
        render(
            <BrowserRouter>
                <CalPayment />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByText('Weight-based'));
        fireEvent.change(screen.getByLabelText('Enter weight (in kg):'), { target: { value: '10' } });
        fireEvent.click(screen.getByText('Calculate Payment'));

        const proceedButton = screen.getByText('Proceed to Payment');
        expect(proceedButton).not.toBeDisabled();
    });
});
