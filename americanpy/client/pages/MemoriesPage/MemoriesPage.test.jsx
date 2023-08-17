import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import MemoriesPage from "./MemoriesPage";
//console.log(userEvent)
import world from '../HomePage/world.png'
import { Blob } from 'buffer'
import { title } from "process";
globalThis.Blob = Blob 
import { PointsProvider } from "../../components/MemoriesComponents/PointsContext";
import { CredentialsProvider } from '../../contexts';
import ComponentUsingPoints from "../../components/MemoriesComponents/ComponentUsingPoints";
import { BrowserRouter as Router } from 'react-router-dom';

describe("Memories Page", () => {
    beforeEach(async () => {
        render (
            <CredentialsProvider>
                <PointsProvider>
                
                <ComponentUsingPoints />
                <MemoriesPage />
                
                </PointsProvider>
            </CredentialsProvider>
        )
    })

    afterEach(() => {
        cleanup()
    })

    it("should load the default starting memories page", () => {
        const container = screen.getByTestId("memories_container")
        const title = screen.getByTestId("memories_title")
        const button = screen.getByTestId("memories_button")

        expect(container).toBeInTheDocument()
        expect(title).toBeInTheDocument()
        expect(button).toBeInTheDocument()
        expect(button.textContent).toBe('Create a Memory')
    })

    it("should load the form correctly when clicked", async () => {
        const button = screen.getByTestId("memories_button")
        await userEvent.click(button)

        const form = screen.getByTestId("memories_form")
        const formTitle = screen.getByTestId("memories_form_title")
        const fileInput = screen.getByTestId("file_input")
        const memoryTitleLabel = screen.getByTestId("memory_title")
        const memoryTitleInput = screen.getByTestId("memory_title_input")
        const locationLabel = screen.getByTestId("location_label")
        const locationInput = screen.getByTestId("location_input")
        const countryLabel = screen.getByTestId("country_label")
        const countryInput = screen.getByTestId("country_input")
        const memoryDate = screen.getByTestId("memory_date")
        const dateInput = screen.getByTestId("date_input")
        const addButton = screen.getByTestId("add_button")
        const saveButton = screen.getByTestId("save_button")

        expect(form).toBeInTheDocument()
        expect(formTitle).toBeInTheDocument()
        expect(fileInput).toBeInTheDocument()
        expect(memoryTitleInput).toBeInTheDocument()
        expect(memoryTitleLabel).toBeInTheDocument()
        expect(locationInput).toBeInTheDocument()
        expect(locationLabel).toBeInTheDocument()
        expect(countryLabel).toBeInTheDocument()
        expect(countryInput).toBeInTheDocument()
        expect(memoryDate).toBeInTheDocument()
        expect(dateInput).toBeInTheDocument()
        expect(addButton).toBeInTheDocument()
        expect(saveButton).toBeInTheDocument()

    })

    it("should handle change", async () => {
        const button = screen.getByTestId("memories_button")
        await userEvent.click(button)

        const form = screen.getByTestId("memories_form")
        expect(form).toBeInTheDocument()

        const fileInput = screen.getByTestId("file_input")
        const memoryTitleInput = screen.getByTestId("memory_title_input")
        const memoryDescriptionInput = screen.getByTestId("memory_description_input")
        const locationInput = screen.getByTestId("location_input")
        const countryInput = screen.getByTestId("country_input")
        const dateInput = screen.getByTestId("date_input")
        const addButton = screen.getByTestId("add_button")
        const saveButton = screen.getByTestId("save_button")

        let blob = new Blob(["ahoy there"], {type: 'image/png'})

        await userEvent.type(memoryTitleInput, "cheese")
        await userEvent.type(locationInput, "burger")
        await userEvent.type(memoryDescriptionInput, "yes")
        await userEvent.selectOptions(countryInput, "Denmark")
        await userEvent.upload(fileInput, blob)
        await userEvent.clear(dateInput)
        await userEvent.type(dateInput, "2020-02-01")

        await userEvent.click(addButton)
        await new Promise((r) => setTimeout(r, 3000));
        expect(screen.queryByTestId("memories_form")).not.toBeInTheDocument()

        it("should display the memories", async () => {
            const button = screen.getByTestId("memories_button")
            await userEvent.click(button)

            const fileInput = screen.getByTestId("file_input")
            const memoryTitleInput = screen.getByTestId("memory_title_input")
            const memoryDescriptionInput = screen.getByTestId("memory_description_input")
            const locationInput = screen.getByTestId("location_input")
            const countryInput = screen.getByTestId("country_input")
            const dateInput = screen.getByTestId("date_input")
            const addButton = screen.getByTestId("add_button")

            let blob = new Blob(["ahoy there"], {type: 'image/png'})

            await userEvent.type(memoryTitleInput, "cheese")
            await userEvent.type(memoryDescriptionInput, "yes")
            await userEvent.type(locationInput, "burger")
            await userEvent.selectOptions(countryInput, "Denmark")
            await userEvent.upload(fileInput, blob)
            await userEvent.clear(dateInput)
            await userEvent.type(dateInput, "2020-02-01")
            await userEvent.click(addButton)

            await userEvent.click(button)
            let blob2 = new Blob(["greetings"], {type: 'image/png'})

            await userEvent.type(memoryTitleInput, "dragon")
            await userEvent.type(locationInput, "deez")
            await userEvent.selectOptions(countryInput, "Finland")
            await userEvent.upload(fileInput, blob2)
            await userEvent.clear(dateInput)
            await userEvent.type(dateInput, "2023-04-13")
            await userEvent.click(addButton)

            const memory1 = screen.getByTestId("Memory_1")
            const img1 = screen.getByTestId("Memory_1_image")
            const title1 = screen.getByTestId("Memory_1_title")
            const location1 = screen.getByTestId("Memory_1_location")
            const date1 = screen.getByTestId("Memory_1_date")

            expect(memory1).toBeInTheDocument()
            expect(img1).toBeInTheDocument()
            expect(title1).toBeInTheDocument()
            expect(location1).toBeInTheDocument()
            expect(date1).toBeInTheDocument()
            expect(title1.textContent).toBe("cheese")
            expect(location1.textContent).toBe("burger")
            expect(date1.textContent).toBe("2020-02-01")


            const memory2 = screen.getByTestId("Memory_2")
            const img2 = screen.getByTestId("Memory_2_image")
            const title2 = screen.getByTestId("Memory_2_title")
            const location2 = screen.getByTestId("Memory_2_location")
            const date2 = screen.getByTestId("Memory_2_date")

            expect(memory2).toBeInTheDocument()
            expect(img2).toBeInTheDocument()
            expect(title2).toBeInTheDocument()
            expect(location2).toBeInTheDocument()
            expect(date2).toBeInTheDocument()
            expect(title2.textContent).toBe("dragon")
            expect(location2.textContent).toBe("deez")
            expect(date2.textContent).toBe("2023-04-13")

        })

    })


})