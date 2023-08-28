import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import HomePage from "./HomePage";
import { PointsProvider } from "../../components/MemoriesComponents/PointsContext";
import ComponentUsingPoints from "../../components/MemoriesComponents/ComponentUsingPoints";

describe("HomePage", () => {
    beforeEach(async () => {
        render (
            
            <PointsProvider>
                <ComponentUsingPoints />
                <HomePage />
            </PointsProvider>
        )
    })

    afterEach(() => {
        cleanup()
    })

    it("should render a title and description", () => {
        const container = screen.getByTestId("title_container")
        const title = screen.getByTestId("home_title")
        const description = screen.getByTestId("home_description")
        const globe = screen.getByTestId("globe_image")

        expect(container).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(title.textContent).toBe("Travelling doesn't have to cost the earth!")
        expect(description).toBeInTheDocument()
        expect(description.textContent).toBe("Welcome to Travel-Wise, your compass to responsible and sustainable travel!  Our planet's well-being is paramount, this site sets out to empower travellers with the tools and knowledge to make eco-conscious choices that leave a positive impact on the environment.")
        expect(globe).toBeInTheDocument()
    })

    it("should load explore the world icon and description", () => {
        const iconsContainer = screen.getByTestId("icons_container")
        expect(iconsContainer).toBeInTheDocument()

        const container = screen.getByTestId("explore_container")
        const icon = screen.getByTestId("explore_icon")
        const title = screen.getByTestId("explore_title")
        const description = screen.getByTestId("explore_description")
        expect(container).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(title.textContent).toBe('Explore the World')
        expect(description).toBeInTheDocument()
        expect(description.textContent).toBe('Discover new destinations and experience cultures from around the globe.')
    })

    it("should load eco friendly routes icon and description", ()=> {
        const container = screen.getByTestId("routes_container")
        const icon = screen.getByTestId("routes_icon")
        const title = screen.getByTestId("routes_title")
        const description = screen.getByTestId("routes_description")
        expect(container).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(title.textContent).toBe('Eco-Friendly Routes')
        expect(description).toBeInTheDocument()
        expect(description.textContent).toBe('Find the most sustainable travel routes and reduce your carbon footprint.')
    })

    it("should load sustainable practices icon and description", ()=> {
        const container = screen.getByTestId("sustainable_container")
        const icon = screen.getByTestId("sustainable_icon")
        const title = screen.getByTestId("sustainable_title")
        const description = screen.getByTestId("sustainable_description")
        expect(container).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(title.textContent).toBe('Sustainable Practices')
        expect(description).toBeInTheDocument()
        expect(description.textContent).toBe('Get tips on eco-friendly accommodations, transportation, and responsible tourism.')
    })

    it("should load eco friendly rewards icon and description", ()=> {
        const container = screen.getByTestId("rewards_container")
        const icon = screen.getByTestId("rewards_icon")
        const title = screen.getByTestId("rewards_title")
        const description = screen.getByTestId("rewards_description")
        expect(container).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(title.textContent).toBe('Eco-Friendly Rewards')
        expect(description).toBeInTheDocument()
        expect(description.textContent).toBe('Earn rewards for making environmentally conscious choices during your travels.')
    })

    it("should load greener tomorrow icon and description", ()=> {
        const container = screen.getByTestId("greener_container")
        const icon = screen.getByTestId("greener_icon")
        const title = screen.getByTestId("greener_title")
        const description = screen.getByTestId("greener_description")
        expect(container).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(title.textContent).toBe('A Greener Tomorrow')
        expect(description).toBeInTheDocument()
        expect(description.textContent).toBe('Join us in preserving the planet for future generations through responsible travel.')
    })

    it("should load personal travel diary icon and description", ()=> {
        const container = screen.getByTestId("diary_container")
        const icon = screen.getByTestId("diary_icon")
        const title = screen.getByTestId("diary_title")
        const description = screen.getByTestId("diary_description")
        expect(container).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(title.textContent).toBe('Personal Travel Diary')
        expect(description).toBeInTheDocument()
        expect(description.textContent).toBe('Document your eco-friendly experiences and memories in your travel diary.')
    })


})