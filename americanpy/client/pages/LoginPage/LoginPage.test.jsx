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
})