import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import UserPage from "./UserPage";
global.confirm = () => true
import { PointsProvider } from "../../components/MemoriesComponents/PointsContext";
import ComponentUsingPoints from "../../components/MemoriesComponents/ComponentUsingPoints";
import { MemoryRouter } from 'react-router-dom'
import { CredentialsProvider } from '../../contexts';
import App from "../../src/App";

describe("user page but logged in error", () => {
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

    it("should login and navigate to user page", async () => {
        const userButton = screen.getByTestId("user_nav_link")
        await userEvent.click(userButton)
        await new Promise((r) => setTimeout(r, 1500));
        const usernameInput = screen.getByTestId('username_input')
        const passwordInput = screen.getByTestId('password_input')
        const loginButton = screen.getByTestId('login_button')
        
        await userEvent.type(usernameInput, 'cheese')
        await userEvent.type(passwordInput, 'burger')
        await userEvent.click(loginButton)
        await new Promise((r) => setTimeout(r, 3000));
        localStorage.removeItem("user_id");
        await userEvent.click(userButton)
        expect(screen.queryByTestId("user_background")).toBeInTheDocument()
        await new Promise((r) => setTimeout(r, 3000));
        const username = screen.getByTestId("username")
        expect(username.textContent).toBe('Username: ')

        const token = localStorage.getItem("token")
        localStorage.removeItem("token");
        const response = await fetch("http://localhost:3000/users/logout", {
            method: "DELETE",
            headers: {
              Authorization: token, 
            },
        })
    }, 20000)
})