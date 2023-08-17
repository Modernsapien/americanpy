import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import { PointsProvider } from "../../components/MemoriesComponents/PointsContext";
import ComponentUsingPoints from "../../components/MemoriesComponents/ComponentUsingPoints";

import JourneyPage from "./JourneyPage";

describe("Journey Page", () => {
    beforeEach(async () => {
        render (
            <PointsProvider>
                <ComponentUsingPoints />
                <JourneyPage />
            </PointsProvider>
        )
    })

    afterEach(() => {
        cleanup()
    })

    it("should render the journey page", () => {
        const background = screen.getByTestId("background")
        const title = screen.getByTestId("journey_title")
        const donateButton = screen.getByTestId("donate_button")
        const ecoSuggestions = screen.getByTestId("eco_suggestions")

        expect(background).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(donateButton).toBeInTheDocument()
        expect(ecoSuggestions).toBeInTheDocument()
        expect(title.textContent).toBe('Plan your eco-friendly journey now!')
        expect(donateButton.textContent).toBe('Donate to offset your carbon footprint')
    })

    it("should open the donate modal", async () => {
        expect(screen.queryByTestId("modal_title")).not.toBeInTheDocument()
        const donateButton = screen.getByTestId("donate_button")
        await userEvent.click(donateButton)
        const modalTitle = screen.getByTestId("modal_title")
        expect(modalTitle).toBeInTheDocument()

    })

    it("should close the donate modal", async () => {
        const donateButton = screen.getByTestId("donate_button")
        await userEvent.click(donateButton)
        const modalTitle = screen.getByTestId("modal_title")
        expect(modalTitle).toBeInTheDocument()

        const closeButton = screen.getByTestId("close_button")
        await userEvent.click(closeButton)
        expect(screen.queryByTestId("modal_title")).not.toBeInTheDocument()
    })

})