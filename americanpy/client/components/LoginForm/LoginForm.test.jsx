import React from "react";
import { describe, it, expect, beforeEach, afterEach, vitest, beforeAll, afterAll,vi } from "vitest";
import { screen, render, cleanup, fireEvent, getByTestId, getAllByRole, getByRole } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import { LoginPage } from "../../pages";
import { CredentialsProvider } from '../../contexts';
import { BrowserRouter as Router } from 'react-router-dom';

describe("Login Form", () => {
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

    it("should load the login form", () => {
        const title = screen.getByTestId('login_title')
        const subtitle = screen.getByTestId('login_subtitle') 
        const usernameLabel = screen.getByTestId('username_label') 
        const usernameInput = screen.getByTestId('username_input') 
        const passwordLabel = screen.getByTestId('password_label') 
        const passwordInput = screen.getByTestId('password_input') 
        const checkBox = screen.getByTestId('check_box') 
        const loginButton = screen.getByTestId('login_button') 
        const switchButton = screen.getByTestId('switch_to_register') 

        expect(title).toBeInTheDocument()
        expect(subtitle).toBeInTheDocument()
        expect(usernameInput).toBeInTheDocument()
        expect(usernameLabel).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
        expect(passwordLabel).toBeInTheDocument()
        expect(checkBox).toBeInTheDocument()
        expect(loginButton).toBeInTheDocument()
        expect(switchButton).toBeInTheDocument()
    })
})