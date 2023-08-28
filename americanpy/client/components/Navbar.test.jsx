import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import { CredentialsProvider } from '../contexts';
import { MemoryRouter } from 'react-router-dom'
import App from "../src/App";

describe("Journey Page", () => {
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

    it('should go to the correct page when logged in', async () => {
        const mapButton = screen.getByTestId("map_nav_link")
        await userEvent.click(mapButton)
        await new Promise((r) => setTimeout(r, 1500));
        const usernameInput = screen.getByTestId('username_input')
        const passwordInput = screen.getByTestId('password_input')
        const loginButton = screen.getByTestId('login_button')
        
        await userEvent.type(usernameInput, 'cheese')
        await userEvent.type(passwordInput, 'burger')
        await userEvent.click(loginButton)
        await new Promise((r) => setTimeout(r, 3000));
        await userEvent.click(mapButton)
       

        expect(screen.queryByTestId("map_container")).toBeInTheDocument()
    },10000)

    it("should fail to logout the user", async() => {
        vi.spyOn(window, 'alert')
        const logoutButton = screen.getByTestId('logout_button')
        const token = localStorage.getItem("token")
        localStorage.removeItem("token");
        await userEvent.click(logoutButton)
        await new Promise((r) => setTimeout(r, 1000));
        expect(window.alert).toHaveBeenCalled()
        const response = await fetch("http://localhost:3000/users/logout", {
        method: "DELETE",
        headers: {
          Authorization: token, 
        },
        })

    }, 10000)

})