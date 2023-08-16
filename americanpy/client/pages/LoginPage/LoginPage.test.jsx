import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import LoginPage from "./LoginPage";
import { CredentialsProvider } from '../../contexts';
import { BrowserRouter as Router } from 'react-router-dom';

describe("Login Page", () => {
    beforeEach(async () => {
        render (
            <Router>
                <CredentialsProvider>
                    <LoginPage />
                </CredentialsProvider>
             </Router>    
        )
    })

    afterEach(() => {
        cleanup()
    })

    it("should render login form first", () => {
        const loginForm = screen.getByTestId('login_form')
        expect(loginForm).toBeInTheDocument()
    })

    it("should switch to register form", async () => {
        expect(screen.queryByTestId("register_form")).not.toBeInTheDocument()

        const switchButton = screen.getByTestId("switch_to_register")
        await userEvent.click(switchButton)

        const registerForm = screen.getByTestId("register_form")
        expect(registerForm).toBeInTheDocument()
    })

    it("should switch back", async () => {
        const switchButton = screen.getByTestId("switch_to_register")
        await userEvent.click(switchButton)

        expect(screen.queryByTestId("login_form")).not.toBeInTheDocument()

        const switchBackButton = screen.getByTestId("switch_to_login")
        await userEvent.click(switchBackButton)
        
        const loginForm = screen.getByTestId('login_form')
        expect(loginForm).toBeInTheDocument()

    })

    it("should create a new user", async () => {
        const switchButton = screen.getByTestId("switch_to_register")
        await userEvent.click(switchButton)

        const usernameInput = screen.getByTestId('username_input')
        const passwordInput = screen.getByTestId('password_input')
        const firstNameInput = screen.getByTestId('firstname_input')
        const lastNameInput = screen.getByTestId('lastname_input')
        const emailInput = screen.getByTestId('email_input')
        const registerButton = screen.getByTestId('register_button')

        await userEvent.type(usernameInput, "cheese")
        await userEvent.type(passwordInput, "burger")
        await userEvent.type(firstNameInput, "cheese")
        await userEvent.type(lastNameInput, "burger")
        await userEvent.type(emailInput, "iamanemail@email.com")
        await userEvent.click(registerButton)
        await new Promise((r) => setTimeout(r, 3000));

        const loginForm = screen.getByTestId('login_form')
        expect(loginForm).toBeInTheDocument()
    })

    it("should fail to create a user", async () => {
        vi.spyOn(window, 'alert')
        const switchButton = screen.getByTestId("switch_to_register")
        await userEvent.click(switchButton)

        const usernameInput = screen.getByTestId('username_input')
        const passwordInput = screen.getByTestId('password_input')
        const firstNameInput = screen.getByTestId('firstname_input')
        const lastNameInput = screen.getByTestId('lastname_input')
        const emailInput = screen.getByTestId('email_input')
        const registerButton = screen.getByTestId('register_button')

        await userEvent.type(usernameInput, "cheese")
        await userEvent.type(passwordInput, "burger")
        await userEvent.type(firstNameInput, "cheese")
        await userEvent.type(lastNameInput, "burger")
        await userEvent.type(emailInput, "iamanemail@email.com")
        await userEvent.click(registerButton)
        await new Promise((r) => setTimeout(r, 3000));

        expect(window.alert).toHaveBeenCalled()
    })
})