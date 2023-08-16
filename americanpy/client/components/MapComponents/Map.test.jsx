import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import { MapPage } from "../../pages";

describe("MapPage", () => {
    beforeEach(async () => {
        render (
            <MapPage />
        )
    })

    afterEach(() => {
        cleanup()
    })

    it("should load the map", () => {
        const mapContainer = screen.getByTestId("map_container")
        expect(mapContainer).toBeInTheDocument()

        const buttons = screen.getByTestId("map_buttons")
        const visitButton = screen.getByTestId("visit_button")
        const pinButton = screen.getByTestId("pin_button")
        const ecoButton = screen.getByTestId("eco_button")

        expect(buttons).toBeInTheDocument()
        expect(visitButton).toBeInTheDocument()
        expect(pinButton).toBeInTheDocument()
        expect(ecoButton).toBeInTheDocument()

        const map = screen.getByTestId("actual_map")
        expect(map).toBeInTheDocument()
    })

})