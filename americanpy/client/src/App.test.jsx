import React from 'react'
import {describe, it, expect, beforeEach, afterEach} from 'vitest'
import {screen, render, cleanup} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import App from './App.jsx'

describe("App", () => {
    beforeEach(()=>{
        render(
        <MemoryRouter initialEntries={['/']}>
            <App />
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
})