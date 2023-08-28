import React from 'react'
import {describe, it, expect, beforeEach, afterEach} from 'vitest'
import {screen, render, cleanup} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)
import { CredentialsProvider } from '../contexts';

import App from './App.jsx'

describe("App", () => {
    beforeEach(()=>{
        render(
        <MemoryRouter initialEntries={['/']}>
            <CredentialsProvider>
            <App />
            </CredentialsProvider>
        </MemoryRouter>
        )
    })
    afterEach(()=>{
        cleanup()
    })

    it('renders the header', ()=>{
        const header = screen.getByRole('navigation')
        expect(header).toBeInTheDocument()
    })

    it('loads the homepage as default', () => {
        const container = screen.getByTestId("title_container")
        expect(container).toBeInTheDocument()
    })

    it('should go to the login screen when not logged in', async () => {
        const mapButton = screen.getByTestId("map_nav_link")
        await userEvent.click(mapButton)
 
        expect(screen.queryByTestId('login_form')).toBeInTheDocument()
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

    it("should logout the user", async() => {
        const logoutButton = screen.getByTestId('logout_button')
        await userEvent.click(logoutButton)
        await new Promise((r) => setTimeout(r, 1000));
        expect(screen.queryByTestId("logout_button")).not.toBeInTheDocument()

    }, 10000)


})