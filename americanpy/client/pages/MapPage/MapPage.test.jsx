import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import MapPage from "./MapPage";

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
    })

})