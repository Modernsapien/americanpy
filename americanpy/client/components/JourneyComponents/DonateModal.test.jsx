import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);

import { JourneyPage } from "../../pages";

describe("Journey Page", () => {
    beforeEach(async () => {
        render (
            <JourneyPage />
        )
    })

    afterEach(() => {
        cleanup()
    })

    it("donate modal should load correctly", async () => {
        const donateButton = screen.getByTestId("donate_button")
        await userEvent.click(donateButton)
        await new Promise((r) => setTimeout(r, 3000));

        const modalTitle = screen.getByTestId("modal_title")
        const closeButton = screen.getByTestId("close_button")
        const modalDescription = screen.getByTestId('modal_description')
        const amountLabel = screen.getByTestId('amount_label')
        const amountInput = screen.getByTestId('amount_input')
        const cardNumberLabel = screen.getByTestId('card_number_label')
        const cardNumberInput = screen.getByTestId('card_number_input')
        const cvvLabel = screen.getByTestId('cvv_label')
        const cvvInput = screen.getByTestId('cvv_input')
        const expiryLabel = screen.getByTestId('expiry_label')
        const expiryInput = screen.getByTestId('expiry_input')
        const donationButton = screen.getByTestId('donation_button')

        expect(modalTitle).toBeInTheDocument()
        expect(closeButton).toBeInTheDocument()
        expect(modalDescription).toBeInTheDocument()
        expect(amountLabel).toBeInTheDocument()
        expect(amountInput).toBeInTheDocument()
        expect(cardNumberLabel).toBeInTheDocument()
        expect(cardNumberInput).toBeInTheDocument()
        expect(cvvLabel).toBeInTheDocument()
        expect(cvvInput).toBeInTheDocument()
        expect(expiryLabel).toBeInTheDocument()
        expect(expiryInput).toBeInTheDocument()
        expect(donationButton).toBeInTheDocument()

    })

    it("should handle a donation", async () => {
        const donateButton = screen.getByTestId("donate_button")
        await userEvent.click(donateButton)
        await new Promise((r) => setTimeout(r, 3000));

        const amountInput = screen.getByTestId('amount_input')
        const cardNumberInput = screen.getByTestId('card_number_input')
        const cvvInput = screen.getByTestId('cvv_input')
        const expiryInput = screen.getByTestId('expiry_input')
        const donationButton = screen.getByTestId('donation_button')

        await userEvent.type(amountInput, '20')
        await userEvent.type(cardNumberInput, '1234567891011120')
        await userEvent.type(cvvInput, '555')
        await userEvent.type(expiryInput, "03/28")
        await userEvent.click(donationButton)
        await new Promise((r) => setTimeout(r, 3000));


    }, 10000)

})