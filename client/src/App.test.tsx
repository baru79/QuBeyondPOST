/* eslint-disable linebreak-style */
import { describe, it } from 'vitest'
import { screen, render } from '@testing-library/react'
import App from './App'

describe('App', () => {
	it('should render Star Wars Planets', () => {
		render(<App />)
		const heading = 'Star Wars Planets'
		expect(
			screen.getByRole('heading', {
				level: 1,
			})
		).toHaveTextContent(heading)
	})
})
