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


        expect(modalTitle).toBeInTheDocument()

    })


})