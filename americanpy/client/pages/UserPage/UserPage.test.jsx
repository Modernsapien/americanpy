import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import UserPage from "./UserPage";
global.confirm = () => true


describe("User Page", () => {
    beforeEach(async () => {
        render (
            <UserPage />
        )
    })

    afterEach(() => {
        cleanup()
    })

    it("should render the user page title", () => {
        const title = screen.getByTestId("user_title")
        expect(title).toBeInTheDocument()
        expect(title.textContent).toBe('Welcome to your Passport, Example Name!')
    })

    it("should render profile photo section", () => {
        const title = screen.getByTestId("user_photo_title")
        const photo = screen.getByTestId("user_photo")
        const photoInput= screen.getByTestId("user_photo_input")

        expect(title).toBeInTheDocument()
        expect(title.textContent).toBe('Profile Photo')
        expect(photo).toBeInTheDocument()
        expect(photoInput).toBeInTheDocument()
    })

    it("should render user info section correctly", () => {
        const infoTitle = screen.getByTestId("user_info_title")
        const username = screen.getByTestId("username")
        const email = screen.getByTestId("email")
        const infoButton = screen.getByTestId("info_button")

        expect(infoTitle).toBeInTheDocument()
        expect(infoTitle.textContent).toBe('User Information')
        expect(username).toBeInTheDocument()
        expect(username.textContent).toBe('Username: Example Name')
        expect(email).toBeInTheDocument()
        expect(email.textContent).toBe('Email: @example.com')
        expect(infoButton).toBeInTheDocument()
        expect(infoButton.textContent).toBe('Edit Info')
    })

    it("should render the shop section correctly", () => {
        const title = screen.getByTestId("rewards_title")
        const points = screen.getByTestId("points_available")
        const shop = screen.getByTestId("shop_items")

        expect(title).toBeInTheDocument()
        expect(points).toBeInTheDocument()
        expect(shop).toBeInTheDocument()
        expect(title.textContent).toBe('Rewards')
        expect(points.textContent).toBe('Points available: 100')

        const item1Title = screen.getByTestId("Hat_title")
        const item1Cost = screen.getByTestId("Hat_cost")
        const item1Button = screen.getByTestId("Hat_button")
        expect(item1Title).toBeInTheDocument()
        expect(item1Cost).toBeInTheDocument()
        expect(item1Button).toBeInTheDocument()
        expect(item1Title.textContent).toBe('Hat')
        expect(item1Cost.textContent).toBe('Cost: 50 points')
        expect(item1Button.textContent).toBe('Purchase')

        const item2Title = screen.getByTestId("Socks_title")
        const item2Cost = screen.getByTestId("Socks_cost")
        const item2Button = screen.getByTestId("Socks_button")
        expect(item2Title).toBeInTheDocument()
        expect(item2Cost).toBeInTheDocument()
        expect(item2Button).toBeInTheDocument()
        expect(item2Title.textContent).toBe('Socks')
        expect(item2Cost.textContent).toBe('Cost: 75 points')
        expect(item2Button.textContent).toBe('Purchase')

        const item3Title = screen.getByTestId("Jacket_title")
        const item3Cost = screen.getByTestId("Jacket_cost")
        const item3Button = screen.getByTestId("Jacket_button")
        expect(item3Title).toBeInTheDocument()
        expect(item3Cost).toBeInTheDocument()
        expect(item3Button).toBeInTheDocument()
        expect(item3Title.textContent).toBe('Jacket')
        expect(item3Cost.textContent).toBe('Cost: 100 points')
        expect(item3Button.textContent).toBe('Purchase')

    })

    it("should change profile photo", async () => {
        let blob = new Blob(["ahoy there"], {type: 'image/png'})
        const photoInput= screen.getByTestId("user_photo_input")
        const photo = screen.getByTestId("user_photo")
        expect(photo).toHaveAttribute('src', '/pages/UserPage/user-photo.png')
        await userEvent.upload(photoInput, blob)
        expect(photo).not.toHaveAttribute('src', '/pages/UserPage/user-photo.png')
    })


    it("should render change user info", async () => {
        const infoButton = screen.getByTestId("info_button")
        expect(screen.queryByTestId("username_input")).not.toBeInTheDocument()
        await userEvent.click(infoButton)

        const usernameInput = screen.getByTestId("username_input")
        const emailInput = screen.getByTestId("email_input")
        const editButton = screen.getByTestId("edit_button")

        expect(usernameInput).toBeInTheDocument()
        expect(emailInput).toBeInTheDocument()
        expect(editButton).toBeInTheDocument()
    })

    it("should handle submit", async() => {
        const infoButton = screen.getByTestId("info_button")
        await userEvent.click(infoButton)

        const usernameInput = screen.getByTestId("username_input")
        const emailInput = screen.getByTestId("email_input")
        const editButton = screen.getByTestId("edit_button")

        await userEvent.type(usernameInput, "cheese")
        await userEvent.type(emailInput, "burger")
        await userEvent.click(editButton)

        expect(screen.queryByTestId("username_input")).not.toBeInTheDocument()
        const username = screen.getByTestId("username")
        const email = screen.getByTestId("email")
        expect(username.textContent).toBe('Username: Cheese')
        expect(email.textContent).toBe('Email: burger')
    })

    it("should allow purchase if one can afford it", async () => {
        window.alert = () => {}
        expect(screen.queryByTestId("Socks_purchased")).not.toBeInTheDocument()
        const socksButton = screen.getByTestId("Socks_button")
        await userEvent.click(socksButton)

        const points = screen.getByTestId("points_available")
        expect(points.textContent).toBe('Points available: 25')
        const socks = screen.getByTestId("Socks_purchased")
        expect(socks).toBeInTheDocument
        expect(socks.textContent).toBe("Socks")

        const hatButton = screen.getByTestId("Hat_button")
        await userEvent.click(hatButton)
        expect(screen.queryByTestId("Hat_purchased")).not.toBeInTheDocument()


    })

})