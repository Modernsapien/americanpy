import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import MemoriesPage from "./MemoriesPage";
//console.log(userEvent)
import { Blob } from 'buffer'
globalThis.Blob = Blob 
import { PointsProvider } from "../../components/MemoriesComponents/PointsContext";
import { CredentialsProvider } from '../../contexts';
import ComponentUsingPoints from "../../components/MemoriesComponents/ComponentUsingPoints";
import { MemoryRouter } from 'react-router-dom'
import App from "../../src/App";

describe("memories page but logged in", () => {
    beforeEach(async () => {
        render (
        <MemoryRouter initialEntries={['/']}>
            <CredentialsProvider>
                <App />
            </CredentialsProvider>
        </MemoryRouter>
            
        )
    })

    afterEach(() => {
        cleanup()
    })

    it("should load the memories of a logged in user but no memories", async () => {
        const memoryButton = screen.getByTestId("memory_nav_link")
        await userEvent.click(memoryButton)
        await new Promise((r) => setTimeout(r, 15000));
        const usernameInput = screen.getByTestId('username_input')
        const passwordInput = screen.getByTestId('password_input')
        const loginButton = screen.getByTestId('login_button')
        
        await userEvent.type(usernameInput, 'cheese')
        await userEvent.type(passwordInput, 'burger')
        await userEvent.click(loginButton)
        await new Promise((r) => setTimeout(r, 3000));
        await userEvent.click(memoryButton)
       

        expect(screen.queryByTestId("memories_container")).toBeInTheDocument()
        await new Promise((r) => setTimeout(r, 3000));
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
        

        let blob = new Blob(["ahoy there"], {type: 'image/png'})

        await userEvent.type(memoryTitleInput, "cheese")
        await userEvent.type(locationInput, "burger")
        await userEvent.type(memoryDescriptionInput, "yes")
        await userEvent.selectOptions(countryInput, "Denmark")
        await userEvent.upload(fileInput, blob)
        await userEvent.clear(dateInput)
        await userEvent.type(dateInput, "2020-02-01")
        await userEvent.click(addButton)
    }, 50000)

    it("should display the memories", async () => {
        const memoryButton = screen.getByTestId("memory_nav_link")
        await userEvent.click(memoryButton)
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
        await new Promise((r) => setTimeout(r, 3000));

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
        expect(title1.textContent).toBe("Title: yes")
        expect(location1.textContent).toBe("Location: burger")
        expect(date1.textContent).toBe("Date: 2020-02-01")

    },20000)

    it("should open edit menu and cancel", async()=> {
        const memoryButton = screen.getByTestId("memory_nav_link")
        await userEvent.click(memoryButton)
        await new Promise((r) => setTimeout(r, 3000));

        const editButton = screen.getByTestId("0_edit")
        await userEvent.click(editButton)
        await new Promise((r) => setTimeout(r, 3000));
        const editMenu = screen.getByTestId("edit_menu")
        const cancelButton = screen.getByTestId('cancel_button')
        expect(editMenu).toBeInTheDocument()

        await userEvent.click(cancelButton)
        expect(screen.queryByTestId("edit_menu")).not.toBeInTheDocument()
        await new Promise((r) => setTimeout(r, 2000));

    },20000)

    it("should open edit menu, edit and save", async () =>{
        const memoryButton = screen.getByTestId("memory_nav_link")
        await userEvent.click(memoryButton)
        await new Promise((r) => setTimeout(r, 3000));

        const editButton = screen.getByTestId("0_edit")
        await userEvent.click(editButton)
        await new Promise((r) => setTimeout(r, 3000));
        const editMenu = screen.getByTestId("edit_menu")
        const saveButton = screen.getByTestId('save_button')
        
        expect(editMenu).toBeInTheDocument()
        const editMemory = screen.getByTestId('edit_memory')
        const editLocation = screen.getByTestId('edit_location')
        const editDate = screen.getByTestId('edit_date')
        const editCountry = screen.getByTestId('edit_country')
        expect(editCountry).toBeInTheDocument()

        await userEvent.type(editMemory, "i do be editin")
        await userEvent.type(editLocation, "this is a location")
        await userEvent.type(editDate, "1932-04-09")
        await userEvent.selectOptions(editCountry, "France")
        await userEvent.click(saveButton)
        await new Promise((r) => setTimeout(r, 3000));

        const deleteButton = screen.getByTestId("1_delete")
        await userEvent.click(deleteButton)
        await new Promise((r) => setTimeout(r, 2000));

    },30000)

    it("should logout the user memory", async () => {
        const memoryButton = screen.getByTestId("memory_nav_link")
        await userEvent.click(memoryButton)
        await new Promise((r) => setTimeout(r, 3000));
        const token = localStorage.getItem("token")
        localStorage.removeItem("token");
        const response = await fetch("http://localhost:3000/users/logout", {
            method: "DELETE",
            headers: {
              Authorization: token, 
            },
        })
    })


})

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

    afterAll(async ()=> {
        const resp = await fetch("http://localhost:3000/memory");
        const data = await resp.json();
        console.log(data)
        for(let i=0; i<data.length; i++){
            let id = data[i].memory_id
            const options = {
                method:"DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            const del = await fetch(`http://localhost:3000/memory/${id}`, options)
        }
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

        

    })

    

    //adding a stupid memory
    it("should give an error", async () => {
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
        

        let blob = new Blob(["ahoy there"], {type: 'image/png'})

        await userEvent.type(memoryTitleInput, "cheese")
        await userEvent.type(locationInput, "burgerasdlfkjasd;lfjdl;kfjadsfl;kadsjfl;adskjf;lsdafkjasdl;fkjad;lfjalkfaskdkfl;jasd;fsd;lfkdflasdfl;askdfl;askfjs;dlfkasd;lfajsd;fasjdf;akdfl;asjf;lasdkfas;ldkfjs;ldfjkas;lkfsa;lfkas;lfks;flasdkj;ldksfj")
        await userEvent.type(memoryDescriptionInput, "yes")
        await userEvent.selectOptions(countryInput, "Denmark")
        await userEvent.upload(fileInput, blob)
        await userEvent.clear(dateInput)
        await userEvent.type(dateInput, "2020-02-01")

        await userEvent.click(addButton)
        await new Promise((r) => setTimeout(r, 3000));
        expect(screen.queryByTestId("memories_form")).not.toBeInTheDocument()
    })

    


})