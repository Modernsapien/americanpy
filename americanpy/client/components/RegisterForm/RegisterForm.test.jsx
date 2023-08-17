import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import { LoginPage } from "../../pages";
import { CredentialsProvider } from '../../contexts';
import { BrowserRouter as Router } from 'react-router-dom';
import { register } from "../../../backend/controllers/userController";

describe("Register Form", () => {
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

    it("should render the register form correctly", async () => {
        const switchButton = screen.getByTestId("switch_to_register")
        await userEvent.click(switchButton)

        const title = screen.getByTestId('register_title')
        const usernameLabel = screen.getByTestId('username_label')
        const usernameInput = screen.getByTestId('username_input')
        const passwordLabel = screen.getByTestId('password_label')
        const passwordInput = screen.getByTestId('password_input')
        const firstNameLabel = screen.getByTestId('firstname_label')
        const firstNameInput = screen.getByTestId('firstname_input')
        const lastNameLabel = screen.getByTestId('lastname_label')
        const lastNameInput = screen.getByTestId('lastname_input')
        const emailLabel = screen.getByTestId('email_label')
        const emailInput = screen.getByTestId('email_input')
        const registerButton = screen.getByTestId('register_button')
        const switchFormButton = screen.getByTestId('switch_to_login')

        expect(title).toBeInTheDocument()
        expect(usernameInput).toBeInTheDocument()
        expect(usernameLabel).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
        expect(passwordLabel).toBeInTheDocument()
        expect(firstNameInput).toBeInTheDocument()
        expect(firstNameLabel).toBeInTheDocument()
        expect(lastNameInput).toBeInTheDocument()
        expect(lastNameLabel).toBeInTheDocument()
        expect(emailLabel).toBeInTheDocument()
        expect(emailInput).toBeInTheDocument()
        expect(registerButton).toBeInTheDocument()
        expect(switchFormButton).toBeInTheDocument()
        
    })

})